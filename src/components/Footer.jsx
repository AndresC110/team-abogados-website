'use client';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';
import { openCookieSettings, CLARITY_ID } from '@/lib/consent';

export default function Footer() {
  const { lang } = useLanguage();
  const T = translations[lang].footer;
  return (
    <footer className="ta-footer">
      <div className="container">
        <div className="grid">
          <div className="mark">
            <img src="/assets/logo-mark.png" alt="" />
            <span className="wm">Team Abogados</span>
            <p>{T.tagline}</p>
          </div>
          <div className="col">
            <h4>{T.navTitle}</h4>
            <a href="#why">{T.navLinks.why}</a>
            <a href="#how">{T.navLinks.how}</a>
            <a href="#faq">{T.navLinks.faq}</a>
            <a href="#ubicacion">{T.navLinks.location}</a>
          </div>
          <div className="col">
            <h4>{T.legalTitle}</h4>
            <a href="/privacidad">{T.legalLinks.privacy}</a>
            <a href="/terminos">{T.legalLinks.terms}</a>
            <a href="/privacidad#aviso-legal">{T.legalLinks.disclaimer}</a>
            {CLARITY_ID && (
              <button type="button" className="ta-footer__linkbtn" onClick={openCookieSettings}>{T.cookieSettings}</button>
            )}
          </div>
          <div className="col">
            <h4>{T.contactTitle}</h4>
            <span>2322 Arthur Avenue #207</span>
            <span>Bronx, New York 10458</span>
            <a href="tel:+16467246127">(646) 724-6127</a>
            <a href="https://wa.me/16467246127" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <span style={{ marginTop: 12, color: 'var(--ta-black-40)', fontSize: 12 }}>{T.hours}</span>
          </div>
        </div>
        <div className="legal">
          <span>{T.copyright}</span>
          <span>{T.disclaimer}</span>
        </div>
      </div>
    </footer>
  );
}
