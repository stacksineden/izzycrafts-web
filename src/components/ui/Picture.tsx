import type { CSSProperties } from 'react'
import { imageInfo, imageUrl, srcSet } from '../../lib/images'
import { cn } from './cn'

interface PictureProps {
  /** Base path from the manifest, e.g. /images/products/<slug>/1. */
  src: string
  alt: string
  /** The `sizes` attribute: how wide the image renders at each breakpoint. */
  sizes: string
  /** Above-the-fold images: eager load and high fetch priority. */
  priority?: boolean
  className?: string
  imgClassName?: string
  style?: CSSProperties
  /** Show the blurred placeholder while loading (editorial images). */
  blur?: boolean
}

/**
 * Responsive WebP from the generated manifest. Width/height are always set,
 * so the browser reserves space and nothing shifts while images load.
 */
export function Picture({
  src,
  alt,
  sizes,
  priority,
  className,
  imgClassName,
  style,
  blur = true,
}: PictureProps) {
  const info = imageInfo(src)
  if (!info) return null
  const fallback = imageUrl(src, info.widths[Math.min(1, info.widths.length - 1)])

  return (
    <img
      src={fallback}
      srcSet={srcSet(src)}
      sizes={sizes}
      alt={alt}
      width={info.w}
      height={info.h}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={cn(className, imgClassName)}
      style={
        blur && info.blur
          ? {
              backgroundImage: `url(${info.blur})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              ...style,
            }
          : style
      }
    />
  )
}
