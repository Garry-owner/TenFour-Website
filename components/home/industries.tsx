import { Eyebrow } from "@/components/section-heading"
import type { Locale } from "@/lib/locale"
import { TRADES } from "@/lib/trades"

const COPY: Record<Locale, { eyebrow: string; body: string }> = {
  en: {
    eyebrow: "Built for the trades",
    body: "Tuned for home-service businesses where a missed call is a missed job.",
  },
  es: {
    eyebrow: "Hecho para los oficios",
    body: "Ajustado para negocios de servicios del hogar, donde una llamada perdida es un trabajo perdido.",
  },
}

export function Industries({ locale = "en" }: { locale?: Locale }) {
  const copy = COPY[locale]

  return (
    <section className="border-b border-border py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-8 text-center">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <p className="max-w-2xl text-pretty text-lg text-muted-foreground">{copy.body}</p>
          <ul className="flex flex-wrap justify-center gap-3">
            {TRADES.map((industry) => (
              <li
                key={industry.id}
                className="rounded-full border border-border bg-card px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                {industry[locale]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
