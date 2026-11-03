import type { Metadata } from 'next'
import { PricingView } from '@/components/views/pricing-view'
import { esMeta } from '@/lib/copy/es-meta'
import { spanishMetadata } from '@/lib/seo'

export const metadata: Metadata = spanishMetadata(
  '/pricing',
  esMeta.pricing.title,
  esMeta.pricing.description,
)

export default function SpanishPricingPage() {
  return <PricingView locale="es" />
}
