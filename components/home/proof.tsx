import { Quote } from 'lucide-react'

export function Proof() {
  return (
    <section className="border-b border-border py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
          <figure className="flex flex-col justify-between rounded-lg border border-border bg-card p-8 sm:p-10">
            <Quote className="h-8 w-8 text-primary" />
            <blockquote className="mt-6 text-balance text-xl font-medium leading-relaxed sm:text-2xl">
              &ldquo;We used to lose every call that came in during a storm. Now TenFour books them
              while we&apos;re still on the ladder. It paid for itself in the first week.&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3 border-t border-border pt-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background font-mono text-sm font-bold text-primary">
                AR
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-semibold">Owner</span>
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Regional Roofing Co.
                </span>
              </span>
            </figcaption>
          </figure>

          <div className="grid gap-4">
            {[
              { k: 'Captured', v: 'Every after-hours call', note: 'nights, weekends, holidays' },
              { k: 'Faster', v: 'Under 2-ring pickup', note: 'before the caller hangs up' },
              { k: 'Booked', v: 'Straight to calendar', note: 'no manual follow-up' },
            ].map((item) => (
              <div
                key={item.k}
                className="flex flex-col gap-1 rounded-lg border border-border bg-card p-6"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-primary">
                  {item.k}
                </span>
                <span className="text-lg font-semibold tracking-tight">{item.v}</span>
                <span className="text-sm text-muted-foreground">{item.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
