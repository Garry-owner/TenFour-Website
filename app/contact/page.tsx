import type { Metadata } from 'next'
import { Mail, MapPin, Clock, PhoneCall } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { DemoForm } from '@/components/demo-form'

export const metadata: Metadata = {
  title: 'Book a Demo. TenFour Systems',
  description:
    'Book a live demo of the TenFour AI dispatcher. Hear it answer, qualify, and book a call for your home service business.',
}

const CONTACT = [
  { icon: Mail, label: 'Email', value: 'garry@tenfoursystems.com', href: 'mailto:garry@tenfoursystems.com' },
  { icon: PhoneCall, label: 'Phone', value: '(231) 218 2360', href: 'tel:+12312182360' },
  { icon: MapPin, label: 'Based in', value: 'Terrell, Texas', href: null },
  { icon: Clock, label: 'Dispatcher hours', value: '24 / 7 / 365', href: null },
]

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Book a Demo"
        title="Hear your dispatcher answer a call"
        description="Tell us about your business and we'll set up a live demo tuned to your trade. You'll hear exactly what your callers will experience."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-bold tracking-tight">Let&apos;s get you on the air</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Fill out the form and we&apos;ll reach out to schedule your demo. Prefer to talk
                first? Reach us directly below.
              </p>
            </div>

            <ul className="flex flex-col gap-4">
              {CONTACT.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="flex flex-col">
                      <span className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
                        {label}
                      </span>
                      <span className="text-sm font-medium">{value}</span>
                    </div>
                  </div>
                )
                return (
                  <li key={label}>
                    {href ? (
                      <a href={href} className="block transition-opacity hover:opacity-80">
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--signal)]">
                <span className="h-2 w-2 rounded-full bg-[var(--signal)] animate-signal" />
                Dispatcher online
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Your future callers never hit voicemail again. The moment you&apos;re live, every
                ring is answered, days, nights, and weekends included.
              </p>
            </div>
          </div>

          <DemoForm />
        </div>
      </section>
    </main>
  )
}
