import type { Product } from '../../types/product'
import { ProductCard } from './ProductCard'

/** TODO: responsive grid of ProductCard with an empty state. */
export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  )
}
