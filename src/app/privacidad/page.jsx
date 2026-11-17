'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import LegalPage from '@/components/LegalPage';
import '@/styles/colors_and_type.css';
import '@/styles/marketing.css';

const COPY = {
  es: {
    eyebrow: 'Legal · Privacidad',
    title: 'Política de privacidad',
    updated: 'Vigente desde el 17 de noviembre de 2026',
    intro: 'Esta política describe cómo Team Abogados recoge, usa, comparte y protege la información personal de quienes visitan teamabogados.com o se comunican con nosotros, y las opciones que tienes sobre esa información.',
    summary: {
      title: 'Lo esencial',
      items: [
        'Usamos los datos que nos envías en el formulario para responderte y conectarte con un abogado independiente que pueda atender tu caso.',
        'La analítica del sitio (Microsoft Clarity) solo se activa si la aceptas en el aviso de cookies, y puedes retirarla cuando quieras.',
        'No vendemos tu información personal.',
        'Puedes pedirnos ver, corregir o borrar tus datos llamando al (646) 724-6127.',
        'Team Abogados no es un bufete de abogados.',
      ],
    },
    sections: [
      ['quienes', 'Quiénes somos', [
        'Team Abogados ("Team Abogados", "nosotros") es una agencia de marketing y servicios de apoyo para firmas de abogados de accidentes, con oficina en 2322 Arthur Avenue, Suite 207, Bronx, NY 10458. Somos responsables de la información personal que se trata a través de este sitio.',
      ]],
      ['datos', 'Información que recogemos', [
        { lead: 'Información que nos das directamente' },
        'Cuando usas el formulario de contacto, nos llamas o nos escribes por WhatsApp: tu nombre, teléfono, correo electrónico, el horario en que prefieres que te contactemos y lo que nos cuentas sobre tu situación. Te pedimos que no incluyas datos médicos ni detalles que no sean necesarios para una primera conversación.',
        { lead: 'Información que se recoge automáticamente' },
        'Si aceptas las cookies de analítica: páginas visitadas, clics, desplazamiento, movimientos del cursor, tipo de dispositivo y navegador, idioma, ubicación aproximada derivada de la dirección IP y grabaciones de la sesión. Lo que escribes en formularios se oculta en esas grabaciones. Si no las aceptas, no se recoge esta información.',
        'Además, nuestro proveedor de alojamiento registra datos técnicos básicos (dirección IP, fecha y hora, página solicitada) necesarios para que el sitio funcione y sea seguro.',
      ]],
      ['uso', 'Cómo usamos la información', [
        { list: [
          'Para responderte, evaluar de forma preliminar tu situación y conectarte con un abogado o profesional independiente de nuestra red.',
          'Para comunicarnos contigo por el medio que nos indiques sobre la solicitud que hiciste.',
          'Para entender cómo se usa el sitio y mejorar su contenido y funcionamiento.',
          'Para proteger el sitio frente a fraudes, abusos y envíos automatizados.',
          'Para cumplir obligaciones legales y atender requerimientos de autoridades.',
        ] },
      ]],
      ['compartir', 'Con quién la compartimos', [
        'No vendemos ni alquilamos tu información personal. La compartimos solo en estos casos:',
        { list: [
          'Con la firma de abogados independiente y los profesionales que atiendan tu caso, cuando nos pides que te pongamos en contacto con ellos.',
          'Con proveedores que nos prestan servicios técnicos y solo pueden usar los datos para prestárnoslos (ver «Proveedores» en la información de referencia al final de esta página).',
          'Cuando la ley lo exija, o para proteger nuestros derechos, los de nuestros usuarios o los de terceros.',
          'En caso de reorganización, fusión o venta de la empresa, sujeto a esta política.',
        ] },
      ]],
      ['cookies', 'Cookies y analítica', [
        'Usamos Microsoft Clarity para ver de forma agregada cómo se navega el sitio, mediante mapas de calor y grabaciones de sesión. Clarity solo se carga si pulsas «Aceptar» en el aviso de cookies. Si pulsas «Rechazar», no se carga y no se guarda ninguna cookie de analítica. Puedes cambiar tu decisión en cualquier momento.',
        { settings: true },
        'El detalle de cada cookie está en la información de referencia al final de esta página.',
      ]],
      ['opciones', 'Tus opciones y derechos', [
        'Puedes pedirnos acceso a la información que tenemos sobre ti, que la corrijamos o la borremos, o que dejemos de contactarte. Para hacerlo, llámanos al (646) 724-6127 o escríbenos por el formulario de contacto indicando tu solicitud. Podemos pedirte datos para verificar tu identidad antes de atenderla.',
        'También puedes retirar tu consentimiento a la analítica desde «Configurar cookies» en el pie de página, o borrar las cookies desde tu navegador.',
      ]],
      ['conservacion', 'Cuánto tiempo la conservamos', [
        'Conservamos la información de contacto durante el tiempo necesario para atender tu solicitud y, después, mientras lo exijan nuestras obligaciones legales o sea razonablemente necesario para resolver disputas. Los datos de analítica se conservan según los plazos de Microsoft Clarity.',
      ]],
      ['seguridad', 'Seguridad', [
        'Usamos conexiones cifradas (HTTPS), limitamos el acceso a la información a las personas que la necesitan y trabajamos con proveedores que aplican medidas de seguridad reconocidas. Ningún sistema es completamente seguro, por lo que no podemos garantizar una seguridad absoluta.',
      ]],
      ['menores', 'Menores de edad', [
        'Este sitio no está dirigido a menores de 13 años y no recogemos a sabiendas información de menores. Si crees que un menor nos ha enviado información, avísanos para borrarla.',
      ]],
      ['cambios', 'Cambios en esta política', [
        'Podemos actualizar esta política. Publicaremos la versión vigente en esta página con su fecha. Si los cambios son importantes, lo indicaremos de forma visible en el sitio.',
      ]],
      ['contacto', 'Contacto', [
        'Para cualquier pregunta sobre esta política o sobre tu información: Team Abogados, 2322 Arthur Avenue, Suite 207, Bronx, NY 10458 · (646) 724-6127.',
      ]],
    ],
    appendix: {
      id: 'referencia',
      title: 'Información de referencia',
      sections: [
        ['proveedores', 'Proveedores', [
          { dl: [
            ['Vercel Inc.', 'Alojamiento del sitio web.'],
            ['Supabase Inc.', 'Base de datos donde se guardan los mensajes del formulario.'],
            ['Resend (Plus Five Five, Inc.)', 'Envío de avisos internos por correo cuando llega un mensaje.'],
            ['Microsoft Corporation (Clarity)', 'Analítica del sitio, solo con tu consentimiento. Política de Microsoft: privacy.microsoft.com.'],
          ] },
        ]],
        ['detalle-cookies', 'Detalle de cookies y almacenamiento local', [
          { table: [
            ['Nombre', 'Proveedor', 'Finalidad', 'Duración'],
            ['ta_consent', 'Team Abogados', 'Recordar si aceptaste o rechazaste la analítica (necesaria).', 'Hasta que la borres'],
            ['ta_lang', 'Team Abogados', 'Recordar el idioma elegido (necesaria).', 'Hasta que la borres'],
            ['_clck', 'Microsoft Clarity', 'Reconocer de forma anónima el mismo navegador entre visitas.', '1 año'],
            ['_clsk', 'Microsoft Clarity', 'Unir las páginas vistas en una misma visita.', '1 día'],
            ['CLID, MUID, ANONCHK, SM', 'Microsoft', 'Identificadores y comprobaciones técnicas de Clarity.', 'Hasta 1 año'],
          ] },
        ]],
        ['aviso-legal', 'Aviso legal', [
          { note: 'Team Abogados no es un bufete de abogados y no presta servicios jurídicos directamente. Los abogados con los que conectamos a los clientes son independientes. Este sitio constituye publicidad de servicios legales. Los resultados anteriores no garantizan resultados futuros. Los videos del sitio son dramatizaciones.' },
        ]],
      ],
    },
  },
  en: {
    eyebrow: 'Legal · Privacy',
    title: 'Privacy Policy',
    updated: 'Effective November 17, 2026',
    intro: 'This policy describes how Team Abogados collects, uses, shares and protects personal information of people who visit teamabogados.com or contact us, and the choices you have about that information.',
    summary: {
      title: 'The essentials',
      items: [
        'We use what you send us through the form to reply to you and connect you with an independent attorney who can handle your case.',
        'Site analytics (Microsoft Clarity) only turn on if you accept them in the cookie notice, and you can withdraw that at any time.',
        'We do not sell your personal information.',
        'You can ask us to see, correct or delete your data by calling (646) 724-6127.',
        'Team Abogados is not a law firm.',
      ],
    },
    sections: [
      ['quienes', 'Who we are', [
        'Team Abogados ("Team Abogados", "we", "us") is a marketing and support-services agency for personal injury law firms, with an office at 2322 Arthur Avenue, Suite 207, Bronx, NY 10458. We are responsible for the personal information processed through this site.',
      ]],
      ['datos', 'Information we collect', [
        { lead: 'Information you give us' },
        'When you use the contact form, call us or message us on WhatsApp: your name, phone, email, preferred contact time and what you tell us about your situation. Please do not include medical details or anything not needed for a first conversation.',
        { lead: 'Information collected automatically' },
        'If you accept analytics cookies: pages visited, clicks, scrolling, cursor movement, device and browser type, language, approximate location derived from your IP address, and session recordings. Anything you type into forms is hidden in those recordings. If you do not accept them, this information is not collected.',
        'Our hosting provider also logs basic technical data (IP address, date and time, page requested) needed to run and secure the site.',
      ]],
      ['uso', 'How we use information', [
        { list: [
          'To reply to you, make a preliminary review of your situation and connect you with an independent attorney or professional in our network.',
          'To contact you through the channel you choose about the request you made.',
          'To understand how the site is used and improve its content and performance.',
          'To protect the site against fraud, abuse and automated submissions.',
          'To comply with legal obligations and respond to lawful requests from authorities.',
        ] },
      ]],
      ['compartir', 'Who we share it with', [
        'We do not sell or rent your personal information. We share it only in these cases:',
        { list: [
          'With the independent law firm and professionals handling your case, when you ask us to put you in touch with them.',
          'With service providers that work for us and may only use the data to provide those services (see “Service providers” in the reference information at the end of this page).',
          'When required by law, or to protect our rights or those of our users or others.',
          'In a reorganization, merger or sale of the business, subject to this policy.',
        ] },
      ]],
      ['cookies', 'Cookies and analytics', [
        'We use Microsoft Clarity to see, in aggregate, how people navigate the site, through heatmaps and session recordings. Clarity only loads if you click “Accept” in the cookie notice. If you click “Decline”, it is not loaded and no analytics cookies are stored. You can change your choice at any time.',
        { settings: true },
        'Details for each cookie are in the reference information at the end of this page.',
      ]],
      ['opciones', 'Your choices and rights', [
        'You can ask us for access to the information we hold about you, ask us to correct or delete it, or ask us to stop contacting you. To do so, call (646) 724-6127 or write to us through the contact form stating your request. We may ask for information to verify your identity first.',
        'You can also withdraw your analytics consent from “Cookie settings” in the site footer, or delete cookies in your browser.',
      ]],
      ['conservacion', 'How long we keep it', [
        'We keep contact information for as long as needed to handle your request and, afterwards, for as long as our legal obligations require or as reasonably needed to resolve disputes. Analytics data is kept according to Microsoft Clarity’s retention periods.',
      ]],
      ['seguridad', 'Security', [
        'We use encrypted connections (HTTPS), limit access to information to the people who need it, and work with providers that apply recognized security measures. No system is completely secure, so we cannot guarantee absolute security.',
      ]],
      ['menores', 'Children', [
        'This site is not directed to children under 13 and we do not knowingly collect their information. If you believe a child has sent us information, let us know so we can delete it.',
      ]],
      ['cambios', 'Changes to this policy', [
        'We may update this policy. We will post the current version on this page with its date. If changes are significant, we will say so visibly on the site.',
      ]],
      ['contacto', 'Contact', [
        'For any question about this policy or your information: Team Abogados, 2322 Arthur Avenue, Suite 207, Bronx, NY 10458 · (646) 724-6127.',
      ]],
    ],
    appendix: {
      id: 'referencia',
      title: 'Reference information',
      sections: [
        ['proveedores', 'Service providers', [
          { dl: [
            ['Vercel Inc.', 'Website hosting.'],
            ['Supabase Inc.', 'Database where contact-form messages are stored.'],
            ['Resend (Plus Five Five, Inc.)', 'Internal email notifications when a message arrives.'],
            ['Microsoft Corporation (Clarity)', 'Site analytics, only with your consent. Microsoft’s policy: privacy.microsoft.com.'],
          ] },
        ]],
        ['detalle-cookies', 'Cookie and local storage details', [
          { table: [
            ['Name', 'Provider', 'Purpose', 'Duration'],
            ['ta_consent', 'Team Abogados', 'Remember whether you accepted or declined analytics (necessary).', 'Until you clear it'],
            ['ta_lang', 'Team Abogados', 'Remember your chosen language (necessary).', 'Until you clear it'],
            ['_clck', 'Microsoft Clarity', 'Anonymously recognize the same browser across visits.', '1 year'],
            ['_clsk', 'Microsoft Clarity', 'Connect the pages viewed in a single visit.', '1 day'],
            ['CLID, MUID, ANONCHK, SM', 'Microsoft', 'Clarity identifiers and technical checks.', 'Up to 1 year'],
          ] },
        ]],
        ['aviso-legal', 'Legal disclaimer', [
          { note: 'Team Abogados is not a law firm and does not provide legal services directly. The attorneys we connect clients with are independent. This site is legal services advertising. Past results do not guarantee future results. The videos on this site are dramatizations.' },
        ]],
      ],
    },
  },
};

export default function PrivacidadPage() {
  return (
    <LanguageProvider>
      <LegalPage copy={COPY} current="privacy" />
    </LanguageProvider>
  );
}
