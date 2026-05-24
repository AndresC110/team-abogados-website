# Team Abogados Website - Local Development Setup

## Project Overview

This is a Next.js 14 marketing website for Team Abogados, a personal injury law firm serving the Spanish-speaking community in NY/NJ. The site features:

- Beautiful, high-fidelity design system (colors, typography, spacing)
- Responsive marketing pages with smooth scrolling navigation
- Contact form with Supabase database integration
- Email notifications via EmailJS
- Production-ready deployment on Vercel

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: CSS (design tokens from `colors_and_type.css`)
- **Database**: Supabase (PostgreSQL)
- **Email**: EmailJS
- **Hosting**: Vercel
- **Icons**: Lucide Icons (via CDN)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Navigate to the website directory
cd website

# Install dependencies
npm install

# Copy environment variables template
cp .env.example .env.local

# Edit .env.local with your actual values
# (See DEPLOYMENT.md for how to get these)
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The site will auto-reload when you make changes.

## Project Structure

```
website/
├── src/
│   ├── app/
│   │   ├── page.jsx           # Main page (renders all sections)
│   │   ├── layout.jsx         # Root layout with metadata
│   │   └── api/
│   │       └── contact/
│   │           └── route.js   # Form submission API endpoint
│   ├── components/            # React components (one per page section)
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── PromiseStrip.jsx
│   │   ├── WhyUs.jsx
│   │   ├── HowWeWork.jsx
│   │   ├── Coverage.jsx
│   │   ├── Testimonials.jsx
│   │   ├── FAQ.jsx
│   │   ├── Location.jsx
│   │   ├── Footer.jsx
│   │   └── ContactSheet.jsx   # Right-side form modal
│   └── styles/
│       ├── colors_and_type.css    # Design tokens
│       └── marketing.css          # Layout and component styles
├── public/
│   └── assets/                # Logo and brand assets
├── .env.example              # Environment variables template
├── DEPLOYMENT.md             # Production deployment guide
├── SETUP.md                  # This file
└── package.json
```

## Available Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting (optional)
npm run lint
```

## Environment Variables

Create a `.env.local` file (don't commit this!):

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# EmailJS
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your-public-key
EMAILJS_PRIVATE_KEY=your-private-key
EMAILJS_SERVICE_ID=your-service-id
EMAILJS_TEMPLATE_ID=your-template-id

# Admin email
NEXT_PUBLIC_ADMIN_EMAIL=contact@teamabogados.com
```

See `DEPLOYMENT.md` for how to obtain these values.

## Making Changes

### Updating Page Content

Edit the corresponding component in `src/components/`:

- **Hero section**: `Hero.jsx`
- **Services/Promise section**: `PromiseStrip.jsx`
- **Why Us section**: `WhyUs.jsx`
- **How We Work section**: `HowWeWork.jsx`
- **Coverage section**: `Coverage.jsx`
- **Testimonials section**: `Testimonials.jsx`
- **FAQ section**: `FAQ.jsx`
- **Location section**: `Location.jsx`
- **Footer**: `Footer.jsx`

### Adding Navigation Links

Update the navigation links in `Header.jsx` and `Footer.jsx`. The existing page sections have `id` attributes:

- `#services` - Servicios (Promise strip)
- `#why` - ¿Por qué elegirnos?
- `#how` - Cómo trabajamos
- `#coverage` - Cobertura
- `#testimonials` - Testimonios
- `#faq` - Preguntas frecuentes
- `#ubicacion` - Ubicación/Contacto

### Styling

All styling uses CSS variables defined in `colors_and_type.css`. Key variables:

```css
/* Colors */
--ta-black: #0B0B0C        /* Primary ink */
--ta-cream: #F4EEDF        /* Primary canvas */
--ta-gold-500: #C9A961     /* Primary brand accent */
--ta-paper: #FBF8F1        /* Card backgrounds */

/* Typography */
--font-display: Cinzel     /* Headlines and branding */
--font-serif: Cormorant Garamond  /* Body serifs */
--font-sans: Manrope       /* Body sans-serif */

/* Spacing */
--gutter: 24px             /* Side padding */
--container-lg: 1280px     /* Max content width */

/* Motion */
--dur-fast: 140ms          /* Hover duration */
--dur-base: 220ms          /* State change duration */
--dur-slow: 420ms          /* Entry animation duration */
--ease-out: cubic-bezier(.2, .7, .2, 1)
```

## Form Handling

The contact form:

1. Captures user input in `ContactSheet.jsx`
2. Sends to `/api/contact` endpoint
3. API route inserts data into Supabase `contact_submissions` table
4. API route triggers email via EmailJS
5. Success message shown to user

### Testing the Form Locally

With proper `.env.local` values:

1. Start dev server: `npm run dev`
2. Click "Consulta gratis" button
3. Fill out form and submit
4. Check Supabase dashboard for new entry
5. Check email inbox for notification

## Responsive Design

The site is mobile-first and responsive:
- Mobile (< 880px): Single column layout
- Tablet & Desktop (≥ 880px): Multi-column layouts

Test on multiple devices:
```bash
npm run dev
# Open DevTools (F12)
# Toggle device toolbar (Ctrl+Shift+M)
# Test on various screen sizes
```

## Performance Tips

- Images are optimized automatically by Next.js
- CSS is minified in production builds
- Code splitting happens automatically
- Use Vercel Analytics to monitor performance

## Common Issues

**Components not rendering**:
- Ensure 'use client' directive is at the top of client components
- Check browser console for errors

**Form not submitting**:
- Verify environment variables are set
- Check Vercel/browser console logs
- Ensure Supabase table exists with correct schema

**Styling issues**:
- Clear browser cache (Ctrl+Shift+Del)
- Restart dev server
- Verify CSS imports in page.jsx

## Deployment

See `DEPLOYMENT.md` for complete instructions on:
- Setting up Supabase
- Configuring EmailJS
- Deploying to Vercel
- Pointing custom domain

Quick start:
```bash
# 1. Push to GitHub
git push

# 2. Create Vercel project from GitHub
# 3. Add environment variables in Vercel settings
# 4. Deploy automatically on git push
```

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **EmailJS Docs**: https://www.emailjs.com/docs
- **Vercel Docs**: https://vercel.com/docs

## License

This project is proprietary to Team Abogados. All rights reserved.
