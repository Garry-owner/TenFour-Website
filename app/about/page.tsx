import type { Metadata } from 'next'
import { AboutView } from '@/components/views/about-view'
import { languageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'About. TenFour Systems',
  description:
    'TenFour Systems is a Terrell, Texas company on a mission to make sure no home-service business ever loses a job to a missed call again.',
  ...languageAlternates('/about'),
}

export default function AboutPage() {
  return <AboutView locale="en" />
}
