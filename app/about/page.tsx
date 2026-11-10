import type { Metadata } from 'next'
import { AboutView } from '@/components/views/about-view'
import { englishMetadata } from '@/lib/seo'

export const metadata: Metadata = englishMetadata(
  '/about',
  'About. TenFour Systems',
  'TenFour Systems is a Terrell, Texas company on a mission to help home-service businesses stop losing jobs to missed calls.',
)

export default function AboutPage() {
  return <AboutView locale="en" />
}
