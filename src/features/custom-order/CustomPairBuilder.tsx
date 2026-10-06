import type { CustomPairSelection } from '../../types/order'
import type { CustomOptions, SizeChart } from '../../types/product'

/**
 * TODO: step through material → colour → sole → size → fit/width notes, show lead time,
 * then either add to cart (selection serialised into customNotes) or send straight to WhatsApp.
 */
export function CustomPairBuilder(_props: {
  options: CustomOptions
  sizeChart: SizeChart
  onComplete: (selection: CustomPairSelection) => void
}) {
  return null
}
