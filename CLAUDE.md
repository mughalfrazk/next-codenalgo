# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
yarn dev          # local dev server (Next.js)
yarn build        # Next.js production build
yarn lint         # ESLint

yarn preview      # OpenNext Cloudflare build + local Wrangler preview
yarn deploy       # OpenNext Cloudflare build + deploy to Cloudflare Workers
yarn cf-typegen   # regenerate cloudflare-env.d.ts from wrangler.jsonc bindings
```

yarn test            # run all tests once (Vitest)
yarn test:watch      # watch mode
yarn test:coverage   # run with 100% coverage enforcement (v8)

## Architecture

**Marketing site** for Code & Algo — a Next.js 16 app deployed to Cloudflare Workers via `@opennextjs/cloudflare` (OpenNext). The only server-side logic is a single contact-form Server Action.

### Key conventions

- **Content lives in `src/content/`** — all copy (headings, body text, stats, FAQs, service definitions) is exported as typed TypeScript constants. Pages import from there; components are purely presentational. To update copy, edit the content files, not the components or pages.
- **`src/content/site.ts`** is the single source of truth for brand data (name, URL, email, phone, nav links, footer links, socials).
- **`src/content/services.ts`** drives both `/services` (listing) and `/services/[slug]` (detail) — the slug is derived from the service `id` field.
- **Pages** (`src/app/**/page.tsx`) are Server Components that compose shared components and pull from `src/content/`.
- **Components** (`src/components/`) are shared UI primitives (Section, Card, Navbar, Footer, etc.). They accept props; they do not fetch or import content directly.
- **Contact form** (`src/app/contact/`) uses a React 19 Server Action (`actions.ts`) with Zod validation (`schema.ts`). Email delivery is via Resend; the form succeeds silently in dev without `RESEND_API_KEY`.

### Environment variables

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key for contact-form email delivery |
| `CONTACT_FROM_EMAIL` | Sender address (defaults to `onboarding@resend.dev`) |
| `CONTACT_TO_EMAIL` | Recipient address (defaults to `site.email`) |

For local dev, copy `.env.example` → `.env.local`. For Cloudflare, use `wrangler secret put <VAR>`.

### Deployment

The app targets **Cloudflare Workers** (not Vercel/Node). `open-next.config.ts` uses the default `defineCloudflareConfig()`. Secrets are set via Wrangler, not `wrangler.jsonc`. After deploying, Cloudflare observability is enabled automatically.
