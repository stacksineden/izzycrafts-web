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
import { ONE_SIZE } from '../types/product'

const products = productsJson as Product[]
const categories = (categoriesJson as Category[]).toSorted((a, b) => a.sortOrder - b.sortOrder)
const sizeChart = sizesJson as SizeChart
const customOptions = customOptionsJson as CustomOptions

const sizesById = new Map(sizeChart.sizes.map((s) => [s.id, s]))

interface ProductQuery {
  /** Include draft products. Defaults to true in dev, false in production. */
  includeDrafts?: boolean
}

const showDraftsByDefault = import.meta.env.DEV

function isVisible(product: Product, { includeDrafts = showDraftsByDefault }: ProductQuery) {
  if (product.status === 'archived') return false
  return product.status === 'active' || includeDrafts
}

export function getProducts(query: ProductQuery = {}): Product[] {
  return products.filter((p) => isVisible(p, query))
}

export function getFeaturedProducts(query: ProductQuery = {}): Product[] {
  return getProducts(query).filter((p) => p.featured)
}

export function getProductBySlug(slug: string, query: ProductQuery = {}): Product | undefined {
  return getProducts(query).find((p) => p.slug === slug)
}

export function getProductsByCategory(categoryId: string, query: ProductQuery = {}): Product[] {
  return getProducts(query).filter((p) => p.categoryId === categoryId)
}

export function getCustomisableProducts(query: ProductQuery = {}): Product[] {
  return getProducts(query).filter((p) => p.customisable)
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

/** Display label in the chart's primary system, e.g. "EU 42.5". */
export function getSizeLabel(id: SizeId): string {
  if (id === ONE_SIZE) return 'One size'
  const size = sizesById.get(id)
  if (!size) return id
  const system = sizeChart.primarySystem
  return `${system.toUpperCase()} ${size[system]}`
}

export function getColourName(product: Product, colourId: string): string {
  return product.colours.find((c) => c.id === colourId)?.name ?? colourId
}

export function getCustomOptions(): CustomOptions {
  return customOptions
}

/** Dev-only integrity checks so data mistakes show up in the console, not in front of customers. */
function validateCatalog() {
  const problems: string[] = []
  const slugs = new Set<string>()
  const categoryIds = new Set(categories.map((c) => c.id))

  for (const p of products) {
    if (slugs.has(p.slug)) problems.push(`Duplicate slug "${p.slug}"`)
    slugs.add(p.slug)
    if (!categoryIds.has(p.categoryId))
      problems.push(`${p.slug}: unknown categoryId "${p.categoryId}"`)
    for (const s of p.sizes) if (!sizesById.has(s)) problems.push(`${p.slug}: unknown size "${s}"`)
    for (const s of p.inStockSizes)
      if (!p.sizes.includes(s)) problems.push(`${p.slug}: inStockSizes has "${s}" not in sizes`)
    for (const img of p.images) if (!img.alt.trim()) problems.push(`${p.slug}: image missing alt`)
    if (p.colours.length === 0) problems.push(`${p.slug}: no colours`)
  }

  if (problems.length) console.warn('[catalog] Data problems:\n- ' + problems.join('\n- '))
}

if (import.meta.env.DEV) validateCatalog()
