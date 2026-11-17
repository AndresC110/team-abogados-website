'use client';

import { Fragment } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import CookieConsent from '@/components/CookieConsent';
import { CLARITY_ID, openCookieSettings } from '@/lib/consent';

// Plantilla de las páginas legales (privacidad y términos), al estilo de las
// políticas de compañías grandes: título y fecha, un resumen "Lo esencial" arriba,
// índice lateral fijo, secciones numeradas y, al final, información de referencia
// en letra más pequeña. `copy` = { es: {...}, en: {...} }.

const NAV = {
  es: { home: 'Inicio', privacy: 'Privacidad', terms: 'Términos', toc: 'En esta página', top: 'Volver arriba', settings: 'Cambiar mis preferencias de cookies' },
  en: { home: 'Home', privacy: 'Privacy', terms: 'Terms', toc: 'On this page', top: 'Back to top', settings: 'Change my cookie preferences' },
};

function Block({ item, nav }) {
  if (typeof item === 'string') return <p>{item}</p>;
  if (item.lead) return <p className="lead">{item.lead}</p>;
  if (item.note) return <p className="note">{item.note}</p>;
  if (item.list) return <ul>{item.list.map((t) => <li key={t}>{t}</li>)}</ul>;
  if (item.dl) {
    return (
      <dl className="defs">
        {item.dl.map(([k, v]) => <Fragment key={k}><dt>{k}</dt><dd>{v}</dd></Fragment>)}
      </dl>
    );
  }
  if (item.table) {
    const [head, ...rows] = item.table;
    return (
      <div className="tbl">
        <table>
          <thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody>
        </table>
      </div>
    );
  }
  if (item.settings) {
    return CLARITY_ID ? <p><button type="button" className="linkish" onClick={openCookieSettings}>{nav.settings}</button></p> : null;
  }
  return null;
}

export default function LegalPage({ copy, current }) {
  const { lang, setLang } = useLanguage();
  const C = copy[lang];
  const N = NAV[lang];

  return (
    <div className="ta-legal" id="arriba">
      <header className="ta-legal__bar">
        <div className="container ta-legal__barin">
          <a className="brand" href="/"><img src="/assets/logo-mark-black.png" alt="" />Team Abogados</a>
          <nav className="ta-legal__nav">
            <a href="/">{N.home}</a>
            <a href="/privacidad" className={current === 'privacy' ? 'on' : ''}>{N.privacy}</a>
            <a href="/terminos" className={current === 'terms' ? 'on' : ''}>{N.terms}</a>
            <span className="lang">
              <button className={`lang-btn${lang === 'en' ? ' on' : ''}`} onClick={() => setLang('en')}>EN</button>
              <span className="lang-sep">/</span>
              <button className={`lang-btn${lang === 'es' ? ' on' : ''}`} onClick={() => setLang('es')}>ES</button>
            </span>
          </nav>
        </div>
      </header>

      <div className="ta-legal__hero">
        <div className="container">
          <p className="ta-legal__kicker">{C.eyebrow}</p>
          <h1>{C.title}</h1>
          <p className="ta-legal__updated">{C.updated}</p>
          {C.intro && <p className="ta-legal__intro">{C.intro}</p>}
        </div>
      </div>

      <div className="container ta-legal__wrap">
        <aside className="ta-legal__toc">
          <details open>
            <summary>{N.toc}</summary>
            <ol>
              {C.sections.map(([id, h]) => <li key={id}><a href={`#${id}`}>{h}</a></li>)}
              {C.appendix && <li className="appx"><a href={`#${C.appendix.id}`}>{C.appendix.title}</a></li>}
            </ol>
          </details>
        </aside>

        <article className="ta-legal__doc">
          {C.summary && (
            <section className="ta-legal__summary" aria-label={C.summary.title}>
              <h2>{C.summary.title}</h2>
              <ul>{C.summary.items.map((t) => <li key={t}>{t}</li>)}</ul>
            </section>
          )}

          {C.sections.map(([id, h, blocks], i) => (
            <section key={id} id={id} className="ta-legal__sec">
              <h2><span className="num">{i + 1}.</span> {h}</h2>
              {blocks.map((b, j) => <Block key={j} item={b} nav={N} />)}
            </section>
          ))}

          {C.appendix && (
            <section id={C.appendix.id} className="ta-legal__appendix">
              <h2>{C.appendix.title}</h2>
              {C.appendix.sections.map(([id, h, blocks]) => (
                <div key={id} id={id} className="ta-legal__sub">
                  <h3>{h}</h3>
                  {blocks.map((b, j) => <Block key={j} item={b} nav={N} />)}
                </div>
              ))}
            </section>
          )}

          <p className="ta-legal__totop"><a href="#arriba">{N.top} ↑</a></p>
        </article>
      </div>

      <footer className="ta-legal__foot">
        <div className="container">
          <span>© 2026 Team Abogados · 2322 Arthur Avenue, Suite 207, Bronx, NY 10458 · (646) 724-6127</span>
          <span><a href="/privacidad">{N.privacy}</a> · <a href="/terminos">{N.terms}</a></span>
        </div>
      </footer>
      <CookieConsent />
    </div>
  );
}
