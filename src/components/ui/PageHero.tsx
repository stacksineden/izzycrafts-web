import type { ReactNode } from 'react'
import { Container } from './Container'
import { Picture } from './Picture'
import { StitchDivider } from './StitchDivider'

/** Image-led page header for editorial pages. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  alt,
}: {
  eyebrow: string
  title: ReactNode
  intro: ReactNode
  image: string
  alt: string
}) {
  return (
    <section className="relative isolate flex min-h-[62svh] items-end overflow-hidden bg-espresso text-ivory lg:min-h-[70svh]">
      <Picture
        src={image}
        alt={alt}
        sizes="100vw"
        priority
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-espresso via-espresso/60 to-espresso/10"
      />
      <Container wide className="pt-28 pb-14 sm:pb-20">
        <div className="max-w-2xl">
          <p className="eyebrow text-ivory/75">{eyebrow}</p>
          <StitchDivider className="mt-3 text-brass" width={72} />
          <h1 className="mt-5 font-display text-4xl leading-[1.05] font-light sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-base text-ivory/85 sm:text-lg">{intro}</p>
        </div>
      </Container>
    </section>
  )
}
