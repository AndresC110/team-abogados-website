# Team Abogados Website — Project Context

## What this project is
A Spanish-language personal injury law firm marketing website for **Team Abogados** (New York / New Jersey).  
Live at: **https://teamabogados.com** (also https://team-abogados.vercel.app)

## Tech stack
| Layer | Tool |
|-------|------|
| Framework | Next.js (App Router) — `src/app/` directory |
| Hosting | Vercel (project: `team-abogados`) |
| Database | Supabase — project `team-abogados-db` (ID: `xsobqoujijvaxcjukrjw`) |
| Email notifications | EmailJS (server-side via REST API) |
| Styles | Custom CSS — `src/styles/marketing.css` + design tokens |
| Icons | Lucide (CDN) |
| Fonts | Cinzel, Cormorant Garamond, Manrope (Google Fonts) |

## Repository
- GitHub: `AndresC110/team-abogados-website`  
- Local path: `C:\Users\caice\Desktop\Team Abogadoss\design_handoff_team_abogados\website`
- Vercel watches this repo (connected May 2026). Pushes to `main` auto-deploy.

> ⚠️ There is also an OLD repo `AndresC110/team-abogados` — this is the original static prototype (just `index.html`). **Do not push to it.**

## Project structure
```
src/
  app/
    page.jsx              ← main single-page app (renders all sections)
    layout.jsx            ← root layout (fonts, Lucide CDN)
    globals.css           ← minimal reset (no Tailwind)
    api/
      contact/route.js    ← POST /api/contact — saves to Supabase + sends EmailJS
      ping/route.js       ← GET /api/ping — diagnostic endpoint (test Supabase + EmailJS)
  components/
    Header.jsx, Hero.jsx, PromiseStrip.jsx, WhyUs.jsx, HowWeWork.jsx
    Coverage.jsx, Testimonials.jsx, FAQ.jsx, Location.jsx, Footer.jsx
    ContactSheet.jsx      ← contact form modal (right-side slide-in)
  styles/
    marketing.css         ← all layout / component styles
public/
  assets/
    logo.png, logo-full.png, logo-icon.png
```

## Contact form flow
1. User clicks "Consulta Gratis" → `ContactSheet.jsx` modal opens
2. On submit → POST to `/api/contact`
3. API saves to Supabase `leads` table + sends EmailJS notification
4. Success state shows "Mensaje recibido / Te llamamos en menos de diez minutos"

## Supabase leads table schema
| Column | Type |
|--------|------|
| id | bigint (auto) |
| created_at | timestamptz (auto) |
| name | text |
| email | text |
| phone | text |
| urgency | text |
| message | text |

## Environment variables (set in Vercel)
```
NEXT_PUBLIC_SUPABASE_URL       # https://xsobqoujijvaxcjukrjw.supabase.co
SUPABASE_SERVICE_KEY           # service_role key (bypasses RLS)
EMAILJS_SERVICE_ID
EMAILJS_TEMPLATE_ID
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
EMAILJS_PRIVATE_KEY
NEXT_PUBLIC_ADMIN_EMAIL        # email to receive lead notifications
```

## Known issues resolved
- **PGRST125 Supabase error** — fixed by stripping trailing slash from URL in `route.js`
- **404 on custom domain** — fixed by setting Framework Preset to Next.js in Vercel build settings
- **Wrong repo connected** — Vercel was watching `team-abogados` (static HTML); fixed by reconnecting to `team-abogados-website`
- **Mobile header overlap** — phone/lang hidden on ≤880px breakpoint in `marketing.css`
- **FAQ accordion not working** — added missing CSS block for `.ta-faq` / `.faq-item`

## Vercel project settings (important)
- **Project name**: `team-abogados`
- **Framework Preset**: Next.js ← must be set, was blank causing 404
- **Root directory**: `./`
- **Connected repo**: `AndresC110/team-abogados-website`
- **Domains**: `teamabogados.com`, `www.teamabogados.com` (both Valid Configuration ✅)

## Diagnostic endpoint
`GET /api/ping` — tests Supabase insert/delete live and reports which env vars are present.  
Returns JSON. **Delete this file before going fully public.**

## What still needs testing / may need work
1. Submit the contact form on `teamabogados.com` and verify a row appears in Supabase `leads`
2. Verify EmailJS notification email is received
3. If EmailJS fails — check `EMAILJS_PRIVATE_KEY` is set correctly in Vercel env vars
4. Phone numbers in site are placeholder `(718) 000-0000` — update to real number
5. Google Maps embed in Location section may need a real API key
