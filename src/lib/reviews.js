// Reseñas: abrir el formulario desde cualquier parte de la página y enlace a Google.
//
// GOOGLE_REVIEW_URL: enlace "Pedir reseñas" del Perfil de Empresa de Google
// (Google Business Profile → Pedir reseñas → copiar enlace). Si está vacío, el botón
// abre directamente el formulario propio del sitio.
export const GOOGLE_REVIEW_URL = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || '';
export const OPEN_REVIEW_EVENT = 'ta:open-review';

export function openReview() {
  window.dispatchEvent(new Event(OPEN_REVIEW_EVENT));
}
