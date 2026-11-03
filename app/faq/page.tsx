import type { Metadata } from 'next'
import { FaqView } from '@/components/views/faq-view'
import { languageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'FAQ. TenFour Systems',
  description: 'Common questions about how TenFour and Roger actually work.',
  ...languageAlternates('/faq'),
}

export default function FaqPage() {
  return <FaqView locale="en" />
}
