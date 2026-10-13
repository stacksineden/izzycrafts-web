import { imageInfo, imageUrl, srcSet } from '../../lib/images'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { StitchDivider } from '../ui/StitchDivider'
import { cn } from '../ui/cn'

const DESKTOP = '/images/site/home-hero-desktop'
const MOBILE = '/images/site/home-hero-mobile'

const reveal = 'motion-safe:animate-fade-up'

export function Hero() {
  const mobile = imageInfo(MOBILE)!
  return (
    // Pulled up under the transparent header.
    <section className="relative isolate -mt-16 flex min-h-[94svh] items-end overflow-hidden bg-espresso text-ivory lg:-mt-[76px] lg:min-h-[100svh]">
      <picture>
        <source media="(min-aspect-ratio: 1/1)" srcSet={srcSet(DESKTOP)} sizes="100vw" />
        <img
          src={imageUrl(MOBILE, mobile.widths[1])}
          srcSet={srcSet(MOBILE)}
          sizes="100vw"
          width={mobile.w}
          height={mobile.h}
          alt="A pair of handmade cognac leather penny loafers on a workshop bench in late-afternoon light"
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 -z-20 size-full object-cover object-[50%_25%] landscape:object-[70%_60%]"
          style={{ backgroundImage: `url(${mobile.blur})`, backgroundSize: 'cover' }}
        />
      </picture>
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-0 -z-10',
          'bg-linear-to-t from-espresso via-espresso/70 via-45% to-espresso/10',
          'landscape:bg-linear-to-r landscape:from-espresso/95 landscape:via-espresso/55 landscape:via-45% landscape:to-transparent',
        )}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-32 bg-linear-to-b from-espresso/60 to-transparent"
      />

      <Container wide className="pt-32 pb-14 sm:pb-20 lg:pb-24">
        <div className="max-w-xl">
          <p className={cn(reveal, 'eyebrow text-ivory/80')}>Handmade footwear · Made to order</p>
          <StitchDivider
            className={cn(reveal, 'mt-4 text-brass')}
            width={88}
            style={{ animationDelay: '80ms' }}
          />
          <h1
            className={cn(
              reveal,
              'mt-6 font-display text-[2.75rem] leading-[1.02] font-light tracking-[-0.015em] sm:text-6xl lg:text-7xl',
            )}
            style={{ animationDelay: '160ms' }}
          >
            Handcrafted for Every Step.
          </h1>
          <p
            className={cn(reveal, 'mt-6 max-w-md text-base text-ivory/85 sm:text-lg')}
            style={{ animationDelay: '260ms' }}
          >
            Premium handmade footwear, crafted by skilled artisans for comfort that lasts and style
            that doesn't fade.
          </p>
          <div
            className={cn(
              reveal,
              'mt-9 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-7',
            )}
            style={{ animationDelay: '360ms' }}
          >
            <Button to="/shop" tone="onDark" size="lg">
              Shop the Collection
            </Button>
            <Button to="/custom" variant="link" tone="onDark" className="self-center sm:self-auto">
              Start Your Custom Pair
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
