import type { MetaDescriptor } from 'react-router'
import { IS_LIVE, site } from '../config/site'

interface SeoInput {
  /** Page title without the brand suffix. Omit for the home page. */
  title?: string
  description?: string
  /** Path beginning with "/". */
  path: string
  /** Root-relative or absolute share image (1200×630 JPG works best on WhatsApp). */
  image?: string
  imageAlt?: string
  type?: 'website' | 'product' | 'article'
  noindex?: boolean
  /** Structured data, emitted as JSON-LD. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

const DEFAULT_IMAGE = '/brand/og.jpg'
const DEFAULT_IMAGE_ALT = 'A pair of handmade cognac leather loafers on a workshop bench'

/** Absolute URL when the site origin is configured, otherwise root-relative. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path
  return `${site.url}${path}`
}

const comingSoonMeta: MetaDescriptor[] = [
  { title: `${site.name} — ${site.tagline.replace(/\.$/, '')}` },
  { name: 'description', content: site.description },
  { property: 'og:title', content: `${site.name} — ${site.tagline.replace(/\.$/, '')}` },
  { property: 'og:description', content: site.description },
  { property: 'og:image', content: absoluteUrl(DEFAULT_IMAGE) },
  { name: 'twitter:card', content: 'summary_large_image' },
]

export function seo(input: SeoInput): MetaDescriptor[] {
  if (!IS_LIVE) return comingSoonMeta

  const title = input.title
    ? `${input.title} | ${site.name}`
    : `${site.name} — ${site.tagline.replace(/\.$/, '')}`
  const description = input.description ?? site.description
  const image = absoluteUrl(input.image ?? DEFAULT_IMAGE)
  const imageAlt = input.imageAlt ?? DEFAULT_IMAGE_ALT
  const url = absoluteUrl(input.path)

  const tags: MetaDescriptor[] = [
    { title },
    { name: 'description', content: description },
    { property: 'og:site_name', content: site.name },
    { property: 'og:type', content: input.type === 'product' ? 'product' : 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: image },
    { property: 'og:image:alt', content: imageAlt },
    { property: 'og:locale', content: 'en_NG' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
  ]
  if (site.url) {
    tags.push(
      { tagName: 'link', rel: 'canonical', href: url },
      { property: 'og:url', content: url },
    )
  }
  if (input.noindex) tags.push({ name: 'robots', content: 'noindex, follow' })
  for (const data of [input.jsonLd ?? []].flat()) {
    tags.push({ 'script:ld+json': { '@context': 'https://schema.org', ...data } })
  }
  return tags
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export const organizationJsonLd = {
  '@type': 'Organization',
  name: site.legalName,
  alternateName: site.name,
  slogan: site.promise,
  ...(site.url ? { url: site.url, logo: absoluteUrl('/brand/favicon.svg') } : {}),
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: `+${site.whatsappNumber}`,
    contactType: 'customer service',
    availableLanguage: ['en'],
  },
  ...(site.instagramUrl ? { sameAs: [site.instagramUrl] } : {}),
}
