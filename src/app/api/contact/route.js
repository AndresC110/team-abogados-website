import { createClient } from '@supabase/supabase-js';
import emailjs from '@emailjs/nodejs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize EmailJS
emailjs.init({
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  privateKey: process.env.EMAILJS_PRIVATE_KEY,
});

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

    // Send email via EmailJS
    try {
      await emailjs.send(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID,
        {
          to_email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
          client_name: name,
          client_phone: phone,
          accident_type: accidentType,
          contact_time: contactTime,
          message: message,
          timestamp: new Date().toLocaleString('es-ES'),
        }
      );
    } catch (emailError) {
      console.error('EmailJS error:', emailError);
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
