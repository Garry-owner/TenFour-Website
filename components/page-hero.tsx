import { Eyebrow } from '@/components/section-heading'

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: React.ReactNode
  description: string
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-control-grid opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/12 blur-[120px]"
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-5 px-4 py-20 text-center sm:px-6 sm:py-24">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </section>
  )
}
