'use client';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';

const places = ['New Jersey','Staten Island','Manhattan','The Bronx','Brooklyn','Queens','Long Island'];

export default function Coverage() {
  const { lang } = useLanguage();
  const T = translations[lang].coverage;
  return (
    <section className="ta-coverage" id="coverage">
      <div className="container">
        <div className="cov-grid">
          <div className="cov-info">
            <p className="eyebrow">{T.eyebrow}</p>
            <h2>{T.h2a}<em>{T.h2em}</em></h2>
            <p className="cov-lede">{T.lede}</p>
          </div>
          <ul className="cov-list">
            {places.map(p => (
              <li key={p}><span className="dot"></span>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
