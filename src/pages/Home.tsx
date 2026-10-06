import { ProductGrid } from '../features/catalog'
import { getFeaturedProducts } from '../lib/catalog'
import { Container } from '../components/ui/Container'

export default function Home() {
  return (
    <Container>
      <h1 className="font-display text-4xl text-espresso">Home</h1>
      <p className="mt-3 text-charcoal/80">
        TODO: hero, featured products, category entry points, custom pair invitation, brand story.
      </p>
      <ProductGrid products={getFeaturedProducts()} />
    </Container>
  )
}
