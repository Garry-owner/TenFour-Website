import type { Metadata } from 'next'
import { AboutView } from '@/components/views/about-view'
import { esMeta } from '@/lib/copy/es-meta'
import { spanishMetadata } from '@/lib/seo'

export const metadata: Metadata = spanishMetadata('/about', esMeta.about.title, esMeta.about.description)

export default function SpanishAboutPage() {
  return <AboutView locale="es" />
}
