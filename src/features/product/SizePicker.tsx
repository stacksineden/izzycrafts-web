import type { SizeId } from '../../types/product'

/**
 * TODO: radio group of sizes (labels via getSizeLabel), out-of-stock sizes shown but marked
 * "made to order" when the product is customisable, EU/UK/US toggle, link to the size chart.
 */
export function SizePicker(_props: {
  sizes: SizeId[]
  inStockSizes: SizeId[]
  value: SizeId | null
  onChange: (size: SizeId) => void
}) {
  return null
}
