import { useState, type CSSProperties } from 'react'
import { Button } from '../components/ui/Button'
import { Logo } from '../components/ui/Logo'
import { StitchDivider } from '../components/ui/StitchDivider'
import { cn } from '../components/ui/cn'
import { site } from '../config/site'
import { buildWhatsAppLink } from '../lib/whatsapp'

const HERO = {
  desktop: '/images/site/hero-desktop.webp',
  mobile: '/images/site/hero-mobile.webp',
}

/** Staggered fade-up. motion-safe: means nothing animates under prefers-reduced-motion. */
const reveal = 'motion-safe:animate-fade-up'
const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` })

type ImageState = 'loading' | 'loaded' | 'missing'

/**
 * Landscape art directs to the wide image, portrait (phones and portrait tablets) to the tall one.
 * If either file is missing the page falls back to plain espresso.
 */
function HeroImage() {
  const [state, setState] = useState<ImageState>('loading')
  if (state === 'missing') return null

  return (
    <picture>
      <source media="(min-width: 768px) and (orientation: landscape)" srcSet={HERO.desktop} />
      <img
        src={HERO.mobile}
        alt=""
        decoding="async"
        fetchPriority="high"
        onLoad={() => setState('loaded')}
        onError={() => setState('missing')}
        className={cn(
          'absolute inset-0 -z-20 h-full w-full object-cover object-[50%_20%] landscape:md:object-[70%_50%]',
          'transition-opacity duration-1000 ease-out motion-reduce:transition-none',
          state === 'loaded' ? 'opacity-100' : 'opacity-0',
        )}
      />
    </picture>
  )
}

export default function ComingSoon() {
  const whatsappHref = buildWhatsAppLink(site.messages.customPair)
  const year = new Date().getFullYear()

  return (
    <div className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-espresso text-ivory">
      <HeroImage />

      {/* Scrim: solid espresso where text sits, image showing through away from it. */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 -z-10',
          'bg-linear-to-t from-espresso from-40% via-espresso/85 via-70% to-espresso/30',
          'landscape:md:bg-linear-to-r landscape:md:from-espresso landscape:md:from-25% landscape:md:via-espresso/75 landscape:md:via-50% landscape:md:to-espresso/0',
        )}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 hidden h-2/5 bg-linear-to-t from-espresso to-transparent landscape:md:block"
      />

      <main className="flex flex-1 items-end px-4 pt-24 pb-10 sm:px-10 sm:pb-12 lg:px-20 lg:pb-14">
        <div className="w-full max-w-[560px]">
          <div className={reveal} style={delay(0)}>
            <Logo size="lg" />
            <StitchDivider className="mt-6 text-brass" width={112} />
          </div>

          <p
            className={cn(
              reveal,
              'mt-10 text-sm tracking-[0.02em] text-ivory/70 sm:text-[0.9375rem]',
            )}
            style={delay(120)}
          >
            Our online store is coming soon
          </p>

          <h1
            className={cn(
              reveal,
              'mt-3 font-display text-[2.5rem] leading-[1.05] font-light tracking-[-0.01em] text-ivory sm:text-6xl lg:text-[4.25rem]',
            )}
            style={delay(200)}
          >
            Handcrafted for Every Step.
          </h1>

          <p
            className={cn(reveal, 'mt-6 text-base leading-relaxed text-ivory/85 sm:text-lg')}
            style={delay(320)}
          >
            Handmade leather footwear and goods, individually crafted by skilled artisans. Our
            online store is being finished with the same care. Until then, custom orders are open on
            WhatsApp.
          </p>

          <div
            className={cn(
              reveal,
              'mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8',
            )}
            style={delay(440)}
          >
            <Button href={whatsappHref} target="_blank" rel="noopener noreferrer" tone="onDark">
              Start Your Custom Pair
              <span className="sr-only"> (opens WhatsApp in a new tab)</span>
            </Button>
            {site.instagramUrl && (
              <Button
                variant="link"
                tone="onDark"
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow on Instagram
                <span className="sr-only"> (opens in a new tab)</span>
              </Button>
            )}
          </div>
        </div>
      </main>

      <footer className={cn(reveal, 'px-4 pb-8 sm:px-10 lg:px-20 lg:pb-10')} style={delay(600)}>
        <p className="font-display text-lg text-balance text-brass italic sm:text-xl">
          {site.promise}
        </p>
        <p className="mt-2 text-xs text-ivory/65">
          © {year} {site.legalName}
        </p>
      </footer>
    </div>
  )
}
