import type { Metadata } from 'next'
import { PhoneMissed, SlidersHorizontal, MessageSquareText, Inbox, CheckCircle2 } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Steps } from '@/components/steps'
import { SectionHeading } from '@/components/section-heading'
import { CtaBand } from '@/components/cta-band'

export const metadata: Metadata = {
  title: 'How It Works. TenFour Systems',
  description:
    "See exactly how TenFour catches a missed call, texts the lead back, and hands you a qualified, ready-to-book job.",
}

const FLOW = [
  {
    icon: PhoneMissed,
    title: 'A call goes unanswered',
    body: 'A homeowner calls after hours with a leak. Nobody picks up, and the call goes unanswered.',
  },
  {
    icon: MessageSquareText,
    title: 'Roger texts back instantly',
    body: 'Within seconds, Roger sends that caller a text before they can hang up and call your competitor.',
  },
  {
    icon: SlidersHorizontal,
    title: 'The lead is qualified',
    body: 'Over text, it captures service type, address, urgency, and budget signals using your custom script.',
  },
  {
    icon: Inbox,
    title: 'The lead is sent to you',
    body: 'A qualified, ready-to-book lead and full text transcript lands with your team in real time.',
  },
]

const INCLUDED = [
  'Custom text-back script for your trade',
  'Lead qualification tuned to your service area',
  'Instant confirmation text that a request was received',
  'Real-time lead alerts with full transcripts',
  "Responds automatically in the lead's language",
]

export default function HowItWorksPage() {
  return (
    <main>
      <PageHero
        eyebrow="How It Works"
        title="Your second shift, fully automated"
        description="TenFour watches for missed calls on your line and turns every one into a qualified, ready-to-book lead, without you lifting a finger."
      />

      <section className="border-b border-border py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="The Call Flow"
            title="What happens on every missed call"
            description="Here's the exact path a caller takes from missed call to booked appointment."
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
