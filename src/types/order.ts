import type { CartLine } from './cart'
import type { SizeId } from './product'

export interface CustomerDetails {
  name: string
  deliveryCity: string
  phone?: string
  notes?: string
}

/** Short client-side reference, e.g. IC-7K3Q9P. */
export type OrderRef = string

export interface OrderDraft {
  ref: OrderRef
  lines: CartLine[]
  customer: CustomerDetails
  /** null when any line is price on request. */
  subtotalNGN: number | null
  createdAt: string
}

/** Output of the custom pair builder, serialised into a cart line's customNotes. */
export interface CustomPairSelection {
  materialId: string
  colourId: string
  soleId: string
  fitId: string
  size: SizeId
  notes?: string
}
