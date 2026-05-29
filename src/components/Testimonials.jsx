'use client';

import { useLanguage } from '@/context/LanguageContext';
import t from '@/lib/translations';

export default function Testimonials() {
  const { lang } = useLanguage();
  const tx = t[lang].testimonials;

  return (
    <section className="ta-testimonials" id="testimonials">
      <div className="container">
        <div className="head">
          <div>
            <p className="eyebrow">{tx.eyebrow}</p>
            <h2>{tx.h2} <em>{tx.h2_em}</em></h2>
          </div>
        </div>
        <div className="t-grid">
          {tx.items.map((item, i) => (
            <figure key={i} className="t-card">
              <div className="t-stars" aria-label={tx.aria}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <i key={j} data-lucide="star" width="16" height="16" strokeWidth="1.5" fill="currentColor"></i>
                ))}
              </div>
              <blockquote>{item.q}</blockquote>
              <figcaption>
                <span className="dash"></span>
                {item.who}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
