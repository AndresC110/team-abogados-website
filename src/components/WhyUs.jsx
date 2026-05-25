'use client';

// WhyUs.jsx — "¿Por qué elegirnos?" — 6 reasons, verbatim from site
export default function WhyUs() {
  const reasons = [
    { ico: 'scale',          h: 'Red de abogados verificados',  p: 'Trabajamos solo con firmas de accidentes de trayectoria comprobada y resultados reales.' },
    { ico: 'stethoscope',    h: 'Atención médica inmediata',   p: 'Te conectamos con especialistas médicos sin costo inicial mientras tu caso avanza.' },
    { ico: 'wallet',         h: 'Sin pago anticipado',         p: 'El abogado que te asignamos trabaja en contingencia. Sin riesgos para ti.' },
    { ico: 'globe',          h: 'Sin importar tu estatus',     p: 'No importa tu estatus migratorio. Tienes derechos y el abogado correcto puede defenderlos.' },
    { ico: 'handshake',      h: 'Acompañamiento total',        p: 'Te guiamos desde el primer contacto hasta que el abogado toma tu caso.' },
    { ico: 'zap',            h: 'Respuesta rápida',            p: 'Disponibles 24/7. Te respondemos en menos de diez minutos.' },
  ];
  return (
    <section className="ta-section" id="why">
      <div className="container">
        <div className="head">
          <div>
            <p className="eyebrow">¿Por qué elegirnos?</p>
            <h2>Tu acceso directo a los mejores <em>abogados.</em></h2>
          </div>
          <p className="desc">
            Después de un accidente, necesitas al abogado correcto — no cualquiera. Nosotros
            hacemos la conexión para que tú te concentres en recuperarte.
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

