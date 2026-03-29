# Kresic Digital Systems — Professional Portfolio Site

> High-performance, GDPR-compliant B2B portfolio and service landing page for a Germany-based Quant Developer & Automation Architect. Built to the same engineering standard as the client work it describes.

---

## Overview

This repository is the production codebase for **kresic.digital** — the public-facing presence of Kresic Digital Systems. It is not a template. Every architectural decision reflects the operational standards applied to real client engagements: type-safe from edge to database, hardened for DACH compliance, and optimised for Core Web Vitals.

The site showcases four service pillars — AI integration, web maintenance, business automation, and quantitative analytics tooling — and includes a fully interactive market analytics terminal demo as a live technical proof-of-concept.

---

## Tech stack

| Layer | Technology | Rationale |
|---|---|---|
| Framework | **Next.js 15** (App Router) | Hybrid SSG + Server Actions; zero-JS legal pages, React Server Components where possible |
| Language | **TypeScript** (strict mode) | End-to-end type safety; no `any`, no implicit returns |
| Styling | **Tailwind CSS v3** | Utility-first; `darkMode: "media"` for OS-native dark mode with no JS overhead |
| Animation | **Framer Motion** | Used exclusively in the demo terminal; main site uses `IntersectionObserver` + CSS transitions for zero-bundle-cost scroll reveals |
| Email | **Resend** via Server Action | Server-side only; API key never reaches the client |
| i18n | Custom React Context (EN/DE) | Client-side dictionary swap with full TypeScript type coverage on all copy strings |
| Images | `next/image` | AVIF + WebP via `next.config.mjs`, `priority` on above-the-fold assets, `sizes` tuned to actual render widths |
| Icons | **Lucide React** | Tree-shaken; only imported icons are bundled |
| Deployment | **Vercel** | Edge-cached static routes, serverless Server Actions, environment-variable-gated secrets |

---

## Key features

### Secure contact form with GDPR double-keying
The contact form enforces consent at two independent layers:
- **Client layer:** HTML `required` attribute on the checkbox prevents form submission without consent ticked.
- **Server layer:** The Server Action independently verifies `consent === "on"` before processing any data. If a user bypasses the client validation (e.g., via `curl` or DevTools), the server rejects the request and returns a localised error.

All user-supplied content in the HTML email body is passed through `escapeHtml()` before rendering, eliminating XSS vectors in the delivered email.

### EN/DE internationalisation
All user-visible strings are managed through a strongly-typed `LandingDictionary` type (`dictionaries/types.ts`). JSON dictionaries (`de.json`, `en.json`) are re-exported via TypeScript files with a type assertion, so any missing key is a compile-time error — not a runtime blank string.

The language switcher (`LanguageSwitcher.tsx`) updates a React Context without any page reload, route change, or network request.

### Interactive market analytics demo (`/demo/market-analytics`)
A fully client-rendered terminal UI demonstrating quant tooling capabilities:
- Correlation heatmap with seeded deterministic data
- Multi-ticker scanner with mock volatility / momentum signals
- Framer Motion transitions for professional UX polish
- Legal disclaimer in both EN and DE (inlined in the component to avoid bundling the full i18n dictionary into this route)
- `robots: noindex` metadata to prevent search engines from surfacing mock financial data

### HTTP security headers
All routes receive a full suite of security headers configured in `next.config.mjs`:
- `Content-Security-Policy` (scoped to self + required Google Fonts CDN)
- `X-Frame-Options: SAMEORIGIN` (clickjacking protection)
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security` with 2-year `max-age` + `preload`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` disabling camera, microphone, geolocation, payment

---

## Security & compliance highlights

### GDPR / DACH (Germany)
- **Impressum** (`/impressum`): Compliant with § 5 TMG. Includes legal name, address, responsible person, and Kleinunternehmer notice (§ 19 UStG).
- **Datenschutzerklärung** (`/datenschutz`): Art. 13 DSGVO-compliant. Describes all processing activities (hosting, contact form via Resend, email), legal bases (Art. 6 Abs. 1 lit. b), storage duration (request lifecycle only), and user rights (Art. 15–21 DSGVO).
- **No analytics, no cookies, no tracking pixels.** The site does not set any cookies and does not load any third-party analytics scripts. No consent banner is legally required.
- **Written contact only.** No phone number is published. Email contact via Proton Mail (E2E-encrypted between Proton accounts).

### API key security
- `RESEND_API_KEY` is consumed exclusively in a `"use server"` Server Action. It is never imported in any Client Component and never exposed to the browser.
- All `console.log` / `console.warn` diagnostics in the Server Action are gated behind `NODE_ENV === "development"` — production logs contain no operational state.
- A `RESEND_FROM_EMAIL` environment variable is required in production. The `onboarding@resend.dev` test sender is only used as a fallback in development; in production its absence causes the action to return a clean error rather than attempt an invalid send.

---

## Project structure

```
.
├── app/
│   ├── actions/
│   │   └── sendEmail.ts          # Server Action — Resend integration
│   ├── demo/
│   │   └── market-analytics/     # Quant terminal demo (noindex)
│   ├── impressum/                # Legal imprint (DACH)
│   ├── datenschutz/              # Privacy policy (DSGVO)
│   ├── layout.tsx                # Root layout, metadata, security baseline
│   └── page.tsx                  # Entry point → LandingPage
├── components/
│   ├── LandingPage.tsx           # Full page, section by section
│   ├── ContactFormWithConsent.tsx# GDPR-keyed form with useTransition
│   ├── FadeIn.tsx                # IntersectionObserver scroll reveal
│   ├── LanguageSwitcher.tsx      # EN/DE toggle (zero network calls)
│   └── Providers.tsx             # Client boundary for I18nProvider
├── dictionaries/
│   ├── types.ts                  # LandingDictionary type
│   ├── en.json / de.json         # All copy strings (type-asserted)
│   └── en.ts / de.ts             # Re-exports with TypeScript type assertion
├── lib/
│   ├── i18n.tsx                  # I18nProvider + useI18n hook
│   └── site.ts                   # Centralised brand constants (BRAND_NAME, SITE_EMAIL…)
├── public/images/                # Static assets (portret.webp)
├── next.config.mjs               # Security headers, image formats
├── tailwind.config.ts            # Terminal color palette, dark mode
├── .env.example                  # Required variables — copy to .env.local
└── REPAIR_LOG.md                 # Security audit + fixes (2026-03-30)
```

---

## Local development

### Prerequisites
- Node.js ≥ 20
- npm ≥ 10

### Setup

```bash
# 1. Clone
git clone <your-repo-url>
cd moj_sajt

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Open .env.local and fill in:
#   NEXT_PUBLIC_SITE_URL=http://localhost:3000
#   RESEND_API_KEY=re_xxxxxxxxxxxx
#   RESEND_FROM_EMAIL=Kresic Digital Systems <noreply@yourdomain.com>

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

A clean build with zero TypeScript errors and zero ESLint warnings is required before any deployment.

---

## Deployment (Vercel)

1. Push to your connected Git repository.
2. In the Vercel dashboard: **Project → Settings → Environment Variables**
   - Add `RESEND_API_KEY` → check **Production** (and Preview if needed)
   - Add `RESEND_FROM_EMAIL` → a verified sender on your Resend domain
   - Add `NEXT_PUBLIC_SITE_URL` → your production URL (e.g. `https://kresic.digital`)
3. Trigger a manual **Redeploy** after adding variables — Vercel does not automatically redeploy when env vars change.

---

## Licence

All rights reserved. © 2025–2026 Danijel Kresic / Kresic Digital Systems.  
This codebase is not open source. Unauthorised reproduction or redistribution is prohibited.
