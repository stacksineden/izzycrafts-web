import { useState, type FormEvent } from 'react'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { SelectField, TextArea, TextField } from '../components/ui/Field'
import { Icon } from '../components/ui/Icon'
import { Picture } from '../components/ui/Picture'
import { SectionHeading } from '../components/ui/SectionHeading'
import { StitchDivider } from '../components/ui/StitchDivider'
import { getCustomOptions, getProducts, getSizeChart } from '../lib/catalog'
import { seo } from '../lib/seo'
import { buildCustomPairMessage, buildWhatsAppLink, generateOrderRef } from '../lib/whatsapp'
import type { CustomPairRequest } from '../types/order'
import type { CustomOption } from '../types/product'
import type { Route } from './+types/custom'

export const meta: Route.MetaFunction = () =>
  seo({
    title: 'Custom Handmade Shoes, Made to Your Design',
    description:
      'Design your own pair: choose the style, leather, colour, sole and fit, including half sizes and wider widths. Handmade to order by Izzy Crafts.',
    path: '/custom',
  })

const steps = [
  {
    image: '/images/site/custom-measure',
    alt: 'A measuring tape and a pencil tracing of a foot on paper',
    title: 'We measure',
    text: 'Share your size, or we guide you through measuring both feet on WhatsApp. Half sizes and wider fits are welcome.',
  },
  {
    image: '/images/site/custom-choose',
    alt: 'Leather swatches in cognac, tan, brown and burgundy fanned out on a workbench',
    title: 'You choose',
    text: 'Pick the style, the leather, the colour and the sole. We will send real swatches if you want to see them first.',
  },
  {
    image: '/images/site/custom-make',
    alt: 'A half-made leather shoe upper on a wooden last surrounded by tools',
    title: 'We make',
    text: 'Once every detail is confirmed, your pair is cut, stitched, lasted and finished by hand.',
  },
]

type Errors = Partial<
  Record<'styleId' | 'materialId' | 'colourId' | 'soleId' | 'size' | 'fitId' | 'name', string>
>

export default function CustomPair() {
  const options = getCustomOptions()
  const sizes = getSizeChart().sizes
  const products = getProducts()

  const [colourId, setColourId] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [sentLink, setSentLink] = useState<string | null>(null)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const get = (k: string) => String(f.get(k) ?? '').slice(0, 800)
    const req: CustomPairRequest = {
      styleId: get('styleId'),
      baseProductId: get('baseProductId') || undefined,
      materialId: get('materialId'),
      colourId,
      soleId: get('soleId'),
      size: get('size'),
      fitId: get('fitId'),
      neededBy: get('neededBy') || undefined,
      notes: get('notes') || undefined,
      name: get('name'),
    }
    const found: Errors = {}
    if (!req.styleId) found.styleId = 'Choose a style.'
    if (!req.materialId) found.materialId = 'Choose a material.'
    if (!req.colourId) found.colourId = 'Choose a colour.'
    if (!req.soleId) found.soleId = 'Choose a sole.'
    if (!req.size) found.size = 'Choose your size.'
    if (!req.fitId) found.fitId = 'Choose a width.'
    if (req.name.trim().length < 2) found.name = 'Please tell us your name.'
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      document.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    const link = buildWhatsAppLink(buildCustomPairMessage(req, generateOrderRef()))
    window.open(link, '_blank', 'noopener,noreferrer')
    setSentLink(link)
  }

  return (
    <>
      <section className="relative isolate overflow-hidden bg-espresso text-ivory">
        <div className="grid lg:min-h-[640px] lg:grid-cols-2">
          <div className="relative min-h-[46svh] lg:order-2 lg:min-h-0">
            <Picture
              src="/images/site/custom-hero"
              alt="An artisan tracing around a customer's foot on paper beside a wooden shoe last"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              className="absolute inset-0 size-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-espresso to-transparent lg:bg-linear-to-r lg:via-transparent"
            />
          </div>
          <Container className="relative flex items-center pt-2 pb-16 lg:px-16 lg:py-24 xl:px-24">
            <div className="max-w-lg">
              <p className="eyebrow text-ivory/75">Custom pair</p>
              <StitchDivider className="mt-3 text-brass" width={64} />
              <h1 className="mt-5 font-display text-4xl leading-[1.05] font-light sm:text-5xl lg:text-6xl">
                Your design. Your fit. Our hands.
              </h1>
              <p className="mt-6 text-base text-ivory/80 sm:text-lg">
                Full customisation of material, colour, sole and fit, at a price and timeline that
                real people can reach. Tell us what you have in mind, and we take it from there
                together on WhatsApp.
              </p>
              <Button href="#design" tone="onDark" size="lg" className="mt-9">
                Design your pair
              </Button>
            </div>
          </Container>
        </div>
      </section>

      <section className="py-20 sm:py-24" aria-labelledby="how-title">
        <Container wide>
          <SectionHeading
            eyebrow="How it works"
            title={<span id="how-title">Three steps, one conversation</span>}
          />
          <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((s, i) => (
              <li key={s.title}>
                <div className="overflow-hidden rounded-sm">
                  <Picture
                    src={s.image}
                    alt={s.alt}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="aspect-square w-full object-cover"
                  />
                </div>
                <p className="mt-5 font-display text-sm text-cognac-deep italic">Step {i + 1}</p>
                <h3 className="mt-1 font-display text-2xl text-espresso">{s.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-charcoal/80">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section
        id="design"
        className="scroll-mt-20 border-t border-line bg-stone/40 py-20 sm:py-24"
        aria-labelledby="design-title"
      >
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Design your pair"
            title={<span id="design-title">Tell us about your pair</span>}
            intro="Choose what you know. Anything you are unsure of, leave a note and we will help you decide."
          />

          {sentLink ? (
            <div className="mt-10 rounded-sm bg-ivory p-8 text-center">
              <Icon name="whatsapp" size={32} className="mx-auto text-[#1f7a4d]" />
              <h3 className="mt-4 font-display text-3xl text-espresso">
                Your request is ready in WhatsApp
              </h3>
              <p className="mt-3 text-charcoal/80">
                Press send there, and we will reply to talk through your pair.
              </p>
              <div className="mt-7 flex flex-col items-center gap-3">
                <Button href={sentLink} target="_blank" rel="noopener noreferrer">
                  Open WhatsApp again
                </Button>
                <Button variant="link" onClick={() => setSentLink(null)}>
                  Edit my request
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mt-10 space-y-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <OptionSelect
                  name="styleId"
                  label="Style"
                  options={options.styles}
                  error={errors.styleId}
                />
                <SelectField
                  name="baseProductId"
                  label="Start from one of our pairs"
                  optional
                  defaultValue=""
                >
                  <option value="">No, start fresh</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </SelectField>
                <OptionSelect
                  name="materialId"
                  label="Material"
                  options={options.materials}
                  error={errors.materialId}
                />
                <OptionSelect
                  name="soleId"
                  label="Sole"
                  options={options.soles}
                  error={errors.soleId}
                />
              </div>

              <fieldset aria-describedby={errors.colourId ? 'colour-error' : undefined}>
                <legend className="text-sm font-medium text-espresso">
                  Colour
                  {colourId && (
                    <span className="font-normal text-charcoal/80">
                      : {options.colours.find((c) => c.id === colourId)?.name}
                    </span>
                  )}
                </legend>
                <div className="mt-3 flex flex-wrap gap-3">
                  {options.colours.map((c) => (
                    <label key={c.id} className="cursor-pointer" title={c.name}>
                      <input
                        type="radio"
                        name="colourId"
                        value={c.id}
                        checked={colourId === c.id}
                        onChange={() => setColourId(c.id)}
                        className="peer sr-only"
                      />
                      <span className="sr-only">{c.name}</span>
                      <span
                        aria-hidden="true"
                        className="block size-11 rounded-full ring-1 ring-espresso/15 ring-offset-[3px] ring-offset-stone transition-shadow peer-checked:ring-2 peer-checked:ring-espresso peer-focus-visible:outline-2 peer-focus-visible:outline-offset-[6px] peer-focus-visible:outline-espresso"
                        style={{ backgroundColor: c.hex }}
                      />
                    </label>
                  ))}
                </div>
                {errors.colourId && (
                  <p
                    id="colour-error"
                    role="alert"
                    className="mt-2 text-sm font-medium text-[#9b2c2c]"
                  >
                    {errors.colourId}
                  </p>
                )}
              </fieldset>

              <div className="grid gap-5 sm:grid-cols-2">
                <SelectField
                  name="size"
                  label="Size (EU)"
                  defaultValue=""
                  error={errors.size}
                  hint="Half sizes included."
                >
                  <option value="" disabled>
                    Choose your size
                  </option>
                  {sizes.map((s) => (
                    <option key={s.id} value={s.id}>
                      EU {s.eu} (UK {s.uk}, US {s.us})
                    </option>
                  ))}
                </SelectField>
                <OptionSelect
                  name="fitId"
                  label="Width"
                  options={options.fits}
                  error={errors.fitId}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <TextField name="name" label="Your name" autoComplete="name" error={errors.name} />
                <TextField
                  name="neededBy"
                  label="Needed by"
                  type="date"
                  optional
                  hint="A wedding, an event, a trip."
                />
              </div>
              <TextArea
                name="notes"
                label="Notes"
                optional
                rows={4}
                maxLength={600}
                placeholder="Details you have in mind, one foot larger than the other, a picture you will share on WhatsApp…"
              />

              <div>
                <Button type="submit" size="lg" block>
                  <Icon name="whatsapp" size={22} />
                  Send request on WhatsApp
                </Button>
                <p className="mt-3 text-center text-sm text-charcoal/70">
                  No payment now. We confirm the design, price and timeline with you first.
                </p>
              </div>
            </form>
          )}
        </Container>
      </section>
    </>
  )
}

function OptionSelect({
  name,
  label,
  options,
  error,
}: {
  name: string
  label: string
  options: CustomOption[]
  error?: string
}) {
  return (
    <SelectField name={name} label={label} defaultValue="" error={error}>
      <option value="" disabled>
        Choose…
      </option>
      {options.map((o) => (
        <option key={o.id} value={o.id}>
          {o.name}
        </option>
      ))}
    </SelectField>
  )
}
