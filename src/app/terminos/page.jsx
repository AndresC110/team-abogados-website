'use client';

import { LanguageProvider } from '@/context/LanguageContext';
import LegalPage from '@/components/LegalPage';
import '@/styles/colors_and_type.css';
import '@/styles/marketing.css';

const COPY = {
  es: {
    eyebrow: 'Legal · Términos',
    title: 'Términos de servicio',
    updated: 'Vigentes desde el 17 de noviembre de 2026',
    intro: 'Estos términos regulan el uso del sitio teamabogados.com y de los servicios de contacto que ofrece Team Abogados. Al usar el sitio aceptas estos términos y nuestra Política de privacidad. Si no estás de acuerdo, por favor no uses el sitio.',
    summary: {
      title: 'Lo esencial',
      items: [
        'Team Abogados no es un bufete de abogados y no te da asesoría legal; te conectamos con abogados independientes.',
        'Usar el sitio o enviarnos un mensaje no crea una relación abogado-cliente.',
        'No garantizamos que un abogado acepte tu caso ni ningún resultado.',
        'Los videos y testimonios son ilustrativos; los resultados anteriores no garantizan resultados futuros.',
      ],
    },
    sections: [
      ['servicio', 'Qué hace Team Abogados', [
        'Team Abogados es una agencia de marketing y servicios de apoyo para firmas de abogados de accidentes. A través de este sitio, las personas pueden contarnos su situación para que las pongamos en contacto con abogados y profesionales independientes.',
        'Team Abogados no es un bufete de abogados, no presta servicios jurídicos y no recomienda ni respalda a un abogado concreto como el mejor para un caso. Cada abogado es independiente y responsable de sus propios servicios, honorarios y decisiones profesionales. La decisión de contratar a un abogado es siempre tuya.',
      ]],
      ['no-asesoria', 'Sin asesoría legal ni relación abogado-cliente', [
        'El contenido del sitio es solo informativo y general. No es asesoría legal y no debe usarse como sustituto de la consulta con un abogado sobre tu situación concreta.',
        'Usar el sitio, enviarnos un formulario, llamarnos o escribirnos no crea una relación abogado-cliente con Team Abogados ni con ningún abogado. Esa relación solo existe cuando un abogado acepta representarte, normalmente mediante un acuerdo por escrito.',
        'No envíes información confidencial o urgente a través del sitio esperando que quede protegida por el secreto profesional. Los plazos legales para reclamar pueden ser cortos; si tu situación es urgente, consulta con un abogado cuanto antes.',
      ]],
      ['uso', 'Uso del sitio', [
        'Puedes usar el sitio para fines personales y legítimos. No puedes:',
        { list: [
          'Enviar información falsa, de otra persona sin su autorización, o con fines fraudulentos.',
          'Usar el sitio para enviar spam, publicidad no solicitada o contenido ilegal u ofensivo.',
          'Intentar acceder sin autorización a sistemas, cuentas o datos, ni interferir con el funcionamiento o la seguridad del sitio.',
          'Copiar, extraer o recopilar contenido o datos del sitio de forma automatizada sin nuestro permiso por escrito.',
        ] },
      ]],
      ['informacion', 'La información que nos envías', [
        'Al enviarnos tus datos confirmas que son correctos y que tienes derecho a compartirlos. Nos autorizas a usarlos para contactarte por el teléfono, correo o WhatsApp que nos indiques sobre tu solicitud, y a compartirlos con abogados y profesionales independientes para que evalúen tu caso, tal como se describe en la Política de privacidad.',
        'Puedes pedirnos en cualquier momento que dejemos de contactarte.',
      ]],
      ['resultados', 'Testimonios, videos y resultados', [
        'Los testimonios reflejan la experiencia de personas concretas y no son una promesa de que tu caso tendrá el mismo resultado. Los videos del sitio son dramatizaciones con fines ilustrativos. Cada caso es distinto y depende de sus hechos; los resultados anteriores no garantizan resultados futuros.',
        'Las referencias a que un abogado "no cobra por adelantado" o trabaja "en contingencia" describen la práctica habitual de los abogados de nuestra red; las condiciones concretas de honorarios las fija cada abogado en su acuerdo contigo.',
      ]],
      ['propiedad', 'Propiedad intelectual', [
        'El nombre y el logotipo de Team Abogados, los textos, diseños, imágenes y videos del sitio pertenecen a Team Abogados o a sus licenciantes y están protegidos por la ley. No puedes reproducirlos ni usarlos sin nuestro permiso por escrito, salvo para ver el sitio y compartir enlaces a él.',
      ]],
      ['terceros', 'Enlaces y servicios de terceros', [
        'El sitio puede incluir enlaces o funciones de terceros (por ejemplo, Google Maps o WhatsApp). No controlamos esos servicios y no somos responsables de su contenido, disponibilidad ni prácticas de privacidad. Su uso se rige por sus propios términos.',
      ]],
      ['garantias', 'Exclusión de garantías', [
        'El sitio y su contenido se ofrecen "tal cual" y "según disponibilidad". En la medida en que lo permita la ley, no damos garantías de ningún tipo, expresas o implícitas, sobre la exactitud, integridad o disponibilidad del sitio, ni sobre los servicios de abogados o profesionales independientes.',
      ]],
      ['responsabilidad', 'Limitación de responsabilidad', [
        'En la medida máxima que permita la ley, Team Abogados no será responsable de daños indirectos, incidentales, especiales o consecuentes derivados del uso del sitio o de la imposibilidad de usarlo, ni de los actos u omisiones de abogados o profesionales independientes. Nada en estos términos limita una responsabilidad que la ley no permita limitar.',
      ]],
      ['indemnizacion', 'Indemnización', [
        'Aceptas mantener indemne a Team Abogados frente a reclamaciones de terceros derivadas de que hayas incumplido estos términos o usado el sitio de forma ilegal.',
      ]],
      ['ley', 'Ley aplicable y jurisdicción', [
        'Estos términos se rigen por las leyes del Estado de Nueva York, sin tener en cuenta sus normas sobre conflicto de leyes. Cualquier disputa se someterá a los tribunales estatales o federales con sede en el Estado de Nueva York.',
      ]],
      ['cambios', 'Cambios en estos términos', [
        'Podemos actualizar estos términos. La versión vigente estará siempre publicada en esta página con su fecha. Si sigues usando el sitio después de un cambio, se entiende que aceptas la versión actualizada.',
      ]],
      ['contacto', 'Contacto', [
        'Team Abogados, 2322 Arthur Avenue, Suite 207, Bronx, NY 10458 · (646) 724-6127.',
      ]],
    ],
    appendix: {
      id: 'referencia',
      title: 'Información de referencia',
      sections: [
        ['otros', 'Disposiciones generales', [
          { note: 'Si alguna disposición de estos términos se considera inválida, las demás seguirán vigentes. Que no exijamos el cumplimiento de una disposición no supone renunciar a ella. Estos términos, junto con la Política de privacidad, constituyen el acuerdo completo entre tú y Team Abogados sobre el uso del sitio. En caso de diferencia entre la versión en español y la versión en inglés, prevalecerá la versión en inglés.' },
        ]],
        ['publicidad', 'Publicidad de servicios legales', [
          { note: 'Este sitio constituye publicidad de servicios legales (Attorney Advertising). Team Abogados no es un bufete de abogados y no presta servicios jurídicos directamente. Los resultados anteriores no garantizan resultados futuros.' },
        ]],
      ],
    },
  },
  en: {
    eyebrow: 'Legal · Terms',
    title: 'Terms of Service',
    updated: 'Effective November 17, 2026',
    intro: 'These terms govern your use of teamabogados.com and the contact services offered by Team Abogados. By using the site you agree to these terms and to our Privacy Policy. If you do not agree, please do not use the site.',
    summary: {
      title: 'The essentials',
      items: [
        'Team Abogados is not a law firm and does not give legal advice; we connect you with independent attorneys.',
        'Using the site or sending us a message does not create an attorney-client relationship.',
        'We do not guarantee that an attorney will accept your case, or any outcome.',
        'Videos and testimonials are illustrative; past results do not guarantee future results.',
      ],
    },
    sections: [
      ['servicio', 'What Team Abogados does', [
        'Team Abogados is a marketing and support-services agency for personal injury law firms. Through this site, people can tell us about their situation so we can put them in touch with independent attorneys and professionals.',
        'Team Abogados is not a law firm, does not provide legal services, and does not recommend or endorse any particular attorney as the best for a case. Each attorney is independent and responsible for their own services, fees and professional decisions. The decision to hire an attorney is always yours.',
      ]],
      ['no-asesoria', 'No legal advice and no attorney-client relationship', [
        'Site content is general and for information only. It is not legal advice and should not replace consulting an attorney about your specific situation.',
        'Using the site, submitting a form, calling or messaging us does not create an attorney-client relationship with Team Abogados or with any attorney. That relationship exists only when an attorney agrees to represent you, usually through a written agreement.',
        'Do not send confidential or time-sensitive information through the site expecting it to be protected by attorney-client privilege. Legal deadlines to file a claim can be short; if your situation is urgent, consult an attorney as soon as possible.',
      ]],
      ['uso', 'Use of the site', [
        'You may use the site for personal, lawful purposes. You may not:',
        { list: [
          'Submit false information, someone else’s information without their authorization, or information for fraudulent purposes.',
          'Use the site to send spam, unsolicited advertising, or illegal or offensive content.',
          'Attempt to gain unauthorized access to systems, accounts or data, or interfere with the operation or security of the site.',
          'Copy, scrape or harvest site content or data by automated means without our written permission.',
        ] },
      ]],
      ['informacion', 'Information you send us', [
        'By sending us your details you confirm they are accurate and that you have the right to share them. You authorize us to use them to contact you by the phone, email or WhatsApp you provide about your request, and to share them with independent attorneys and professionals so they can evaluate your case, as described in the Privacy Policy.',
        'You can ask us to stop contacting you at any time.',
      ]],
      ['resultados', 'Testimonials, videos and results', [
        'Testimonials reflect the experience of specific people and are not a promise that your case will have the same outcome. Videos on the site are dramatizations for illustration. Every case is different and depends on its facts; past results do not guarantee future results.',
        'References to attorneys charging “nothing upfront” or working “on contingency” describe the usual practice of attorneys in our network; specific fee terms are set by each attorney in their agreement with you.',
      ]],
      ['propiedad', 'Intellectual property', [
        'The Team Abogados name and logo, and the text, designs, images and videos on the site belong to Team Abogados or its licensors and are protected by law. You may not reproduce or use them without our written permission, except to view the site and share links to it.',
      ]],
      ['terceros', 'Third-party links and services', [
        'The site may include links to or features from third parties (for example, Google Maps or WhatsApp). We do not control those services and are not responsible for their content, availability or privacy practices. Their use is governed by their own terms.',
      ]],
      ['garantias', 'Disclaimer of warranties', [
        'The site and its content are provided “as is” and “as available”. To the extent permitted by law, we make no warranties of any kind, express or implied, about the accuracy, completeness or availability of the site, or about the services of independent attorneys or professionals.',
      ]],
      ['responsabilidad', 'Limitation of liability', [
        'To the fullest extent permitted by law, Team Abogados will not be liable for indirect, incidental, special or consequential damages arising from use of, or inability to use, the site, or for the acts or omissions of independent attorneys or professionals. Nothing in these terms limits liability that cannot be limited by law.',
      ]],
      ['indemnizacion', 'Indemnification', [
        'You agree to hold Team Abogados harmless from third-party claims arising from your breach of these terms or unlawful use of the site.',
      ]],
      ['ley', 'Governing law and venue', [
        'These terms are governed by the laws of the State of New York, without regard to its conflict-of-laws rules. Any dispute will be submitted to the state or federal courts located in the State of New York.',
      ]],
      ['cambios', 'Changes to these terms', [
        'We may update these terms. The current version will always be posted on this page with its date. If you continue to use the site after a change, you accept the updated version.',
      ]],
      ['contacto', 'Contact', [
        'Team Abogados, 2322 Arthur Avenue, Suite 207, Bronx, NY 10458 · (646) 724-6127.',
      ]],
    ],
    appendix: {
      id: 'referencia',
      title: 'Reference information',
      sections: [
        ['otros', 'General provisions', [
          { note: 'If any provision of these terms is found invalid, the rest remain in effect. Our failure to enforce a provision is not a waiver of it. These terms, together with the Privacy Policy, are the entire agreement between you and Team Abogados regarding use of the site. If the Spanish and English versions differ, the English version controls.' },
        ]],
        ['publicidad', 'Attorney advertising', [
          { note: 'This site is Attorney Advertising. Team Abogados is not a law firm and does not provide legal services directly. Past results do not guarantee future results.' },
        ]],
      ],
    },
  },
};

export default function TerminosPage() {
  return (
    <LanguageProvider>
      <LegalPage copy={COPY} current="terms" />
    </LanguageProvider>
  );
}
