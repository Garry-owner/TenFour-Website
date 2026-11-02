import type { Locale } from "@/lib/locale"
import { tradeLabel, type TradeId } from "@/lib/trades"

export type ServiceArea = {
  slug: string
  city: string
  tradeId: TradeId
  trade: { en: string; es: string }
  landmark: { en: string; es: string }
  blurb: { en: string; es: string }
}

export const SERVICE_AREAS: ServiceArea[] = [
  {
    slug: "rockwall-roofing",
    city: "Rockwall",
    tradeId: "Roofing",
    trade: tradeLabel("Roofing"),
    landmark: { en: "Lake Ray Hubbard", es: "Lake Ray Hubbard" },
    blurb: {
      en: "Storm season around Lake Ray Hubbard means the phone rings the second hail hits. Roger catches every missed call so no Rockwall homeowner ends up calling your competitor instead.",
      es: "La temporada de tormentas alrededor de Lake Ray Hubbard significa que el teléfono suena en el segundo en que cae el granizo. Roger capta cada llamada perdida para que ningún propietario de Rockwall termine llamando a tu competidor.",
    },
  },
  {
    slug: "mckinney-hvac",
    city: "McKinney",
    tradeId: "HVAC",
    trade: tradeLabel("HVAC"),
    landmark: { en: "Historic Square", es: "Historic Square" },
    blurb: {
      en: "A no-cool call in a McKinney summer cannot wait for a callback. Roger texts that customer back in seconds, day or night, so the job stays yours.",
      es: "Una llamada de que no enfría en un verano de McKinney no puede esperar a que le devuelvan la llamada. Roger le responde por texto a ese cliente en segundos, de día o de noche, para que el trabajo se quede contigo.",
    },
  },
  {
    slug: "terrell-foundation-repair",
    city: "Terrell",
    tradeId: "Foundation Repair",
    trade: tradeLabel("Foundation Repair"),
    landmark: { en: "the Historic District", es: "el Distrito Histórico" },
    blurb: {
      en: "Terrell homes built on North Texas clay soil see real foundation movement. When a worried homeowner calls after hours, Roger makes sure that call gets answered.",
      es: "Las casas de Terrell construidas sobre el suelo arcilloso del norte de Texas ven movimiento real en los cimientos. Cuando un propietario preocupado llama fuera de horario, Roger se asegura de que esa llamada se atienda.",
    },
  },
]

function nearPhrase(area: ServiceArea, locale: Locale) {
  const landmark = area.landmark[locale]
  if (locale === "es" && landmark.startsWith("el ")) {
    return `cerca del ${landmark.slice(3)}`
  }
  if (locale === "es") return `cerca de ${landmark}`
  return `near ${landmark}`
}

export function serviceAreaCopy(area: ServiceArea, locale: Locale) {
  const trade = area.trade[locale]
  const tradeLower = trade.toLowerCase()

  if (locale === "es") {
    return {
      eyebrow: `${trade} en ${area.city}, TX`,
      title: `Nunca pierdas otra llamada de ${tradeLower} ${nearPhrase(area, locale)}`,
      description: area.blurb.es,
      ctaTitle: `¿Listo para dejar de perder trabajos de ${area.city} por el buzón de voz?`,
      ctaSubtitle: "Reserva una demo y mira qué tan rápido Roger capta una llamada perdida.",
      metaTitle: `Despacho de llamadas perdidas de ${trade} en ${area.city}, TX. TenFour Systems`,
      footerLabel: `${trade} en ${area.city}`,
    }
  }

  return {
    eyebrow: `${trade} in ${area.city}, TX`,
    title: `Never miss another ${tradeLower} call ${nearPhrase(area, locale)}`,
    description: area.blurb.en,
    ctaTitle: `Ready to stop losing ${area.city} jobs to voicemail?`,
    ctaSubtitle: "Book a demo and see how fast Roger catches a missed call.",
    metaTitle: `${trade} Missed Call Dispatch in ${area.city}, TX. TenFour Systems`,
    footerLabel: `${trade} in ${area.city}`,
  }
}
