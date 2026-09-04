import type { Metadata } from 'next'
import { PhoneForwarded, SlidersHorizontal, Headphones, Inbox, CheckCircle2 } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Steps } from '@/components/steps'
import { SectionHeading } from '@/components/section-heading'
import { CtaBand } from '@/components/cta-band'

export const metadata: Metadata = {
  title: 'How It Works. TenFour Systems',
  description:
    'From forwarding your line to a booked job on your calendar, see exactly how the TenFour AI dispatcher runs your second shift.',
}

const FLOW = [
  {
    icon: PhoneForwarded,
    title: 'A call comes in',
    body: 'A homeowner calls after hours with a leak. Your line forwards to TenFour instantly.',
  },
  {
    icon: Headphones,
    title: 'The agent answers',
    body: 'In under two rings, a natural-sounding dispatcher greets them in your business name.',
  },
  {
    icon: SlidersHorizontal,
    title: 'The lead is qualified',
    body: 'It captures service type, address, urgency, and budget signals using your custom script.',
  },
  {
    icon: Inbox,
    title: 'The job is booked & routed',
    body: 'A confirmed appointment hits your calendar and the transcript is pushed to your team.',
  },
]

const INCLUDED = [
  'Custom greeting and script for your trade',
  'Call qualification tuned to your service area',
  'Calendar booking and availability rules',
  'Instant SMS confirmations to callers',
  'Real-time lead alerts with full transcripts',
  'Spam and robocall filtering',
  'Bilingual answering available',
  'Monthly performance reporting',
]

export default function HowItWorksPage() {
  return (
    <main>
      <PageHero
        eyebrow="How It Works"
        title="Your second shift, fully automated"
        description="TenFour sits between your phone number and your calendar, turning every ring into a qualified, booked job, without you lifting a finger."
      />

      <section className="border-b border-border py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="The Call Flow"
            title="What happens on every single call"
            description="Here's the exact path a caller takes from ring to booked appointment."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {FLOW.map(({ icon: Icon, title, body }, i) => (
              <div
                key={title}
                className="relative flex flex-col gap-4 rounded-lg border border-border bg-card p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Steps withHeading />

      <section className="border-b border-border py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow="What's Included"
            title="Everything a front desk hire would do, minus the payroll"
            description="One flat system that replaces missed calls, voicemail tag, and after-hours chaos."
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {INCLUDED.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 text-sm"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </main>
  )
}
