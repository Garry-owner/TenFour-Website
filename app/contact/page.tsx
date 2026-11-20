import type { Metadata } from 'next'
import { ContactView } from '@/components/views/contact-view'
import { englishMetadata } from '@/lib/seo'

export const metadata: Metadata = englishMetadata(
  '/contact',
  'Join the Waitlist. TenFour Systems',
  'Join the waitlist for TenFour. Roger texts back your missed calls, asks a few questions, and sends the lead to you.',
)

export default function ContactPage() {
  return <ContactView locale="en" />
}
