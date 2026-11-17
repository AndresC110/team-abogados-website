'use client';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';
import {
  CLARITY_ID, OPEN_EVENT, readConsent, saveConsent, loadClarity, clearClarityCookies, track,
} from '@/lib/consent';

// Aviso de cookies: aparece hasta que la persona elige. "Aceptar" y "Rechazar"
// tienen el mismo peso visual (rechazar debe ser igual de fácil que aceptar).
// Se puede volver a abrir desde "Configurar cookies" en el pie de página.
export default function CookieConsent() {
  const { lang } = useLanguage();
  const T = translations[lang].cookies;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!CLARITY_ID) return;                 // sin analítica configurada no hay nada que pedir
    const c = readConsent();
    if (c && c.analytics) loadClarity(lang);
    if (!c) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    // Clics en teléfono y WhatsApp: los contamos como eventos (solo si aceptó).
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      const h = a.getAttribute('href') || '';
      if (h.startsWith('tel:')) track('clic_telefono');
      else if (h.includes('wa.me')) track('clic_whatsapp');
    };
    document.addEventListener('click', onClick, true);
    return () => { window.removeEventListener(OPEN_EVENT, reopen); document.removeEventListener('click', onClick, true); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!open) return null;

  const accept = () => { saveConsent(true); loadClarity(lang); setOpen(false); };
  const reject = () => {
    const before = readConsent();
    saveConsent(false); clearClarityCookies(); setOpen(false);
    // Si ya estaba cargado, recargar para que deje de grabar en esta misma visita.
    if (before && before.analytics) window.location.reload();
  };

  return (
    <div className="ta-cookies" role="dialog" aria-live="polite" aria-label={T.title}>
      <div className="ta-cookies__text">
        <strong>{T.title}</strong>
        <p>{T.body} <a href="/privacidad">{T.more}</a></p>
      </div>
      <div className="ta-cookies__btns">
        <button className="btn btn-outline ta-cookies__btn" onClick={reject}>{T.reject}</button>
        <button className="btn btn-primary ta-cookies__btn" onClick={accept}>{T.accept}</button>
      </div>
    </div>
  );
}
