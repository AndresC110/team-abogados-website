'use client';

import { useLanguage } from '@/context/LanguageContext';
import t from '@/lib/translations';

export default function PromiseStrip() {
  const { lang } = useLanguage();
  const items = t[lang].promise.items;

  return (
    <section className="ta-promise" id="services">
      <div className="container">
        <div className="grid grid-4">
          {items.map((it) => (
            <div key={it.n} className="item">
              <div className="num">{it.n}</div>
              <h3>{it.h}</h3>
              <p>{it.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
