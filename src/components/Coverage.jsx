'use client';

// Coverage.jsx — geographic coverage strip, verbatim list from site
export default function Coverage() {
  const places = [
    'New Jersey', 'Staten Island', 'Manhattan', 'The Bronx', 'Brooklyn', 'Queens', 'Long Island',
  ];
  return (
    <section className="ta-coverage" id="coverage">
      <div className="container">
        <div className="cov-grid">
          <div className="cov-info">
            <p className="eyebrow">Cobertura</p>
            <h2>Estamos cerca <em>de ti.</em></h2>
            <p className="cov-lede">
              Nuestra red de abogados cubre las principales ciudades y regiones de Nueva York y Nueva Jersey.
              Sin importar tu estatus migratorio — tienes derechos y el abogado correcto puede defenderlos.
            </p>
          </div>
          <ul className="cov-list">
            {places.map((p) => (
              <li key={p}><span className="dot"></span>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

