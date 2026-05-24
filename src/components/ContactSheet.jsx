'use client';
import { useState, useEffect, Fragment } from 'react';

// ContactSheet.jsx — right-side intake modal
export default function ContactSheet({ open, onClose }) {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) setTimeout(() => setSent(false), 400);
  }, [open]);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
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
            <p className="lede">Un abogado del equipo te llama dentro de los próximos diez minutos. En español, sin compromiso.</p>
            <form onSubmit={submit}>
              <div className="field">
                <label>Nombre completo</label>
                <input required placeholder="Como aparece en tu identificación" />
              </div>
              <div className="field">
                <label>Teléfono</label>
                <input required type="tel" placeholder="(___) ___-____" />
              </div>
              <div className="field">
                <label>Tipo de accidente</label>
                <select defaultValue="">
                  <option value="" disabled>Selecciona una opción</option>
                  <option>Accidente de auto</option>
                  <option>Construcción · caída desde altura</option>
                  <option>Resbalón o caída</option>
                  <option>Atropello peatonal</option>
                  <option>Negligencia médica</option>
                  <option>Lesión laboral</option>
                  <option>Otro</option>
                </select>
              </div>
              <div className="field">
                <label>¿Cuándo desea ser contactado?</label>
                <select defaultValue="asap">
                  <option value="asap">Lo antes posible</option>
                  <option>Esta mañana (8 a 12 h)</option>
                  <option>Esta tarde (12 a 18 h)</option>
                  <option>Esta noche (18 a 22 h)</option>
                  <option>Mañana</option>
                  <option>Este fin de semana</option>
                </select>
              </div>
              <div className="field">
                <label>Cuéntanos qué pasó</label>
                <textarea placeholder="Escribe con tus propias palabras. Sin formalidades."></textarea>
              </div>
              <button className="btn btn-primary submit" type="submit">
                Enviar mensaje <span className="arr">→</span>
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

