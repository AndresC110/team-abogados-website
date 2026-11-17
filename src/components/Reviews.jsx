'use client';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';
import { track } from '@/lib/consent';

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
  const [state, setState] = useState('idle'); // idle | sending | sent
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

  const openForm = () => { setOpen(true); setState('idle'); setError(''); setRating(0); track('abrir_resena'); };

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
                <div><Stars value={Math.round(avg)} size={18} /><span>{list.length} {list.length === 1 ? T.one : T.many}</span></div>
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
            {state === 'sent' ? (
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
