# Aks — Website

The official landing page for **Aks**, a personal companion for understanding yourself.
Tagline: *Understand Yourself.*

Aks is developed by [Harsh Kumar Singh](https://ryoharsh.vercel.app) at **Miyal**.

- Android: available now — `com.miyal.aks` ([Google Play](https://play.google.com/store/apps/details?id=com.miyal.aks))
- iOS: coming soon

## Routes

| Route             | Description                              |
| ----------------- | ---------------------------------------- |
| `/`               | Product landing page                     |
| `/privacy`        | Privacy Policy for Aks                   |
| `/terms`          | Terms and Conditions for Aks             |
| `/delete-account` | Account and data deletion requests       |
| `/sitemap.xml`    | Generated sitemap                        |
| `/robots.txt`     | Generated robots rules (incl. AI agents) |
| `/manifest.webmanifest` | Web app manifest                   |
| `/llms.txt`       | Machine-readable product summary         |

## Tech stack

- **Next.js 16** (App Router, static export-friendly prerendering, Turbopack)
- **React 19**
- **Tailwind CSS v4** (theme via CSS-first `@theme`)
- **GSAP 3 + ScrollTrigger** (restrained, composition-level motion only)
- **Hugeicons** (`hugeicons-react`, monochrome UI icons — no emoji icons)
- **TypeScript** (strict type-checking in `next build`)
- **Satoshi** typeface, self-hosted from `public/fonts` (weights 300–900 + italics, `font-display: swap`)

## Getting started

Prerequisites: Node.js 20 or later and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Only one dev server can run
per project directory — if port 3000 is taken, check for an already-running instance.

## Scripts

| Command         | Purpose                                              |
| --------------- | ---------------------------------------------------- |
| `npm run dev`   | Development server with hot reload                   |
| `npm run build` | Type-check + production build (must pass before ship)|
| `npm run start` | Serve the production build locally                   |
| `npm run lint`  | ESLint (must pass before ship)                       |

## Environment variables

| Variable                | Purpose                                                                 |
| ----------------------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`  | Production domain. Used for canonical URLs, sitemap, robots, Open Graph |

If unset, URLs fall back to a placeholder domain marked with a `TODO` in
`app/lib/site.ts`. **Set this before launch** — search engines and AI answer
engines read the canonical/sitemap URLs.

## Single source of truth — `app/lib/site.ts`

Public facts live in one place so pages, metadata, and structured data can
never drift apart:

- `SITE_URL`, `SITE_DESCRIPTION`, `SITE_TAGLINE`
- `ANDROID_PACKAGE`, `PLAY_STORE_URL`
- `DEVELOPER_NAME`, `DEVELOPER_HANDLE`, `DEVELOPER_PORTFOLIO`, `STUDIO_NAME`
- `PRIVACY_EMAIL`, `CONTACT_EMAIL`
- `NAV_LINKS`, `FAQ_ITEMS`, `JSON_LD`, `FAQ_JSON_LD`

To change the Play listing URL, contact email, FAQ answers, or developer
attribution, edit this file — every consumer updates automatically.

## Project structure

```
app/
  page.tsx               Home — editorial landing page (server component)
  layout.tsx             Metadata, JSON-LD, Loader, fonts
  globals.css            Satoshi @font-face, theme tokens, base styles
  robots.ts              /robots.txt (incl. AI crawler allow-list)
  sitemap.ts             /sitemap.xml (all public routes)
  manifest.ts            Web app manifest
  opengraph-image.tsx    Build-time OG card (no stock imagery)
  lib/site.ts            Public facts + structured data (see above)
  components/
    navbar.tsx           Sticky nav, scroll-compact state, mobile menu
    hero.tsx             Giant headline + scroll-scrubbed product showcase
    steps.tsx            Scroll-driven three-step panels
    mirror.tsx           Mirror conversation example (illustrative, honest)
    product-video.tsx    DemoVideo / FilmVideo / ClipVideo players
    product-shot.tsx     ShotFrame + ProductShot (screenshot slot)
    logo.tsx             Brand mark (favicon.png + wordmark)
    anim.tsx             Reveal / HeroIntro / MediaReveal / ScrubX /
                         Stage / Drift + useScrolled
    loader.tsx           Minimal loading screen (curtain-lift exit)
  privacy/page.tsx       Privacy Policy (full legal text)
  terms/page.tsx         Terms and Conditions (full legal text)
  delete-account/page.tsx  Account deletion requests
public/
  fonts/                 Satoshi .otf files (see Assets)
  videos/                slide_1/2/3.mp4 — real product clips (720p, ~6s)
  screenshots/           Drop future app screenshots here (see below)
  favicon.png            Brand mark (48px) — logo + favicon
  adaptive-icon.png      App icon (1024px) — availability section
  llms.txt               Machine-readable summary for answer engines
  humans.txt             Credits
  .well-known/security.txt  Security contact
```

## Assets

- **Fonts** — Satoshi only. Real weights via `@font-face` (300/400/500/700/900 +
  italics). Never substitute Google Fonts; never rely on synthesized bold.
- **Videos** — `slide_1.mp4` (hero showcase, autoplays muted once, pauses
  off-screen), `slide_2.mp4` (product film, plays only while ≥40% visible),
  `slide_3.mp4` (availability section, click-to-play). All `preload` tuned per
  placement; none autoplay with sound.
- **Screenshots** — app screenshots ship later. Drop them in
  `public/screenshots/` and render with `<ProductShot>` — no redesign needed.
  Never depict `AiConversationScreen`; it is not part of the shipped product.
- **Icons** — Hugeicons only, restrained monochrome treatment. Never emoji.

## Motion system (`anim.tsx` + GSAP)

One coherent language, cleaned up via `gsap.context()` + `ctx.revert()`:

- `Reveal` — once-only y/x + fade entrances (`delay` prop is **milliseconds**;
  GSAP itself works in seconds — the conversion lives inside `Reveal`, do not
  pass raw values to GSAP elsewhere without converting)
- `HeroIntro` — staggered hero entrance, waits for the loader's `aks:ready`
- `MediaReveal` — settle-in for large media; `Stage` — sequenced entrances
  (Mirror messages); `ScrubX` — scrubbed horizontal drift (context rows);
  `Drift` — barely-there parallax (philosophy echo)
- `Steps` — scroll-driven active-panel contrast (gated on `data-steps="on"`
  so no-JS visitors always see full-strength content)

Rules: no scroll-jacking, no pinning marathons, no canvas/WebGL/particles.
Everything is disabled under `prefers-reduced-motion`, and all content renders
fully visible with JavaScript disabled.

## SEO / AEO

- Per-page titles, descriptions, and **canonicals** (home, privacy, terms,
  delete-account each carry their own)
- Open Graph + Twitter cards, build-time OG image, `theme-color`, favicons
- JSON-LD graph: `SoftwareApplication` (Android, `com.miyal.aks`),
  `Person` (developer), `Organization` (Miyal), `WebSite`, plus `FAQPage`
- Visible FAQ section answering what people ask answer engines
  (What is Aks? Mirror? Android/iOS? Who built it? …)
- `llms.txt` summary with guardrails (e.g. never present iOS as available)
- `robots.txt` explicitly allows major AI crawlers
  (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, …)
- Semantic HTML, one H1 per page, `aria-labelledby` section headings,
  meaningful alt text, visible focus states

## Copy rules

Short human sentences. No AI-marketing clichés ("cutting-edge", "unlock",
"supercharge", "seamless", …). No fake testimonials, stats, reviews, or
awards. No health claims, no predictions, no unsupported privacy promises.
iOS is always "coming soon" — never presented as available.

## Deployment

Any Next.js host works (Vercel recommended). Production checklist:

1. Set `NEXT_PUBLIC_SITE_URL` to the real domain.
2. Renew `.well-known/security.txt` `Expires` yearly (currently 2027-09-22).
3. Resolve the open drafting note in Terms §25 (governing-law jurisdiction).
4. Point the Play Console *Data safety* and *Data deletion* sections at
   `/privacy` and `/delete-account`.
5. Run `npm run lint && npm run build` — both must pass.

## Troubleshooting

| Symptom | Cause / fix |
| ------- | ----------- |
| `Another next dev server is already running` | One dev server per directory; use the existing one at `:3000` or stop it first |
| Hydration warning naming `cz-shortcut-listen` | ColorZilla browser extension mutating `<body>` — verify in incognito; not a site bug |
| Loader never appears | By design under `prefers-reduced-motion`; otherwise it shows on every full page load |
| Reveal content invisible after edits | Check GSAP time units — `Reveal delay` is ms, everything else GSAP-native is seconds |

## License

© 2026 Miyal. All rights reserved.
