import type { Metadata } from "next"
import { PricingPage } from "@/components/pages/pricing-page"
import { withHreflang } from "@/lib/locale"

export const metadata: Metadata = withHreflang("/pricing", "en", {
  title: "Pricing. TenFour Systems",
  description:
    "Straightforward pricing for the 24/7 AI dispatcher. Pick the tier that fits your call volume, no hidden fees.",
})

export default function Page() {
  return <PricingPage locale="en" />
}
