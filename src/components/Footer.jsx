'use client';

import { useLanguage } from '@/context/LanguageContext';
import t from '@/lib/translations';

export default function Footer() {
  const { lang } = useLanguage();
  const tx = t[lang].footer;

  return (
    <footer className="ta-footer">
      <div className="container">
        <div className="grid">
          <div className="mark">
            <img src="/assets/logo-mark.png" alt="" />
            <span className="wm">Team Abogados</span>
            <p>{tx.desc}</p>
          </div>
          <div className="col">
            <h4>{tx.nav.title}</h4>
            <a href="#why">{tx.nav.why}</a>
            <a href="#how">{tx.nav.how}</a>
            <a href="#faq">{tx.nav.faq}</a>
            <a href="#ubicacion">{tx.nav.location}</a>
          </div>
          <div className="col">
            <h4>{tx.legal.title}</h4>
            <a href="#">{tx.legal.privacy}</a>
            <a href="#">{tx.legal.terms}</a>
            <a href="#">{tx.legal.notice}</a>
          </div>
          <div className="col">
            <h4>{tx.contact.title}</h4>
            <span>2322 Arthur Avenue #207</span>
            <span>Bronx, New York 10458</span>
            <a href="tel:+16467246127">(646) 724-6127</a>
            <a href="https://wa.me/16467246127" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <span style={{ marginTop: 12, color: 'var(--ta-black-40)', fontSize: 12 }}>{tx.contact.calls}</span>
          </div>
        </div>
        <div className="legal">
          <span>{tx.copyright}</span>
          <span>{tx.disclaimer}</span>
        </div>
      </div>
    </footer>
  );
}
