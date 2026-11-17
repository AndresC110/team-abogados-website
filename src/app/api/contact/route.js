import { createClient } from '@supabase/supabase-js';

// Strip any trailing /rest/v1 path — the client adds it automatically
const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseUrl = rawSupabaseUrl.replace(/\/rest\/v1\/?$/, '');

const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_KEY);

// Prefer a server-only ADMIN_EMAIL; fall back to the legacy public var so
// nothing breaks before it's de-publicized in the Vercel dashboard.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL;

// Verified Resend sender for teamabogados.com.
const FROM_EMAIL = 'Team Abogados <contacto@teamabogados.com>';

const ALLOWED_CONTACT_TIMES = new Set([
  'asap', 'morning', 'afternoon', 'evening', 'tomorrow', 'weekend',
]);

// Friendly Spanish labels for the preferred-contact-time codes.
const CONTACT_TIME_LABELS = {
  asap: 'Lo antes posible',
  morning: 'Por la mañana',
  afternoon: 'Por la tarde',
  evening: 'Por la noche',
  tomorrow: 'Mañana',
  weekend: 'Fin de semana',
};

// Reasonable upper bounds — anything longer is abuse, not a real lead.
const LIMITS = { name: 100, email: 150, phone: 30, message: 3000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_BYTES = 16 * 1024; // 16 KB is plenty for a contact form

// --- Best-effort in-memory rate limiting (per warm instance) -----------------
// Not a hard guarantee across serverless instances, but it blunts scripted
// floods cheaply. The durable layer is Vercel WAF / a CAPTCHA (see notes).
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };
const hits = new Map(); // ip -> number[] (timestamps)

function rateLimited(ip) {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT.windowMs;
  const recent = (hits.get(ip) || []).filter((t) => t > cutoff);
  recent.push(now);
  hits.set(ip, recent);
  // Opportunistic cleanup so the Map can't grow unbounded.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => t <= cutoff)) hits.delete(k);
    }
  }
  return recent.length > RATE_LIMIT.max;
}

// Strip newlines/tabs (CR/LF defeat log + header injection), collapse runs of
// whitespace, trim, and cap length.
const CONTROL_RE = new RegExp('[\\u0000-\\u001F\\u007F]', 'g');
function clean(value, max) {
  if (typeof value !== 'string') return '';
  return value
    .replace(CONTROL_RE, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

// Escape user-supplied values before interpolating into the HTML email.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Build the lead-notification email (HTML + plain text). Faithful equivalent of
// the previous EmailJS template: same fields, same recipient.
function buildLeadEmail({ name, email, phone, contactTimeLabel, message, timestamp }) {
  const row = (label, value) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #eee;color:#8a7a55;font-size:13px;width:160px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #eee;color:#1a1a1a;font-size:15px;">${value}</td>
    </tr>`;

  const html = `<!DOCTYPE html>
<html lang="es">
<body style="margin:0;padding:0;background:#f5f3ee;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:24px;">
    <div style="background:#1a1a1a;color:#fff;padding:20px 24px;border-radius:8px 8px 0 0;">
      <h1 style="margin:0;font-size:18px;letter-spacing:.5px;">Team Abogados</h1>
      <p style="margin:6px 0 0;font-size:13px;color:#c9b88a;">Nueva solicitud de contacto</p>
    </div>
    <div style="background:#fff;padding:8px 24px 24px;border:1px solid #eee;border-top:0;border-radius:0 0 8px 8px;">
      <table style="width:100%;border-collapse:collapse;">
        ${row('Nombre', escapeHtml(name))}
        ${row('Teléfono', `<a href="tel:${escapeHtml(phone)}" style="color:#1a1a1a;text-decoration:none;">${escapeHtml(phone)}</a>`)}
        ${row('Correo', `<a href="mailto:${escapeHtml(email)}" style="color:#1a1a1a;">${escapeHtml(email)}</a>`)}
        ${row('Mejor momento', escapeHtml(contactTimeLabel))}
      </table>
      <p style="margin:18px 0 6px;color:#8a7a55;font-size:13px;">Mensaje</p>
      <div style="background:#faf8f3;border:1px solid #eee;border-radius:6px;padding:14px;color:#1a1a1a;font-size:15px;line-height:1.5;white-space:pre-wrap;">${escapeHtml(message)}</div>
      <p style="margin:20px 0 0;color:#999;font-size:12px;">Recibido: ${escapeHtml(timestamp)}</p>
    </div>
  </div>
</body>
</html>`;

  const text = [
    'Team Abogados — Nueva solicitud de contacto',
    '',
    `Nombre: ${name}`,
    `Teléfono: ${phone}`,
    `Correo: ${email}`,
    `Mejor momento: ${contactTimeLabel}`,
    '',
    'Mensaje:',
    message,
    '',
    `Recibido: ${timestamp}`,
  ].join('\n');

  return { html, text };
}

async function sendEmailViaResend({ name, email, phone, contactTimeLabel, message, timestamp }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY is not set');

  const { html, text } = buildLeadEmail({ name, email, phone, contactTimeLabel, message, timestamp });

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL],
      reply_to: email, // replying to the notification reaches the lead directly
      subject: `Nuevo contacto: ${name}`,
      html,
      text,
    }),
  });

  const body = await response.text();
  if (!response.ok) throw new Error(`Resend ${response.status}: ${body}`);
}

// Legacy provider, kept as a fallback until the Resend domain is verified.
// Once Resend is confirmed working this whole function (and the EMAILJS_* env
// vars) can be removed.
async function sendEmailViaEmailJS({ name, email, phone, contactTime, message, timestamp }) {
  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      accessToken: process.env.EMAILJS_PRIVATE_KEY,
      template_params: {
        to_email: ADMIN_EMAIL,
        name,    client_name: name,   from_name: name,   nombre: name,
        email,   client_email: email, from_email: email, correo: email,
        phone,   client_phone: phone, telefono: phone,   celular: phone,
        message, description: message, mensaje: message, accident_description: message,
        urgency: contactTime,
        contact_time: contactTime,
        timestamp,
      },
    }),
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`EmailJS ${response.status}: ${text}`);
}

export async function POST(request) {
  // Generic message returned for any server-side failure. Internal details are
  // logged but never sent to the client.
  const GENERIC_ERROR =
    'No se pudo enviar tu solicitud. Intenta de nuevo o llámanos al (646) 724-6127.';

  try {
    // --- Rate limit ----------------------------------------------------------
    const ip =
      (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
      'unknown';
    if (rateLimited(ip)) {
      return Response.json(
        { error: 'Demasiadas solicitudes. Espera unos minutos e intenta de nuevo.' },
        { status: 429 }
      );
    }

    // --- Parse body (size-guarded) ------------------------------------------
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return Response.json({ error: 'Solicitud demasiado grande.' }, { status: 413 });
    }
    let body;
    try {
      body = JSON.parse(raw);
    } catch {
      return Response.json({ error: 'Solicitud inválida.' }, { status: 400 });
    }

    // --- Honeypot: bots fill hidden fields; humans don't --------------------
    // Silently accept and drop so bots can't detect the trap.
    if (body && typeof body.company === 'string' && body.company.trim() !== '') {
      return Response.json({ success: true });
    }

    // --- Validate + sanitize -------------------------------------------------
    const name = clean(body?.name, LIMITS.name);
    const email = clean(body?.email, LIMITS.email);
    const phone = clean(body?.phone, LIMITS.phone);
    const message = clean(body?.message, LIMITS.message);
    let contactTime = clean(body?.contactTime, 20) || 'asap';
    if (!ALLOWED_CONTACT_TIMES.has(contactTime)) contactTime = 'asap';
    const contactTimeLabel = CONTACT_TIME_LABELS[contactTime];

    if (!name || !phone || !email || !message) {
      return Response.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return Response.json({ error: 'Correo electrónico inválido' }, { status: 400 });
    }

    // --- 1. Save to Supabase (server-side, service role) --------------------
    let dbOk = false;
    try {
      const { error } = await supabase
        .from('leads')
        .insert([{ name, email, phone, message, urgency: contactTime }]);
      if (error) {
        console.error('Supabase error:', error.message, error.code);
      } else {
        dbOk = true;
      }
    } catch (e) {
      console.error('Supabase exception:', e.message);
    }

    // --- 2. Send the notification email via Resend (critical path) ----------
    const timestamp = new Date().toLocaleString('es-ES', {
      timeZone: 'America/New_York',
      dateStyle: 'long',
      timeStyle: 'short',
    });
    let emailSent = false;
    try {
      await sendEmailViaResend({ name, email, phone, contactTimeLabel, message, timestamp });
      emailSent = true;
    } catch (e) {
      console.error('Resend failed, falling back to EmailJS:', e.message);
    }
    if (!emailSent) {
      try {
        await sendEmailViaEmailJS({ name, email, phone, contactTime, message, timestamp });
        emailSent = true;
      } catch (e) {
        console.error('EmailJS error:', e.message);
      }
    }
    if (!emailSent) {
      return Response.json({ error: GENERIC_ERROR }, { status: 500 });
    }

    // Email sent — success even if the DB insert had issues (logged above).
    return Response.json({ success: true, db: dbOk ? 'saved' : 'warning' });
  } catch (error) {
    console.error('API error:', error?.message);
    return Response.json({ error: GENERIC_ERROR }, { status: 500 });
  }
}
