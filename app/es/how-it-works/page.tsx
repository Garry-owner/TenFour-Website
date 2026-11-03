import type { Metadata } from 'next'
import { HowView } from '@/components/views/how-view'
import { esMeta } from '@/lib/copy/es-meta'
import { spanishMetadata } from '@/lib/seo'

export const metadata: Metadata = spanishMetadata(
  '/how-it-works',
  esMeta.how.title,
  esMeta.how.description,
)

export default function SpanishHowPage() {
  return <HowView locale="es" />
}
