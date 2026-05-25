import { createClient } from '@supabase/supabase-js';

// GET /api/ping — diagnostic endpoint
// Tests Supabase + EmailJS config without requiring a form submit.
// DELETE THIS FILE before going to production.
export async function GET() {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const url = raw.trim().replace(/\/+$/, '');
  const key = (process.env.SUPABASE_SERVICE_KEY || '').trim();

  const report = {
    supabase: {
      rawUrl: raw ? `${raw.slice(0, 35)}[…len=${raw.length}]` : 'MISSING',
      cleanUrl: url ? `${url.slice(0, 35)}[…len=${url.length}]` : 'MISSING',
      hasTrailingSlash: raw !== raw.trimEnd().replace(/\/+$/, ''),
      keyPresent: !!key,
      keyStartsWithEyJ: key.startsWith('eyJ'),
      insertTest: null,
      insertError: null,
    },
    emailjs: {
      serviceId: process.env.EMAILJS_SERVICE_ID ? '✓' : 'MISSING',
      templateId: process.env.EMAILJS_TEMPLATE_ID ? '✓' : 'MISSING',
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ? '✓' : 'MISSING',
      privateKey: process.env.EMAILJS_PRIVATE_KEY ? '✓' : 'MISSING',
      adminEmail: process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'MISSING',
    },
  };

  // Test Supabase live insert + delete
  if (url && key) {
    try {
      const supabase = createClient(url, key);
      const { data, error } = await supabase
        .from('leads')
        .insert([{ name: '__ping_test__', email: 'ping@test.com', phone: '0000000000', message: 'ping', urgency: 'asap' }])
        .select();

      if (error) {
        report.supabase.insertTest = 'FAILED';
        report.supabase.insertError = JSON.stringify(error);
      } else {
        report.supabase.insertTest = 'OK';
        report.supabase.insertedId = data?.[0]?.id;

        // Clean up the test row immediately
        if (data?.[0]?.id) {
          await supabase.from('leads').delete().eq('id', data[0].id);
        }
      }
    } catch (e) {
      report.supabase.insertTest = 'EXCEPTION';
      report.supabase.insertError = e.message;
    }
  }

  return Response.json(report, { status: 200 });
}
