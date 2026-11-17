'use client';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';
import { openReview } from '@/lib/reviews';

function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.8l2.85 5.78 6.38.93-4.62 4.5 1.09 6.35L12 17.36l-5.7 3 1.09-6.35-4.62-4.5 6.38-.93z" fill="currentColor" />
    </svg>
  );
}

export default function Hero({ onContactClick }) {
  const { lang } = useLanguage();
  const T = translations[lang].hero;
  return (
    <section className="ta-hero" id="top">
      <div className="container">
        <div className="grid">
          <div>
            {/* Invitación a reseñar: visible al primer vistazo, con una animación breve al entrar */}
            <button type="button" className="rv-chip" onClick={openReview}>
              <span className="rv-chip__stars">{[0, 1, 2, 3, 4].map((i) => <Star key={i} />)}</span>
              <span className="rv-chip__text">{T.reviewChip}</span>
              <span className="rv-chip__arr" aria-hidden="true">→</span>
            </button>
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
