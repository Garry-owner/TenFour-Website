import type { Metadata } from "next"
import { FaqPage } from "@/components/pages/faq-page"
import { withHreflang } from "@/lib/locale"

export const metadata: Metadata = withHreflang("/faq", "es", {
  title: "Preguntas. TenFour Systems",
  description: "Preguntas comunes sobre cómo funcionan de verdad TenFour y Roger.",
})

export default function Page() {
  return <FaqPage locale="es" />
}
