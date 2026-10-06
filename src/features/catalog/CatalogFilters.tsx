import type { Category } from '../../types/product'

export interface CatalogFilterState {
  categoryId: string | null
  colourId: string | null
  sizeId: string | null
  inStockOnly: boolean
}

/** TODO: category links, colour and size filters, in-stock toggle. Sync with URL search params. */
export function CatalogFilters(_props: {
  categories: Category[]
  value: CatalogFilterState
  onChange: (next: CatalogFilterState) => void
}) {
  return null
}
