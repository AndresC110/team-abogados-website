'use client';

// Attorneys.jsx — editorial attorney cards
export default function Attorneys() {
  const team = [
    { name: 'Carlos M. Rivera',    role: 'Socio fundador',     bio: 'Más de veinte años representando a la comunidad latina en casos de lesiones personales y construcción.' },
    { name: 'Ana Lucía Méndez',    role: 'Socia · Construcción', bio: 'Especialista en la Ley del Andamio §240 y casos de caídas desde altura en obras de Nueva York.' },
    { name: 'David T. Cruz',       role: 'Abogado asociado',   bio: 'Litigación de accidentes de tránsito en los cinco condados, con énfasis en lesiones de espalda y cuello.' },
  ];
  return (
    <section className="ta-section" id="team" style={{ paddingTop: 96 }}>
      <div className="container">
        <div className="head">
          <div>
            <p className="eyebrow">El equipo</p>
            <h2>Mismas caras desde la primera llamada hasta la <em>última.</em></h2>
          </div>
          <p className="desc">
            En Team Abogados no eres reasignado de oficina en oficina. El abogado que contesta tu primera llamada
            es el mismo que se sienta contigo en la mediación, y el mismo que firma el cheque al final.
          </p>
        </div>
        <div className="ta-attorneys">
          {team.map((a) => (
            <div key={a.name} className="attorney">
              <div className="portrait"><div className="ph"></div></div>
              <div className="meta">
                <div className="role">{a.role}</div>
                <div className="name">{a.name}</div>
              </div>
              <p className="bio">{a.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

