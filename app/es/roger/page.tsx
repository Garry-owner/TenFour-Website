import type { Metadata } from 'next'
import { RogerView } from '@/components/views/roger-view'
import { esMeta } from '@/lib/copy/es-meta'
import { spanishMetadata } from '@/lib/seo'

export const metadata: Metadata = spanishMetadata('/roger', esMeta.roger.title, esMeta.roger.description)

export default function SpanishRogerPage() {
  return <RogerView locale="es" />
}
