'use client';

import { useState, useEffect } from 'react';

export default function Header({ onContactClick }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="ta-header" style={scrolled ? { boxShadow: 'var(--shadow-sm)' } : {}}>
      <div className="container row">
        <a className="brand" href="#top">
          <img src="/assets/logo-mark-black.png" alt="Team Abogados" />
          <span className="wm">Team Abogados</span>
        </a>
        <nav>
          <a href="#services">Servicios</a>
          <a href="#why">¿Por qué nosotros?</a>
          <a href="#how">Cómo trabajamos</a>
          <a href="#coverage">Cobertura</a>
          <a href="#testimonials">Testimonios</a>
          <a href="#faq">Preguntas frecuentes</a>
          <a href="#ubicacion">Contacto</a>
        </nav>
        <div className="right">
          <div className="lang"><span className="on">ES</span><span>·</span><span>EN</span></div>
          <a className="phone" href="tel:+16467246127">
            <i data-lucide="phone" width="14" height="14" strokeWidth="1.5"></i>
            (646) 724-6127
          </a>
          <button className="btn btn-primary" onClick={onContactClick}>
            Consulta gratis
            <span className="arr">→</span>
          </button>
        </div>
      </div>
    </header>
  );
}
