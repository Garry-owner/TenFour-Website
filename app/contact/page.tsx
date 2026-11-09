import type { Metadata } from 'next'
import { ContactView } from '@/components/views/contact-view'
import { languageAlternates } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Join the Waitlist. TenFour Systems',
  description:
    'Join the waitlist for TenFour. Roger texts back your missed calls, asks a few questions, and sends the lead to you.',
  ...languageAlternates('/contact'),
}

export default function ContactPage() {
  return <ContactView locale="en" />
}
