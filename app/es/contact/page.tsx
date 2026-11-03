import type { Metadata } from 'next'
import { ContactView } from '@/components/views/contact-view'
import { esMeta } from '@/lib/copy/es-meta'
import { spanishMetadata } from '@/lib/seo'

export const metadata: Metadata = spanishMetadata(
  '/contact',
  esMeta.contact.title,
  esMeta.contact.description,
)

export default function SpanishContactPage() {
  return <ContactView locale="es" />
}
