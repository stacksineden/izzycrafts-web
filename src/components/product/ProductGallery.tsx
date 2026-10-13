import { useRef, useState } from 'react'
import type { ProductImage } from '../../types/product'
import { Picture } from '../ui/Picture'
import { cn } from '../ui/cn'

/**
 * One list of images, styled two ways so each image is only requested once:
 * mobile is a full-bleed swipe carousel (CSS scroll-snap), desktop is an editorial stack.
 */
export function ProductGallery({
  images,
  productName,
}: {
  images: ProductImage[]
  productName: string
}) {
  const track = useRef<HTMLUListElement>(null)
  const [index, setIndex] = useState(0)

  const onScroll = () => {
    const el = track.current
    if (el && el.scrollWidth > el.clientWidth) setIndex(Math.round(el.scrollLeft / el.clientWidth))
  }

  const goTo = (i: number) => {
    const el = track.current
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <div className="relative -mx-4 sm:-mx-6 lg:mx-0">
      <ul
        ref={track}
        onScroll={onScroll}
        aria-label={`${productName} images`}
        className={cn(
          'no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain bg-stone',
          'lg:grid lg:grid-cols-2 lg:gap-3 lg:overflow-visible lg:bg-transparent',
        )}
      >
        {images.map((img, i) => (
          <li
            key={img.src}
            className={cn(
              'w-full shrink-0 snap-center lg:w-auto lg:overflow-hidden lg:rounded-sm lg:bg-stone',
              i === 0 && 'lg:col-span-2',
            )}
          >
            <Picture
              src={img.src}
              alt={img.alt}
              sizes={
                i === 0
                  ? '(min-width: 1440px) 820px, (min-width: 1024px) 56vw, 100vw'
                  : '(min-width: 1440px) 410px, (min-width: 1024px) 28vw, 100vw'
              }
              priority={i === 0}
              blur={false}
              className="aspect-[4/5] w-full object-cover"
            />
          </li>
        ))}
      </ul>
      {images.length > 1 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center lg:hidden">
          <div className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-ivory/85 px-3 py-2 backdrop-blur">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show image ${i + 1} of ${images.length}`}
                aria-current={i === index}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  i === index ? 'w-5 bg-espresso' : 'w-1.5 bg-espresso/30',
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
