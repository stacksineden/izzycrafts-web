import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { useCart } from '../features/cart'
import { ColourPicker, ProductGallery, SizePicker } from '../features/product'
import { getProductBySlug } from '../lib/catalog'
import type { SizeId } from '../types/product'
import NotFound from './NotFound'

export default function ProductDetail() {
  const { slug = '' } = useParams()
  const product = getProductBySlug(slug)
  const [colourId, setColourId] = useState<string | null>(null)
  const [size, setSize] = useState<SizeId | null>(null)
  const cart = useCart()

  if (!product) return <NotFound />

  return (
    <Container>
      <h1 className="font-display text-4xl text-espresso">{product.name}</h1>
      <p className="mt-3 text-charcoal/80">
        TODO: gallery, price, made of / made how / feel, colour and size pickers, lead time, add to
        cart ({cart.itemCount} in cart).
      </p>
      <ProductGallery images={product.images} />
      <ColourPicker colours={product.colours} value={colourId} onChange={setColourId} />
      <SizePicker
        sizes={product.sizes}
        inStockSizes={product.inStockSizes}
        value={size}
        onChange={setSize}
      />
    </Container>
  )
}
