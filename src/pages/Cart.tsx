import { useCart } from '../features/cart'
import { OrderSummary } from '../features/checkout'
import { Container } from '../components/ui/Container'

export default function Cart() {
  const cart = useCart()

  return (
    <Container>
      <h1 className="font-display text-4xl text-espresso">Cart</h1>
      <p className="mt-3 text-charcoal/80">
        TODO: line items with quantity controls, notes, subtotal and a link to checkout.
      </p>
      <OrderSummary lines={cart.lines} subtotalNGN={cart.subtotalNGN} />
    </Container>
  )
}
