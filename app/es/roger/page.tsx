import type { Metadata } from "next"
import { RogerPage } from "@/components/pages/roger-page"
import { withHreflang } from "@/lib/locale"

export const metadata: Metadata = withHreflang("/roger", "es", {
  title: "Conoce a Roger. TenFour Systems",
  description: "El nombre detrás del despachador con IA de TenFour, y de dónde viene.",
})

export default function Page() {
  return <RogerPage locale="es" />
}
