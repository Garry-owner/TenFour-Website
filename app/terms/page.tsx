import type { Metadata } from 'next'
import { LegalView } from '@/components/views/legal-view'
import { englishMetadata } from '@/lib/seo'

export const metadata: Metadata = englishMetadata(
  '/terms',
  'Terms of Service. TenFour Systems',
  'The terms that govern your use of TenFour Systems.',
)

export default function TermsPage() {
  return <LegalView locale="en" kind="terms" />
}
