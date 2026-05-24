import './globals.css';

export const metadata = {
  title: 'Team Abogados — Abogados de accidentes que luchan por ti',
  description: 'Abogados especializados en accidentes personales. Sin pago anticipado. Disponibles 24/7. Consulta gratis.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js" async></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
