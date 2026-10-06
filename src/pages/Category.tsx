import { useParams } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { ProductGrid } from '../features/catalog'
import { getCategoryBySlug, getProductsByCategory } from '../lib/catalog'
import NotFound from './NotFound'

export default function Category() {
  const { category: slug = '' } = useParams()
  const category = getCategoryBySlug(slug)
  if (!category) return <NotFound />

  return (
    <Container>
      <h1 className="font-display text-4xl text-espresso">{category.name}</h1>
      <p className="mt-3 text-charcoal/80">
        TODO: category intro and the products in this category, with the same filters as Shop.
      </p>
      <ProductGrid products={getProductsByCategory(category.id)} />
    </Container>
  )
}
