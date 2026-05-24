'use client';

// Testimonial.jsx — single pull-quote on bone background
export default function Testimonial() {
  return (
    <section className="ta-testimonial">
      <div className="container">
        <p className="eyebrow">Lo que dicen los clientes</p>
        <blockquote>
          “Me trataron como persona, no como expediente. Y ganaron.”
        </blockquote>
        <div className="who">
          <span className="dash"></span>
          <span><b>Rosario M.</b> · Caso de accidente automovilístico · Queens, 2024</span>
        </div>
      </div>
    </section>
  );
}

