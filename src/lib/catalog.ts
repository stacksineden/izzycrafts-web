import categoriesJson from '../data/categories.json'
import customOptionsJson from '../data/custom-options.json'
import productsJson from '../data/products.json'
import sizesJson from '../data/sizes.json'
import type {
  Category,
  CustomOptions,
  Product,
  SizeChart,
  SizeEntry,
  SizeId,
} from '../types/product'
import { imageInfo } from './images'

const allProducts = productsJson as Product[]
const categories = (categoriesJson as Category[]).toSorted((a, b) => a.sortOrder - b.sortOrder)
const sizeChart = sizesJson as SizeChart
const customOptions = customOptionsJson as CustomOptions

const sizesById = new Map(sizeChart.sizes.map((s) => [s.id, s]))
const productsById = new Map(allProducts.map((p) => [p.id, p]))

/** Only active products are shown. Drafts stay in the JSON until they are ready. */
const products = allProducts.filter((p) => p.status === 'active')

export function getProducts(): Product[] {
  return products
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  const p = productsById.get(id)
  return p?.status === 'active' ? p : undefined
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.categoryId === categoryId)
}

/** Same category first, then the rest of the collection. */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const others = products.filter((p) => p.id !== product.id)
  const same = others.filter((p) => p.categoryId === product.categoryId)
  const rest = others.filter((p) => p.categoryId !== product.categoryId)
  return [...same, ...rest].slice(0, limit)
}

export function getCategories(): Category[] {
  return categories
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id)
}

export function getSizeChart(): SizeChart {
  return sizeChart
}

export function getSize(id: SizeId): SizeEntry | undefined {
  return sizesById.get(id)
}

/** Display label, e.g. "EU 42.5". */
export function getSizeLabel(id: SizeId): string {
  const size = sizesById.get(id)
  if (!size) return id
  const system = sizeChart.primarySystem
  return `${system.toUpperCase()} ${size[system]}`
}

export function getCustomOptions(): CustomOptions {
  return customOptions
}

/** Dev-only integrity checks so data mistakes show up in the console, not in front of customers. */
function validateCatalog() {
  const problems: string[] = []
  const slugs = new Set<string>()
  const categoryIds = new Set(categories.map((c) => c.id))

  for (const p of allProducts) {
    if (slugs.has(p.slug)) problems.push(`Duplicate slug "${p.slug}"`)
    slugs.add(p.slug)
    if (!categoryIds.has(p.categoryId))
      problems.push(`${p.slug}: unknown categoryId "${p.categoryId}"`)
    for (const s of p.sizes) if (!sizesById.has(s)) problems.push(`${p.slug}: unknown size "${s}"`)
    if (p.images.length === 0) problems.push(`${p.slug}: no images`)
    for (const img of p.images) {
      if (!img.alt.trim()) problems.push(`${p.slug}: image missing alt`)
      if (!imageInfo(img.src))
        problems.push(`${p.slug}: ${img.src} is not in images.generated.json`)
    }
  }
  for (const c of categories)
    if (!imageInfo(c.image))
      problems.push(`category ${c.slug}: ${c.image} is not in images.generated.json`)

  if (problems.length) console.warn('[catalog] Data problems:\n- ' + problems.join('\n- '))
}

if (import.meta.env.DEV) validateCatalog()
