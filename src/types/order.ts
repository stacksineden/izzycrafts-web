import type { SizeId } from './product'

export interface CustomerDetails {
  name: string
  phone: string
  city: string
  address?: string
  notes?: string
}

/** Short client-side reference, e.g. IC-7K3Q9P. */
export type OrderRef = string

/** Output of the custom pair builder. */
export interface CustomPairRequest {
  styleId: string
  baseProductId?: string
  materialId: string
  colourId: string
  soleId: string
  size: SizeId
  fitId: string
  neededBy?: string
  notes?: string
  name: string
}
