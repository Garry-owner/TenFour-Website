import { PhoneMissed, MoonStar, TrendingDown } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'

const COSTS = [
  {
    icon: PhoneMissed,
    stat: '62%',
    label: 'of calls to small businesses go unanswered',
    body: 'Every ring that rolls to voicemail is a customer who calls the next name on the list.',
  },
  {
    icon: MoonStar,
    stat: '27%',
    label: 'of service calls come after hours',
    body: 'Storms, leaks, and outages do not keep business hours, and neither should your phone.',
  },
  {
    icon: TrendingDown,
    stat: '$1,200+',
    label: 'average value of a booked job lost',
    body: 'A single missed emergency call can walk thousands of dollars straight to a competitor.',
  },
]

export function Problem() {
  return (
    <section className="border-b border-border py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The Problem"
          title="The phone rings after 5 PM. Nobody answers. The job is gone."
          description="Home service owners can't sit by the phone 24/7, but their customers expect an answer the moment something breaks."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {COSTS.map(({ icon: Icon, stat, label, body }) => (
            <div
              key={label}
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <Icon className="h-6 w-6 text-primary" />
              <p className="mt-6 font-mono text-4xl font-bold tracking-tight text-foreground">
                {stat}
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">{label}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
