import type { Metadata } from 'next'
import { HowView } from '@/components/views/how-view'
import { languageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'How It Works. TenFour Systems',
  description:
    'See exactly how TenFour texts back a missed call, asks a few questions, and sends the lead to you.',
  ...languageAlternates('/how-it-works'),
}

export default function HowItWorksPage() {
  return <HowView locale="en" />
}
