import type { Metadata } from 'next'
import { LegalView } from '@/components/views/legal-view'
import { esMeta } from '@/lib/copy/es-meta'
import { spanishMetadata } from '@/lib/seo'

export const metadata: Metadata = spanishMetadata('/terms', esMeta.terms.title, esMeta.terms.description)

export default function SpanishTermsPage() {
  return <LegalView locale="es" kind="terms" />
}
