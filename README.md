# Izzy Crafts Storefront

Storefront for **Izzy Crafts Leather Products Ltd.**, a maker of handmade leather footwear and leather goods.

Customers will browse, choose a size and colour, and check out to WhatsApp, where the cart becomes a prefilled message to the brand. There is no payment gateway and no database. Product data lives in JSON files in `src/data/`.

Right now production shows only the **Coming Soon** page. The store routes are scaffolded with stubs.

Stack: Vite, React 19, TypeScript (strict), Tailwind CSS v4, react-router-dom, ESLint and Prettier.

## Running it

Requires Node 20 or later.

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:5173
```

| Script                            | What it does                        |
| --------------------------------- | ----------------------------------- |
| `npm run dev`                     | Dev server with hot reload          |
| `npm run build`                   | Type-checks, then builds to `dist/` |
| `npm run preview`                 | Serves `dist/` locally              |
| `npm run lint`                    | ESLint                              |
| `npm run format` / `format:check` | Prettier                            |

## Environment variables

| Variable             | Notes                                                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_SITE_MODE`     | `coming_soon` (default) or `live`. See below.                                                                                         |
| `VITE_INSTAGRAM_URL` | The "Follow on Instagram" link appears only when this is set.                                                                         |
| `VITE_SITE_URL`      | e.g. `https://izzycrafts.com`, no trailing slash. Used to make the OG and Twitter image URLs absolute, which most link previews need. |

Vite reads these at **build time**. After you change them in Vercel or Netlify, redeploy.

## Switching site mode

- **`coming_soon`**: every path, including `/shop` and unknown URLs, renders the Coming Soon page. Store code is lazy-loaded, so visitors never download it.
- **`live`**: the full store is active (`/`, `/shop`, `/shop/:category`, `/product/:slug`, `/custom`, `/cart`, `/checkout` and a 404), all inside `StoreLayout`.

To work on the store locally while production stays on Coming Soon, put this in `.env.local`, which is git-ignored:

```
VITE_SITE_MODE=live
```

To launch, set `VITE_SITE_MODE=live` in the hosting dashboard and redeploy.

## Adding a product

1. Add an entry to `src/data/products.json`. Its shape is the `Product` type in `src/types/product.ts`.
2. Put images in `public/images/products/<slug>/` as `1.jpg`, `2.jpg` and so on, and reference them as `/images/products/<slug>/1.jpg`. Every image needs `alt` text.
3. Set `"status": "active"` when the product is ready. Drafts appear in dev but are hidden in production builds. Archived products are hidden everywhere.

Notes:

- **Description:** fill in all four fields. `summary` is one or two sentences; `madeOf`, `madeHow` and `feel` answer what it is made of, how it was made and how it feels to wear.
- **Price:** `priceNGN: null` means price on request.
- **Sizes:** `sizes` and `inStockSizes` use ids from `src/data/sizes.json`, such as `eu-42` and `eu-42-5`. Unsized goods like wallets and bags use `[]`.
- **Custom orders:** made-to-order items set `customisable: true` and may set `leadTimeDays`.
- **Custom pair builder:** its choices (material, colour, sole and fit/width) live in `src/data/custom-options.json`.
- **Checking your data:** in dev, the console warns about unknown sizes or categories, duplicate slugs and missing alt text.

> The seed data (three `Placeholder …` products, the size chart, custom options) is placeholder only. Replace it with Izzy Crafts' real data before launch. The size chart in particular is a generic conversion; it should be replaced with one measured on the brand's own lasts.

## WhatsApp number

The business number (`2348156633882`) is set in code as `whatsappNumber` in `src/config/site.ts`. To change it, edit that line and redeploy. Use international format, digits only, with no `+` or spaces.

## Brand assets

| File           | Where                                    | Notes                                                                                                                                                 |
| -------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Logo           | `public/brand/logo.svg`                  | When present, it replaces the text wordmark everywhere. The check runs when the dev server or build starts, so restart `npm run dev` after adding it. |
| Favicon        | `public/brand/favicon.svg`               | Currently an ivory "IC" on espresso placeholder. Consider adding `apple-touch-icon.png` (180×180) as well.                                            |
| OG image       | `public/brand/og.jpg`                    | 1200×630, currently cropped from the desktop hero.                                                                                                    |
| Hero (desktop) | `public/images/site/hero-desktop.webp`   | Landscape, about 1536×1024. Used on landscape screens ≥768px wide.                                                                                    |
| Hero (mobile)  | `public/images/site/hero-mobile.webp`    | Portrait, about 1024×1536. Used on phones and portrait tablets.                                                                                       |
| Texture        | `public/images/site/texture-stitch.webp` | Stitch close-up, kept for later use in the store.                                                                                                     |

If either hero image is missing, the Coming Soon page falls back to plain espresso and still looks finished.

Brand colours and fonts are Tailwind tokens defined in `src/styles/index.css` (`bg-espresso`, `text-cognac`, `font-display` and so on).

## Deploying

Both hosts are preconfigured for SPA routing, so deep links like `/shop` serve `index.html`.

- **Vercel:** import the repo. Framework: Vite, build command `npm run build`, output directory `dist`. `vercel.json` holds the rewrite.
- **Netlify:** build command `npm run build`, publish directory `dist`. `public/_redirects` holds the rewrite.

On either host, set the `VITE_*` variables in the dashboard.

## Where things live

```
src/app/         App shell, router (switched by SITE_MODE), providers
src/config/      site.ts: brand constants and env parsing
src/data/        JSON "database"
src/types/       Product, cart and order contracts
src/lib/         catalog selectors, NGN formatting, WhatsApp links, cart storage
src/features/    cart, catalog, product, custom-order, checkout
src/components/  ui/ (Button, Container, StitchDivider, Badge, Logo) and layout/
src/pages/       one file per route
```
