'use client';

// PracticeAreas.jsx — grid of 6 practice-area cards
export default function PracticeAreas({ onSelect }) {
  const areas = [
    { id: 'auto',   ico: 'car-front',     h: 'Accidentes de auto',        p: 'Choques, atropellos, lesiones por airbag. Cubrimos gastos médicos, salarios perdidos y daños al vehículo.' },
    { id: 'const',  ico: 'hard-hat',      h: 'Construcción',              p: 'Caídas desde altura y la Ley del Andamio §240. Te protegemos sin importar tu estatus.' },
    { id: 'slip',   ico: 'footprints',    h: 'Resbalones y caídas',       p: 'Aceras heladas, pisos mojados, escaleras sin pasamanos. La propiedad debe responder.' },
    { id: 'pedes',  ico: 'person-standing', h: 'Peatones y ciclistas',    p: 'Atropellos en cruces, bicicletas, scooters. Lesiones graves merecen representación seria.' },
    { id: 'med',    ico: 'stethoscope',   h: 'Negligencia médica',        p: 'Errores de diagnóstico, complicaciones quirúrgicas, mala praxis hospitalaria.' },
    { id: 'work',   ico: 'briefcase',     h: 'Lesiones laborales',        p: 'Más allá del workers\u2019 comp: cuando un tercero tiene la culpa, hay más por recuperar.' },
  ];
  return (
    <section className="ta-section" id="practice">
      <div className="container">
        <div className="head">
          <div>
            <p className="eyebrow">Áreas de práctica</p>
            <h2>Seis frentes. Un mismo <em>equipo.</em></h2>
          </div>
          <p className="desc">
            No somos una firma que toma cualquier caso. Estos son los seis frentes donde
            tenemos la experiencia, los peritos y la paciencia para llevar tu caso hasta el final.
          </p>
        </div>
        <div className="ta-practice">
          {areas.map((a) => (
            <div key={a.id} className="pa-card" onClick={() => onSelect && onSelect(a)}>
              <i className="ico" data-lucide={a.ico} strokeWidth="1.5"></i>
              <h3>{a.h}</h3>
              <p>{a.p}</p>
              <div className="more">Conocer más <i data-lucide="arrow-right" width="14" height="14" strokeWidth="1.5"></i></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

