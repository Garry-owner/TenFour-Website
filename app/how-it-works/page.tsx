import type { Metadata } from 'next'
import { HowView } from '@/components/views/how-view'
import { englishMetadata } from '@/lib/seo'

export const metadata: Metadata = englishMetadata(
  '/how-it-works',
  'How It Works. TenFour Systems',
  'See exactly how TenFour texts back a missed call, asks a few questions, and sends the lead to you.',
)

export default function HowItWorksPage() {
  return <HowView locale="en" />
}
