import { PhoneMissed, SlidersHorizontal, MessageSquareText, Inbox, CheckCircle2 } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { Steps } from "@/components/steps"
import { SectionHeading } from "@/components/section-heading"
import { CtaBand } from "@/components/cta-band"
import type { Locale } from "@/lib/locale"

const ICONS = [PhoneMissed, MessageSquareText, SlidersHorizontal, Inbox]

const COPY: Record<
  Locale,
  {
    eyebrow: string
    title: string
    description: string
    flowEyebrow: string
    flowTitle: string
    flowDescription: string
    flow: { title: string; body: string }[]
    includedEyebrow: string
    includedTitle: string
    includedDescription: string
    included: string[]
  }
> = {
  en: {
    eyebrow: "How It Works",
    title: "Your second shift, fully automated",
    description:
      "TenFour watches for missed calls on your line. Roger qualifies each one, sends your booking link when you have one, and otherwise hands your team a ready to book lead.",
    flowEyebrow: "The Call Flow",
    flowTitle: "What happens on every missed call",
    flowDescription:
      "Here's the exact path a caller takes from a missed call to your booking link, or a lead your team can book.",
    flow: [
      {
        title: "A call goes unanswered",
        body: "A homeowner calls after hours with a leak. Nobody picks up, and the call goes unanswered.",
      },
      {
        title: "Roger texts back instantly",
        body: "Within seconds, Roger sends that caller a text, before they can call the next name on their list.",
      },
      {
        title: "The lead is qualified",
        body: "Over text, it captures service type, address, urgency, and budget signals using your custom script.",
      },
      {
        title: "The lead is sent to you",
        body: "If you have a booking link, Roger texts it so the customer can book. Otherwise a ready to book lead and full transcript land with your team.",
      },
    ],
    includedEyebrow: "What's Included",
    includedTitle: "Everything a front desk hire would do, minus the payroll",
    includedDescription: "One flat system that replaces missed calls, voicemail tag, and after-hours chaos.",
    included: [
      "Custom text-back script for your trade",
      "Lead qualification tuned to your service area",
      "Instant confirmation text that a request was received",
      "Real-time lead alerts with full transcripts",
      "Responds automatically in the lead's language",
    ],
  },
  es: {
    eyebrow: "Cómo funciona",
    title: "Tu segundo turno, completamente automatizado",
    description:
      "TenFour vigila las llamadas perdidas en tu línea. Roger califica cada una, envía tu enlace de reserva cuando lo tienes y, si no, le entrega a tu equipo un prospecto listo para agendar.",
    flowEyebrow: "El flujo de la llamada",
    flowTitle: "Qué pasa en cada llamada perdida",
    flowDescription:
      "Este es el camino exacto que sigue quien llama, desde una llamada perdida hasta tu enlace de reserva, o un prospecto que tu equipo puede agendar.",
    flow: [
      {
        title: "Una llamada se queda sin respuesta",
        body: "Un propietario llama fuera de horario por una fuga. Nadie contesta, y la llamada se queda sin respuesta.",
      },
      {
        title: "Roger responde por texto al instante",
        body: "En segundos, Roger le manda un texto a esa persona, antes de que pueda llamar al siguiente nombre de su lista.",
      },
      {
        title: "El prospecto queda calificado",
        body: "Por texto, capta el tipo de servicio, la dirección, la urgencia y señales de presupuesto usando tu guion personalizado.",
      },
      {
        title: "El prospecto se te envía",
        body: "Si tienes un enlace de reserva, Roger se lo manda por texto para que el cliente pueda agendar. Si no, un prospecto listo para agendar y la transcripción completa llegan a tu equipo.",
      },
    ],
    includedEyebrow: "Qué incluye",
    includedTitle: "Todo lo que haría una persona de recepción, sin la nómina",
    includedDescription:
      "Un solo sistema de precio fijo que reemplaza las llamadas perdidas, el ir y venir del buzón de voz y el caos fuera de horario.",
    included: [
      "Guion de respuesta por texto hecho para tu oficio",
      "Calificación de prospectos ajustada a tu zona de servicio",
      "Texto de confirmación al instante de que se recibió una solicitud",
      "Alertas de prospectos en tiempo real con transcripciones completas",
      "Responde automáticamente en el idioma del prospecto",
    ],
  },
}

export function HowItWorksPage({ locale = "en" }: { locale?: Locale }) {
  const copy = COPY[locale]

  return (
    <main>
      <PageHero eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

      <section className="border-b border-border py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow={copy.flowEyebrow}
            title={copy.flowTitle}
            description={copy.flowDescription}
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {copy.flow.map(({ title, body }, i) => {
              const Icon = ICONS[i]
              return (
                <div
                  key={title}
                  className="relative flex flex-col gap-4 rounded-lg border border-border bg-card p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Steps withHeading locale={locale} />

      <section className="border-b border-border py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow={copy.includedEyebrow}
            title={copy.includedTitle}
            description={copy.includedDescription}
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {copy.included.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 text-sm"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand locale={locale} />
    </main>
  )
}
