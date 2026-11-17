'use client';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';

export default function VideoSection({ onContactClick }) {
  const { lang } = useLanguage();
  const T = translations[lang].video;
  return (
    <section className="ta-video" id="video">
      <div className="container">
        <div className="ta-video__head">
          <p className="eyebrow" style={{ color: 'var(--accent)' }}>{T.eyebrow}</p>
          <h2 className="ta-video__title">{T.h2a}<em>{T.h2em}</em></h2>
          <p className="ta-video__lede">{T.lede}</p>
        </div>
        <div className="ta-video__player-wrap">
          {/* Un video por idioma: el audio es el mismo (español); cambian subtítulos, formulario y cierre.
              key={lang} hace que el reproductor se recargue al cambiar de idioma. */}
          <video
            key={lang}
            className="ta-video__player"
            src={lang === 'en' ? '/videos/team-abogados-en.mp4' : '/videos/team-abogados.mp4'}
            poster="/videos/team-abogados-poster.jpg"
            width={1920}
            height={1080}
            controls
            preload="metadata"
            playsInline
          />
        </div>
        <div className="ta-video__cta">
          <button className="btn btn-gold" onClick={onContactClick}>
            {T.cta} <span className="arr">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
