'use client';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';

const ADDRESS = '2322 Arthur Avenue, Suite 207, Bronx, NY 10458';
const ENCODED = encodeURIComponent(ADDRESS);
const EMBED_SRC = `https://www.google.com/maps?q=${ENCODED}&z=15&output=embed`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${ENCODED}`;
const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${ENCODED}`;

export default function Location() {
  const { lang } = useLanguage();
  const T = translations[lang].location;
  return (
    <section className="ta-location" id="ubicacion">
      <div className="container">
        <div className="loc-grid">
          <div className="loc-info">
            <p className="eyebrow">{T.eyebrow}</p>
            <h2>{T.h2a}<em>{T.h2em}</em></h2>
            <p className="loc-lede">{T.lede}</p>

            <div className="loc-rows">
              <div className="loc-row">
                <div className="k">{T.labelAddress}</div>
                <div className="v">2322 Arthur Avenue, Suite 207<br />Bronx, NY 10458</div>
              </div>
              <div className="loc-row">
                <div className="k">{T.labelTrain}</div>
                <div className="v">
                  <span className="metro-pill" style={{ background: '#FF6319' }}>B</span>
                  <span className="metro-pill" style={{ background: '#FF6319' }}>D</span>
                  {T.trainDetail}<br />
                  <span className="metro-pill" style={{ background: '#EE352E' }}>2</span>
                  {T.trainDetail2}
                </div>
              </div>
              <div className="loc-row">
                <div className="k">{T.labelBus}</div>
                <div className="v">{T.busDetail}</div>
              </div>
              <div className="loc-row">
                <div className="k">{T.labelParking}</div>
                <div className="v">{T.parkingDetail}</div>
              </div>
              <div className="loc-row">
                <div className="k">{T.labelHours}</div>
                <div className="v">
                  {T.hoursDetail}<br />
                  <strong>{T.hoursDetail2}</strong>
                </div>
              </div>
            </div>

            <div className="loc-ctas">
              <a className="btn btn-primary" href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
                <i data-lucide="navigation" width="16" height="16" strokeWidth="1.5"></i>
                {T.ctaDirections} <span className="arr">→</span>
              </a>
              <a className="btn btn-outline" href={MAP_URL} target="_blank" rel="noopener noreferrer">
                <i data-lucide="map" width="16" height="16" strokeWidth="1.5"></i>
                {T.ctaMaps}
              </a>
              <a className="btn btn-ghost" href="tel:+16467246127">{T.ctaCall}</a>
            </div>
          </div>

          <div className="loc-map">
            <div className="map-frame">
              <iframe
                src={EMBED_SRC}
                title="Team Abogados — Arthur Avenue, Bronx"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a className="map-overlay-cta" href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
              <i data-lucide="navigation" width="14" height="14" strokeWidth="1.5"></i>
              {T.ctaDirections}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
