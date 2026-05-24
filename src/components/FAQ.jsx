'use client';
import { useState, useEffect } from 'react';

// FAQ.jsx — "Preguntas frecuentes" accordion, verbatim from site
export default function FAQ() {
  const items = [
    { q: '¿Puedo demandar sin tener documentos al día?',
      a: 'Sí. En muchos estados, puedes presentar una demanda independientemente de tu estatus migratorio o documentación. No dejes que el miedo te impida obtener la justicia que mereces.' },
    { q: '¿Cuánto tiempo tengo para presentar una demanda?',
      a: 'Depende del estado. Generalmente tienes entre dos y tres años desde la fecha del accidente, pero es crucial actuar rápido para preservar la evidencia. Contáctanos hoy.' },
    { q: '¿Quién paga mis facturas médicas después del accidente?',
      a: 'En muchos casos, el seguro del responsable cubre tus gastos médicos. Negociamos directamente con las aseguradoras para que recibas atención sin pagar de tu bolsillo.' },
    { q: '¿Qué pasa si el accidente fue en una zona de construcción?',
      a: 'Las leyes de andamios y construcción te protegen fuertemente. Podemos aplicar la Ley del Andamio para garantizarte la máxima compensación por negligencia del empleador.' },
    { q: '¿Cuánto me costaría contratar a Team Abogados?',
      a: 'Nada por adelantado. Sólo cobramos un porcentaje de la compensación si ganamos tu caso. Si no ganamos, no pagas absolutamente nada.' },
  ];
  const [open, setOpen] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.lucide) {
      window.lucide.createIcons();
    }
  }, [open]);

  return (
    <section className="ta-section ta-faq" id="faq">
      <div className="container">
        <div className="head">
          <div>
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2>Todo lo que necesitas <em>saber.</em></h2>
          </div>
          <p className="desc">
            Las cinco preguntas que nos hacen casi todos los días. Si la tuya no está aquí,
            llámanos — contestamos las veinticuatro horas.
          </p>
        </div>
        <div className="faq-list">
          {items.map((it, i) => (
            <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{it.q}</span>
                <i data-lucide={open === i ? 'minus' : 'plus'} width="20" height="20" strokeWidth="1.5"></i>
              </button>
              <div className="faq-a"><p>{it.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

