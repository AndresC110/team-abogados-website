'use client';
import { useState, useEffect, useRef, Fragment } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import t from '@/lib/translations';

export default function ContactSheet({ open, onClose }) {
  const { lang } = useLanguage();
  const tx = t[lang].sheet;

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

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al enviar el formulario');
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
        <button className="x" onClick={onClose} aria-label={tx.close_aria}>
          <i data-lucide="x" width="20" height="20" strokeWidth="1.5"></i>
        </button>

        {!sent ? (
          <Fragment>
            <p className="eyebrow">{tx.eyebrow}</p>
            <h2>{tx.h2} <em>{tx.h2_em}</em></h2>
            <p className="lede">{tx.lede}</p>
            {error && <div style={{ color: 'var(--ta-gold-700)', marginBottom: 12 }}>{error}</div>}
            <form ref={formRef} onSubmit={submit}>
              <div className="field">
                <label>{tx.labels.name}</label>
                <input name="name" required placeholder={tx.placeholders.name} />
              </div>
              <div className="field">
                <label>{tx.labels.phone}</label>
                <input name="phone" required type="tel" placeholder={tx.placeholders.phone} />
              </div>
              <div className="field">
                <label>{tx.labels.email}</label>
                <input name="email" required type="email" placeholder={tx.placeholders.email} />
              </div>
              <div className="field">
                <label>{tx.labels.when}</label>
                <select name="contactTime" defaultValue="asap">
                  <option value="asap">{tx.whenOptions.asap}</option>
                  <option value="morning">{tx.whenOptions.morning}</option>
                  <option value="afternoon">{tx.whenOptions.afternoon}</option>
                  <option value="evening">{tx.whenOptions.evening}</option>
                  <option value="tomorrow">{tx.whenOptions.tomorrow}</option>
                  <option value="weekend">{tx.whenOptions.weekend}</option>
                </select>
              </div>
              <div className="field">
                <label>{tx.labels.message}</label>
                <textarea name="message" required placeholder={tx.placeholders.message}></textarea>
              </div>
              <button className="btn btn-primary submit" type="submit" disabled={loading}>
                {loading ? tx.sending : tx.submit} <span className="arr">→</span>
              </button>
              <p className="terms">
                {tx.terms} <a href="#">{tx.terms_link}</a>{tx.terms_suffix}
              </p>
            </form>
          </Fragment>
        ) : (
          <div className="success">
            <p className="ok">{tx.success.ok}</p>
            <h2>{tx.success.h2} <em>{tx.success.h2_em}</em></h2>
            <p className="lede">
              {tx.success.lede} <strong>(646) 724-6127</strong>{tx.success.lede_suffix}
            </p>
            <button className="btn btn-outline" onClick={onClose}>{tx.success.close}</button>
          </div>
        )}
      </aside>
    </Fragment>
  );
}
