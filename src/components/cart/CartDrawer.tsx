import { useNavigate } from 'react-router'
import { useCart } from '../../features/cart'
import { Button } from '../ui/Button'
import { Dialog } from '../ui/Dialog'
import { Icon } from '../ui/Icon'
import { CartLineItem } from './CartLineItem'
import { CartSummary } from './CartSummary'

export function CartDrawer() {
  const { drawerOpen, closeDrawer, lines, itemCount, subtotalNGN } = useCart()
  const navigate = useNavigate()

  return (
    <Dialog open={drawerOpen} onClose={closeDrawer} label="Your bag" variant="drawer">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
        <h2 className="font-display text-xl text-espresso">
          Your bag{' '}
          {itemCount > 0 && <span className="text-base text-charcoal/60">({itemCount})</span>}
        </h2>
        <button
          type="button"
          onClick={closeDrawer}
          className="grid size-11 place-items-center rounded-full text-espresso hover:bg-espresso/[0.06]"
          aria-label="Close bag"
        >
          <Icon name="close" size={22} />
        </button>
      </div>

      {lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <Icon name="bag" size={36} className="text-cognac" />
          <p className="mt-5 font-display text-2xl text-espresso">Your bag is empty</p>
          <p className="mt-2 text-charcoal/75">
            Every pair is made by hand, to order. Find yours in the collection.
          </p>
          <Button
            className="mt-8"
            onClick={() => {
              closeDrawer()
              navigate('/shop')
            }}
          >
            Shop the collection
          </Button>
        </div>
      ) : (
        <>
          <ul className="flex-1 divide-y divide-line overflow-y-auto overscroll-contain px-5">
            {lines.map((item) => (
              <CartLineItem key={item.key} item={item} compact onNavigate={closeDrawer} />
            ))}
          </ul>
          <div className="shrink-0 border-t border-line bg-ivory px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <CartSummary subtotalNGN={subtotalNGN} itemCount={itemCount} />
            <Button
              block
              className="mt-5"
              onClick={() => {
                closeDrawer()
                navigate('/checkout')
              }}
            >
              Checkout
            </Button>
            <Button
              variant="link"
              block
              className="mt-3"
              onClick={() => {
                closeDrawer()
                navigate('/cart')
              }}
            >
              View full bag
            </Button>
          </div>
        </>
      )}
    </Dialog>
  )
}
