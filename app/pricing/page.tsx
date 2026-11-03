import type { Metadata } from 'next'
import { PricingView } from '@/components/views/pricing-view'
import { languageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Pricing. TenFour Systems',
  description:
    'Straightforward pricing for the 24/7 AI dispatcher. Pick the tier that fits your call volume, no hidden fees.',
  ...languageAlternates('/pricing'),
}

export default function PricingPage() {
  return <PricingView locale="en" />
}
