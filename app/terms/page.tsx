import type { Metadata } from "next"
import { TermsPage } from "@/components/pages/terms-page"
import { withHreflang } from "@/lib/locale"

export const metadata: Metadata = withHreflang("/terms", "en", {
  title: "Terms of Service. TenFour Systems",
  description: "The terms that govern your use of TenFour Systems.",
})

export default function Page() {
  return <TermsPage locale="en" />
}
