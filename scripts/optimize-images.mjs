/**
 * Turns the original PNG exports into small responsive WebP files and a manifest.
 *
 *   npm run images            (reads ./.assets-src by default)
 *   npm run images -- <dir>   (or another source folder)
 *
 * Source layout mirrors the shared Drive folder: one folder per product, plus "other/".
 * Outputs are committed, so a deploy never needs the originals:
 *   public/images/products/<slug>/<n>-<width>.webp
 *   public/images/site/<name>-<width>.webp
 *   public/images/og/<slug>.jpg          (1200×630 link-preview cards)
 *   src/data/images.generated.json       (dimensions, widths, blur placeholders)
 */
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const SRC = process.argv[2] ?? '.assets-src'
const PUBLIC = 'public/images'
const MANIFEST = 'src/data/images.generated.json'
const STONE = '#e9e0ce' // backdrop colour of the product photography

const PRODUCT_WIDTHS = [480, 800, 1120]
const SITE_WIDTHS = [640, 1024, 1600]
const QUALITY = 74

/** Product image order. The first image is the card and share image. */
const products = {
  'sovereign-horsebit-loafer': {
    dir: 'sovereign-horsebit-loafer',
    files: [
      ['Sovereign horsebit loafer BV1.png'],
      ['Sovereign horsebit loafer BV2.png'],
      ['Sovereign horsebit loafer BV3.png'],
      ['Sovereign horsebit loafer BV4.png'],
    ],
  },
  'sovereign-pebble-grain-loafer': {
    dir: 'sovereign-horsebit-loafer',
    files: [
      ['Sovereign horsebit loafer Product2 BV1.png'],
      ['Sovereign horsebit loafer Product2 BV2.png'],
      ['Sovereign horsebit loafer Product2 BV3.png'],
    ],
  },
  'royal-heirloom-beaded-loafer': {
    dir: 'royal-heirloom-beaded-loafer',
    files: [1, 2, 3, 4].map((n) => [`Royal Heirloom beaded loafers Series V${n}.png`]),
  },
  'imperial-velvet-loafer': {
    dir: 'imperial-velvet-loafer',
    files: [1, 2, 3, 4, 5].map((n) => [`Imperial velvet loafers V${n}.png`]),
  },
  'eclipse-slide': {
    dir: 'eclipse-slide',
    files: [1, 2, 3, 4, 5, 6].map((n) => [`Eclipse Slide V${n}.png`]),
  },
  'heritage-double-strap-slide': {
    dir: 'heritage-double-strap-slide',
    files: [1, 2, 3, 4].map((n) => [`Heritage Double-Strap Slide V${n}.png`]),
  },
  'odyssey-cross-strap-sandal': {
    dir: 'odyssey-cross-strap-sandal',
    files: [1, 2, 3, 4].map((n) => [`Odyssey Cross-Strap Sandal V${n}.png`]),
  },
  'atelier-clog': {
    dir: 'atelier-clog',
    files: [1, 2, 3, 4, 5, 6].map((n) => [`Atelier Clog V${n}.png`]),
  },
  'mesh-signature-mule': {
    dir: 'mesh-signature-mule',
    files: [1, 2, 3, 4, 5, 6].map((n) => [`Mesh Signature Mule V${n}.png`]),
  },
}

/** Editorial images from "other/": source file → output name. */
const site = {
  'hero-desktop.png': 'home-hero-desktop',
  'hero-mobile.png': 'home-hero-mobile',
  'hands-stiching.png': 'story-hands',
  '1-cutting.png': 'process-cutting',
  '2-stitching.png': 'process-stitching',
  '3-lasting.png': 'process-lasting',
  '4-finishing.png': 'process-finishing',
  'custom-hero.png': 'custom-hero',
  'custom-step-1-measure.png': 'custom-measure',
  'custom-step-2-choose.png': 'custom-choose',
  'custom-step-3-make.png': 'custom-make',
  'loafers.png': 'category-loafers',
  'sandals.png': 'category-sandals',
  'slides.png': 'category-slides',
  'shoes.png': 'category-custom',
  'misc-care.png': 'care',
  'misc-empty-cart.png': 'empty-cart',
  'misc-not-found.png': 'not-found',
  'misc-packaging.png': 'packaging',
}

const manifest = {}

async function blurDataUri(input) {
  const buf = await sharp(input).resize(16).webp({ quality: 40 }).toBuffer()
  return `data:image/webp;base64,${buf.toString('base64')}`
}

async function responsive(input, outBase, publicBase, widths, { blur = false } = {}) {
  const meta = await sharp(input).metadata()
  const usable = [...new Set(widths.map((w) => Math.min(w, meta.width)))]
  await Promise.all(
    usable.map((w) =>
      sharp(input)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 6, smartSubsample: true })
        .toFile(`${outBase}-${w}.webp`),
    ),
  )
  manifest[publicBase] = {
    w: meta.width,
    h: meta.height,
    widths: usable,
    ...(blur ? { blur: await blurDataUri(input) } : {}),
  }
}

async function ogCard(input, out) {
  const product = await sharp(input).resize({ height: 600, width: 1100, fit: 'inside' }).toBuffer()
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: STONE } })
    .composite([{ input: product, gravity: 'center' }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out)
}

if (!existsSync(SRC)) {
  console.error(`Source folder "${SRC}" not found.`)
  process.exit(1)
}

for (const [slug, { dir, files }] of Object.entries(products)) {
  const outDir = join(PUBLIC, 'products', slug)
  rmSync(outDir, { recursive: true, force: true })
  mkdirSync(outDir, { recursive: true })
  for (const [i, [file]] of files.entries()) {
    const input = join(SRC, dir, file)
    await responsive(
      input,
      join(outDir, String(i + 1)),
      `/images/products/${slug}/${i + 1}`,
      PRODUCT_WIDTHS,
    )
  }
  mkdirSync(join(PUBLIC, 'og'), { recursive: true })
  await ogCard(join(SRC, dir, files[0][0]), join(PUBLIC, 'og', `${slug}.jpg`))
  console.log(`✓ ${slug} (${files.length})`)
}

mkdirSync(join(PUBLIC, 'site'), { recursive: true })
const others = readdirSync(join(SRC, 'other'))
for (const [file, name] of Object.entries(site)) {
  if (!others.includes(file)) {
    console.warn(`! missing other/${file}`)
    continue
  }
  await responsive(
    join(SRC, 'other', file),
    join(PUBLIC, 'site', name),
    `/images/site/${name}`,
    SITE_WIDTHS,
    {
      blur: true,
    },
  )
  console.log(`✓ site/${name}`)
}

// Default share image for pages without their own.
await sharp(join(SRC, 'other', 'hero-desktop.png'))
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/brand/og.jpg')

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
console.log(`\nManifest → ${MANIFEST} (${Object.keys(manifest).length} images)`)
