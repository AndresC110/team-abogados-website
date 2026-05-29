'use client';

import { useLanguage } from '@/context/LanguageContext';
import t from '@/lib/translations';

export default function Location() {
  const { lang } = useLanguage();
  const tx = t[lang].location;

  const ADDRESS = '2322 Arthur Avenue, Suite 207, Bronx, NY 10458';
  const ENCODED = encodeURIComponent(ADDRESS);
  const EMBED_SRC = `https://www.google.com/maps?q=${ENCODED}&z=15&output=embed`;
  const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${ENCODED}`;
  const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${ENCODED}`;

  return (
    <section className="ta-location" id="ubicacion">
      <div className="container">
        <div className="loc-grid">
          <div className="loc-info">
            <p className="eyebrow">{tx.eyebrow}</p>
            <h2>{tx.h2} <em>{tx.h2_em}</em></h2>
            <p className="loc-lede">{tx.lede}</p>

            <div className="loc-rows">
              <div className="loc-row">
                <div className="k">{tx.rows.address}</div>
                <div className="v">
                  2322 Arthur Avenue, Suite 207<br />
                  Bronx, NY 10458
                </div>
              </div>
              <div className="loc-row">
                <div className="k">{tx.rows.metro}</div>
                <div className="v">
                  <span className="metro-pill" style={{ background: '#FF6319' }}>B</span>
                  <span className="metro-pill" style={{ background: '#FF6319' }}>D</span>
                  {tx.rows.metroDetail}<br />
                  <span className="metro-pill" style={{ background: '#EE352E' }}>2</span>
                  {tx.rows.metroDetail2}
                </div>
              </div>
              <div className="loc-row">
                <div className="k">{tx.rows.bus}</div>
                <div className="v">{tx.rows.busDetail}</div>
              </div>
              <div className="loc-row">
                <div className="k">{tx.rows.parking}</div>
                <div className="v">{tx.rows.parkingDetail}</div>
              </div>
              <div className="loc-row">
                <div className="k">{tx.rows.hours}</div>
                <div className="v">
                  {tx.rows.hoursDetail}<br />
                  <strong>{tx.rows.hoursDetail2}</strong>
                </div>
              </div>
            </div>

            <div className="loc-ctas">
              <a className="btn btn-primary" href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
                <i data-lucide="navigation" width="16" height="16" strokeWidth="1.5"></i>
                {tx.ctas.directions}
                <span className="arr">→</span>
              </a>
              <a className="btn btn-outline" href={MAP_URL} target="_blank" rel="noopener noreferrer">
                <i data-lucide="map" width="16" height="16" strokeWidth="1.5"></i>
                {tx.ctas.maps}
              </a>
              <a className="btn btn-ghost" href="tel:+19295550181">
                {tx.ctas.call}
              </a>
            </div>
          </div>

          <div className="loc-map">
            <div className="map-frame">
              <iframe
                src={EMBED_SRC}
                title={tx.mapTitle}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a className="map-overlay-cta" href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
              <i data-lucide="navigation" width="14" height="14" strokeWidth="1.5"></i>
              {tx.mapOverlay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
