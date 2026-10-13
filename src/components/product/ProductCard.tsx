import { Link } from 'react-router'
import type { Product } from '../../types/product'
import { Picture } from '../ui/Picture'
import { Price } from '../ui/Price'
import { cn } from '../ui/cn'

const CARD_SIZES = '(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 46vw'

export function ProductCard({
  product,
  priority,
  className,
}: {
  product: Product
  priority?: boolean
  className?: string
}) {
  const [first, second] = product.images
  return (
    <article className={cn('group relative', className)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-stone">
        <Picture
          src={first.src}
          alt={first.alt}
          sizes={CARD_SIZES}
          priority={priority}
          blur={false}
          className="absolute inset-0 size-full object-cover transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.02]"
        />
        {second && (
          <Picture
            src={second.src}
            alt=""
            sizes={CARD_SIZES}
            blur={false}
            className="absolute inset-0 hidden size-full object-cover opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100 md:block"
          />
        )}
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <h3 className="font-display text-lg leading-snug text-espresso sm:text-xl">
          <Link
            to={`/product/${product.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-espresso"
          >
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-charcoal/70">{product.tagline}</p>
        <div className="mt-1.5 text-sm">
          <Price amount={product.priceNGN} className="font-medium text-espresso" />
        </div>
      </div>
    </article>
  )
}

export function ProductGrid({
  products,
  priorityCount = 0,
}: {
  products: Product[]
  priorityCount?: number
}) {
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 xl:gap-y-14">
      {products.map((p, i) => (
        <li key={p.id}>
          <ProductCard product={p} priority={i < priorityCount} />
        </li>
      ))}
    </ul>
  )
}
