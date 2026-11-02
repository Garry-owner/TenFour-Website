import type { Metadata } from "next"
import { ContactPage } from "@/components/pages/contact-page"
import { withHreflang } from "@/lib/locale"

export const metadata: Metadata = withHreflang("/contact", "es", {
  title: "Reservar una demo. TenFour Systems",
  description:
    "Reserva una demo en vivo del despachador con IA de TenFour. Mira exactamente cómo Roger capta una llamada perdida y le responde por texto a tu próximo cliente.",
})

export default function Page() {
  return <ContactPage locale="es" />
}
