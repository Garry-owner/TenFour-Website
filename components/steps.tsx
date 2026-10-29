import { SectionHeading } from '@/components/section-heading'

const STEPS = [
  {
    id: '01',
    title: 'We watch your line',
    body: 'Roger connects to your existing business number and watches for any call that goes unanswered. Setup takes minutes, not weeks.',
  },
  {
    id: '02',
    title: 'We tune Roger',
    body: 'We script your text-back message and qualifying questions around your trade, service area, and hours, and add your booking link when you have one.',
  },
  {
    id: '03',
    title: 'Missed calls get caught',
    body: 'The moment a call goes unanswered, Roger texts that caller back before they can call the next name on their list.',
  },
  {
    id: '04',
    title: 'You get the lead',
    body: 'If you have a booking link, Roger texts it so the customer can book themselves. Otherwise a ready to book lead, transcript, and callback details land with your team.',
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
