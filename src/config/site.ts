export type SiteMode = 'coming_soon' | 'live'

const env = import.meta.env

function parseSiteMode(value: string | undefined): SiteMode {
  return value?.trim() === 'live' ? 'live' : 'coming_soon'
}

/** Digits only. Returns null for blanks and the .env.example placeholder. */
function parseWhatsAppNumber(value: string | undefined): string | null {
  const digits = (value ?? '').replace(/\D/g, '')
  return digits.length >= 10 ? digits : null
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

  whatsappNumber: parseWhatsAppNumber(env.VITE_WHATSAPP_NUMBER),
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

if (import.meta.env.DEV && !site.whatsappNumber) {
  console.warn(
    '[site] VITE_WHATSAPP_NUMBER is not set. WhatsApp links will open without a recipient.',
  )
}
