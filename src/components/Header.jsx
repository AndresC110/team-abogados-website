'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import t from '@/lib/translations';

function FlagES() {
  return (
    <svg width="18" height="12" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 2, display: 'block', flexShrink: 0 }}>
      <rect width="20" height="14" fill="#c60b1e"/>
      <rect y="3.5" width="20" height="7" fill="#ffc400"/>
    </svg>
  );
}

function FlagUS() {
  return (
    <svg width="18" height="12" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 2, display: 'block', flexShrink: 0 }}>
      {Array.from({ length: 13 }).map((_, i) => (
        <rect key={i} x="0" y={i * (14 / 13)} width="20" height={14 / 13 + 0.1} fill={i % 2 === 0 ? '#B22234' : '#FFFFFF'} />
      ))}
      <rect x="0" y="0" width="8" height={14 * 7 / 13} fill="#3C3B6E" />
    </svg>
  );
}

export default function Header({ onContactClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const tx = t[lang].header;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.lucide) {
      window.lucide.createIcons();
    }
  }, [menuOpen, lang]);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className={`ta-header${menuOpen ? ' menu-open' : ''}`} style={scrolled && !menuOpen ? { boxShadow: 'var(--shadow-sm)' } : {}}>
      <div className="container row">
        <a className="brand" href="#top" onClick={handleNavClick}>
          <img src="/assets/logo-mark-black.png" alt="Team Abogados" />
          <span className="wm">Team Abogados</span>
        </a>

        {/* Desktop nav — hidden on mobile */}
        <nav>
          <a href="#why">{tx.nav.why}</a>
          <a href="#how">{tx.nav.how}</a>
          <a href="#faq">{tx.nav.faq}</a>
          <a href="#ubicacion">{tx.nav.contact}</a>
        </nav>

        <div className="right">
          <div className="lang">
            <button className={lang === 'es' ? 'on' : ''} onClick={() => setLang('es')}>
              <FlagES /> <span className="lang-label">ES</span>
            </button>
            <span className="sep">|</span>
            <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>
              <FlagUS /> <span className="lang-label">EN</span>
            </button>
          </div>
          {/* Phone — desktop only */}
          <a className="phone" href="tel:+16467246127">
            <i data-lucide="phone" width="14" height="14" strokeWidth="1.5"></i>
            (646) 724-6127
          </a>
          {/* CTA — always visible, smaller on mobile */}
          <button className="btn btn-primary" onClick={onContactClick}>
            {tx.cta}
            <span className="arr">→</span>
          </button>
          {/* Hamburger — mobile only */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            <i data-lucide={menuOpen ? 'x' : 'menu'} width="20" height="20" strokeWidth="1.5"></i>
          </button>
        </div>
      </div>

      {/* Mobile nav panel — only nav links */}
      <div className={`mobile-nav${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="mobile-nav-links">
          <a href="#why"        onClick={handleNavClick}>{tx.nav.why}</a>
          <a href="#how"        onClick={handleNavClick}>{tx.nav.how}</a>
          <a href="#faq"        onClick={handleNavClick}>{tx.nav.faq}</a>
          <a href="#ubicacion"  onClick={handleNavClick}>{tx.nav.contact}</a>
        </nav>
      </div>
    </header>
  );
}
