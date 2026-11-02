import { MessageSquareText, Clock, Trophy } from "lucide-react"
import Image from "next/image"
import { CtaButton } from "@/components/cta-button"
import { RaceTimer } from "@/components/home/race-timer"
import { localizeHref, type Locale } from "@/lib/locale"

const COPY: Record<
  Locale,
  {
    watching: string
    titleBefore: string
    titleEmphasis: string
    titleAfter: string
    body: string
    origin: string
    book: string
    how: string
    stats: { k: string; v: string }[]
  }
> = {
  en: {
    watching: "Watching for missed calls",
    titleBefore: "We work the ",
    titleEmphasis: "second shift",
    titleAfter: " so you don't have to.",
    body: "TenFour Systems catches every missed call for home-service businesses. The moment you can't pick up, Roger texts that caller back within seconds, before they can call the next name on their list.",
    origin:
      "The name comes from an old radio callsign, ten-four, message received. That's Roger's whole job. He doesn't sleep, doesn't take lunch, and doesn't let a call go unanswered.",
    book: "Book a Demo",
    how: "See How It Works",
    stats: [
      { k: "24/7", v: "Always watching" },
      { k: "Seconds", v: "Text-back speed" },
      { k: "0", v: "Missed leads" },
    ],
  },
  es: {
    watching: "Vigilando llamadas perdidas",
    titleBefore: "Trabajamos el ",
    titleEmphasis: "segundo turno",
    titleAfter: " para que tú no tengas que hacerlo.",
    body: "TenFour Systems capta cada llamada perdida de los negocios de servicios del hogar. En el momento en que no puedes contestar, Roger le manda un texto a esa persona en segundos, antes de que llame al siguiente nombre de su lista.",
    origin:
      "El nombre viene de una clave de radio antigua, ten-four, mensaje recibido. Ese es todo el trabajo de Roger. No duerme, no sale a comer y no deja que una llamada se quede sin respuesta.",
    book: "Reservar una demo",
    how: "Ver cómo funciona",
    stats: [
      { k: "24/7", v: "Siempre vigilando" },
      { k: "Segundos", v: "Velocidad de respuesta" },
      { k: "0", v: "Prospectos perdidos" },
    ],
  },
}

const STAT_ICONS = [Clock, MessageSquareText, Trophy]

export function Hero({ locale = "en" }: { locale?: Locale }) {
  const copy = COPY[locale]

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
            {copy.watching}
          </span>

          <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {copy.titleBefore}
            <span className="text-primary">{copy.titleEmphasis}</span>
            {copy.titleAfter}
          </h1>

          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {copy.body}
          </p>

          <div className="flex items-center gap-3 max-w-xl border-l-2 border-border pl-4">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <Image src="/roger-avatar.png" alt="Roger" width={40} height={40} />
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{copy.origin}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <CtaButton href={localizeHref("/contact", locale)} size="lg">
              <MessageSquareText className="h-4 w-4" />
              {copy.book}
            </CtaButton>
            <CtaButton href={localizeHref("/how-it-works", locale)} variant="outline" size="lg">
              {copy.how}
            </CtaButton>
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-4 border-t border-border pt-6">
            {copy.stats.map(({ k, v }, index) => {
              const Icon = STAT_ICONS[index]
              return (
                <div key={v} className="flex flex-col gap-1">
                  <Icon className="h-4 w-4 text-primary" />
                  <dt className="font-mono text-2xl font-bold tracking-tight">{k}</dt>
                  <dd className="text-xs text-muted-foreground">{v}</dd>
                </div>
              )
            })}
          </dl>
        </div>

        <RaceTimer locale={locale} />
      </div>
    </section>
  )
}
