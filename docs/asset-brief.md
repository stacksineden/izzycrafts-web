# Izzy Crafts: Storefront Image Brief

This brief covers every image the storefront needs **apart from product photos**. Product photos use a flat **#EAE3D8** backdrop and are briefed separately.

For each image, generate it, export it at the size listed and save it to the path listed. Then hand the folder back and I'll wire it in.

---

## 1. Style anchor (paste at the start of every prompt)

> Cinematic still-life photography in a Nigerian leather workshop. Warm, low-key light from a single window on the right, golden late-afternoon tone. The palette is deep espresso brown (#3B2417), cognac leather (#A65E2E), muted brass (#B08D57) and soft ivory highlights (#F3EDE4). Aged dark wooden workbench, natural vegetable-tanned leather, waxed thread, traditional hand tools. Shallow depth of field, fine film grain, rich shadows that fall off to near black, calm and unhurried mood. Photorealistic, shot on a full-frame camera with a 50mm lens.

**Negative prompt (use on every image):**

> text, letters, logos, watermarks, brand names, stamped lettering on leather, signage, modern gadgets, phones, plastic, neon, cool blue light, white studio background, oversaturated colours, extra fingers, deformed hands, blurry hands, cartoon, illustration, CGI look

**Rules that keep the set consistent:**

- **Hands:** when hands appear, they belong to a Nigerian artisan: dark brown skin, weathered working hands, a leather apron, sleeves rolled. Never show a full face. Hands and torso only.
- **Light:** always from the right, and always warm. No flash look.
- **Empty space for text:** several images need a clear dark area where text will sit, noted per image as "text side". Keep that area free of detail.
- **Export:** WebP at about 80% quality. Keep each file under 300 KB if you can.

---

## 2. Home page (live store)

### 2.1 Home hero, desktop

- **File:** `public/images/site/home/hero-desktop.webp`, 2400 × 1350 (16:9)
- **Text side:** left 45%, which must be dark and empty.

> [Style anchor] A finished pair of handmade cognac leather loafers sitting on the right side of an aged workbench, beside a wooden shoe last and a spool of waxed thread. A shaft of window light catches the toe of the shoes. The left half of the frame falls into deep espresso shadow with only faint wood grain.

### 2.2 Home hero, mobile

- **File:** `public/images/site/home/hero-mobile.webp`, 1080 × 1620 (2:3)
- **Text side:** bottom 55%, which must be dark and empty.

> [Style anchor] Top-down view of a finished pair of cognac leather loafers in the upper third of the frame, on an aged dark workbench. The wood darkens smoothly toward the bottom of the frame into deep espresso shadow.

### 2.3 Brand story band (the "Made by hand" section)

- **File:** `public/images/site/story/hands-stitching.webp`, 1600 × 2000 (4:5)

> [Style anchor] Close-up of an artisan's hands pulling waxed thread tight through a leather shoe upper with two needles, saddle-stitch technique. An awl rests on the bench. The hands and stitch line are in sharp focus; the background is warm darkness.

### 2.4 Craft process strip (four steps in a row)

All four files are 1200 × 1500 (4:5). Use the same angle and the same light for each so they read as a series.

| File                                          | Prompt (after the style anchor)                                                                                             |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `public/images/site/process/1-cutting.webp`   | Hands cutting a shoe pattern piece from a hide of cognac leather with a curved round knife, paper pattern pieces beside it. |
| `public/images/site/process/2-stitching.webp` | Hands hand-stitching the upper with waxed thread, an awl and stitching clam in view.                                        |
| `public/images/site/process/3-lasting.webp`   | Hands pulling a leather upper over a wooden shoe last with lasting pliers, small tacks on the bench.                        |
| `public/images/site/process/4-finishing.webp` | Hands burnishing the edge of a leather sole with a wooden slicker, a small tin of wax beside it.                            |

---

## 3. Category tiles (shop and home)

These are four tiles, all 1200 × 1500 (4:5), with the same moody workbench setting and the item centred. The category name is laid over the bottom of the tile, so **keep the bottom 25% dark and simple.**

| File                                         | Prompt (after the style anchor)                                                                                                                                                  |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `public/images/site/categories/shoes.webp`   | A pair of handmade cognac leather lace-up Oxford shoes on the workbench, three-quarter angle.                                                                                    |
| `public/images/site/categories/loafers.webp` | A pair of dark espresso leather penny loafers on the workbench, one turned slightly toward the camera.                                                                           |
| `public/images/site/categories/sandals.webp` | A pair of handmade cognac leather sandals with slim crossing straps, a stitched ankle strap and a small brass buckle; light streams through the straps, casting striped shadows. |
| `public/images/site/categories/slides.webp`  | A pair of leather slides with a single broad, hand-stitched cognac band and thick stacked leather soles, low three-quarter angle.                                                |

> Generated items here are only mood tiles. Swap each one for a real Izzy Crafts piece once you have the product photos, so customers don't click a tile and find a different-looking product.

---

## 4. Custom pair page (`/custom`)

### 4.1 Custom page hero

- **File:** `public/images/site/custom/hero.webp`, 2400 × 1350 (16:9)
- **Text side:** left 45%.

> [Style anchor] On the right, an artisan's hand draws around a customer's bare foot on paper with a pencil, with a measuring tape and a wooden shoe last nearby. On the left, warm dark shadow.

### 4.2 "How a custom pair works" steps

All three files are 1200 × 1200 (1:1).

| File                                            | Prompt (after the style anchor)                                                                   |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `public/images/site/custom/step-1-measure.webp` | A cloth measuring tape and a paper foot tracing with pencil marks on the workbench.               |
| `public/images/site/custom/step-2-choose.webp`  | Several leather offcuts in cognac, espresso and tan fanned out on the bench, with a thread spool. |
| `public/images/site/custom/step-3-make.webp`    | A half-made shoe upper sitting on a wooden last, with tools around it.                            |

> **Do not generate the material, colour or sole swatches** for the builder. Customers will order from those swatches, so they must be real photos of Izzy Crafts' actual leathers and soles: flat, top-down, on **#EAE3D8**, 800 × 800.

---

## 5. Utility pages

| File                                      | Size              | Prompt (after the style anchor)                                                                                                                                                  |
| ----------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `public/images/site/misc/empty-cart.webp` | 1200 × 900 (4:3)  | An empty open shoebox lined with ivory tissue paper on the workbench, soft light falling into it.                                                                                |
| `public/images/site/misc/not-found.webp`  | 1200 × 900 (4:3)  | A single wooden shoe last standing alone on an otherwise empty workbench, a lone thread trailing off the edge.                                                                   |
| `public/images/site/misc/packaging.webp`  | 1600 × 1200 (4:3) | A finished pair of leather shoes resting in an open kraft box with ivory tissue paper and a cotton dust bag folded beside it, ready to send. Used on checkout and delivery info. |
| `public/images/site/misc/care.webp`       | 1600 × 1200 (4:3) | A horsehair shoe brush, a tin of leather conditioner and a soft cloth beside a cognac loafer. Used for the care guide.                                                           |

---

## 6. Textures (section backgrounds)

These are seamless and subtle, sitting behind text, so keep them low in contrast. Both are 2000 × 2000 and should tile.

| File                                            | Prompt                                                                                                                                                |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `public/images/site/textures/leather-dark.webp` | Seamless tileable macro texture of deep espresso brown full-grain leather (#3B2417), very low contrast, even soft lighting, no stitching, no creases. |
| `public/images/site/textures/paper-ivory.webp`  | Seamless tileable texture of warm ivory cotton paper (#F3EDE4), very faint fibres, even lighting, nearly flat.                                        |

---

## 7. Social sharing images (optional)

These are 1200 × 630 JPGs that show when a link is shared on WhatsApp or Instagram. Crop them from images you already have; there's no need to generate new ones.

- `public/brand/og-shop.jpg`: crop of the home hero.
- `public/brand/og-custom.jpg`: crop of the custom page hero.

---

## Not for generation

Get these from a designer or a real camera, not an image generator:

- **Logo** (`public/brand/logo.svg`) and **favicon** (`public/brand/favicon.svg`, plus `apple-touch-icon.png` at 180 × 180).
- **Material, colour and sole swatches** for the custom builder (see section 4).
- **Size guide diagram:** I'll draw this in code as an SVG, so no image is needed.
- **The "Our artisans" or team section:** use real photos of the real makers. A generated artisan presented as a real one would be misleading.

---

## Checklist

- [ ] Home hero, desktop and mobile (2)
- [ ] Brand story (1)
- [ ] Craft process strip (4)
- [ ] Category tiles (4)
- [ ] Custom page hero and steps (4)
- [ ] Utility images (4)
- [ ] Textures (2)
- [ ] Social sharing crops (2, optional)

That's **21 images** to generate, plus 2 optional crops.
