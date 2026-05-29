'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import t from '@/lib/translations';

export default function FAQ() {
  const { lang } = useLanguage();
  const tx = t[lang].faq;
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
            <p className="eyebrow">{tx.eyebrow}</p>
            <h2>{tx.h2} <em>{tx.h2_em}</em></h2>
          </div>
          <p className="desc">{tx.desc}</p>
        </div>
        <div className="faq-list">
          {tx.items.map((it, i) => (
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
