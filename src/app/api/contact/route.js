import { createClient } from '@supabase/supabase-js';

function getSupabaseClient() {
  // Trim whitespace and strip trailing slash — PGRST125 happens when the URL
  // has a trailing slash, causing PostgREST to receive an invalid path.
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
    console.error('[Supabase] Error code:', error.code, '| message:', error.message, '| hint:', error.hint, '| details:', error.details);
    throw new Error('Error al guardar el formulario: ' + error.message);
  }

  console.log('[Supabase] Insert success. Row id:', data?.[0]?.id);
  return data;
}

async function sendEmailViaEmailJS({ name, phone, email, contactTime, message }) {
  const serviceId  = (process.env.EMAILJS_SERVICE_ID  || '').trim();
  const templateId = (process.env.EMAILJS_TEMPLATE_ID || '').trim();
  const publicKey  = (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '').trim();
  const privateKey = (process.env.EMAILJS_PRIVATE_KEY || '').trim();
  const adminEmail = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || '').trim();

  console.log('[EmailJS] serviceId present:', !!serviceId);
  console.log('[EmailJS] templateId present:', !!templateId);
  console.log('[EmailJS] publicKey present:', !!publicKey);
  console.log('[EmailJS] privateKey present:', !!privateKey);
  console.log('[EmailJS] adminEmail:', adminEmail || '(not set)');

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

  console.log('[EmailJS] Sending to api.emailjs.com…');

  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });

  const responseText = await res.text();
  console.log('[EmailJS] Response status:', res.status, '| body:', responseText);

  if (!res.ok) {
    throw new Error('EmailJS failed (' + res.status + '): ' + responseText);
  }

  return true;
}

export async function POST(request) {
  try {
    const { name, phone, email, contactTime, message } = await request.json();

    console.log('[Contact API] New submission from:', name, '|', email);

    if (!name || !phone || !email) {
      return Response.json({ error: 'Nombre, teléfono y correo son requeridos.' }, { status: 400 });
    }

    let dbOk = false;
    let emailOk = false;

    // Save to Supabase
    try {
      await saveToSupabase({ name, phone, email, contactTime, message });
      dbOk = true;
    } catch (dbErr) {
      console.error('[Contact API] DB save failed:', dbErr.message);
    }

    // Send email notification
    try {
      await sendEmailViaEmailJS({ name, phone, email, contactTime, message });
      emailOk = true;
    } catch (emailErr) {
      console.error('[Contact API] Email send failed:', emailErr.message);
    }

    console.log('[Contact API] Done. dbOk:', dbOk, '| emailOk:', emailOk);

    return Response.json({ success: true, dbOk, emailOk });
  } catch (err) {
    console.error('[Contact API] Unexpected error:', err);
    return Response.json({ error: 'Error procesando la solicitud.' }, { status: 500 });
  }
}
