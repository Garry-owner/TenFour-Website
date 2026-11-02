import type { Metadata } from "next"
import { PricingPage } from "@/components/pages/pricing-page"
import { withHreflang } from "@/lib/locale"

export const metadata: Metadata = withHreflang("/pricing", "es", {
  title: "Precios. TenFour Systems",
  description:
    "Precios claros para el despachador con IA las 24 horas. Elige el nivel que se ajuste a tu volumen de llamadas, sin cargos ocultos.",
})

export default function Page() {
  return <PricingPage locale="es" />
}
