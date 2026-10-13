/** References an entry in src/data/sizes.json, e.g. "eu-42" or "eu-42-5". */
export type SizeId = string

export type ProductStatus = 'active' | 'draft' | 'archived'
export type Availability = 'made-to-order' | 'ready-to-ship'

export interface ProductImage {
  /** Base path without width or extension, e.g. /images/products/<slug>/1. See lib/images.ts. */
  src: string
  /** Required. Describe the item, not "image of". */
  alt: string
}

/**
 * Brand copy rule: every description answers three questions.
 * What it is made of, how it was made, and how it feels to wear.
 */
export interface ProductDescription {
  /** One or two sentences for cards and meta descriptions. */
  summary: string
  madeOf: string
  madeHow: string
  feel: string
}

export interface Product {
  id: string
  slug: string
  name: string
  categoryId: string
  status: ProductStatus
  featured: boolean
  /** Short line under the name on cards. */
  tagline: string
  description: ProductDescription
  /** The brand's long-form story, one string per paragraph. */
  story: string[]
  /** null means price on request. */
  priceNGN: number | null
  /** Shown as photographed. Customers ask for other colours in their order notes. */
  images: ProductImage[]
  sizes: SizeId[]
  availability: Availability
  /** Made-to-order lead time, when known. */
  leadTimeDays?: number
  customisable: boolean
}

export interface Category {
  id: string
  slug: string
  name: string
  sortOrder: number
  description: string
  /** Base image path, see lib/images.ts. */
  image: string
}

export interface SizeEntry {
  id: SizeId
  eu: string
  uk: string
  us: string
}

export interface SizeChart {
  primarySystem: 'eu' | 'uk' | 'us'
  note: string
  sizes: SizeEntry[]
}

export interface CustomOption {
  id: string
  name: string
  description?: string
}

export interface CustomColourOption extends CustomOption {
  hex: string
}

/** Choices for the custom pair builder. */
export interface CustomOptions {
  styles: CustomOption[]
  materials: CustomOption[]
  colours: CustomColourOption[]
  soles: CustomOption[]
  fits: CustomOption[]
}
