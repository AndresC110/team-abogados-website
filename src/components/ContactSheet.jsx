'use client';
import { useState, useEffect, useRef, Fragment } from 'react';

// ContactSheet.jsx — right-side intake modal
export default function ContactSheet({ open, onClose }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSent(false);
        setError('');
      }, 400);
    }
  }, [open]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData(formRef.current);
      const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        contactTime: formData.get('contactTime'),
        message: formData.get('message'),
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      setSent(true);
    } catch (err) {
      setError(err.message || 'Error procesando la solicitud');
      console.error('Form error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className={`sheet-scrim ${open ? 'open' : ''}`} onClick={onClose}></div>
      <aside className={`sheet ${open ? 'open' : ''}`} aria-hidden={!open}>
        <button className="x" onClick={onClose} aria-label="Cerrar">
          <i data-lucide="x" width="20" height="20" strokeWidth="1.5"></i>
        </button>

        {!sent ? (
          <Fragment>
            <p className="eyebrow">Consulta gratis</p>
            <h2>Cuéntanos <em>qué pasó.</em></h2>
            <p className="lede">Un asesor del equipo te llama dentro de los próximos diez minutos y te conecta con el abogado ideal para tu caso. En español, sin compromiso.</p>
            {error && <div style={{ color: 'var(--ta-gold-700)', marginBottom: 12 }}>{error}</div>}
            <form ref={formRef} onSubmit={submit}>
              <div className="field">
                <label>Nombre completo</label>
                <input name="name" required placeholder="Como aparece en tu identificación" />
              </div>
              <div className="field">
                <label>Teléfono</label>
                <input name="phone" required type="tel" placeholder="(___) ___-____" />
              </div>
              <div className="field">
                <label>Correo electrónico</label>
                <input name="email" required type="email" placeholder="tu@correo.com" />
              </div>
              <div className="field">
                <label>¿Cuándo desea ser contactado?</label>
                <select name="contactTime" defaultValue="asap">
                  <option value="asap">Lo antes posible</option>
                  <option value="morning">Esta mañana (8 a 12 h)</option>
                  <option value="afternoon">Esta tarde (12 a 18 h)</option>
                  <option value="evening">Esta noche (18 a 22 h)</option>
                  <option value="tomorrow">Mañana</option>
                  <option value="weekend">Este fin de semana</option>
                </select>
              </div>
              <div className="field">
                <label>Cuéntanos qué pasó</label>
                <textarea name="message" placeholder="Escribe con tus propias palabras. Sin formalidades."></textarea>
              </div>
              <button className="btn btn-primary submit" type="submit" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar mensaje'} <span className="arr">→</span>
              </button>
              <p className="terms">
                Al enviar este formulario aceptas nuestra <a href="#">política de privacidad</a>.
                Tu estatus migratorio no es relevante para tu caso y nunca será compartido fuera del equipo.
              </p>
            </form>
          </Fragment>
        ) : (
          <div className="success">
            <p className="ok">Mensaje recibido</p>
            <h2>Te llamamos en <em>menos de diez minutos.</em></h2>
            <p className="lede">
              Si necesitas hablar antes, marca directamente al <strong>(646) 724-6127</strong>.
              Contestamos las veinticuatro horas, en español.
            </p>
            <button className="btn btn-outline" onClick={onClose}>Cerrar</button>
          </div>
        )}
      </aside>
    </Fragment>
  );
}

