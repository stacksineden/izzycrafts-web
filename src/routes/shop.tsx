import { Link, useParams, useSearchParams } from 'react-router'
import { ProductGrid } from '../components/product/ProductCard'
import { Container } from '../components/ui/Container'
import { cn } from '../components/ui/cn'
import {
  getCategories,
  getCategoryBySlug,
  getProducts,
  getProductsByCategory,
} from '../lib/catalog'
import { largestImageUrl } from '../lib/images'
import { absoluteUrl, breadcrumbJsonLd, seo } from '../lib/seo'
import type { Product } from '../types/product'
import type { Route } from './+types/shop'
import NotFound from './not-found'

type SortKey = 'featured' | 'name'

const SORTS: { id: SortKey; label: string }[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'name', label: 'Name, A to Z' },
]

function sortProducts(products: Product[], sort: SortKey): Product[] {
  if (sort === 'name') return products.toSorted((a, b) => a.name.localeCompare(b.name))
  return products.toSorted((a, b) => Number(b.featured) - Number(a.featured))
}

export const meta: Route.MetaFunction = ({ params }) => {
  const category = params.category ? getCategoryBySlug(params.category) : undefined
  if (params.category && !category)
    return seo({ title: 'Page not found', path: '/404', noindex: true })
  const path = category ? `/shop/${category.slug}` : '/shop'
  const list = category ? getProductsByCategory(category.id) : getProducts()
  return seo({
    title: category ? `Handmade ${category.name}` : 'Shop Handmade Leather Footwear',
    description: category
      ? `${category.description} Handmade to order by Izzy Crafts.`
      : 'Handmade loafers, slides, sandals, mules and clogs. Every pair is made to order in our workshop and confirmed with you on WhatsApp.',
    path,
    image: list[0] ? `/images/og/${list[0].slug}.jpg` : undefined,
    jsonLd: [
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        ...(category ? [{ name: category.name, path }] : []),
      ]),
      {
        '@type': 'ItemList',
        itemListElement: list.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: absoluteUrl(`/product/${p.slug}`),
          name: p.name,
          image: absoluteUrl(largestImageUrl(p.images[0].src)),
        })),
      },
    ],
  })
}

export default function Shop() {
  const params = useParams()
  const [search, setSearch] = useSearchParams()
  const category = params.category ? getCategoryBySlug(params.category) : undefined
  if (params.category && !category) return <NotFound />

  const sort: SortKey = search.get('sort') === 'name' ? 'name' : 'featured'
  const products = sortProducts(category ? getProductsByCategory(category.id) : getProducts(), sort)

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(search)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearch(next, { replace: true, preventScrollReset: true })
  }

  const chip = (active: boolean) =>
    cn(
      'inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm whitespace-nowrap transition-colors',
      active
        ? 'border-espresso bg-espresso text-ivory'
        : 'border-line bg-white/50 text-espresso hover:border-espresso/50',
    )

  return (
    <>
      <header className="border-b border-line bg-stone/40">
        <Container wide className="py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="text-sm text-charcoal/65">
            <ol className="flex gap-2">
              <li>
                <Link to="/" className="hover:text-espresso">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                {category ? (
                  <Link to="/shop" className="hover:text-espresso">
                    Shop
                  </Link>
                ) : (
                  <span aria-current="page">Shop</span>
                )}
              </li>
              {category && (
                <>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page">{category.name}</li>
                </>
              )}
            </ol>
          </nav>
          <h1 className="mt-5 font-display text-4xl font-light text-espresso sm:text-5xl lg:text-6xl">
            {category ? category.name : 'The Collection'}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-charcoal/80 sm:text-lg">
            {category
              ? category.description
              : 'Every pair is cut, stitched and finished by hand, and made to order in your size. Choose yours, then confirm the details with us on WhatsApp.'}
          </p>
        </Container>
      </header>

      <Container wide className="py-8 sm:py-10">
        <nav aria-label="Categories" className="-mx-4 sm:-mx-6 lg:mx-0">
          <ul className="no-scrollbar flex gap-2 overflow-x-auto px-4 sm:px-6 lg:flex-wrap lg:px-0">
            <li>
              <Link
                to={{ pathname: '/shop', search: search.toString() }}
                className={chip(!category)}
                aria-current={!category ? 'page' : undefined}
              >
                All
              </Link>
            </li>
            {getCategories().map((c) => (
              <li key={c.id}>
                <Link
                  to={{ pathname: `/shop/${c.slug}`, search: search.toString() }}
                  className={chip(c.id === category?.id)}
                  aria-current={c.id === category?.id ? 'page' : undefined}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 border-b border-line pb-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-charcoal/70" aria-live="polite">
              {products.length} {products.length === 1 ? 'style' : 'styles'}
            </p>
            <label className="flex items-center gap-2 text-sm text-espresso">
              <span className="text-charcoal/70">Sort</span>
              <select
                value={sort}
                onChange={(e) =>
                  update('sort', e.target.value === 'featured' ? null : e.target.value)
                }
                className="rounded-sm border border-line bg-white/60 py-2 pr-8 pl-3 text-sm focus:border-espresso focus:outline-none"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="mt-10 pb-20 sm:pb-28">
          <ProductGrid products={products} priorityCount={2} />
        </div>
      </Container>
    </>
  )
}
