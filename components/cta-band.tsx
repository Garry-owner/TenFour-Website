import { CtaButton } from '@/components/cta-button'

export function CtaBand({
  title = 'Stop losing jobs to voicemail.',
  subtitle = 'Book a demo and hear your own AI dispatcher answer a call, live, in your voice, tuned to your trade.',
}: {
  title?: string
  subtitle?: string
}) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-0 bg-control-grid opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]"
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">{subtitle}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <CtaButton href="/contact" size="lg">
            Book a Demo
          </CtaButton>
          <CtaButton href="/pricing" variant="outline" size="lg">
            View Pricing
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
