'use client';

// CaseResults.jsx — large numerals on a black block
export default function CaseResults() {
  const stats = [
    { num: '$500', span: 'M+', lbl: 'Recuperado para nuestros clientes' },
    { num: '5.000', span: '+', lbl: 'Casos resueltos desde 2008' },
    { num: '4,9', span: '★',   lbl: 'Promedio en Google · 2.300+ reseñas' },
  ];
  return (
    <section className="ta-results" id="results">
      <div className="container">
        <div style={{ marginBottom: 64, maxWidth: 640 }}>
          <p className="eyebrow" style={{ color: 'var(--accent)' }}>Resultados verificables</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1.02, letterSpacing: '-0.02em', margin: '18px 0 0', color: 'var(--ta-cream)' }}>
            Los números cuentan una <em style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400 }}>parte</em> de la historia.
          </h2>
        </div>
        <div className="grid">
          {stats.map((s, i) => (
            <div className="stat" key={i}>
              <div className="num">{s.num}<span>{s.span}</span></div>
              <div className="lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

