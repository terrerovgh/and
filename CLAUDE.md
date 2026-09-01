# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for All Needs Discount LLC (residential remodeling contractor, Valdosta GA). Astro 5 static output + Tailwind 3, deployed to Cloudflare Pages. No SSR, no runtime, no tests, no linter — the build is the only check.

A long single-page home per locale, plus a small equipment-rental subtree (`/rentals/`, `/rentals/<slug>/`) that exists so individual units have a stable, shareable URL for Facebook Marketplace, WhatsApp, and classified ads.

Requires Node 20+ (`.nvmrc`).

## Commands

```bash
npm install
npm run dev        # dev server on http://localhost:4321
npm run build      # static output to ./dist  (the only "test" — run it after changes)
npm run preview    # serve the production build
npm run deploy     # build + wrangler pages deploy ./dist --project-name=all-needs-discount
```

`npm run deploy` does a direct Wrangler upload (needs `npx wrangler login` once). See `DEPLOY.md` for the Git-connected Pages setup, custom-domain steps, and the post-launch SEO checklist.

## Architecture

**Two mirrored pages, one layout.** `src/pages/index.astro` (English) and `src/pages/es/index.astro` (Spanish) are structural twins — same sections, same components, same order, only strings differ. Any content or layout change to one must be applied to the other or the locales drift apart.

**Content lives in the page frontmatter, not in a CMS or collection.** The `services` and `area` arrays at the top of each `index.astro` drive both the rendered cards/chips and the `ItemList` JSON-LD emitted in the Services section. Editing a service means editing that array; the schema follows automatically.

**Rentals are the one exception:** `src/data/rentals.ts` holds both locales' copy in a single typed array, because six pages consume it (the teaser on both home pages, both `/rentals/` indexes, and both `[slug]` detail routes). Duplicating it per-page would mean six copies to sync instead of two. Slugs stay in English on both locales on purpose — see the hreflang note below.

**Images go through `astro:assets`.** Rental photos live in `src/assets/rentals/` (1600px JPEG masters) and are rendered with `<Picture>`, which emits hashed AVIF/WebP under `/_astro/*` — already covered by the `immutable` rule in `public/_headers`. This requires `sharp`, which is a direct dependency; it is *not* bundled with Astro here. Do not put content photos in `public/` — they ship unprocessed.

**Open Graph images must be raster.** Facebook, WhatsApp, and Twitter do not render SVG link previews. Per-page OG JPEGs live in `public/og/` at 1200x630 (fit-and-pad on the navy `#081d33`, so the whole machine stays visible) and are passed to `Layout` via the `image` prop. The site-wide default is `og/og-image.jpg`, rasterized from `public/og-image.svg` with sharp (fonts fall back to system monospace when re-rendering).

**`src/layouts/Layout.astro` owns everything in `<head>`.** Business constants (`SITE_URL`, `BUSINESS_NAME`, `PHONE`, `EMAIL`), canonical URL, `hreflang` alternates, OG/Twitter tags, and the `GeneralContractor` + `WebSite` JSON-LD are all built here from the `lang` and `path` props. Changing the phone number, email, service-area cities, or business hours means touching the JSON-LD in this file *and* the visible copy in both pages — they are duplicated by design, not derived.

**i18n is convention, not a framework helper.** `astro.config.mjs` sets `prefixDefaultLocale: false`, so English is at `/` and Spanish at `/es/`. Components take a `lang: 'en' | 'es'` prop and pick strings with inline ternaries (`Header.astro`, `Footer.astro`, the skip link in `Layout.astro`). There is no translation dictionary — adding a locale would mean a new page directory plus new ternary branches everywhere.

**Components** (`src/components/`) are presentational and stateless: `Header` (sticky nav + language toggle), `Footer`, `Section` (eyebrow/title/subtitle wrapper with `scroll-mt-24` for anchor nav), `ServiceCard`, `RentalCard`, `SpecList`.

**Header and Footer both take `currentPath` and use it.** Section links are bare anchors (`#about`) only on the home page; anywhere else they must be absolute (`/#about`, `/es/#about`) or they go nowhere. Both components derive this with a local `anchor()` helper — pass `currentPath` on every call site. `Header` also takes an optional `altHref` so the EN/ES toggle can stay on the same equipment instead of bouncing to the home page.

**Styling.** Tailwind with `applyBaseStyles: false`; base styles and the `.blueprint-grid-bg` background live in `src/styles/global.css`, imported once by `Layout.astro`. The design is a fixed dark "worn blueprint" theme — desaturated slate-navy `#111d27` (page) / `#0c1720` (header), card surface `#1c2a36`, grey-blue drafting ink `#9db3c2`, brass accent `#c69a63` (primary CTAs, icons, rules, focus ring), text `#f0f3f5`, JetBrains Mono for headings/labels/eyebrows, Inter for body and card titles. There is no light mode. The `blueprint` scale in `tailwind.config.mjs` mirrors these values but is largely unused; most markup uses raw Tailwind utilities, arbitrary hexes, and `white/NN` opacity values — change the config **and** the markup together.

**Cloudflare Pages config is file-based.** `public/_headers` (security headers, immutable caching for `/_astro/*`) and `public/_redirects` are copied verbatim into `dist/`. `wrangler.jsonc` only declares the project name and output dir.

## Gotchas

- `trailingSlash: 'always'` — internal links must end in `/` (e.g. `/es/`, not `/es`).
- The contact form uses `action="mailto:..."` with no backend. It works inconsistently across browsers; the phone/email links are the real conversion path. Don't assume a form handler exists.
- `SITE_URL` is hardcoded in **two** places: `astro.config.mjs` and `Layout.astro`. Change both together. In pages, prefer `new URL(path, Astro.site)` over a third copy.
- `Layout.astro` derives the `hreflang` alternates by stripping a leading `/es` off `path` and re-adding it. Spanish pages pass their own prefixed path, so that strip is what keeps them from emitting `/es/es/...`. Translated rental slugs would break the pairing — that is why slugs stay English in both locales.
- **`public/AND_LOGO.svg` is the brand master** — a black-fill lockup (roof + hammer + brush over "All Needs Discount LLC", 1248x832). Every other brand asset is *derived* from it and carries a "do not edit by hand" header: `logo-white.svg` (same lockup, `#f2f5f7` fill, used in both heroes), `logo-mark.svg` (emblem only, via a cropped `viewBox="258 8 732 596"`, used in `Header`, `Footer`, `404`, and the `mask-icon`), `favicon.svg`, and the PNG icon set (`favicon-16/32`, `apple-touch-icon`, `android-chrome-192/512`, which is also the `logo` in the `GeneralContractor` JSON-LD). Re-cut them from the master with sharp rather than editing them; the original is black-on-transparent and invisible on the dark theme, which is why the white variants exist.
- The hero shows the full lockup, so the visible company name comes from the image: each `index.astro` keeps an `sr-only` `<h1>` for semantics and SEO. Don't delete it, and don't re-add a visible mono wordmark next to the lockup — it would say the name twice.
- The backdrop's hand-drawn look is one `feDisplacementMap` filter (`#bp-hand`, defined once in `BlueprintBackdrop.astro`) applied via CSS to `.bp-ink svg > g` — **top-level groups only**. Room labels and dimensions sit as direct `<text>` children precisely so they escape the filter and stay legible; wrapping them in a `<g>` would turn them to mush.
