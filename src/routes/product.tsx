import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import { ProductGrid } from '../components/product/ProductCard'
import { ProductGallery } from '../components/product/ProductGallery'
import { SizeGuide } from '../components/product/SizeGuide'
import { SizePicker } from '../components/product/SizePicker'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Icon } from '../components/ui/Icon'
import { Price } from '../components/ui/Price'
import { SectionHeading } from '../components/ui/SectionHeading'
import { cn } from '../components/ui/cn'
import { site } from '../config/site'
import { MAX_NOTE_LENGTH, useCart } from '../features/cart'
import { getCategoryById, getProductBySlug, getRelatedProducts, getSizeLabel } from '../lib/catalog'
import { largestImageUrl } from '../lib/images'
import { absoluteUrl, breadcrumbJsonLd, seo } from '../lib/seo'
import { buildProductEnquiry, buildWhatsAppLink } from '../lib/whatsapp'
import type { Product, SizeId } from '../types/product'
import type { Route } from './+types/product'
import NotFound from './not-found'

export const meta: Route.MetaFunction = ({ params }) => {
  const product = getProductBySlug(params.slug)
  if (!product) return seo({ title: 'Page not found', path: '/404', noindex: true })
  const category = getCategoryById(product.categoryId)
  const path = `/product/${product.slug}`
  return seo({
    title: product.name,
    description: `${product.description.summary} Handmade to order by Izzy Crafts.`,
    path,
    type: 'product',
    image: `/images/og/${product.slug}.jpg`,
    imageAlt: product.images[0].alt,
    jsonLd: [
      {
        '@type': 'Product',
        name: product.name,
        description: product.description.summary,
        image: product.images.slice(0, 4).map((img) => absoluteUrl(largestImageUrl(img.src))),
        sku: product.id,
        brand: { '@type': 'Brand', name: site.name },
        category: category?.name,
        material: product.description.madeOf,
        ...(product.priceNGN !== null
          ? {
              offers: {
                '@type': 'Offer',
                price: product.priceNGN,
                priceCurrency: 'NGN',
                availability:
                  product.availability === 'made-to-order'
                    ? 'https://schema.org/PreOrder'
                    : 'https://schema.org/InStock',
                url: absoluteUrl(path),
              },
            }
          : {}),
      },
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        ...(category ? [{ name: category.name, path: `/shop/${category.slug}` }] : []),
        { name: product.name, path },
      ]),
    ],
  })
}

export default function ProductPage() {
  const { slug = '' } = useParams()
  const product = getProductBySlug(slug)
  if (!product) return <NotFound />
  // Keyed so selections reset when navigating between products.
  return <ProductView key={product.id} product={product} />
}

function ProductView({ product }: { product: Product }) {
  const category = getCategoryById(product.categoryId)
  const { add } = useCart()

  const [size, setSize] = useState<SizeId | null>(null)
  const [note, setNote] = useState('')
  const [sizeError, setSizeError] = useState<string>()
  const [guideOpen, setGuideOpen] = useState(false)
  const [added, setAdded] = useState(false)

  // Mobile sticky bar appears once the main button has scrolled out of view.
  const buyRef = useRef<HTMLDivElement>(null)
  const [showSticky, setShowSticky] = useState(false)
  useEffect(() => {
    const el = buyRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) =>
      setShowSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0),
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const addToBag = () => {
    if (!size) {
      setSizeError('Choose your size to continue.')
      document
        .getElementById('size-picker')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    add({ productId: product.id, size, qty: 1, note: note.trim() || undefined })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2400)
  }

  const enquiry = buildWhatsAppLink(
    buildProductEnquiry(product, size ? getSizeLabel(size) : undefined),
  )

  return (
    <>
      <Container wide className="pt-4 pb-20 sm:pt-8 lg:pb-28">
        <nav aria-label="Breadcrumb" className="mb-4 hidden text-sm text-charcoal/65 lg:block">
          <ol className="flex gap-2">
            <li>
              <Link to="/shop" className="hover:text-espresso">
                Shop
              </Link>
            </li>
            {category && (
              <>
                <li aria-hidden="true">/</li>
                <li>
                  <Link to={`/shop/${category.slug}`} className="hover:text-espresso">
                    {category.name}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-espresso">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
          <ProductGallery images={product.images} productName={product.name} />

          <div className="lg:sticky lg:top-24 lg:self-start">
            {category && (
              <Link
                to={`/shop/${category.slug}`}
                className="eyebrow text-cognac-deep hover:underline"
              >
                {category.name}
              </Link>
            )}
            <h1 className="mt-3 font-display text-[2.125rem] leading-[1.08] font-light text-espresso sm:text-5xl">
              {product.name}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <Price amount={product.priceNGN} className="text-xl font-medium text-espresso" />
              <span className="inline-flex items-center gap-1.5 text-sm text-charcoal/75">
                <Icon name="needle" size={16} className="text-cognac" />
                {product.availability === 'made-to-order' ? 'Made to order' : 'Ready to ship'}
              </span>
            </div>
            <p className="mt-5 text-base text-charcoal/85 sm:text-lg">
              {product.description.summary}
            </p>

            <div className="mt-8 space-y-8 border-t border-line pt-8">
              <div id="size-picker">
                <SizePicker
                  name="size"
                  sizes={product.sizes}
                  value={size}
                  onChange={(s) => {
                    setSize(s)
                    setSizeError(undefined)
                  }}
                  onOpenGuide={() => setGuideOpen(true)}
                  error={sizeError}
                />
              </div>

              <details className="group rounded-sm border border-line bg-white/40 open:bg-white/60">
                <summary className="flex items-center justify-between gap-3 px-4 py-3.5 text-sm font-medium text-espresso">
                  <span>
                    Add fit notes <span className="font-normal text-charcoal/60">(optional)</span>
                  </span>
                  <Icon
                    name="chevronDown"
                    size={18}
                    className="transition-transform group-open:rotate-180"
                  />
                </summary>
                <div className="px-4 pb-4">
                  <label htmlFor="fit-note" className="text-sm text-charcoal/75">
                    Between sizes, a wider foot, or one foot larger than the other? Tell us here.
                  </label>
                  <textarea
                    id="fit-note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    maxLength={MAX_NOTE_LENGTH}
                    rows={3}
                    className="mt-2 w-full rounded-sm border border-line bg-white/80 px-3 py-2.5 text-base focus:border-espresso focus:outline-none"
                  />
                </div>
              </details>

              <div ref={buyRef} className="space-y-3">
                <Button size="lg" block onClick={addToBag} aria-live="polite">
                  {added ? (
                    <>
                      <Icon name="check" size={20} /> Added to your bag
                    </>
                  ) : (
                    'Add to bag'
                  )}
                </Button>
                <Button
                  href={enquiry}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  block
                >
                  <Icon name="whatsapp" size={20} />
                  Ask about this pair
                  <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
                </Button>
              </div>

              <ul className="grid gap-3 text-sm text-charcoal/80 sm:grid-cols-2">
                <li className="flex gap-2.5">
                  <Icon name="chat" size={18} className="mt-0.5 shrink-0 text-cognac" />
                  Price, size and delivery confirmed with you on WhatsApp before we start.
                </li>
                <li className="flex gap-2.5">
                  <Icon name="ruler" size={18} className="mt-0.5 shrink-0 text-cognac" />
                  Half sizes and wider fits can be made for you.
                </li>
                <li className="flex gap-2.5 sm:col-span-2">
                  <Icon name="needle" size={18} className="mt-0.5 shrink-0 text-cognac" />
                  Made as pictured. Want another colour? Add it to your order notes at checkout.
                </li>
              </ul>
            </div>

            <div className="mt-10 divide-y divide-line border-y border-line">
              <Accordion title="The story" defaultOpen>
                <div className="space-y-4">
                  {product.story.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
              </Accordion>
              <Accordion title="Made of, made how, how it feels">
                <dl className="space-y-4">
                  <div>
                    <dt className="font-medium text-espresso">What it is made of</dt>
                    <dd className="mt-1">{product.description.madeOf}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-espresso">How it is made</dt>
                    <dd className="mt-1">{product.description.madeHow}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-espresso">How it feels to wear</dt>
                    <dd className="mt-1">{product.description.feel}</dd>
                  </div>
                </dl>
              </Accordion>
              <Accordion title="Ordering, delivery and care">
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    Every pair is made to order in your size. We confirm the timeline with you
                    before we begin.
                  </li>
                  <li>
                    Checkout sends your order to us on WhatsApp, where we confirm price, size and
                    delivery.
                  </li>
                  <li>
                    Keep leather and velvet away from heavy rain, brush after wear and rest your
                    pairs between days.{' '}
                    <Link
                      to="/care-guide"
                      className="font-medium text-cognac-deep underline underline-offset-4"
                    >
                      Read the care guide
                    </Link>
                  </li>
                </ul>
              </Accordion>
            </div>
          </div>
        </div>
      </Container>

      <section
        className="border-t border-line bg-stone/40 py-20 sm:py-24"
        aria-labelledby="related-title"
      >
        <Container wide>
          <SectionHeading
            eyebrow="You may also like"
            title={<span id="related-title">More from the workshop</span>}
          />
          <div className="mt-10">
            <ProductGrid products={getRelatedProducts(product)} />
          </div>
        </Container>
      </section>

      {/* Mobile sticky buy bar */}
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ivory/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 lg:hidden',
          showSticky ? 'translate-y-0' : 'translate-y-full',
        )}
        aria-hidden={!showSticky}
        inert={!showSticky}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-base text-espresso">{product.name}</p>
            <p className="truncate text-xs text-charcoal/70">
              {size ? getSizeLabel(size) : 'Choose your size'}
            </p>
          </div>
          <Button onClick={addToBag} className="shrink-0">
            {added ? 'Added' : 'Add to bag'}
          </Button>
        </div>
      </div>

      <SizeGuide open={guideOpen} onClose={() => setGuideOpen(false)} />
    </>
  )
}

function Accordion({
  title,
  defaultOpen,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: ReactNode
}) {
  return (
    <details className="group" open={defaultOpen}>
      <summary className="flex items-center justify-between gap-4 py-5 font-display text-xl text-espresso">
        {title}
        <Icon
          name="plus"
          size={20}
          className="shrink-0 transition-transform duration-300 group-open:rotate-45"
        />
      </summary>
      <div className="pb-6 text-[0.9375rem] leading-relaxed text-charcoal/85">{children}</div>
    </details>
  )
}
