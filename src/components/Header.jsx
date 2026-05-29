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

// Inline SVG icons — no CDN dependency, always render correctly
function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="3" y1="5"  x2="17" y2="5"  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="3" y1="15" x2="17" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="5"  y1="5"  x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="15" y1="5"  x2="5"  y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
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

  // Refresh Lucide icons for other components when lang changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.lucide) {
      window.lucide.createIcons();
    }
  }, [lang]);

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
            {tx.cta}<span className="arr">→</span>
          </button>

          {/* Hamburger — mobile only, inline SVG so it always renders */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile nav panel — nav links only */}
      <div className={`mobile-nav${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="mobile-nav-links">
          <a href="#why"       onClick={handleNavClick}>{tx.nav.why}</a>
          <a href="#how"       onClick={handleNavClick}>{tx.nav.how}</a>
          <a href="#faq"       onClick={handleNavClick}>{tx.nav.faq}</a>
          <a href="#ubicacion" onClick={handleNavClick}>{tx.nav.contact}</a>
        </nav>
      </div>
    </header>
  );
}
