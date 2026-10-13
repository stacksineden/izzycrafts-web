import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Picture } from '../ui/Picture'
import { StitchDivider } from '../ui/StitchDivider'

export function StoryBand() {
  return (
    <section className="bg-stone/50 py-20 sm:py-28" aria-labelledby="story-title">
      <Container wide className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="overflow-hidden rounded-sm">
          <Picture
            src="/images/site/story-hands"
            alt="An artisan's hands pulling waxed thread through a cognac leather upper"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/3] w-full object-cover lg:aspect-[5/6]"
          />
        </div>
        <div className="max-w-xl">
          <p className="eyebrow text-cognac-deep">Our craft</p>
          <StitchDivider className="mt-3 text-cognac/60" width={64} />
          <h2
            id="story-title"
            className="mt-5 font-display text-3xl font-light text-espresso sm:text-4xl lg:text-5xl"
          >
            Every pair has a maker.
          </h2>
          <div className="mt-6 space-y-4 text-base text-charcoal/85 sm:text-lg">
            <p>
              Before a pair reaches you, it passes through many hands: the leather is chosen, the
              pattern cut, the upper stitched, shaped over a last and finished at the edges. Each
              craftsperson leaves their mark.
            </p>
            <p>
              We work this way because things made slowly, by people who care, last longer and feel
              better than anything made on a line.
            </p>
          </div>
          <Button to="/our-craft" variant="secondary" className="mt-9">
            How a pair is made
          </Button>
        </div>
      </Container>
    </section>
  )
}
