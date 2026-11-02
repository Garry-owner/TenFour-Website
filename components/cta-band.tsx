import { CtaButton } from "@/components/cta-button"
import { localizeHref, type Locale } from "@/lib/locale"

const COPY: Record<Locale, { title: string; subtitle: string; book: string; pricing: string }> = {
  en: {
    title: "Stop losing jobs to voicemail.",
    subtitle:
      "See how fast Roger catches a missed call and texts your next customer back, before your competitor does.",
    book: "Book a Demo",
    pricing: "View Pricing",
  },
  es: {
    title: "Deja de perder trabajos por el buzón de voz.",
    subtitle:
      "Mira qué tan rápido Roger capta una llamada perdida y le manda un texto a tu próximo cliente, antes de que lo haga tu competidor.",
    book: "Reservar una demo",
    pricing: "Ver precios",
  },
}

export function CtaBand({
  locale = "en",
  title,
  subtitle,
}: {
  locale?: Locale
  title?: string
  subtitle?: string
}) {
  const copy = COPY[locale]

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-0 bg-control-grid opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]"
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          {title ?? copy.title}
        </h2>
        <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
          {subtitle ?? copy.subtitle}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <CtaButton href={localizeHref("/contact", locale)} size="lg">
            {copy.book}
          </CtaButton>
          <CtaButton href={localizeHref("/pricing", locale)} variant="outline" size="lg">
            {copy.pricing}
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
