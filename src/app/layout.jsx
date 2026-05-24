import { Metadata } from 'next';

export const metadata = {
  title: 'Team Abogados — Abogados de accidentes que luchan por ti',
  description: 'Abogados especializados en accidentes personales. Sin pago anticipado. Disponibles 24/7. Consulta gratis.',
  viewport: 'width=device-width, initial-scale=1',
  charset: 'utf-8',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js" async></script>
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
