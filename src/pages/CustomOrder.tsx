import { CustomPairBuilder } from '../features/custom-order'
import { getCustomOptions, getSizeChart } from '../lib/catalog'
import type { CustomPairSelection } from '../types/order'
import { Container } from '../components/ui/Container'

export default function CustomOrder() {
  const handleComplete = (_selection: CustomPairSelection) => {
    // TODO: add to cart or open WhatsApp with the selection.
  }

  return (
    <Container>
      <h1 className="font-display text-4xl text-espresso">Custom Pair</h1>
      <p className="mt-3 text-charcoal/80">
        TODO: the custom pair builder: material, colour, sole, size and fit notes, sent to WhatsApp.
      </p>
      <CustomPairBuilder
        options={getCustomOptions()}
        sizeChart={getSizeChart()}
        onComplete={handleComplete}
      />
    </Container>
  )
}
