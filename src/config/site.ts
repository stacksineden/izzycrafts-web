export type SiteMode = 'coming_soon' | 'live'

const env = import.meta.env

function parseSiteMode(value: string | undefined): SiteMode {
  return value?.trim() === 'live' ? 'live' : 'coming_soon'
}

function optionalUrl(value: string | undefined): string | null {
  const trimmed = value?.trim()
  return trimmed ? trimmed : null
}

export const site = {
  name: 'Izzy Crafts',
  legalName: 'Izzy Crafts Leather Products Ltd.',
  tagline: 'Handcrafted for Every Step.',
  promise: 'Made by hand. Made for your feet. Made to last.',

  mode: parseSiteMode(env.VITE_SITE_MODE),
  url: optionalUrl(env.VITE_SITE_URL),

  /** Business WhatsApp line (+234 815 663 3882). International format, digits only, for wa.me links. */
  whatsappNumber: '2348156633882',
  instagramUrl: optionalUrl(env.VITE_INSTAGRAM_URL),

  logo: {
    src: '/brand/logo.svg',
    available: __HAS_LOGO__,
  },

  messages: {
    customPair: "Hello Izzy Crafts, I'd like to start a custom pair.",
  },
} as const

export const SITE_MODE: SiteMode = site.mode
