import type { Metadata } from 'next'
import { LegalView } from '@/components/views/legal-view'
import { languageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Terms of Service. TenFour Systems',
  description: 'The terms that govern your use of TenFour Systems.',
  ...languageAlternates('/terms'),
}

export default function TermsPage() {
  return <LegalView locale="en" kind="terms" />
}
