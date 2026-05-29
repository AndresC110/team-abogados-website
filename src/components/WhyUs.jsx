'use client';

import { useLanguage } from '@/context/LanguageContext';
import t from '@/lib/translations';

const icons = ['scale', 'stethoscope', 'wallet', 'globe', 'handshake', 'zap'];

export default function WhyUs() {
  const { lang } = useLanguage();
  const tx = t[lang].whyus;

  return (
    <section className="ta-section" id="why">
      <div className="container">
        <div className="head">
          <div>
            <p className="eyebrow">{tx.eyebrow}</p>
            <h2>{tx.h2} <em>{tx.h2_em}</em></h2>
          </div>
          <p className="desc">{tx.desc}</p>
        </div>
        <div className="ta-why">
          {tx.cards.map((r, i) => (
            <div key={i} className="why-card">
              <i className="ico" data-lucide={icons[i]} strokeWidth="1.5"></i>
              <h3>{r.h}</h3>
              <p>{r.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
