'use client';

// Hero.jsx — editorial hero using verbatim teamabogados.com copy
export default function Hero({ onContactClick }) {
  return (
    <section className="ta-hero" id="top">
      <div className="container">
        <div className="grid">
          <div>
            <p className="eyebrow">No ganas, no pagas · Disponibles 24/7</p>
            <h1>Abogados de accidentes que <em>luchan</em> por ti.</h1>
            <p className="lede">
              Después de un accidente, no estás solo. Nuestro equipo legal recupera la máxima
              compensación para ti y tu familia. Sin importar tu estatus migratorio.
            </p>
            <div className="ctas">
              <button className="btn btn-primary" onClick={onContactClick}>
                Consulta gratis ahora <span className="arr">→</span>
              </button>
              <a className="btn btn-ghost" href="https://wa.me/16467246127" target="_blank" rel="noopener noreferrer">
                WhatsApp →
              </a>
            </div>
          </div>
          <aside className="side">
            <div className="row"><span className="k">Asesoría</span><span className="v">100% gratis</span></div>
            <div className="row"><span className="k">Sin pago anticipado</span><span className="v">$0</span></div>
            <div className="row"><span className="k">Respuesta</span><span className="v">&lt; 10 min</span></div>
            <div className="row"><span className="k">Disponibles</span><span className="v">24 / 7</span></div>
          </aside>
        </div>
      </div>
    </section>
  );
}

