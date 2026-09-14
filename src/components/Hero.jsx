'use client';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';

export default function Hero({ onContactClick }) {
  const { lang } = useLanguage();
  const T = translations[lang].hero;
  return (
    <section className="ta-hero" id="top">
      <div className="container">
        <div className="grid">
          <div>
            <p className="eyebrow">{T.eyebrow}</p>
            <h1>{T.h1a}<em>{T.h1em}</em></h1>
            <p className="lede">{T.lede}</p>
            <div className="ctas">
              <button className="btn btn-primary" onClick={onContactClick}>
                {T.cta} <span className="arr">→</span>
              </button>
              <a className="btn btn-ghost" href="https://wa.me/16467246127" target="_blank" rel="noopener noreferrer">
                WhatsApp →
              </a>
            </div>
          </div>
          <aside className="side">
            {T.stats.map(s => (
              <div key={s.k} className="row">
                <span className="k">{s.k}</span>
                <span className="v">{s.v}</span>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
