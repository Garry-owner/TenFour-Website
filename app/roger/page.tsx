import type { Metadata } from "next"
import { RogerPage } from "@/components/pages/roger-page"
import { withHreflang } from "@/lib/locale"

export const metadata: Metadata = withHreflang("/roger", "en", {
  title: "Meet Roger. TenFour Systems",
  description: "The name behind TenFour's AI dispatcher, and where it comes from.",
})

export default function Page() {
  return <RogerPage locale="en" />
}
