'use client';

// WhyUs.jsx — "¿Por qué elegirnos?" — 6 reasons, verbatim from site
export default function WhyUs() {
  const reasons = [
    { ico: 'scale',          h: 'Experiencia comprobada',   p: 'Miles de casos representados con resultados reales para nuestros clientes.' },
    { ico: 'stethoscope',    h: 'Atención médica inmediata', p: 'Te conectamos con los mejores especialistas médicos sin costo inicial.' },
    { ico: 'wallet',         h: 'Sin pago anticipado',      p: 'Sólo cobramos si ganamos tu caso. Sin riesgos para ti.' },
    { ico: 'globe',          h: 'Sin importar tu estatus',  p: 'No importa tu estatus migratorio. Todos merecen justicia.' },
    { ico: 'handshake',      h: 'Acompañamiento total',     p: 'Te guiamos en cada paso del proceso legal, de principio a fin.' },
    { ico: 'zap',            h: 'Respuesta rápida',         p: 'Disponibles 24/7. Te respondemos en menos de diez minutos.' },
  ];
  return (
    <section className="ta-section" id="why">
      <div className="container">
        <div className="head">
          <div>
            <p className="eyebrow">¿Por qué elegirnos?</p>
            <h2>Somos tus aliados, no sólo tus <em>abogados.</em></h2>
          </div>
          <p className="desc">
            Sabemos que después de un accidente, tu vida se detiene. Nosotros nos encargamos
            de todo para que tú te recuperes.
          </p>
        </div>
        <div className="ta-why">
          {reasons.map((r) => (
            <div key={r.h} className="why-card">
              <i className="ico" data-lucide={r.ico} strokeWidth="1.5"></i>
              <h3>{r.h}</h3>
              <p>{r.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

