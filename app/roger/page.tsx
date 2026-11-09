import type { Metadata } from 'next'
import { RogerView } from '@/components/views/roger-view'
import { languageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Meet Roger. TenFour Systems',
  description: 'Meet Roger, who texts back your missed calls, and learn where the name comes from.',
  ...languageAlternates('/roger'),
}

export default function RogerPage() {
  return <RogerView locale="en" />
}
