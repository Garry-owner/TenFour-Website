import type { Metadata } from 'next'
import { HowView } from '@/components/views/how-view'
import { languageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'How It Works. TenFour Systems',
  description:
    'See exactly how TenFour catches a missed call, qualifies the lead, and sends your booking link or a ready to book lead.',
  ...languageAlternates('/how-it-works'),
}

export default function HowItWorksPage() {
  return <HowView locale="en" />
}
