/** References an entry in src/data/sizes.json, e.g. "eu-42" or "eu-42-5", or ONE_SIZE. */
export type SizeId = string

/** Size value for unsized goods (wallets, bags, gifts), whose `sizes` array is empty. */
export const ONE_SIZE = 'one-size'

export type ProductStatus = 'active' | 'draft' | 'archived'

export interface ProductImage {
  /** Root-relative path, e.g. /images/products/<slug>/1.jpg */
  src: string
  /** Required. Describe the item, not "image of". */
  alt: string
}

export interface ProductColour {
  id: string
  name: string
  hex: string
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
  description: ProductDescription
  /** null means price on request. */
  priceNGN: number | null
  images: ProductImage[]
  colours: ProductColour[]
  /** Every size the product is offered in. */
  sizes: SizeId[]
  /** Subset of `sizes` available to ship now. */
  inStockSizes: SizeId[]
  /** Can be made to order with custom options. */
  customisable: boolean
  /** Made-to-order lead time. Omit for ready-to-ship items. */
  leadTimeDays?: number
}

export type CategoryGroup = 'footwear' | 'leather-goods'

export interface Category {
  id: string
  slug: string
  name: string
  group: CategoryGroup
  sortOrder: number
  description?: string
}

export interface SizeEntry {
  id: SizeId
  eu: string
  uk: string
  us: string
}

export interface SizeChart {
  /** The system shown first in the size picker. */
  primarySystem: 'eu' | 'uk' | 'us'
  note: string
  sizes: SizeEntry[]
}

export interface CustomOption {
  id: string
  name: string
  description?: string
  /** Added to the base price. null means quoted on request. */
  priceDeltaNGN?: number | null
}

export interface CustomColourOption extends CustomOption {
  hex: string
}

/** Choices for the custom pair builder. */
export interface CustomOptions {
  materials: CustomOption[]
  colours: CustomColourOption[]
  soles: CustomOption[]
  /** Width and fit notes. Half sizes and widths matter to this audience. */
  fits: CustomOption[]
  defaultLeadTimeDays: number | null
}
