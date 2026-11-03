import type { Metadata } from 'next'
import { LegalView } from '@/components/views/legal-view'
import { esMeta } from '@/lib/copy/es-meta'
import { spanishMetadata } from '@/lib/seo'

export const metadata: Metadata = spanishMetadata(
  '/privacy',
  esMeta.privacy.title,
  esMeta.privacy.description,
)

export default function SpanishPrivacyPage() {
  return <LegalView locale="es" kind="privacy" />
}
