'use client';

import { useLanguage } from '@/context/LanguageContext';
import t from '@/lib/translations';

export default function Hero({ onContactClick }) {
  const { lang } = useLanguage();
  const tx = t[lang].hero;

  return (
    <section className="ta-hero" id="top">
      <div className="container">
        <div className="grid">
          <div>
            <p className="eyebrow">{tx.eyebrow}</p>
            <h1>{tx.h1} <em>{tx.h1_em}</em></h1>
            <p className="lede">{tx.lede}</p>
            <div className="ctas">
              <button className="btn btn-primary" onClick={onContactClick}>
                {tx.cta1} <span className="arr">→</span>
              </button>
              <a className="btn btn-ghost" href="https://wa.me/16467246127" target="_blank" rel="noopener noreferrer">
                WhatsApp →
              </a>
            </div>
          </div>
          <aside className="side">
            {tx.side.map((row) => (
              <div key={row.k} className="row">
                <span className="k">{row.k}</span>
                <span className="v">{row.v}</span>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
