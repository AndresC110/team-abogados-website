import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function sendEmailViaEmailJS(data) {
  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        template_params: data,
      }),
    });

    if (!response.ok) {
      throw new Error('EmailJS request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('EmailJS error:', error);
    throw error;
  }
}

export async function POST(request) {
  try {
    const { name, phone, accidentType, contactTime, message } = await request.json();

    // Validate required fields
    if (!name || !phone || !accidentType || !message) {
      return Response.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name,
          phone,
          accident_type: accidentType,
          contact_time: contactTime || 'asap',
          message,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return Response.json(
        { error: 'Error al guardar el formulario' },
        { status: 500 }
      );
    }

    // Send email via EmailJS API
    try {
      await sendEmailViaEmailJS({
        to_email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
        client_name: name,
        client_phone: phone,
        accident_type: accidentType,
        contact_time: contactTime,
        message: message,
        timestamp: new Date().toLocaleString('es-ES'),
      });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the whole request if email fails
    }

    return Response.json({
      success: true,
      message: 'Formulario enviado correctamente',
      data,
    });
  } catch (error) {
    console.error('API error:', error);
    return Response.json(
      { error: 'Error procesando la solicitud' },
      { status: 500 }
    );
  }
}
