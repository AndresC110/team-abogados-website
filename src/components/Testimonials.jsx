'use client';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';

export default function Testimonials() {
  const { lang } = useLanguage();
  const T = translations[lang].testimonials;
  return (
    <section className="ta-testimonials" id="testimonials">
      <div className="container">
        <div className="head">
          <div>
            <p className="eyebrow">{T.eyebrow}</p>
            <h2>{T.h2a}<em>{T.h2em}</em></h2>
          </div>
        </div>
        <div className="t-grid">
          {T.quotes.map((t, i) => (
            <figure key={i} className="t-card">
              <div className="t-stars" aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, j) => (
                  <i key={j} data-lucide="star" width="16" height="16" strokeWidth="1.5" fill="currentColor"></i>
                ))}
              </div>
              <blockquote>{t.q}</blockquote>
              <figcaption><span className="dash"></span>{t.who}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
