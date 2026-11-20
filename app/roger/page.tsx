import type { Metadata } from 'next'
import { RogerView } from '@/components/views/roger-view'
import { englishMetadata } from '@/lib/seo'

export const metadata: Metadata = englishMetadata(
  '/roger',
  'Meet Roger. TenFour Systems',
  'Meet Roger, who texts back your missed calls, and learn where the name comes from.',
)

export default function RogerPage() {
  return <RogerView locale="en" />
}
