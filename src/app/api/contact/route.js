import { createClient } from '@supabase/supabase-js';

async function saveToSupabase({ name, phone, email, contactTime, message }) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;

  if (!url || !key) {
    console.warn('Supabase env vars not set — skipping DB save');
    return null;
  }

  const supabase = createClient(url, key);

  const { data, error } = await supabase
    .from('leads')
    .insert([{ name, email, phone, message, urgency: contactTime || 'asap' }])
    .select();

  if (error) {
    console.error('Supabase error:', error);
    throw new Error('Error al guardar el formulario: ' + error.message);
  }

  return data;
}

async function sendEmailViaEmailJS({ name, phone, email, contactTime, message }) {
  const serviceId  = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  if (!serviceId || !templateId || !publicKey) {
    console.warn('EmailJS env vars not set — skipping email');
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

  if (!res.ok) {
    const text = await res.text();
    console.error('EmailJS error response:', text);
    throw new Error('EmailJS failed: ' + text);
  }

  return true;
}

export async function POST(request) {
  try {
    const { name, phone, email, contactTime, message } = await request.json();

    if (!name || !phone || !email) {
      return Response.json({ error: 'Nombre, teléfono y correo son requeridos.' }, { status: 400 });
    }

    // Save to Supabase (non-fatal if not configured)
    try {
      await saveToSupabase({ name, phone, email, contactTime, message });
    } catch (dbErr) {
      console.error('DB save failed:', dbErr.message);
      // Still try to send email even if DB fails
    }

    // Send email (non-fatal if not configured)
    try {
      await sendEmailViaEmailJS({ name, phone, email, contactTime, message });
    } catch (emailErr) {
      console.error('Email send failed:', emailErr.message);
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error('API error:', err);
    return Response.json({ error: 'Error procesando la solicitud.' }, { status: 500 });
  }
}
