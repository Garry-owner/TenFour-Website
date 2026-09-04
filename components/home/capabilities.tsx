import { PhoneCall, ClipboardCheck, CalendarClock, MessageSquareText, BellRing, ShieldCheck } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'

const CAPS = [
  {
    icon: PhoneCall,
    title: 'Answers every call',
    body: 'Picks up in under two rings, 24/7/365. No hold music, no voicemail, no missed opportunity.',
  },
  {
    icon: ClipboardCheck,
    title: 'Qualifies the lead',
    body: 'Asks the right questions for your trade, including service type, location, and urgency, and filters out tire kickers.',
  },
  {
    icon: CalendarClock,
    title: 'Delivers a ready lead',
    body: 'Qualifies the caller and sends you everything you need to book the job yourself, fast.',
  },
  {
    icon: MessageSquareText,
    title: 'Texts confirmations',
    body: 'Sends the caller an instant text confirming their request was received and someone will follow up.',
  },
  {
    icon: BellRing,
    title: 'Notifies your team',
    body: 'Every qualified lead is pushed to you in real time with a full transcript and the details that matter.',
  },
  {
    icon: ShieldCheck,
    title: 'Sounds like your brand',
    body: 'Custom greeting, tone, and script tuned to your business, so callers get a seamless experience.',
  },
]

export function Capabilities() {
  return (
    <section className="border-b border-border py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The System"
          title="A full dispatch desk, running on autopilot"
          description="TenFour handles the entire front-of-house call flow so your crew stays on the roof, not on the phone."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {CAPS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group flex flex-col gap-4 bg-card p-7 transition-colors hover:bg-secondary/60"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background text-primary transition-colors group-hover:border-primary/50">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
