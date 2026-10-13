import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Picture } from '../ui/Picture'
import { StitchDivider } from '../ui/StitchDivider'

export function CustomBand() {
  return (
    <section
      className="relative isolate overflow-hidden bg-espresso text-ivory"
      aria-labelledby="custom-title"
    >
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[420px] lg:order-2 lg:min-h-[640px]">
          <Picture
            src="/images/site/custom-hero"
            alt="An artisan tracing around a customer's foot on paper beside a wooden shoe last"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="absolute inset-0 size-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-espresso via-transparent to-transparent lg:bg-linear-to-r"
          />
        </div>
        <Container className="flex items-center py-16 lg:px-16 lg:py-24 xl:px-24">
          <div className="max-w-lg">
            <p className="eyebrow text-ivory/75">Made to your design</p>
            <StitchDivider className="mt-3 text-brass" width={64} />
            <h2
              id="custom-title"
              className="mt-5 font-display text-3xl font-light sm:text-4xl lg:text-5xl"
            >
              A pair made for your feet, not for a shelf.
            </h2>
            <p className="mt-6 text-base text-ivory/80 sm:text-lg">
              Choose the style, the leather, the colour and the sole. Tell us about half sizes,
              wider fits or the date you need them for. We measure, confirm every detail with you
              and make your pair from the first cut.
            </p>
            <Button to="/custom" tone="onDark" size="lg" className="mt-9">
              Start Your Custom Pair
            </Button>
          </div>
        </Container>
      </div>
    </section>
  )
}
