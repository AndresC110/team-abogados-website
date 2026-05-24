'use client';

// PromiseStrip.jsx — four value props from teamabogados.com
export default function PromiseStrip() {
  const items = [
    { n: '01', h: 'Respuesta inmediata.',     p: 'Te contactamos en menos de diez minutos. Cuéntanos qué pasó y tomamos cartas en el asunto.' },
    { n: '02', h: 'Consulta confidencial.',   p: 'Cien por ciento gratis. Lo que nos cuentes queda entre nosotros — siempre.' },
    { n: '03', h: 'No pagas si no ganamos.',  p: 'Sin pago anticipado y sin honorarios mientras tu caso esté abierto. Sólo cobramos si recuperamos.' },
    { n: '04', h: 'Tu estatus no importa.',   p: 'Sin importar tu estatus migratorio, tienes derechos. Y nosotros los defendemos.' },
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

