import { createClient } from '@supabase/supabase-js';

// Reseñas de clientes.
//  GET  -> devuelve solo las reseñas aprobadas (status = 'approved').
//  POST -> guarda una reseña nueva como 'pending' y avisa por correo para revisarla.
// Ninguna reseña aparece en el sitio hasta que alguien del equipo la aprueba en
// Supabase (tabla public.reviews, columna status -> 'approved').

const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseUrl = rawSupabaseUrl.replace(/\/rest\/v1\/?$/, '');
const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_KEY);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL;
const FROM_EMAIL = 'Team Abogados <contacto@teamabogados.com>';
const TABLE_URL = 'https://supabase.com/dashboard/project/xsobqoujijvaxcjukrjw/editor';

const LIMITS = { name: 60, location: 60, body: 1200 };
const MAX_BODY_BYTES = 8 * 1024;
const CONTROL_RE = new RegExp('[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F]', 'g');
const LINK_RE = /(https?:\/\/|www\.)/i;

const RATE_LIMIT = { windowMs: 60 * 60 * 1000, max: 3 };
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => t > now - RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT.max;
}

function clean(value, max, keepNewlines = false) {
  if (typeof value !== 'string') return '';
  let v = value.replace(CONTROL_RE, ' ');
  v = keepNewlines ? v.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n') : v.replace(/\s+/g, ' ');
  return v.trim().slice(0, max);
}

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('id, created_at, name, location, rating, body, lang')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(30);
    if (error) throw error;
    return Response.json({ reviews: data || [] }, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    });
  } catch (e) {
    console.error('reviews GET:', e.message);
    return Response.json({ reviews: [] }, { status: 200 });
  }
}

export async function POST(request) {
  const GENERIC = 'No se pudo enviar tu reseña. Intenta de nuevo más tarde.';
  try {
    const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
    if (rateLimited(ip)) {
      return Response.json({ error: 'Demasiados envíos. Intenta más tarde.' }, { status: 429 });
    }
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return Response.json({ error: 'Reseña demasiado larga.' }, { status: 413 });
    let b;
    try { b = JSON.parse(raw); } catch { return Response.json({ error: 'Solicitud inválida.' }, { status: 400 }); }

    // Trampa para bots: campo oculto que una persona deja vacío.
    if (b && typeof b.website === 'string' && b.website.trim() !== '') return Response.json({ success: true });

    const name = clean(b?.name, LIMITS.name);
    const location = clean(b?.location, LIMITS.location) || null;
    const body = clean(b?.body, LIMITS.body, true);
    const rating = Number.parseInt(b?.rating, 10);
    const lang = b?.lang === 'en' ? 'en' : 'es';
    const consent = b?.consent === true;

    if (name.length < 2 || body.length < 20 || !(rating >= 1 && rating <= 5)) {
      return Response.json({ error: 'Revisa los campos: nombre, calificación y una reseña de al menos 20 caracteres.' }, { status: 400 });
    }
    if (!consent) return Response.json({ error: 'Necesitamos tu autorización para publicar la reseña.' }, { status: 400 });
    if (LINK_RE.test(body) || LINK_RE.test(name)) {
      return Response.json({ error: 'Por seguridad, la reseña no puede incluir enlaces.' }, { status: 400 });
    }

    const { error } = await supabase.from('reviews').insert([{ name, location, rating, body, lang, consent_publish: true }]);
    if (error) {
      console.error('reviews insert:', error.message, error.code);
      return Response.json({ error: GENERIC }, { status: 500 });
    }

    // Aviso por correo para revisar y aprobar (si falla, la reseña ya quedó guardada).
    if (process.env.RESEND_API_KEY && ADMIN_EMAIL) {
      const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
      const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;padding:24px;">
        <h2 style="margin:0 0 4px;font-size:18px;">Nueva reseña para revisar</h2>
        <p style="margin:0 0 16px;color:#8a7a55;font-size:13px;">Team Abogados · no se publica hasta que la apruebes</p>
        <p style="font-size:22px;color:#c9a961;margin:0 0 8px;">${stars}</p>
        <p style="font-size:15px;line-height:1.5;white-space:pre-wrap;background:#faf8f3;border:1px solid #eee;border-radius:6px;padding:14px;">${escapeHtml(body)}</p>
        <p style="font-size:14px;margin:12px 0;">— ${escapeHtml(name)}${location ? ', ' + escapeHtml(location) : ''} (${lang.toUpperCase()})</p>
        <p style="font-size:13px;color:#555;">Para publicarla: abre la tabla <b>reviews</b> en Supabase y cambia <b>status</b> de <i>pending</i> a <i>approved</i>.<br><a href="${TABLE_URL}">${TABLE_URL}</a></p>
      </div>`;
      try {
        const r = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ from: FROM_EMAIL, to: [ADMIN_EMAIL], subject: `Nueva reseña (${rating}★) de ${name}`, html }),
        });
        if (!r.ok) console.error('reviews email:', r.status, await r.text());
      } catch (e) {
        console.error('reviews email exception:', e.message);
      }
    }
    return Response.json({ success: true });
  } catch (e) {
    console.error('reviews POST:', e.message);
    return Response.json({ error: GENERIC }, { status: 500 });
  }
}
