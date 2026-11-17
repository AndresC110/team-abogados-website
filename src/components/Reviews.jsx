'use client';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';
import { track } from '@/lib/consent';
import { GOOGLE_REVIEW_URL, OPEN_REVIEW_EVENT } from '@/lib/reviews';

function GoogleG() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

// Reseñas reales de clientes. Se muestran solo las aprobadas (ver /api/reviews).
// Cualquiera puede dejar la suya con el botón; queda pendiente hasta revisarla.

function Star({ filled, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.8l2.85 5.78 6.38.93-4.62 4.5 1.09 6.35L12 17.36l-5.7 3 1.09-6.35-4.62-4.5 6.38-.93z"
        fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}
function Stars({ value, size }) {
  return <span className="rv-stars" aria-label={`${value}/5`}>{[1, 2, 3, 4, 5].map((n) => <Star key={n} filled={n <= value} size={size} />)}</span>;
}

export default function Reviews() {
  const { lang } = useLanguage();
  const T = translations[lang].reviews;
  const [reviews, setReviews] = useState(null);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [state, setState] = useState('idle'); // choose | idle | sending | sent
  const [error, setError] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    fetch('/api/reviews').then((r) => r.json()).then((d) => setReviews(d.reviews || [])).catch(() => setReviews([]));
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);

  const openForm = () => {
    setOpen(true); setState(GOOGLE_REVIEW_URL ? 'choose' : 'idle'); setError(''); setRating(0); track('abrir_resena');
  };
  const openRef = useRef(openForm);
  openRef.current = openForm;

  // Abrir desde la invitación de la portada, y directamente con teamabogados.com/resena (?resena).
  useEffect(() => {
    const h = () => openRef.current();
    window.addEventListener(OPEN_REVIEW_EVENT, h);
    let t;
    const q = new URLSearchParams(window.location.search);
    if (q.has('resena') || q.has('review') || window.location.hash === '#dejar-resena') {
      t = setTimeout(() => {
        document.getElementById('resenas')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        openRef.current();
      }, 450);
    }
    return () => { window.removeEventListener(OPEN_REVIEW_EVENT, h); clearTimeout(t); };
  }, []);

  const goGoogle = () => { track('resena_google'); window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener'); setOpen(false); };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    const f = new FormData(formRef.current);
    if (!rating) { setError(T.errRating); return; }
    setState('sending');
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.get('name'), location: f.get('location'), body: f.get('body'),
          rating, lang, consent: f.get('consent') === 'on', website: f.get('website'),
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || T.errGeneric);
      setState('sent');
      track('resena_enviada');
    } catch (err) {
      setError(err.message || T.errGeneric);
      setState('idle');
    }
  };

  const list = reviews || [];
  const avg = list.length ? list.reduce((s, r) => s + r.rating, 0) / list.length : 0;
  const fmt = (d) => new Date(d).toLocaleDateString(lang === 'en' ? 'en-US' : 'es-US', { month: 'long', year: 'numeric' });

  return (
    <section className="ta-reviews" id="resenas">
      <div className="container">
        <div className="rv-head">
          <div>
            <p className="eyebrow">{T.eyebrow}</p>
            <h2>{T.h2a}<em>{T.h2em}</em></h2>
          </div>
          <div className="rv-cta">
            {list.length > 0 && (
              <div className="rv-score">
                <strong>{avg.toFixed(1)}</strong>
                <div><Stars value={Math.round(avg)} size={18} /><small className="rv-count">{list.length} {list.length === 1 ? T.one : T.many}</small></div>
              </div>
            )}
            <button type="button" className="btn btn-gold rv-btn" onClick={openForm}>{T.leave} <span className="arr">→</span></button>
          </div>
        </div>

        {reviews !== null && list.length === 0 && (
          <div className="rv-empty">
            <Stars value={0} size={30} />
            <h3>{T.emptyTitle}</h3>
            <p>{T.emptyBody}</p>
            <button type="button" className="btn btn-primary rv-btn" onClick={openForm}>{T.leaveFirst} <span className="arr">→</span></button>
          </div>
        )}

        {list.length > 0 && (
          <div className="rv-grid">
            {list.map((r) => (
              <figure key={r.id} className="rv-card">
                <Stars value={r.rating} size={17} />
                <blockquote>{r.body}</blockquote>
                <figcaption>
                  <span className="rv-avatar" aria-hidden="true">{r.name.trim().charAt(0).toUpperCase()}</span>
                  <span><b>{r.name}</b>{r.location ? ` · ${r.location}` : ''}<br /><small>{fmt(r.created_at)}</small></span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
        <p className="rv-note">{T.note}</p>
      </div>

      {open && (
        <div className="rv-modal" role="dialog" aria-modal="true" aria-label={T.formTitle} onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="rv-dialog">
            <button type="button" className="rv-x" onClick={() => setOpen(false)} aria-label={T.close}>×</button>
            {state === 'choose' ? (
              <div className="rv-choose">
                <h3>{T.chooseTitle}</h3>
                <p className="rv-sub">{T.chooseSub}</p>
                <button type="button" className="rv-opt rv-opt--google" onClick={goGoogle}>
                  <GoogleG />
                  <span><b>{T.google}</b><small>{T.googleHint}</small></span>
                  <span className="rv-opt__badge">{T.recommended}</span>
                </button>
                <button type="button" className="rv-opt" onClick={() => setState('idle')}>
                  <span className="rv-opt__pen" aria-hidden="true">✎</span>
                  <span><b>{T.here}</b><small>{T.hereHint}</small></span>
                </button>
              </div>
            ) : state === 'sent' ? (
              <div className="rv-thanks">
                <Stars value={rating} size={28} />
                <h3>{T.thanksTitle}</h3>
                <p>{T.thanksBody}</p>
                <button type="button" className="btn btn-primary" onClick={() => setOpen(false)}>{T.close}</button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={submit} data-clarity-mask="true">
                <h3>{T.formTitle}</h3>
                <p className="rv-sub">{T.formSub}</p>
                <div className="rv-field">
                  <label>{T.rating}</label>
                  <div className="rv-pick" role="radiogroup" aria-label={T.rating} onMouseLeave={() => setHover(0)}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} type="button" role="radio" aria-checked={rating === n} aria-label={`${n}`}
                        className={(hover || rating) >= n ? 'on' : ''} onMouseEnter={() => setHover(n)} onClick={() => setRating(n)}>
                        <Star filled={(hover || rating) >= n} size={30} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="rv-field"><label>{T.body}</label><textarea name="body" required minLength={20} maxLength={1200} placeholder={T.bodyPh}></textarea></div>
                <div className="rv-row">
                  <div className="rv-field"><label>{T.name}</label><input name="name" required minLength={2} maxLength={60} placeholder={T.namePh} /></div>
                  <div className="rv-field"><label>{T.location} <span>{T.optional}</span></label><input name="location" maxLength={60} placeholder={T.locationPh} /></div>
                </div>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }} />
                <label className="rv-check"><input type="checkbox" name="consent" required /> <span>{T.consent}</span></label>
                {error && <p className="rv-error">{error}</p>}
                <button type="submit" className="btn btn-primary rv-submit" disabled={state === 'sending'}>{state === 'sending' ? T.sending : T.submit}</button>
                <p className="rv-fine">{T.fine} <a href="/privacidad">{T.privacy}</a></p>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
