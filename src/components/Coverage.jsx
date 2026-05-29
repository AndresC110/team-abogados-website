'use client';

import { useLanguage } from '@/context/LanguageContext';
import t from '@/lib/translations';

const places = ['New Jersey', 'Staten Island', 'Manhattan', 'The Bronx', 'Brooklyn', 'Queens', 'Long Island'];

export default function Coverage() {
  const { lang } = useLanguage();
  const tx = t[lang].coverage;

  return (
    <section className="ta-coverage" id="coverage">
      <div className="container">
        <div className="cov-grid">
          <div className="cov-info">
            <p className="eyebrow">{tx.eyebrow}</p>
            <h2>{tx.h2} <em>{tx.h2_em}</em></h2>
            <p className="cov-lede">{tx.lede}</p>
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
