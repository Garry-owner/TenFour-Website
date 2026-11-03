import type { Metadata } from 'next'
import { HomeView } from '@/components/views/home-view'
import { esMeta } from '@/lib/copy/es-meta'
import { spanishMetadata } from '@/lib/seo'

export const metadata: Metadata = spanishMetadata('/', esMeta.home.title, esMeta.home.description)

export default function SpanishHomePage() {
  return <HomeView locale="es" />
}
