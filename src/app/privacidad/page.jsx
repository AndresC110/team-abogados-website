'use client';

import { Fragment } from 'react';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import CookieConsent from '@/components/CookieConsent';
import { CLARITY_ID, openCookieSettings } from '@/lib/consent';
import '@/styles/colors_and_type.css';
import '@/styles/marketing.css';

const UPDATED = { es: 'Última actualización: 17 de noviembre de 2026', en: 'Last updated: November 17, 2026' };

const COPY = {
  es: {
    back: '← Volver al inicio',
    eyebrow: 'Legal',
    title: 'Política de privacidad',
    sections: [
      ['quienes', 'Quiénes somos', [
        'Team Abogados es una agencia de marketing y servicios de apoyo para firmas de abogados de accidentes, con oficina en 2322 Arthur Avenue, Suite 207, Bronx, NY 10458. Teléfono: (646) 724-6127.',
        'Esta política explica qué datos recogemos en teamabogados.com, para qué los usamos y qué control tienes sobre ellos.',
      ]],
      ['datos', 'Qué datos recogemos', [
        { list: [
          'Datos que tú nos das en el formulario de contacto: nombre, teléfono, correo electrónico, horario preferido de contacto y el mensaje sobre lo que pasó.',
          'Datos de uso del sitio, solo si aceptas las cookies de analítica: páginas visitadas, clics, desplazamiento, movimiento del ratón, tipo de dispositivo y navegador, ubicación aproximada (a partir de la dirección IP) y grabaciones de la sesión. Lo que escribes en los formularios queda oculto en esas grabaciones.',
          'Datos técnicos necesarios para que el sitio funcione y sea seguro (por ejemplo, registros del servidor de alojamiento).',
        ] },
      ]],
      ['uso', 'Para qué los usamos', [
        { list: [
          'Responderte y conectarte con un abogado independiente de nuestra red que pueda atender tu caso.',
          'Entender cómo se usa el sitio (qué secciones se leen, dónde se detiene la gente, qué partes confunden) para mejorarlo.',
          'Proteger el sitio contra abusos y envíos automáticos.',
        ] },
        'No vendemos tus datos personales.',
      ]],
      ['compartir', 'Con quién los compartimos', [
        { list: [
          'Con la firma de abogados independiente y los profesionales que atiendan tu caso, cuando nos pides que te conectemos.',
          'Con proveedores que nos prestan servicios y solo usan los datos para ello: Vercel (alojamiento del sitio), Supabase (base de datos del formulario), Resend (avisos por correo) y Microsoft Clarity (analítica, solo con tu permiso).',
          'Con autoridades, cuando la ley lo exija.',
        ] },
      ]],
      ['cookies', 'Cookies y analítica', [
        'Usamos Microsoft Clarity para ver de forma agregada cómo se navega el sitio, mediante mapas de calor y grabaciones de sesión. Clarity solo se activa si pulsas «Aceptar» en el aviso de cookies; si pulsas «Rechazar», no se carga y no se crea ninguna cookie de analítica.',
        { table: [
          ['Nombre', 'Proveedor', 'Para qué', 'Duración'],
          ['ta_consent', 'Team Abogados', 'Recordar si aceptaste o rechazaste la analítica (necesaria)', 'Hasta que la borres'],
          ['ta_lang', 'Team Abogados', 'Recordar el idioma elegido (necesaria)', 'Hasta que la borres'],
          ['_clck', 'Microsoft Clarity', 'Identificar de forma anónima al mismo navegador entre visitas', '1 año'],
          ['_clsk', 'Microsoft Clarity', 'Unir las páginas de una misma visita', '1 día'],
          ['CLID, MUID y similares', 'Microsoft', 'Identificador de Clarity entre sitios web', 'Hasta 1 año'],
        ] },
        'Microsoft trata los datos de Clarity según su propia declaración de privacidad: privacy.microsoft.com.',
        { settings: true },
      ]],
      ['conservacion', 'Cuánto tiempo los guardamos', [
        'Guardamos los datos del formulario mientras sean necesarios para atender tu solicitud y cumplir obligaciones legales. Los datos de analítica de Clarity se conservan según los plazos de Microsoft (las grabaciones, por lo general, unos 30 días).',
      ]],
      ['derechos', 'Tus derechos', [
        'Puedes pedirnos ver, corregir o borrar tus datos, o que dejemos de contactarte, llamando al (646) 724-6127 o escribiéndonos por el formulario de contacto. Puedes retirar tu consentimiento a la analítica en cualquier momento desde «Configurar cookies».',
      ]],
      ['seguridad', 'Seguridad', [
        'Usamos conexiones cifradas (HTTPS) y limitamos el acceso a los datos a las personas que los necesitan. Ningún sistema es totalmente seguro, pero aplicamos medidas razonables para proteger tu información.',
      ]],
      ['menores', 'Menores de edad', [
        'Este sitio no está dirigido a menores de 13 años y no recogemos a sabiendas datos de menores.',
      ]],
      ['aviso-legal', 'Aviso legal', [
        'Team Abogados no es un bufete de abogados y no ofrece servicios jurídicos directamente. Los abogados con los que conectamos a los clientes son independientes. Este sitio es publicidad de servicios legales. Los resultados pasados no garantizan resultados futuros. Los videos del sitio son dramatizaciones.',
      ]],
      ['cambios', 'Cambios en esta política', [
        'Si cambiamos esta política, publicaremos la nueva versión en esta página con la fecha de actualización.',
      ]],
    ],
    settings: 'Cambiar mis preferencias de cookies',
  },
  en: {
    back: '← Back to home',
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    sections: [
      ['quienes', 'Who we are', [
        'Team Abogados is a marketing and support-services agency for personal injury law firms, with an office at 2322 Arthur Avenue, Suite 207, Bronx, NY 10458. Phone: (646) 724-6127.',
        'This policy explains what data we collect on teamabogados.com, what we use it for, and the control you have over it.',
      ]],
      ['datos', 'What we collect', [
        { list: [
          'Information you give us in the contact form: name, phone, email, preferred contact time and your message about what happened.',
          'Site usage data, only if you accept analytics cookies: pages visited, clicks, scrolling, mouse movement, device and browser type, approximate location (from your IP address) and session recordings. Anything you type into forms is hidden in those recordings.',
          'Technical data needed to run and secure the site (for example, hosting server logs).',
        ] },
      ]],
      ['uso', 'How we use it', [
        { list: [
          'To reply to you and connect you with an independent attorney in our network who can handle your case.',
          'To understand how the site is used (which sections people read, where they stop, what is confusing) so we can improve it.',
          'To protect the site against abuse and automated submissions.',
        ] },
        'We do not sell your personal information.',
      ]],
      ['compartir', 'Who we share it with', [
        { list: [
          'The independent law firm and professionals handling your case, when you ask us to connect you.',
          'Service providers that work for us and use the data only for that purpose: Vercel (site hosting), Supabase (contact-form database), Resend (email notifications) and Microsoft Clarity (analytics, only with your permission).',
          'Authorities, when required by law.',
        ] },
      ]],
      ['cookies', 'Cookies and analytics', [
        'We use Microsoft Clarity to see, in aggregate, how people navigate the site through heatmaps and session recordings. Clarity only turns on if you click “Accept” in the cookie notice; if you click “Decline”, it is not loaded and no analytics cookies are created.',
        { table: [
          ['Name', 'Provider', 'Purpose', 'Duration'],
          ['ta_consent', 'Team Abogados', 'Remember whether you accepted or declined analytics (necessary)', 'Until you clear it'],
          ['ta_lang', 'Team Abogados', 'Remember your chosen language (necessary)', 'Until you clear it'],
          ['_clck', 'Microsoft Clarity', 'Anonymously recognize the same browser across visits', '1 year'],
          ['_clsk', 'Microsoft Clarity', 'Connect the pages of a single visit', '1 day'],
          ['CLID, MUID and similar', 'Microsoft', 'Clarity identifier across websites', 'Up to 1 year'],
        ] },
        'Microsoft handles Clarity data under its own privacy statement: privacy.microsoft.com.',
        { settings: true },
      ]],
      ['conservacion', 'How long we keep it', [
        'We keep contact-form data for as long as needed to handle your request and meet legal obligations. Clarity analytics data is kept according to Microsoft’s retention periods (recordings are generally kept about 30 days).',
      ]],
      ['derechos', 'Your rights', [
        'You can ask us to see, correct or delete your data, or to stop contacting you, by calling (646) 724-6127 or writing to us through the contact form. You can withdraw your analytics consent at any time from “Cookie settings”.',
      ]],
      ['seguridad', 'Security', [
        'We use encrypted connections (HTTPS) and limit access to data to the people who need it. No system is completely secure, but we use reasonable measures to protect your information.',
      ]],
      ['menores', 'Children', [
        'This site is not directed to children under 13 and we do not knowingly collect their data.',
      ]],
      ['aviso-legal', 'Legal disclaimer', [
        'Team Abogados is not a law firm and does not provide legal services directly. The attorneys we connect clients with are independent. This site is legal services advertising. Past results do not guarantee future results. The videos on this site are dramatizations.',
      ]],
      ['cambios', 'Changes to this policy', [
        'If we change this policy, we will post the new version on this page with the update date.',
      ]],
    ],
    settings: 'Change my cookie preferences',
  },
};

function Block({ item, settingsLabel }) {
  if (typeof item === 'string') return <p>{item}</p>;
  if (item.list) return <ul>{item.list.map((t) => <li key={t}>{t}</li>)}</ul>;
  if (item.table) {
    const [head, ...rows] = item.table;
    return (
      <div className="tbl">
        <table>
          <thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody>
        </table>
      </div>
    );
  }
  if (item.settings) {
    return CLARITY_ID ? <p><button type="button" className="linkish" onClick={openCookieSettings}>{settingsLabel}</button></p> : null;
  }
  return null;
}

function Doc() {
  const { lang, setLang } = useLanguage();
  const C = COPY[lang];
  return (
    <div className="ta-legal">
      <div className="container">
        <div className="ta-legal__bar">
          <a className="brand" href="/"><img src="/assets/logo-mark-black.png" alt="" />Team Abogados</a>
          <div className="lang">
            <button className={`lang-btn${lang === 'en' ? ' on' : ''}`} onClick={() => setLang('en')}>EN</button>
            <span className="lang-sep">/</span>
            <button className={`lang-btn${lang === 'es' ? ' on' : ''}`} onClick={() => setLang('es')}>ES</button>
          </div>
        </div>
        <article className="ta-legal__doc">
          <a href="/">{C.back}</a>
          <p className="eyebrow" style={{ marginTop: 28 }}>{C.eyebrow}</p>
          <h1>{C.title}</h1>
          <p className="updated">{UPDATED[lang]}</p>
          {C.sections.map(([id, h, blocks]) => (
            <Fragment key={id}>
              <h2 id={id}>{h}</h2>
              {blocks.map((b, i) => <Block key={i} item={b} settingsLabel={C.settings} />)}
            </Fragment>
          ))}
        </article>
      </div>
      <CookieConsent />
    </div>
  );
}

export default function PrivacidadPage() {
  return (
    <LanguageProvider>
      <Doc />
    </LanguageProvider>
  );
}
