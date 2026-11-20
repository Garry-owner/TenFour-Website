import type { Metadata } from 'next'
import { PricingView } from '@/components/views/pricing-view'
import { englishMetadata } from '@/lib/seo'

export const metadata: Metadata = englishMetadata(
  '/pricing',
  'Pricing. TenFour Systems',
  'Straightforward pricing for missed call text back. Pick the tier that fits your call volume, no hidden fees.',
)

export default function PricingPage() {
  return <PricingView locale="en" />
}
