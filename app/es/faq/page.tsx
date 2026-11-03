import type { Metadata } from 'next'
import { FaqView } from '@/components/views/faq-view'
import { esMeta } from '@/lib/copy/es-meta'
import { spanishMetadata } from '@/lib/seo'

export const metadata: Metadata = spanishMetadata('/faq', esMeta.faq.title, esMeta.faq.description)

export default function SpanishFaqPage() {
  return <FaqView locale="es" />
}
