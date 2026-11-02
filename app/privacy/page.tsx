import type { Metadata } from "next"
import { PrivacyPage } from "@/components/pages/privacy-page"
import { withHreflang } from "@/lib/locale"

export const metadata: Metadata = withHreflang("/privacy", "en", {
  title: "Privacy Policy. TenFour Systems",
  description: "How TenFour Systems collects, uses, and protects your information.",
})

export default function Page() {
  return <PrivacyPage locale="en" />
}
