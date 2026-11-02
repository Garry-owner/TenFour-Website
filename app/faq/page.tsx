import type { Metadata } from "next"
import { FaqPage } from "@/components/pages/faq-page"
import { withHreflang } from "@/lib/locale"

export const metadata: Metadata = withHreflang("/faq", "en", {
  title: "FAQ. TenFour Systems",
  description: "Common questions about how TenFour and Roger actually work.",
})

export default function Page() {
  return <FaqPage locale="en" />
}
