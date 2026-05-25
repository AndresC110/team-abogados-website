'use client';

// HowWeWork.jsx — "Cómo trabajamos" 5-step process, verbatim from site
export default function HowWeWork() {
  const steps = [
    { n: '01', h: 'Consulta gratis y sin compromiso',         p: 'Cuéntanos tu caso. Evaluamos tu situación de forma completamente gratuita y confidencial.' },
    { n: '02', h: 'Te asignamos al abogado ideal',            p: 'Evaluamos los detalles de tu accidente y te conectamos con la firma de nuestra red más adecuada para tu caso.' },
    { n: '03', h: 'Conexión con especialistas médicos',       p: 'Tu abogado te vincula con los mejores médicos para que recibas el tratamiento que necesitas.' },
    { n: '04', h: 'Negociación agresiva contra el seguro',   p: 'Tu abogado no deja que la aseguradora te dé migajas. Pelea por lo que te corresponde.' },
    { n: '05', h: 'Tu cheque de compensación máxima',        p: 'Recibes tu compensación. El abogado solo cobra si gana tu caso.' },
  ];
  return (
    <section className="ta-how" id="how">
      <div className="container">
        <div className="head">
          <div>
            <p className="eyebrow">El proceso</p>
            <h2>¿Cómo <em>trabajamos?</em></h2>
          </div>
          <p className="desc">
            Un proceso claro y transparente para que consigas la compensación que mereces.
          </p>
        </div>
        <div className="how-list">
          {steps.map((s) => (
            <div key={s.n} className="how-step">
              <div className="how-num">{s.n}</div>
              <div className="how-body">
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

