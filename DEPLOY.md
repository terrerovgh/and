# All Needs Discount — Astro on Cloudflare Pages

Static bilingual site (EN/ES) for All Needs Discount LLC, built with Astro 5 + Tailwind 3, ready to deploy on Cloudflare Pages.

## What's in the box

- **Astro 5** static output (`output: 'static'`, no SSR runtime needed)
- **Tailwind CSS 3** for styling
- **i18n** English + Spanish with proper `hreflang` alternates
- **SEO**: Open Graph, Twitter Card, JSON-LD (`GeneralContractor` + `WebSite` + `ItemList`), canonical URLs, geo tags, robots directives
- **Performance**: prefetch on hover, `compressHTML`, asset hashing, immutable cache for `/_astro/*`
- **Security headers** (HSTS, X-Frame-Options, X-Content-Type-Options, Permissions-Policy, Referrer-Policy)
- **A11y**: skip-to-content link, focus-visible outlines, `aria-label`s on landmarks, `prefers-reduced-motion`, `loading="lazy"` on below-the-fold images
- **Sitemap** auto-generated with `xhtml:link` hreflang (`@astrojs/sitemap`)
- **`robots.txt`**, **PWA `site.webmanifest`**, **favicons** (SVG/PNG 16/32/180), **`og-image.svg`**

## Local development

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # static output in ./dist
npm run preview      # preview the production build
```

Requires **Node 20+** (`.nvmrc` included).

## Deploy to Cloudflare Pages

### Option A — Connect to Git (recommended)

1. Push the repo to GitHub/GitLab.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Configure the project:
   - **Project name**: `all-needs-discount`
   - **Production branch**: `main`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: leave empty (project root)
   - **Environment variables**: none required
4. Hit **Save and Deploy**. Every push to `main` deploys to production; every PR gets a preview URL.

Node version is pinned to 20 via `.nvmrc`; Cloudflare Pages uses it automatically.

### Option B — Direct upload via Wrangler

```bash
npm install
npm run deploy
# or manually:
npm run build
npx wrangler pages deploy ./dist --project-name=all-needs-discount --branch=main
```

You'll need to log in once: `npx wrangler login`.

## Custom domain

After the first deploy, in the Pages project → **Custom domains** → set `allneedsdiscount.com` (and `www.`). Cloudflare provisions the certificate automatically.

Update `SITE_URL` in `astro.config.mjs` and `src/layouts/Layout.astro` if the production domain differs.

## URLs

- English (default): `https://allneedsdiscount.com/`
- Spanish: `https://allneedsdiscount.com/es/`
- Sitemap: `https://allneedsdiscount.com/sitemap-index.xml`
- Robots: `https://allneedsdiscount.com/robots.txt`

## Project structure

```
.
├── astro.config.mjs        # Astro + sitemap + i18n config
├── wrangler.jsonc          # Cloudflare Pages metadata
├── public/
│   ├── _headers            # Security & cache headers
│   ├── _redirects          # URL redirects
│   ├── robots.txt
│   ├── site.webmanifest
│   ├── favicon.svg, *.png, apple-touch-icon.png
│   ├── og-image.svg        # 1200x630 social card
│   └── AND_LOGO.svg
└── src/
    ├── layouts/Layout.astro
    ├── pages/
    │   ├── index.astro     # English
    │   └── es/index.astro  # Spanish
    └── components/
        ├── Header.astro
        ├── Footer.astro
        ├── Section.astro
        └── ServiceCard.astro
```

## SEO checklist (post-launch)

1. Submit `https://allneedsdiscount.com/sitemap-index.xml` in **Google Search Console** and **Bing Webmaster Tools**.
2. Verify both locales in GSC under **International Targeting**.
3. Create a **Google Business Profile** for "All Needs Discount LLC" in Valdosta, GA; link to the site.
4. Optional: claim `allneedsdiscount.com` on social platforms (FB, Instagram, Houzz, Yelp) and link the site in the bio.
5. Re-test with [PageSpeed Insights](https://pagespeed.web.dev/) and [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview) after first deploy.
