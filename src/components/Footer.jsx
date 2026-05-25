'use client';

export default function Footer() {
  return (
    <footer className="ta-footer">
      <div className="container">
        <div className="grid">
          <div className="mark">
            <img src="/assets/logo-mark.png" alt="" />
            <span className="wm">Team Abogados</span>
            <p>Agencia de marketing y servicios de apoyo para firmas de abogados de accidentes.</p>
          </div>
          <div className="col">
            <h4>Navegación</h4>
            <a href="#why">¿Por qué nosotros?</a>
            <a href="#how">Cómo trabajamos</a>
            <a href="#faq">Preguntas frecuentes</a>
            <a href="#ubicacion">Ubicación</a>
          </div>
          <div className="col">
            <h4>Legal</h4>
            <a href="#">Política de privacidad</a>
            <a href="#">Términos de servicio</a>
            <a href="#">Aviso legal</a>
          </div>
          <div className="col">
            <h4>Contacto</h4>
            <span>2322 Arthur Avenue #207</span>
            <span>Bronx, New York 10458</span>
            <a href="tel:+16467246127">(646) 724-6127</a>
            <a href="https://wa.me/16467246127" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <span style={{ marginTop: 12, color: 'var(--ta-black-40)', fontSize: 12 }}>Llamadas 24h · todos los días</span>
          </div>
        </div>
        <div className="legal">
          <span>© 2026 Team Abogados. Todos los derechos reservados.</span>
          <span>Team Abogados no es un bufete de abogados y no ofrece servicios jurídicos directamente · Publicidad de servicios legales · Resultados pasados no garantizan resultados futuros.</span>
        </div>
      </div>
    </footer>
  );
}

