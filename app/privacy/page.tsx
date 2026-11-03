import type { Metadata } from 'next'
import { LegalView } from '@/components/views/legal-view'
import { languageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Privacy Policy. TenFour Systems',
  description: 'How TenFour Systems collects, uses, and protects your information.',
  ...languageAlternates('/privacy'),
}

export default function PrivacyPage() {
  return <LegalView locale="en" kind="privacy" />
}
