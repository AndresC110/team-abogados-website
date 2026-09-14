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
          <video
            className="ta-video__player"
            src="/videos/ta3.mp4"
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
