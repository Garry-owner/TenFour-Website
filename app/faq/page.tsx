import type { Metadata } from 'next'
import { FaqView } from '@/components/views/faq-view'
import { englishMetadata } from '@/lib/seo'

export const metadata: Metadata = englishMetadata(
  '/faq',
  'FAQ. TenFour Systems',
  'Common questions about how TenFour and Roger actually work.',
)

export default function FaqPage() {
  return <FaqView locale="en" />
}
