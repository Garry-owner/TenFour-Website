import type { Metadata } from "next"
import { HowItWorksPage } from "@/components/pages/how-it-works-page"
import { withHreflang } from "@/lib/locale"

export const metadata: Metadata = withHreflang("/how-it-works", "en", {
  title: "How It Works. TenFour Systems",
  description:
    "See exactly how TenFour catches a missed call, qualifies the lead, and sends your booking link or a ready to book lead.",
})

export default function Page() {
  return <HowItWorksPage locale="en" />
}
