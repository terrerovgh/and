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
- **`robots.txt`**, **PWA `site.webmanifest`**, **favicons** (SVG/PNG 16/32/180), **raster OG image** (`og/og-image.jpg`, 1200x630 — Facebook/WhatsApp no renderizan SVG)

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

## AI contact assistant (Cloudflare Pages Function)

The `#contact` section no longer publishes a phone number. Instead, a guided
wizard (`src/components/ContactAssistant.astro`) posts to `functions/api/lead.ts`,
a Cloudflare Pages Function that runs on the same domain — Cloudflare Pages
deploys anything under `functions/` automatically alongside the static
output, whether you push via Git or `wrangler pages deploy`. No change to
Astro's `output: 'static'` mode is required.

The Function does two things:

1. Calls **Workers AI** (`env.AI`) to turn the wizard answers into a short,
   readable summary. The `ai` binding is declared in `wrangler.jsonc` and
   needs no setup — it's on by default for Cloudflare accounts.
2. Emails that summary to the business owner via the **Resend** HTTP API
   (`env.RESEND_API_KEY`), replacing the old unreliable `mailto:` form.

**Why Resend and not Cloudflare's own Email Routing "send_email" binding:**
that binding is Workers-only. `wrangler pages deploy` rejects it outright
("Configuration file for Pages projects does not support \"send_email\"")
— this was tried first and failed the deploy twice before switching to
Resend.

### One-time setup for email delivery

1. Create a free account at [resend.com](https://resend.com) and generate
   an API key.
2. Verify a sending domain in Resend (Domains → Add Domain) so
   `allneedsdiscount.com` can send mail reliably. Resend gives you a few
   DNS records (SPF/DKIM) to add to the Cloudflare zone; without domain
   verification Resend can only deliver to the account owner's own address.
3. Store the key as a Pages secret (never commit it):
   ```bash
   npx wrangler pages secret put RESEND_API_KEY --project-name=all-needs-discount
   ```
   This applies to the Production environment; without it, `/api/lead`
   fails safely at the email step and the wizard shows its error state with
   a `mailto:` fallback link — it will not silently drop leads.

Sends from `leads@allneedsdiscount.com` to `allneedsdiscount1@gmail.com`
(`SENDER_ADDRESS` / `BUSINESS_ADDRESS` in `functions/api/lead.ts`). If the
Resend verification for `allneedsdiscount.com` ever lapses, delivery to
`allneedsdiscount1@gmail.com` will be rejected — re-verify the domain.

## Custom domain

Production serves `https://allneedsdiscount.com` and
`https://www.allneedsdiscount.com` (both attached as Pages custom domains;
Cloudflare provisions the CNAME and certificate automatically). Canonical
URLs point at the apex, and the temporary `allneedsdiscount.terrerov.com`
alias may be removed at any time.

If the production domain ever changes, update `SITE_URL` in
`astro.config.mjs` **and** `src/layouts/Layout.astro` (both copies).

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
│   ├── og-image.svg        # source for the raster card
│   └── og/                 # raster OG JPEGs 1200x630 (og-image.jpg + rentals)
│   └── AND_LOGO.svg (master), logo-white.svg, logo-mark.svg, favicon.svg + PNG icons
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
3. Create a **Google Business Profile** for "All Needs Discount LLC" (169 GA-125, Ray City, GA 31645); link to the site. Once it exists, add its URL to `sameAs` in `src/layouts/Layout.astro`.
4. Create a **Facebook page** for the business and add its URL to `sameAs` in `src/layouts/Layout.astro` too.
5. Optional: claim `allneedsdiscount.com` on social platforms (Instagram, Houzz, Yelp) and link the site in the bio.
6. Re-test with [PageSpeed Insights](https://pagespeed.web.dev/) and [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview) after first deploy, and validate the FAQ/LocalBusiness JSON-LD with the [Rich Results Test](https://search.google.com/test/rich-results).
