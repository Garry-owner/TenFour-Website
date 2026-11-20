import type { Metadata } from 'next'
import { LegalView } from '@/components/views/legal-view'
import { englishMetadata } from '@/lib/seo'

export const metadata: Metadata = englishMetadata(
  '/privacy',
  'Privacy Policy. TenFour Systems',
  'How TenFour Systems collects, uses, and protects your information.',
)

export default function PrivacyPage() {
  return <LegalView locale="en" kind="privacy" />
}
