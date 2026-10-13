import { Container } from '../ui/Container'
import { Icon, type IconName } from '../ui/Icon'
import { Picture } from '../ui/Picture'
import { SectionHeading } from '../ui/SectionHeading'

const steps: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'bag',
    title: 'Choose your pair',
    text: 'Pick your style and size, and add any fit notes. Want another colour? Mention it in your order notes.',
  },
  {
    icon: 'whatsapp',
    title: 'Send your order on WhatsApp',
    text: 'Checkout opens WhatsApp with your order already written. A person reads it, not a bot.',
  },
  {
    icon: 'needle',
    title: 'We confirm, then we make',
    text: 'We confirm price, size and delivery with you, and only then does your pair go to the bench.',
  },
]

export function HowOrderingWorks() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="ordering-title">
      <Container wide className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="How ordering works"
            title={<span id="ordering-title">Ordering is a conversation</span>}
            intro="Every pair is made to order, so we speak with you before we start. It takes a few minutes and means your pair is right the first time."
          />
          <ol className="mt-10 space-y-7">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-cognac/40 text-cognac-deep">
                  <Icon name={s.icon} size={22} />
                </span>
                <div>
                  <h3 className="font-display text-xl text-espresso">
                    <span className="sr-only">Step {i + 1}: </span>
                    {s.title}
                  </h3>
                  <p className="mt-1 text-[0.9375rem] text-charcoal/80">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="overflow-hidden rounded-sm">
          <Picture
            src="/images/site/packaging"
            alt="A pair of leather loafers resting in an open kraft box with ivory tissue paper"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </Container>
    </section>
  )
}
