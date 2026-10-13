# Izzy Crafts Storefront

The online store for **Izzy Crafts Leather Products Ltd.**, makers of handmade leather footwear.

Customers browse the collection, choose a colour and size (with optional fit notes), and add pairs to their bag. At checkout the order is written into a WhatsApp message to the business (+234 815 663 3882), where the team confirms price, size and delivery. There is no database and no payment gateway yet; the checkout already shows "Pay online — coming soon" so online payment can be added later.

## Stack

- **React Router 7, framework mode**, with **static prerendering**. Every product, category and content page is built to real HTML, which helps SEO and gives full link previews on WhatsApp and Instagram. The output is static files, so there is no server to run.
- React 19 + TypeScript (strict), Tailwind CSS v4.
- Cart state: React context + `useReducer`, persisted to `localStorage`. No state library is needed.
- Self-hosted fonts (Fraunces, Inter): no third-party requests.
- Images: responsive WebP generated from the original exports by `scripts/optimize-images.mjs`.

## Running it

Requires Node 20 or later.

```bash
npm install
cp .env.example .env.local   # set VITE_SITE_MODE=live to work on the store
npm run dev                  # http://localhost:5173
```

| Script                            | What it does                                                 |
| --------------------------------- | ------------------------------------------------------------ |
| `npm run dev`                     | Dev server with hot reload                                   |
| `npm run build`                   | Type-checks, then prerenders the site into `build/client/`   |
| `npm run preview`                 | Serves `build/client/` the same way Vercel and Netlify do    |
| `npm run lint` / `npm run format` | ESLint / Prettier                                            |
| `npm run images`                  | Regenerates optimised images from `.assets-src/` (see below) |

## Environment variables

| Variable             | Notes                                                                                                                                                                        |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_SITE_MODE`     | `coming_soon` (default) or `live`.                                                                                                                                           |
| `VITE_SITE_URL`      | Production origin, e.g. `https://www.example.com`. Needed for canonical URLs, absolute share-image URLs and `sitemap.xml`. Without it the build warns and skips the sitemap. |
| `VITE_INSTAGRAM_URL` | Optional. Instagram links appear only when it is set.                                                                                                                        |

The WhatsApp number is set in code, in `src/config/site.ts`.

Variables are read at **build time**. After changing them on your host, redeploy.

## Going live

1. On your host (Vercel or Netlify), set `VITE_SITE_MODE=live` and `VITE_SITE_URL=<your domain>`.
2. Redeploy.

In `coming_soon` mode only the Coming Soon page is built, and every URL shows it.

## Products

Products live in `src/data/products.json`; the shape is the `Product` type in `src/types/product.ts`.

- **Price:** `priceNGN` is a number in naira, e.g. `95000`. `null` shows "Price on request", and the order total reads "to be confirmed".
- **Description:** every product answers what it is made of (`madeOf`), how it is made (`madeHow`) and how it feels (`feel`), plus a short `summary`, a `tagline` for cards and the long-form `story`.
- **Colours:** each image can name the `colourId` it shows. Picking a colour on the product page shows that colour's photos; colours without photos say "Made to order in X. Photographed in Y."
- **Sizes:** ids from `src/data/sizes.json` (`eu-40` … `eu-46`, half sizes like `eu-42-5`).
- **Status:** only `active` products appear. Set `draft` to hide one without deleting it.

Categories are in `src/data/categories.json`, and the custom pair builder's choices are in `src/data/custom-options.json`.

In dev, the console warns about unknown sizes or categories, duplicate slugs, missing alt text and images missing from the manifest.

## Images

The originals (2–3 MB PNGs) are **not** committed. `npm run images` reads them from `.assets-src/`, with one folder per product plus `other/` (same layout as the shared Drive folder), and writes:

- `public/images/products/<slug>/<n>-<width>.webp`, at 480, 800 and 1120 px
- `public/images/site/<name>-<width>.webp`, at 640, 1024 and 1600 px, with blur placeholders
- `public/images/og/<slug>.jpg`, 1200×630 link-preview cards
- `src/data/images.generated.json`, the manifest the `<Picture>` component reads (dimensions, widths, blur)

To add a product's photos: add its folder to `.assets-src/`, add an entry to the `products` map in `scripts/optimize-images.mjs`, run `npm run images`, then reference `/images/products/<slug>/<n>` in `products.json`. Commit the generated files.

Brand files go in `public/brand/`: `logo.svg` replaces the text wordmark when present (restart the dev server after adding it), plus `favicon.svg` and `og.jpg`.

## SEO

- Per-page titles, descriptions, canonical URLs, Open Graph and Twitter tags (`src/lib/seo.ts`).
- JSON-LD structured data: `Organization` and `WebSite` on the home page; `Product` + `BreadcrumbList` on product pages; `ItemList` on shop pages.
- `robots.txt` and `sitemap.xml` are generated at build time (`react-router.config.ts`). Cart and checkout are excluded and marked `noindex`.

## Security

- Security headers (CSP, HSTS, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) are set in `vercel.json` and `public/_headers`.
- No third-party scripts, fonts or trackers.
- The cart stores only product, colour, size, quantity and notes. Names and prices are always read from the catalog, so an edited `localStorage` cannot change what a customer is quoted.
- Customer details are never sent anywhere except into the WhatsApp message the customer sends themselves. Input is length-limited and stripped of WhatsApp formatting characters.

## Deploying

Both hosts are configured. Unknown URLs render the 404 page.

- **Vercel:** import the repo; `vercel.json` sets the build command, the output (`build/client`) and headers.
- **Netlify:** `netlify.toml` sets the build and publish directory; `public/_redirects` and `public/_headers` handle routing and headers.

## Where things live

```
src/root.tsx            HTML shell, header/footer/cart, error and fallback screens
src/routes.ts           URL → route module table
src/routes/             one module per page (component + SEO meta)
src/components/         ui/ primitives, layout/, product/, cart/, home/ sections
src/features/cart/      cart reducer, context, provider, catalog resolver
src/lib/                catalog, images, seo, whatsapp, currency, storage
src/config/             site constants, navigation
src/data/               products, categories, sizes, custom options, image manifest
scripts/                image pipeline, local preview server
```
