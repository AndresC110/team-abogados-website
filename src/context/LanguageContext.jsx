'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext({ lang: 'es', setLang: () => {} });

// El idioma elegido se recuerda en el navegador ('ta_lang') para que la página de
// privacidad y las visitas siguientes abran en el mismo idioma.
export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('es');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('ta_lang');
      if (saved === 'en' || saved === 'es') setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    if (typeof window.clarity === 'function') window.clarity('set', 'idioma', lang);
  }, [lang]);

  const setLang = (l) => {
    setLangState(l);
    try { window.localStorage.setItem('ta_lang', l); } catch {}
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
