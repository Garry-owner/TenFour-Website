import type { Metadata } from "next"
import { HomePage } from "@/components/pages/home-page"
import { withHreflang } from "@/lib/locale"

export const metadata: Metadata = withHreflang("/", "es", {
  title: "TenFour Systems. El despachador con IA las 24 horas para servicios del hogar",
  description:
    "TenFour Systems contesta cada llamada perdida y califica al prospecto, luego envía tu enlace de reserva o un prospecto listo para agendar. Trabajamos el segundo turno para que tú no tengas que hacerlo.",
  openGraph: {
    description:
      "Captamos cada llamada perdida y le mandamos un texto a tu próximo cliente, antes de que lo haga tu competidor.",
    siteName: "TenFour Systems",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TenFour Systems, el despachador con IA las 24 horas para negocios de servicios del hogar",
      },
    ],
  },
})

export default function Page() {
  return <HomePage locale="es" />
}
