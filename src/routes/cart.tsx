import { CartLineItem } from '../components/cart/CartLineItem'
import { CartSummary } from '../components/cart/CartSummary'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Picture } from '../components/ui/Picture'
import { useCart } from '../features/cart'
import { seo } from '../lib/seo'
import type { Route } from './+types/cart'

export const meta: Route.MetaFunction = () =>
  seo({ title: 'Your Bag', path: '/cart', noindex: true })

export default function CartPage() {
  const { ready, lines, itemCount, subtotalNGN } = useCart()

  if (ready && lines.length === 0) return <EmptyBag />

  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <h1 className="font-display text-4xl font-light text-espresso sm:text-5xl">Your bag</h1>
      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
        <ul className="divide-y divide-line border-y border-line" aria-busy={!ready}>
          {lines.map((item) => (
            <CartLineItem key={item.key} item={item} />
          ))}
        </ul>
        <aside className="h-fit rounded-sm bg-stone/50 p-6 lg:sticky lg:top-28">
          <h2 className="sr-only">Order summary</h2>
          <CartSummary subtotalNGN={subtotalNGN} itemCount={itemCount} />
          <Button
            to="/checkout"
            block
            size="lg"
            className="mt-6"
            aria-disabled={!ready || lines.length === 0}
          >
            Checkout
          </Button>
          <Button to="/shop" variant="link" block className="mt-4">
            Continue shopping
          </Button>
        </aside>
      </div>
    </Container>
  )
}

export function EmptyBag() {
  return (
    <Container className="grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:gap-16">
      <div className="overflow-hidden rounded-sm lg:order-2">
        <Picture
          src="/images/site/empty-cart"
          alt="An empty kraft shoebox lined with ivory tissue paper"
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="aspect-[4/3] w-full object-cover lg:aspect-[4/5]"
        />
      </div>
      <div>
        <h1 className="font-display text-4xl font-light text-espresso sm:text-5xl">
          Your bag is empty
        </h1>
        <p className="mt-4 max-w-md text-lg text-charcoal/80">
          The box is ready; it only needs a pair. Every one is made by hand, to order, in your size.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Button to="/shop" size="lg">
            Shop the collection
          </Button>
          <Button to="/custom" variant="link">
            Or start a custom pair
          </Button>
        </div>
      </div>
    </Container>
  )
}
