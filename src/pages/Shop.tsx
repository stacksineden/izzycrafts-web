import { useState } from 'react'
import { CatalogFilters, ProductGrid, type CatalogFilterState } from '../features/catalog'
import { getCategories, getProducts } from '../lib/catalog'
import { Container } from '../components/ui/Container'

export default function Shop() {
  const [filters, setFilters] = useState<CatalogFilterState>({
    categoryId: null,
    colourId: null,
    sizeId: null,
    inStockOnly: false,
  })

  return (
    <Container>
      <h1 className="font-display text-4xl text-espresso">Shop</h1>
      <p className="mt-3 text-charcoal/80">
        TODO: all active products with filters by category, colour, size and stock.
      </p>
      <CatalogFilters categories={getCategories()} value={filters} onChange={setFilters} />
      <ProductGrid products={getProducts()} />
    </Container>
  )
}
