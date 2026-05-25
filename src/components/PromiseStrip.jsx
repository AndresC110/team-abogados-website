'use client';

// PromiseStrip.jsx — four value props from teamabogados.com
export default function PromiseStrip() {
  const items = [
    { n: '01', h: 'Respuesta inmediata.',     p: 'Te contactamos en menos de diez minutos y te referimos al abogado correcto para tu caso.' },
    { n: '02', h: 'Consulta confidencial.',   p: 'Cien por ciento gratis. Lo que nos cuentes queda entre nosotros — siempre.' },
    { n: '03', h: 'El abogado trabaja en contingencia.', p: 'El abogado que te asignamos no cobra por adelantado. Solo cobra si gana tu caso.' },
    { n: '04', h: 'Tu estatus no importa.',   p: 'Sin importar tu estatus migratorio, tienes derechos. El abogado correcto puede defenderlos.' },
  ];
  return (
    <section className="ta-promise" id="services">
      <div className="container">
        <div className="grid grid-4">
          {items.map((it) => (
            <div key={it.n} className="item">
              <div className="num">{it.n}</div>
              <h3>{it.h}</h3>
              <p>{it.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

