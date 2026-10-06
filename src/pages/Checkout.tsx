import { useCart } from '../features/cart'
import { OrderSummary, SendOrderButton } from '../features/checkout'
import { Container } from '../components/ui/Container'

export default function Checkout() {
  const cart = useCart()

  return (
    <Container>
      <h1 className="font-display text-4xl text-espresso">Checkout</h1>
      <p className="mt-3 text-charcoal/80">
        TODO: name, delivery city and notes, order summary, then "Send order on WhatsApp".
      </p>
      <OrderSummary lines={cart.lines} subtotalNGN={cart.subtotalNGN} />
      <SendOrderButton cart={cart.state} customer={null} />
    </Container>
  )
}
