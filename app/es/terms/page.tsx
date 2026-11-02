import type { Metadata } from "next"
import { TermsPage } from "@/components/pages/terms-page"
import { withHreflang } from "@/lib/locale"

export const metadata: Metadata = withHreflang("/terms", "es", {
  title: "Términos de servicio. TenFour Systems",
  description: "Los términos que rigen su uso de TenFour Systems.",
})

export default function Page() {
  return <TermsPage locale="es" />
}
