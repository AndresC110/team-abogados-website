// Consentimiento de cookies y analítica (Microsoft Clarity).
//
// Regla: el script de Clarity NO se descarga hasta que la persona pulsa "Aceptar".
// Si rechaza, no se carga nada y no se crea ninguna cookie de analítica.
// La elección vive en localStorage del visitante ('ta_consent'); es necesaria para
// recordar su decisión y no es una cookie de seguimiento.

export const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || '';
const KEY = 'ta_consent';
const VERSION = 1; // subir si cambia lo que se pide, para volver a preguntar
export const OPEN_EVENT = 'ta:cookie-settings';

export function readConsent() {
  try {
    const v = JSON.parse(window.localStorage.getItem(KEY) || 'null');
    if (v && v.v === VERSION && typeof v.analytics === 'boolean') return v;
  } catch {}
  return null;
}

export function saveConsent(analytics) {
  const v = { v: VERSION, analytics, ts: new Date().toISOString() };
  try { window.localStorage.setItem(KEY, JSON.stringify(v)); } catch {}
  return v;
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

let loaded = false;
export function loadClarity(lang) {
  if (loaded || !CLARITY_ID || typeof window === 'undefined') return;
  loaded = true;
  // Fragmento oficial de Clarity: crea la cola window.clarity y carga el script.
  window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.clarity.ms/tag/' + encodeURIComponent(CLARITY_ID);
  document.head.appendChild(s);
  // Señal de consentimiento: analítica sí, publicidad no.
  window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' });
  window.clarity('consent');
  if (lang) window.clarity('set', 'idioma', lang);
}

// Borra las cookies que Clarity pudo haber dejado si la persona retira su consentimiento.
export function clearClarityCookies() {
  const names = ['_clck', '_clsk', 'CLID', 'ANONCHK', 'MR', 'MUID', 'SM'];
  const host = window.location.hostname;
  const domains = ['', host, '.' + host, '.' + host.replace(/^www\./, '')];
  for (const n of names) for (const d of domains) {
    document.cookie = `${n}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? '; domain=' + d : ''}`;
  }
}

// Evento personalizado para Clarity (solo si la persona aceptó y el script está cargado).
export function track(name) {
  try { if (loaded && typeof window.clarity === 'function') window.clarity('event', name); } catch {}
}
