import Image from "next/image"
import { PageHero } from "@/components/page-hero"
import { CtaBand } from "@/components/cta-band"
import type { Locale } from "@/lib/locale"

const COPY: Record<
  Locale,
  {
    eyebrow: string
    title: string
    description: string
    paragraphs: string[]
    ctaTitle: string
    ctaSubtitle: string
  }
> = {
  en: {
    eyebrow: "Meet Roger",
    title: "The one who never misses a call",
    description: "Roger is TenFour's AI dispatcher, on the job 24/7.",
    paragraphs: [
      "The name comes from an old radio callsign, ten-four, message received. That's Roger's whole job. He doesn't sleep, doesn't take lunch, and doesn't let a call go unanswered.",
      "The moment a call to your business goes unanswered, Roger texts that caller back within seconds, before they can call the next name on their list. He asks the right questions for your trade, gets the details you need, and hands you a ready lead, all before the phone would've rung a fourth time.",
      "Roger doesn't answer live calls today, that's honest, and it's by design. What he does is faster than voicemail and cheaper than a full-time dispatcher, and he never has an off day.",
    ],
    ctaTitle: "See Roger catch a missed call",
    ctaSubtitle: "Book a demo and watch exactly how it works.",
  },
  es: {
    eyebrow: "Conoce a Roger",
    title: "El que nunca deja pasar una llamada",
    description: "Roger es el despachador con IA de TenFour, en el trabajo las 24 horas.",
    paragraphs: [
      "El nombre viene de una clave de radio antigua, ten-four, mensaje recibido. Ese es todo el trabajo de Roger. No duerme, no sale a comer y no deja que una llamada se quede sin respuesta.",
      "En el momento en que una llamada a tu negocio se queda sin respuesta, Roger le manda un texto a esa persona en segundos, antes de que pueda llamar al siguiente nombre de su lista. Hace las preguntas correctas para tu oficio, consigue los detalles que necesitas y te entrega un prospecto listo, todo antes de que el teléfono hubiera sonado una cuarta vez.",
      "Roger no contesta llamadas en vivo hoy. Eso es honesto, y es a propósito. Lo que sí hace es más rápido que el buzón de voz y más barato que un despachador de tiempo completo, y nunca tiene un día libre.",
    ],
    ctaTitle: "Mira a Roger captar una llamada perdida",
    ctaSubtitle: "Reserva una demo y mira exactamente cómo funciona.",
  },
}

export function RogerPage({ locale = "en" }: { locale?: Locale }) {
  const copy = COPY[locale]

  return (
    <main>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

      <section className="border-b border-border py-16 sm:py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-4 text-center sm:px-6">
          <div className="h-24 w-24 overflow-hidden rounded-full border border-border">
            <Image src="/roger-avatar.png" alt="Roger" width={96} height={96} />
          </div>
          <div className="space-y-4 text-pretty text-muted-foreground">
            {copy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <CtaBand locale={locale} title={copy.ctaTitle} subtitle={copy.ctaSubtitle} />
    </main>
  )
}
