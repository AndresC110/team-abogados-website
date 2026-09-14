'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';

export default function FAQ() {
  const { lang } = useLanguage();
  const T = translations[lang].faq;
  const [open, setOpen] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.lucide) {
      window.lucide.createIcons();
    }
  }, [open, lang]);

  return (
    <section className="ta-section ta-faq" id="faq">
      <div className="container">
        <div className="head">
          <div>
            <p className="eyebrow">{T.eyebrow}</p>
            <h2>{T.h2a}<em>{T.h2em}</em></h2>
          </div>
          <p className="desc">{T.desc}</p>
        </div>
        <div className="faq-list">
          {T.items.map((it, i) => (
            <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{it.q}</span>
                <i data-lucide={open === i ? 'minus' : 'plus'} width="20" height="20" strokeWidth="1.5"></i>
              </button>
              <div className="faq-a"><p>{it.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
