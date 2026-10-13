export interface NavItem {
  label: string
  to: string
}

export const primaryNav: NavItem[] = [
  { label: 'Shop all', to: '/shop' },
  { label: 'Loafers', to: '/shop/loafers' },
  { label: 'Slides', to: '/shop/slides' },
  { label: 'Sandals', to: '/shop/sandals' },
  { label: 'Mules & Clogs', to: '/shop/mules-and-clogs' },
  { label: 'Custom Pair', to: '/custom' },
]

export const secondaryNav: NavItem[] = [
  { label: 'Our Craft', to: '/our-craft' },
  { label: 'Care Guide', to: '/care-guide' },
]
