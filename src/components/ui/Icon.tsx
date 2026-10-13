import type { SVGProps } from 'react'

/** Thin-line icons (1.5px), rounded joins, per the brand icon style. */
const paths = {
  bag: 'M6 8h12l-1 12H7L6 8Zm3 0V6a3 3 0 0 1 6 0v2',
  menu: 'M4 7h16M4 12h16M4 17h10',
  close: 'M6 6l12 12M18 6 6 18',
  arrowRight: 'M5 12h14m-5-5 5 5-5 5',
  arrowLeft: 'M19 12H5m5-5-5 5 5 5',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  chevronDown: 'm6 9 6 6 6-6',
  check: 'm5 12.5 4.5 4.5L19 7.5',
  ruler: 'M3 8.5 8.5 3 21 15.5 15.5 21 3 8.5Zm4 0 2 2m1-5 2 2m1 1 2 2m1 1 2 2',
  needle: 'M18.5 3.5 6 16l-2 4 4-2L20.5 5.5a1.4 1.4 0 0 0-2-2ZM15 7l2 2',
  truck:
    'M3 7h11v9H3V7Zm11 3h4l3 3v3h-7v-6ZM7 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
  chat: 'M4 18.5V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8l-4 2.5Z',
  lock: 'M6 11h12v9H6v-9Zm2 0V8a4 4 0 0 1 8 0v3',
} as const

export type IconName = keyof typeof paths | 'whatsapp' | 'instagram'

export function Icon({
  name,
  size = 20,
  ...rest
}: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
    focusable: false,
    ...rest,
  }
  if (name === 'whatsapp') {
    return (
      <svg {...common} fill="currentColor">
        <path d="M12 2.2a9.8 9.8 0 0 0-8.4 14.8L2.3 21.8l4.9-1.3A9.8 9.8 0 1 0 12 2.2Zm0 17.9c-1.5 0-3-.4-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.1 8.1 0 1 1 12 20.1Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.2-.3-.2-.5-.4Z" />
      </svg>
    )
  }
  if (name === 'instagram') {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
      </svg>
    )
  }
  return (
    <svg
      {...common}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  )
}
