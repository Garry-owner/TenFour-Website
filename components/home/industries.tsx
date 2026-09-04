import { Eyebrow } from '@/components/section-heading'

const INDUSTRIES = [
  'Roofing',
  'HVAC',
  'Plumbing',
  'Electrical',
  'Restoration',
  'Garage Doors',
  'Landscaping',
  'Pest Control',
  'Solar',
  'General Contracting',
]

export function Industries() {
  return (
    <section className="border-b border-border py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-8 text-center">
          <Eyebrow>Built for the trades</Eyebrow>
          <p className="max-w-2xl text-pretty text-lg text-muted-foreground">
            Tuned for home-service businesses where a missed call is a missed job.
          </p>
          <ul className="flex flex-wrap justify-center gap-3">
            {INDUSTRIES.map((industry) => (
              <li
                key={industry}
                className="rounded-full border border-border bg-card px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                {industry}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
