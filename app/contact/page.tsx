import type { Metadata } from 'next'
import { ContactView } from '@/components/views/contact-view'
import { languageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Book a Demo. TenFour Systems',
  description:
    'Book a live demo of the TenFour AI dispatcher. See exactly how Roger catches a missed call and texts your next customer back.',
  ...languageAlternates('/contact'),
}

export default function ContactPage() {
  return <ContactView locale="en" />
}
