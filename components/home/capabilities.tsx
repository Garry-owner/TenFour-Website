import {
  PhoneCall,
  ClipboardCheck,
  CalendarClock,
  MessageSquareText,
  BellRing,
  ShieldCheck,
} from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import type { Locale } from "@/lib/locale"

const ICONS = [PhoneCall, ClipboardCheck, CalendarClock, MessageSquareText, BellRing, ShieldCheck]

const COPY: Record<
  Locale,
  { eyebrow: string; title: string; description: string; caps: { title: string; body: string }[] }
> = {
  en: {
    eyebrow: "The System",
    title: "A full dispatch desk, running on autopilot",
    description:
      "TenFour handles the entire front-of-house call flow so your crew stays on the roof, not on the phone.",
    caps: [
      {
        title: "Catches every missed call",
        body: "The moment your phone goes unanswered, Roger texts that caller back within seconds, 24/7/365. No hold music, no dead-end voicemail, no missed opportunity.",
      },
      {
        title: "Qualifies the lead",
        body: "Asks the right questions for your trade, including service type, location, and urgency, and filters out tire kickers.",
      },
      {
        title: "Delivers a ready lead",
        body: "Qualifies the caller and texts your booking link when you have one. Otherwise you get what you need to book the job.",
      },
      {
        title: "Confirms the request",
        body: "Sends the caller an instant text confirming their request was received and someone will follow up.",
      },
      {
        title: "Notifies your team",
        body: "Every qualified lead is pushed to you in real time with a full transcript and the details that matter.",
      },
      {
        title: "Sounds like your brand",
        body: "Custom text-back script and tone tuned to your business, so callers get a seamless experience.",
      },
    ],
  },
  es: {
    eyebrow: "El sistema",
    title: "Un escritorio de despacho completo, en piloto automático",
    description:
      "TenFour se encarga de todo el flujo de llamadas de recepción para que tu equipo se quede en el techo, no en el teléfono.",
    caps: [
      {
        title: "Capta cada llamada perdida",
        body: "En el momento en que tu teléfono no se contesta, Roger le manda un texto a esa persona en segundos, las 24 horas, los 365 días. Sin música de espera, sin buzón de voz sin salida, sin oportunidad perdida.",
      },
      {
        title: "Califica al prospecto",
        body: "Hace las preguntas correctas para tu oficio, incluido el tipo de servicio, la ubicación y la urgencia, y filtra a quienes solo están mirando.",
      },
      {
        title: "Entrega un prospecto listo",
        body: "Califica a quien llama y le manda tu enlace de reserva cuando lo tienes. Si no, recibes lo que necesitas para agendar el trabajo.",
      },
      {
        title: "Confirma la solicitud",
        body: "Le manda a quien llama un texto al instante confirmando que su solicitud se recibió y que alguien dará seguimiento.",
      },
      {
        title: "Avisa a tu equipo",
        body: "Cada prospecto calificado te llega en tiempo real, con la transcripción completa y los detalles que importan.",
      },
      {
        title: "Suena como tu marca",
        body: "Guion y tono de respuesta por texto hechos para tu negocio, para que quien llama tenga una experiencia sin tropiezos.",
      },
    ],
  },
}

export function Capabilities({ locale = "en" }: { locale?: Locale }) {
  const copy = COPY[locale]

  return (
    <section className="border-b border-border py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {copy.caps.map(({ title, body }, index) => {
            const Icon = ICONS[index]
            return (
              <div
                key={title}
                className="group flex flex-col gap-4 bg-card p-7 transition-colors hover:bg-secondary/60"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background text-primary transition-colors group-hover:border-primary/50">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
