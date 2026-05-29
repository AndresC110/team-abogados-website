import { createClient } from '@supabase/supabase-js';

// ---------------------------------------------------------------------------
// Rate limiter — in-memory per serverless instance
// Max 3 submissions per IP per 15 minutes
// ---------------------------------------------------------------------------
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 min
const ipMap = new Map(); // ip -> { count, windowStart }

function isRateLimited(ip) {
  const now = Date.now();
  const entry = ipMap.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    ipMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count += 1;
  return false;
}

function getClientIp(request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

// ---------------------------------------------------------------------------
// Input sanitization
// ---------------------------------------------------------------------------
function sanitize(value, maxLen) {
  if (typeof value !== 'string') return '';
  // Strip HTML/script tags and trim
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/[<>'"`;]/g, '')
    .trim()
    .slice(0, maxLen);
}

function validateInputs({ name, phone, email, message }) {
  if (!name || !phone || !email) {
    return 'Nombre, teléfono y correo son requeridos.';
  }
  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Correo electrónico no válido.';
  }
  // Phone: digits, spaces, dashes, parens, +
  if (!/^[\d\s\-\+\(\)]{7,20}$/.test(phone)) {
    return 'Número de teléfono no válido.';
  }
  return null;
}

// ---------------------------------------------------------------------------
// Supabase
// ---------------------------------------------------------------------------
function getSupabaseClient() {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim().replace(/\/+$/, '');
  const key = (process.env.SUPABASE_SERVICE_KEY || '').trim();

  console.log('[Supabase] URL shape:', url ? `${url.slice(0, 30)}...` : 'MISSING');
  console.log('[Supabase] Key present:', !!key, '| starts with eyJ:', key.startsWith('eyJ'));

  if (!url || !key) return null;
  return { client: createClient(url, key), url, key };
}

async function saveToSupabase({ name, phone, email, contactTime, message }) {
  const sb = getSupabaseClient();

  if (!sb) {
    console.warn('[Supabase] Env vars not set — skipping DB save');
    return null;
  }

  console.log('[Supabase] Attempting insert into leads table…');

  const { data, error } = await sb.client
    .from('leads')
    .insert([{ name, email, phone, message, urgency: contactTime || 'asap' }])
    .select();

  if (error) {
    console.error('[Supabase] Insert error full object:', JSON.stringify(error));
    throw new Error('Error al guardar el formulario: ' + error.message);
  }

  console.log('[Supabase] Insert success. Row id:', data?.[0]?.id);
  return data;
}

// ---------------------------------------------------------------------------
// EmailJS
// ---------------------------------------------------------------------------
async function sendEmailViaEmailJS({ name, phone, email, contactTime, message }) {
  const serviceId  = (process.env.EMAILJS_SERVICE_ID  || '').trim();
  const templateId = (process.env.EMAILJS_TEMPLATE_ID || '').trim();
  const publicKey  = (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '').trim();
  const privateKey = (process.env.EMAILJS_PRIVATE_KEY || '').trim();
  const adminEmail = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || '').trim();

  if (!serviceId || !templateId || !publicKey) {
    console.warn('[EmailJS] Missing required env vars — skipping email');
    return null;
  }

  const body = {
    service_id:      serviceId,
    template_id:     templateId,
    user_id:         publicKey,
    template_params: {
      to_email:     adminEmail || '',
      client_name:  name,
      client_email: email,
      client_phone: phone,
      message,
      urgency:      contactTime || 'asap',
      timestamp:    new Date().toLocaleString('es-ES'),
    },
  };

  if (privateKey) body.accessToken = privateKey;

  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });

  const responseText = await res.text();
  console.log('[EmailJS] Response status:', res.status, '| body:', responseText);

  if (!res.ok) throw new Error('EmailJS failed (' + res.status + '): ' + responseText);
  return true;
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------
export async function POST(request) {
  try {
    // Rate limit check
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      console.warn('[Contact API] Rate limited IP:', ip);
      return Response.json(
        { error: 'Demasiados intentos. Por favor espera 15 minutos antes de intentarlo de nuevo.' },
        { status: 429 }
      );
    }

    // Parse and sanitize inputs
    let body;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: 'Solicitud inválida.' }, { status: 400 });
    }

    const name        = sanitize(body.name,        100);
    const phone       = sanitize(body.phone,        20);
    const email       = sanitize(body.email,       200);
    const message     = sanitize(body.message,    2000);
    const contactTime = sanitize(body.contactTime,   20);

    // Validate
    const validationError = validateInputs({ name, phone, email, message });
    if (validationError) {
      return Response.json({ error: validationError }, { status: 400 });
    }

    console.log('[Contact API] New submission from:', name, '|', email, '| IP:', ip);

    let emailOk = false;

    // Save to Supabase — critical, failure returns 500
    try {
      await saveToSupabase({ name, phone, email, contactTime, message });
    } catch (dbErr) {
      console.error('[Contact API] DB save failed:', dbErr.message);
      return Response.json(
        { error: 'No pudimos guardar tu mensaje. Por favor intenta de nuevo.' },
        { status: 500 }
      );
    }

    // Send email — non-critical, log only
    try {
      await sendEmailViaEmailJS({ name, phone, email, contactTime, message });
      emailOk = true;
    } catch (emailErr) {
      console.error('[Contact API] Email send failed:', emailErr.message);
    }

    console.log('[Contact API] Done. emailOk:', emailOk);
    return Response.json({ success: true, emailOk });

  } catch (err) {
    console.error('[Contact API] Unexpected error:', err);
    return Response.json({ error: 'Error procesando la solicitud.' }, { status: 500 });
  }
}
