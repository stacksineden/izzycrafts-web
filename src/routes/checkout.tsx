import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { TextArea, TextField } from '../components/ui/Field'
import { Icon } from '../components/ui/Icon'
import { Picture } from '../components/ui/Picture'
import { Price } from '../components/ui/Price'
import { cn } from '../components/ui/cn'
import { site } from '../config/site'
import { useCart } from '../features/cart'
import { formatPriceNGN } from '../lib/currency'
import { seo } from '../lib/seo'
import { saveLastOrder, type LastOrder } from '../lib/storage'
import { buildOrderMessage, buildWhatsAppLink, generateOrderRef } from '../lib/whatsapp'
import type { CustomerDetails } from '../types/order'
import type { Route } from './+types/checkout'
import { EmptyBag } from './cart'

export const meta: Route.MetaFunction = () =>
  seo({ title: 'Checkout', path: '/checkout', noindex: true })

type Errors = Partial<Record<keyof CustomerDetails, string>>

function validate(c: CustomerDetails): Errors {
  const errors: Errors = {}
  if (c.name.trim().length < 2) errors.name = 'Please tell us your name.'
  const digits = c.phone.replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 15)
    errors.phone = 'Enter a phone number we can reach you on, e.g. 0803 123 4567.'
  if (c.city.trim().length < 2) errors.city = 'Which city or state should we deliver to?'
  return errors
}

const PAYMENT_METHODS = [
  {
    id: 'whatsapp',
    title: 'Confirm and pay on WhatsApp',
    text: 'We confirm your order, then share payment details with you directly.',
    available: true,
  },
  {
    id: 'online',
    title: 'Pay online by card or bank transfer',
    text: 'Secure online payment is coming soon.',
    available: false,
  },
] as const

export default function Checkout() {
  const { ready, lines, itemCount, subtotalNGN, clear } = useCart()
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState<LastOrder | null>(null)

  if (sent) return <OrderSent order={sent} />
  if (ready && lines.length === 0) return <EmptyBag />

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const get = (k: string) => String(form.get(k) ?? '').slice(0, 600)
    const customer: CustomerDetails = {
      name: get('name'),
      phone: get('phone'),
      city: get('city'),
      address: get('address'),
      notes: get('notes'),
    }
    const found = validate(customer)
    setErrors(found)
    const firstError = Object.keys(found)[0]
    if (firstError) {
      document.querySelector<HTMLInputElement>(`[name="${firstError}"]`)?.focus()
      return
    }

    const ref = generateOrderRef()
    const link = buildWhatsAppLink(buildOrderMessage(lines, customer, ref))
    const order = { ref, link, sentAt: Date.now() }
    saveLastOrder(order)
    window.open(link, '_blank', 'noopener,noreferrer')
    clear()
    setSent(order)
    window.scrollTo({ top: 0 })
  }

  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <Link
        to="/cart"
        className="inline-flex items-center gap-2 text-sm text-charcoal/75 hover:text-espresso"
      >
        <Icon name="arrowLeft" size={16} /> Back to bag
      </Link>
      <h1 className="mt-4 font-display text-4xl font-light text-espresso sm:text-5xl">Checkout</h1>
      <p className="mt-3 max-w-2xl text-charcoal/80">
        Your order is sent to us on WhatsApp, where a member of our team confirms the price, your
        size and delivery before your pair is made.
      </p>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-16">
        <form onSubmit={onSubmit} noValidate className="space-y-10" aria-busy={!ready}>
          <fieldset className="space-y-5">
            <legend className="font-display text-2xl text-espresso">Your details</legend>
            <TextField
              label="Full name"
              name="name"
              autoComplete="name"
              required
              error={errors.name}
            />
            <TextField
              label="Phone number"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              hint="Ideally your WhatsApp number."
              error={errors.phone}
            />
          </fieldset>

          <fieldset className="space-y-5">
            <legend className="font-display text-2xl text-espresso">Delivery</legend>
            <TextField
              label="City or state"
              name="city"
              autoComplete="address-level2"
              required
              placeholder="e.g. Lagos, Abuja, Port Harcourt"
              error={errors.city}
            />
            <TextArea
              label="Delivery address"
              name="address"
              autoComplete="street-address"
              optional
              rows={2}
              hint="You can also share this on WhatsApp."
            />
            <TextArea
              label="Order notes"
              name="notes"
              optional
              rows={3}
              hint="Want a different colour or finish? Tell us here."
              placeholder="A different colour, a date you need them by, gift wrapping…"
            />
          </fieldset>

          <fieldset>
            <legend className="font-display text-2xl text-espresso">Payment</legend>
            <div className="mt-5 space-y-3">
              {PAYMENT_METHODS.map((m) => (
                <label
                  key={m.id}
                  className={cn(
                    'flex gap-4 rounded-sm border p-4',
                    m.available
                      ? 'cursor-pointer border-espresso bg-white/60'
                      : 'cursor-not-allowed border-line bg-white/30 opacity-70',
                  )}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={m.id}
                    defaultChecked={m.available}
                    disabled={!m.available}
                    className="mt-1 size-4 accent-espresso"
                  />
                  <span className="flex-1">
                    <span className="flex flex-wrap items-center gap-2 font-medium text-espresso">
                      {m.title}
                      {!m.available && (
                        <span className="rounded-full bg-brass/15 px-2 py-0.5 text-xs font-medium text-espresso ring-1 ring-brass/40">
                          Coming soon
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 block text-sm text-charcoal/75">{m.text}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <Button type="submit" size="lg" block disabled={!ready || lines.length === 0}>
              <Icon name="whatsapp" size={22} />
              Send order on WhatsApp
            </Button>
            <p className="mt-3 flex items-start gap-2 text-sm text-charcoal/70">
              <Icon name="lock" size={16} className="mt-0.5 shrink-0" />
              Nothing is charged here. Your details go only into the WhatsApp message to {site.name}
              .
            </p>
          </div>
        </form>

        <aside
          className="h-fit rounded-sm bg-stone/50 p-6 lg:sticky lg:top-28"
          aria-labelledby="summary-title"
        >
          <h2 id="summary-title" className="font-display text-2xl text-espresso">
            Your order
          </h2>
          <ul className="mt-5 divide-y divide-line/80">
            {lines.map((l) => (
              <li key={l.key} className="flex gap-4 py-4">
                <div className="w-16 shrink-0 overflow-hidden rounded-sm bg-stone">
                  <Picture
                    src={l.image.src}
                    alt=""
                    sizes="64px"
                    blur={false}
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1 text-sm">
                  <p className="font-medium text-espresso">{l.product.name}</p>
                  <p className="text-charcoal/70">
                    {l.sizeLabel} · Qty {l.line.qty}
                  </p>
                  {l.line.note && (
                    <p className="mt-1 line-clamp-2 text-charcoal/65">Fit notes: {l.line.note}</p>
                  )}
                </div>
                <Price amount={l.lineTotalNGN} className="shrink-0 text-sm" />
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-baseline justify-between border-t border-line pt-4">
            <p className="text-espresso">
              Subtotal <span className="text-sm text-charcoal/65">({itemCount})</span>
            </p>
            <p className="font-medium text-espresso">
              {subtotalNGN === null ? 'To be confirmed' : formatPriceNGN(subtotalNGN)}
            </p>
          </div>
          <p className="mt-2 text-sm text-charcoal/70">
            Delivery is quoted on WhatsApp once we know where you are.
          </p>
        </aside>
      </div>
    </Container>
  )
}

function OrderSent({ order }: { order: LastOrder }) {
  return (
    <Container className="py-16 sm:py-24">
      <div className="mx-auto max-w-xl text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-[#1f7a4d]/10 text-[#1f7a4d]">
          <Icon name="whatsapp" size={30} />
        </span>
        <h1 className="mt-6 font-display text-4xl font-light text-espresso sm:text-5xl">
          Finish in WhatsApp
        </h1>
        <p className="mt-4 text-lg text-charcoal/80">
          Your order{' '}
          <span className="font-medium whitespace-nowrap text-espresso">{order.ref}</span> is
          written and waiting in WhatsApp. Press send there, and we will reply to confirm the
          details.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <Button href={order.link} target="_blank" rel="noopener noreferrer" size="lg">
            <Icon name="whatsapp" size={22} />
            Open WhatsApp again
          </Button>
          <Button to="/shop" variant="link">
            Continue shopping
          </Button>
        </div>
        <ol className="mt-14 space-y-4 rounded-sm bg-stone/50 p-6 text-left text-[0.9375rem] text-charcoal/85">
          <li>
            <span className="font-medium text-espresso">1. Send the message.</span> If WhatsApp did
            not open, use the button above.
          </li>
          <li>
            <span className="font-medium text-espresso">2. We confirm.</span> Price, size, delivery
            and timing, in the same chat.
          </li>
          <li>
            <span className="font-medium text-espresso">3. We make your pair.</span> By hand, from
            the first cut.
          </li>
        </ol>
      </div>
    </Container>
  )
}
