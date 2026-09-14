'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';

export default function Header({ onContactClick }) {
  const { lang, setLang } = useLanguage();
  const T = translations[lang].header;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.lucide) {
      window.lucide.createIcons();
    }
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { href: '#why',       label: T.nav.why },
    { href: '#how',       label: T.nav.how },
    { href: '#faq',       label: T.nav.faq },
    { href: '#ubicacion', label: T.nav.contact },
  ];

  const LangToggle = () => (
    <div className="lang">
      <button className={`lang-btn${lang === 'en' ? ' on' : ''}`} onClick={() => setLang('en')}>EN</button>
      <span className="lang-sep">/</span>
      <button className={`lang-btn${lang === 'es' ? ' on' : ''}`} onClick={() => setLang('es')}>ES</button>
    </div>
  );

  return (
    <>
      <header className="ta-header" style={scrolled ? { boxShadow: 'var(--shadow-sm)' } : {}}>
        <div className="container row">

          {/* Brand */}
          <a className="brand" href="#top" onClick={closeMenu}>
            <img src="/assets/logo-mark-black.png" alt="Team Abogados" />
            <span className="wm">Team Abogados</span>
          </a>

          {/* ── DESKTOP: nav ── */}
          <nav>
            {navLinks.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
          </nav>

          {/* ── DESKTOP: lang + phone + CTA ── */}
          <div className="right">
            <LangToggle />
            <a className="phone" href="tel:+16467246127">
              <i data-lucide="phone" width="14" height="14" strokeWidth="1.5"></i>
              {T.phone}
            </a>
            <button className="btn btn-primary" onClick={onContactClick}>
              {T.cta} <span className="arr">→</span>
            </button>
          </div>

          {/* ── MOBILE: lang + CTA + hamburger ── */}
          <div className="mob-hdr-right">
            <LangToggle />
            <button className="btn btn-primary mob-cta-btn" onClick={onContactClick}>
              {T.cta}
            </button>
            <button
              className="mob-toggle"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {menuOpen
                ? <i data-lucide="x"    width="22" height="22" strokeWidth="1.5"></i>
                : <i data-lucide="menu" width="22" height="22" strokeWidth="1.5"></i>
              }
            </button>
          </div>

        </div>
      </header>

      {/* ── MOBILE nav drawer — only nav links + phone ── */}
      <div className={`mob-nav${menuOpen ? ' open' : ''}`}>
        <nav className="mob-links">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} onClick={closeMenu}>{l.label}</a>
          ))}
        </nav>
        <a className="phone mob-phone" href="tel:+16467246127">
          <i data-lucide="phone" width="16" height="16" strokeWidth="1.5"></i>
          {T.phone}
        </a>
      </div>

      {menuOpen && <div className="mob-scrim" onClick={closeMenu} />}
    </>
  );
}
