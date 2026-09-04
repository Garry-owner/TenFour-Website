import { SectionHeading } from '@/components/section-heading'

const STEPS = [
  {
    id: '01',
    title: 'Forward your line',
    body: 'Point your existing business number to TenFour, or use a new one we provision. Setup takes minutes, not weeks.',
  },
  {
    id: '02',
    title: 'We tune your agent',
    body: 'We script your greeting, qualifying questions, and booking rules around your trade, service area, and hours.',
  },
  {
    id: '03',
    title: 'Calls get answered',
    body: 'Every caller reaches a live-sounding dispatcher that qualifies them and books the job into your calendar.',
  },
  {
    id: '04',
    title: 'You get the lead',
    body: 'Confirmed appointments, transcripts, and callback details land with your team in real time. You just show up.',
  },
]

export function Steps({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <section className="border-b border-border py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {withHeading && (
          <SectionHeading
            eyebrow="How It Works"
            title="Live in a day. Answering forever."
            description="No apps to babysit, no scripts to memorize. We handle the wiring, you get your evenings back."
          />
        )}

        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <li
              key={step.id}
              className="relative flex flex-col gap-4 rounded-lg border border-border bg-card p-6"
            >
              <span className="font-mono text-sm font-bold tracking-widest text-primary">
                {step.id}
              </span>
              <div className="h-px w-full bg-border" aria-hidden />
              <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
