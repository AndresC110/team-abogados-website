'use client';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';

export default function HowWeWork() {
  const { lang } = useLanguage();
  const T = translations[lang].how;
  return (
    <section className="ta-how" id="how">
      <div className="container">
        <div className="head">
          <div>
            <p className="eyebrow">{T.eyebrow}</p>
            <h2>{T.h2a}<em>{T.h2em}</em></h2>
          </div>
          <p className="desc">{T.desc}</p>
        </div>
        <div className="how-list">
          {T.steps.map(s => (
            <div key={s.n} className="how-step">
              <div className="how-num">{s.n}</div>
              <div className="how-body">
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
