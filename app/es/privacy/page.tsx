import type { Metadata } from "next"
import { PrivacyPage } from "@/components/pages/privacy-page"
import { withHreflang } from "@/lib/locale"

export const metadata: Metadata = withHreflang("/privacy", "es", {
  title: "Política de privacidad. TenFour Systems",
  description: "Cómo TenFour Systems recopila, usa y protege su información.",
})

export default function Page() {
  return <PrivacyPage locale="es" />
}
