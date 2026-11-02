import type { Metadata } from "next"
import { HowItWorksPage } from "@/components/pages/how-it-works-page"
import { withHreflang } from "@/lib/locale"

export const metadata: Metadata = withHreflang("/how-it-works", "es", {
  title: "Cómo funciona. TenFour Systems",
  description:
    "Mira exactamente cómo TenFour capta una llamada perdida, califica al prospecto y envía tu enlace de reserva o un prospecto listo para agendar.",
})

export default function Page() {
  return <HowItWorksPage locale="es" />
}
