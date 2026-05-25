'use client';

// Testimonials.jsx — three quotes, verbatim from teamabogados.com
export default function Testimonials() {
  const quotes = [
    { q: 'Después del choque la aseguradora me quería dar una miseria. Team Abogados me conectó con un abogado increíble que peleó por mí y conseguí una compensación que no esperaba. Eternamente agradecido.', who: 'Carlos M.' },
    { q: 'Soy inmigrante y tenía miedo de reclamar. Team Abogados me explicó todo, me conectó con médicos y con un abogado que ganó mi caso. No tuve que pagar nada por adelantado.', who: 'María G.' },
    { q: 'Me caí en una obra de construcción. Team Abogados me conectó con los abogados correctos que aplicaron la ley del andamio y conseguí la máxima compensación. Un servicio de primera.', who: 'Roberto V.' },
  ];
  return (
    <section className="ta-testimonials" id="testimonials">
      <div className="container">
        <div className="head">
          <div>
            <p className="eyebrow">Testimonios</p>
            <h2>Lo que dicen <em>nuestros clientes.</em></h2>
          </div>
        </div>
        <div className="t-grid">
          {quotes.map((t, i) => (
            <figure key={i} className="t-card">
              <div className="t-stars" aria-label="cinco estrellas">
                {Array.from({ length: 5 }).map((_, j) => (
                  <i key={j} data-lucide="star" width="16" height="16" strokeWidth="1.5" fill="currentColor"></i>
                ))}
              </div>
              <blockquote>{t.q}</blockquote>
              <figcaption>
                <span className="dash"></span>
                {t.who}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

