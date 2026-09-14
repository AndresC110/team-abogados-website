'use client';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';

export default function WhyUs() {
  const { lang } = useLanguage();
  const T = translations[lang].why;
  return (
    <section className="ta-section" id="why">
      <div className="container">
        <div className="head">
          <div>
            <p className="eyebrow">{T.eyebrow}</p>
            <h2>{T.h2a}<em>{T.h2em}</em></h2>
          </div>
          <p className="desc">{T.desc}</p>
        </div>
        <div className="ta-why">
          {T.reasons.map(r => (
            <div key={r.h} className="why-card">
              <i className="ico" data-lucide={r.ico} strokeWidth="1.5"></i>
              <h3>{r.h}</h3>
              <p>{r.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
