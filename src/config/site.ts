export type SiteMode = 'coming_soon' | 'live'

const env = import.meta.env

function parseSiteMode(value: string | undefined): SiteMode {
  return value?.trim() === 'live' ? 'live' : 'coming_soon'
}

export const site = {
  name: 'Izzy Crafts',
  legalName: 'Izzy Crafts Leather Products Ltd.',
  tagline: 'Handcrafted for Every Step.',
  promise: 'Made by hand. Made for your feet. Made to last.',
  description:
    'Izzy Crafts makes handmade leather footwear for people who notice the difference between made and made well.',

  mode: parseSiteMode(env.VITE_SITE_MODE),
  /** Production origin, no trailing slash. Needed for canonical URLs, share images and the sitemap. */
  url: (env.VITE_SITE_URL ?? '').trim().replace(/\/+$/, ''),

  /** Business WhatsApp line (+234 815 663 3882). International format, digits only, for wa.me links. */
  whatsappNumber: '2348156633882',
  whatsappDisplay: '+234 815 663 3882',
  instagramUrl: (env.VITE_INSTAGRAM_URL ?? '').trim() || null,

  logo: {
    src: '/brand/logo.svg',
    available: __HAS_LOGO__,
  },

  messages: {
    customPair: "Hello Izzy Crafts, I'd like to start a custom pair.",
    general: "Hello Izzy Crafts, I'd like to ask about a pair.",
  },
} as const

export const SITE_MODE: SiteMode = site.mode
export const IS_LIVE = SITE_MODE === 'live'
