import type { Metadata } from 'next'
import { RogerView } from '@/components/views/roger-view'
import { languageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Meet Roger. TenFour Systems',
  description: "The name behind TenFour's AI dispatcher, and where it comes from.",
  ...languageAlternates('/roger'),
}

export default function RogerPage() {
  return <RogerView locale="en" />
}
