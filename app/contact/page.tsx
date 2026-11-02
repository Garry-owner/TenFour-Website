import type { Metadata } from "next"
import { ContactPage } from "@/components/pages/contact-page"
import { withHreflang } from "@/lib/locale"

export const metadata: Metadata = withHreflang("/contact", "en", {
  title: "Book a Demo. TenFour Systems",
  description:
    "Book a live demo of the TenFour AI dispatcher. See exactly how Roger catches a missed call and texts your next customer back.",
})

export default function Page() {
  return <ContactPage locale="en" />
}
