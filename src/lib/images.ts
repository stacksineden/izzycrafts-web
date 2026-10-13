import manifest from '../data/images.generated.json'

export interface ImageInfo {
  w: number
  h: number
  widths: number[]
  blur?: string
}

const images = manifest as Record<string, ImageInfo>

export function imageInfo(src: string): ImageInfo | undefined {
  return images[src]
}

export function imageUrl(src: string, width: number): string {
  return `${src}-${width}.webp`
}

/** The widest generated file, for share cards and JSON-LD. */
export function largestImageUrl(src: string): string {
  const info = images[src]
  return info ? imageUrl(src, info.widths[info.widths.length - 1]) : src
}

export function srcSet(src: string): string | undefined {
  const info = images[src]
  return info?.widths.map((w) => `${imageUrl(src, w)} ${w}w`).join(', ')
}
