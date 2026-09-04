import { PhoneCall, CalendarCheck, Clock } from 'lucide-react'
import { CtaButton } from '@/components/cta-button'
import { DispatchConsole } from '@/components/home/dispatch-console'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-control-grid opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
        <div className="flex flex-col gap-7">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-2 w-2 rounded-full bg-[var(--signal)] animate-signal" />
            </span>
            Dispatcher online · answering now
          </span>

          <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            We work the <span className="text-primary">second shift</span> so you don&apos;t have
            to.
          </h1>

          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            TenFour Systems is the 24/7 AI dispatcher for home-service businesses. Every missed call
            gets answered, every lead gets qualified, and every job gets booked, day or night,
            weekends included.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <CtaButton href="/contact" size="lg">
              <PhoneCall className="h-4 w-4" />
              Book a Demo
            </CtaButton>
            <CtaButton href="/how-it-works" variant="outline" size="lg">
              See How It Works
            </CtaButton>
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-4 border-t border-border pt-6">
            {[
              { icon: Clock, k: '24/7', v: 'Always answering' },
              { icon: PhoneCall, k: '<2 rings', v: 'Pickup speed' },
              { icon: CalendarCheck, k: '0', v: 'Missed leads' },
            ].map(({ icon: Icon, k, v }) => (
              <div key={v} className="flex flex-col gap-1">
                <Icon className="h-4 w-4 text-primary" />
                <dt className="font-mono text-2xl font-bold tracking-tight">{k}</dt>
                <dd className="text-xs text-muted-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <DispatchConsole />
      </div>
    </section>
  )
}
