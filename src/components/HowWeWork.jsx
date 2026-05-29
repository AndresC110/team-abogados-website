'use client';

import { useLanguage } from '@/context/LanguageContext';
import t from '@/lib/translations';

export default function HowWeWork() {
  const { lang } = useLanguage();
  const tx = t[lang].how;

  return (
    <section className="ta-how" id="how">
      <div className="container">
        <div className="head">
          <div>
            <p className="eyebrow">{tx.eyebrow}</p>
            <h2>{tx.h2} <em>{tx.h2_em}</em></h2>
          </div>
          <p className="desc">{tx.desc}</p>
        </div>
        <div className="how-list">
          {tx.steps.map((s) => (
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
