'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import t from '@/lib/translations';

function FlagES() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 2, display: 'block', flexShrink: 0 }}>
      <rect width="20" height="14" fill="#c60b1e"/>
      <rect y="3.5" width="20" height="7" fill="#ffc400"/>
    </svg>
  );
}

function FlagUS() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 2, display: 'block', flexShrink: 0 }}>
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

  // Close menu on nav link click
  const handleNavClick = () => setMenuOpen(false);

  const handleContactClick = () => {
    setMenuOpen(false);
    onContactClick();
  };

  return (
    <header className={`ta-header${menuOpen ? ' menu-open' : ''}`} style={scrolled && !menuOpen ? { boxShadow: 'var(--shadow-sm)' } : {}}>
      <div className="container row">
        <a className="brand" href="#top" onClick={handleNavClick}>
          <img src="/assets/logo-mark-black.png" alt="Team Abogados" />
          <span className="wm">Team Abogados</span>
        </a>

        {/* Desktop nav */}
        <nav>
          <a href="#why">{tx.nav.why}</a>
          <a href="#how">{tx.nav.how}</a>
          <a href="#faq">{tx.nav.faq}</a>
          <a href="#ubicacion">{tx.nav.contact}</a>
        </nav>

        <div className="right">
          <div className="lang">
            <button className={lang === 'es' ? 'on' : ''} onClick={() => setLang('es')}>
              <FlagES /> ES
            </button>
            <span className="sep">|</span>
            <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>
              <FlagUS /> EN
            </button>
          </div>
          <a className="phone" href="tel:+16467246127">
            <i data-lucide="phone" width="14" height="14" strokeWidth="1.5"></i>
            (646) 724-6127
          </a>
          {/* Desktop CTA — hidden on mobile */}
          <button className="btn btn-primary header-cta-desktop" onClick={onContactClick}>
            {tx.cta}
            <span className="arr">→</span>
          </button>
          {/* Hamburger — shown on mobile only */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            <i data-lucide={menuOpen ? 'x' : 'menu'} width="22" height="22" strokeWidth="1.5"></i>
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      <div className={`mobile-nav${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="mobile-nav-links">
          <a href="#why"   onClick={handleNavClick}>{tx.nav.why}</a>
          <a href="#how"   onClick={handleNavClick}>{tx.nav.how}</a>
          <a href="#faq"   onClick={handleNavClick}>{tx.nav.faq}</a>
          <a href="#ubicacion" onClick={handleNavClick}>{tx.nav.contact}</a>
        </nav>
        <div className="mobile-nav-cta">
          <button className="btn btn-primary" onClick={handleContactClick}>
            {tx.cta} <span className="arr">→</span>
          </button>
          <a className="btn btn-ghost" href="https://wa.me/16467246127" target="_blank" rel="noopener noreferrer" onClick={handleNavClick}>
            WhatsApp →
          </a>
        </div>
        <div className="mobile-nav-phone">
          <a href="tel:+16467246127">
            <i data-lucide="phone" width="14" height="14" strokeWidth="1.5"></i>
            (646) 724-6127
          </a>
        </div>
      </div>
    </header>
  );
}
