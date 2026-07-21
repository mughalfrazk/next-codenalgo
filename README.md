# Code & Algo — Marketing Site

Production Next.js implementation of the Code & Algo marketing site (software
development & IT consultancy). Built from the approved Claude design across five
pages: **Home, About, Services, Service detail, Contact**.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — design tokens defined in `src/app/globals.css`
- **Resend** for contact-form email delivery (optional; see below)
- **Zod** for shared client/server form validation

## Requirements

- **Node 24** (pinned in `.nvmrc`)

- **Yarn** as the package manager

```bash
nvm use            # picks up .nvmrc → Node 24
yarn install
```

## Develop

```bash
yarn dev           # http://localhost:3000
yarn lint          # ESLint
yarn build         # production build (static-generates all routes)
yarn start         # serve the production build
```

## Project structure

```
src/
  app/
    layout.tsx              root layout: fonts, metadata, nav/footer, background blobs
    page.tsx                Home
    about/page.tsx          About
    services/page.tsx       Services listing
    services/[slug]/page.tsx  Dynamic service detail (one per service, statically generated)
    contact/
      page.tsx              Contact
      actions.ts            'use server' form submission (Zod + Resend)
      schema.ts             shared Zod schema + types
  components/               reusable UI (Navbar, Footer, Card, Reveal, CountUp, Faq, …)
  content/                  all copy & data (site, services, home, about, contact)
```

Content lives in `src/content/*` — edit those files to change copy, services,
stats, team, FAQs, etc. without touching components.

## Contact form / email

The contact form works out of the box: without credentials, submissions are
validated and logged server-side and the user sees the success state — no email
is sent. To enable real delivery via [Resend](https://resend.com):

1. Copy `.env.example` → `.env.local`
2. Set `RESEND_API_KEY` (and optionally `CONTACT_FROM_EMAIL` / `CONTACT_TO_EMAIL`).
   The `from` address must be verified in your Resend account.

Validation is enforced server-side in `src/app/contact/actions.ts` regardless of
whether email delivery is configured.

## Design system

Tokens (colors, brand gradient, glass surface, blob keyframes) are defined once
in `src/app/globals.css` and exposed as Tailwind utilities: `glass`,
`bg-brand-gradient`, `text-brand-gradient`, plus color tokens (`text-ink`,
`text-muted`, `bg-canvas`, `text-brand`, …). All motion respects
`prefers-reduced-motion`.

## Notes

- The original Claude Design `.dc.html` files and `support.js` runtime were used
  only as the source of truth for layout, copy, and data — they are not part of
  this codebase.
