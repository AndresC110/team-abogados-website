'use client';

// Location.jsx — office location with Google Maps embed + directions CTA
export default function Location() {
  const ADDRESS = '2322 Arthur Avenue, Suite 207, Bronx, NY 10458';
  const ENCODED = encodeURIComponent(ADDRESS);
  // Public embed — no API key needed
  const EMBED_SRC = `https://www.google.com/maps?q=${ENCODED}&z=15&output=embed`;
  // Directions deep link — opens user's default maps app on mobile
  const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${ENCODED}`;
  // Plain map link for "open in Google Maps"
  const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${ENCODED}`;

  return (
    <section className="ta-location" id="ubicacion">
      <div className="container">
        <div className="loc-grid">
          <div className="loc-info">
            <p className="eyebrow">La oficina</p>
            <h2>En el corazón de <em>Arthur Avenue.</em></h2>
            <p className="loc-lede">
              Estamos en la Pequeña Italia del Bronx, a dos cuadras de la estación Fordham
              y con parqueo en la calle. Sin cita previa también te atendemos — sólo llama
              antes para que un abogado esté disponible.
            </p>

            <div className="loc-rows">
              <div className="loc-row">
                <div className="k">Dirección</div>
                <div className="v">
                  2322 Arthur Avenue, Suite 207<br />
                  Bronx, NY 10458
                </div>
              </div>
              <div className="loc-row">
                <div className="k">Tren</div>
                <div className="v">
                  <span className="metro-pill" style={{ background: '#FF6319' }}>B</span>
                  <span className="metro-pill" style={{ background: '#FF6319' }}>D</span>
                  Fordham Rd · 6 min a pie<br />
                  <span className="metro-pill" style={{ background: '#EE352E' }}>2</span>
                  Pelham Pkwy · 14 min
                </div>
              </div>
              <div className="loc-row">
                <div className="k">Bus</div>
                <div className="v">Bx12, Bx55 — paran en Fordham &amp; Arthur</div>
              </div>
              <div className="loc-row">
                <div className="k">Parqueo</div>
                <div className="v">En la calle (metros) y lote público en E 187th St.</div>
              </div>
              <div className="loc-row">
                <div className="k">Horario</div>
                <div className="v">
                  Lunes a viernes · 9 h – 19 h <br />
                  Llamadas: <strong>24 horas, todos los días</strong>
                </div>
              </div>
            </div>

            <div className="loc-ctas">
              <a className="btn btn-primary" href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
                <i data-lucide="navigation" width="16" height="16" strokeWidth="1.5"></i>
                Cómo llegar
                <span className="arr">→</span>
              </a>
              <a className="btn btn-outline" href={MAP_URL} target="_blank" rel="noopener noreferrer">
                <i data-lucide="map" width="16" height="16" strokeWidth="1.5"></i>
                Abrir en Google Maps
              </a>
              <a className="btn btn-ghost" href="tel:+19295550181">
                Llamar a la oficina →
              </a>
            </div>
          </div>

          <div className="loc-map">
            <div className="map-frame">
              <iframe
                src={EMBED_SRC}
                title="Ubicación de Team Abogados en Arthur Avenue, Bronx"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a className="map-overlay-cta" href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
              <i data-lucide="navigation" width="14" height="14" strokeWidth="1.5"></i>
              Cómo llegar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

