import type { Metadata } from "next"
import { AboutPage } from "@/components/pages/about-page"
import { withHreflang } from "@/lib/locale"

export const metadata: Metadata = withHreflang("/about", "es", {
  title: "Nosotros. TenFour Systems",
  description:
    "TenFour Systems es una empresa de Terrell, Texas, con la misión de que ningún negocio de servicios del hogar vuelva a perder un trabajo por una llamada perdida.",
})

export default function Page() {
  return <AboutPage locale="es" />
}
