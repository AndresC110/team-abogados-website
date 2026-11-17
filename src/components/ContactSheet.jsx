'use client';
import { useState, useEffect, useRef, Fragment } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';
import { track } from '@/lib/consent';

export default function ContactSheet({ open, onClose }) {
  const { lang } = useLanguage();
  const T = translations[lang].contact;

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setTimeout(() => { setSent(false); setError(''); }, 400);
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
        company: formData.get('company'), // honeypot — real users leave this empty
      };
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(json.error || 'Error al enviar el formulario');
      setSent(true);
      track('formulario_enviado');
    } catch (err) {
      setError(err.message || 'Error procesando la solicitud');
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
            <p className="eyebrow">{T.eyebrow}</p>
            <h2>{T.h2}<em>{T.h2em}</em></h2>
            <p className="lede">{T.lede}</p>
            {error && <div style={{ color: 'var(--ta-gold-700)', marginBottom: 12 }}>{error}</div>}
            {/* data-clarity-mask: Clarity nunca graba lo que se escribe aqui */}
            <form ref={formRef} onSubmit={submit} data-clarity-mask="true">
              {/* Honeypot: hidden from humans, irresistible to bots. Kept out of
                  the tab order and the accessibility tree. */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
              />
              <div className="field">
                <label>{T.labelName}</label>
                <input name="name" required placeholder={T.phName} />
              </div>
              <div className="field">
                <label>{T.labelPhone}</label>
                <input name="phone" required type="tel" placeholder={T.phPhone} />
              </div>
              <div className="field">
                <label>{T.labelEmail}</label>
                <input name="email" required type="email" placeholder={T.phEmail} />
              </div>
              <div className="field">
                <label>{T.labelWhen}</label>
                <select name="contactTime" defaultValue="asap">
                  <option value="asap">{T.optAsap}</option>
                  <option value="morning">{T.optMorning}</option>
                  <option value="afternoon">{T.optAfternoon}</option>
                  <option value="evening">{T.optEvening}</option>
                  <option value="tomorrow">{T.optTomorrow}</option>
                  <option value="weekend">{T.optWeekend}</option>
                </select>
              </div>
              <div className="field">
                <label>{T.labelMsg}</label>
                <textarea name="message" required placeholder={T.phMsg}></textarea>
              </div>
              <button className="btn btn-primary submit" type="submit" disabled={loading}>
                {loading ? T.submitting : T.submit} <span className="arr">→</span>
              </button>
              <p className="terms">
                {T.terms} <a href="#">{T.termsLink}</a>. {T.termsEnd}
              </p>
            </form>
          </Fragment>
        ) : (
          <div className="success">
            <p className="ok">{T.successOk}</p>
            <h2>{T.successH2}<em>{T.successH2em}</em></h2>
            <p className="lede">{T.successLede}</p>
            <button className="btn btn-outline" onClick={onClose}>{T.successClose}</button>
          </div>
        )}
      </aside>
    </Fragment>
  );
}
