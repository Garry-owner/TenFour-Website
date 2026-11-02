import type { Metadata } from "next"
import { AboutPage } from "@/components/pages/about-page"
import { withHreflang } from "@/lib/locale"

export const metadata: Metadata = withHreflang("/about", "en", {
  title: "About. TenFour Systems",
  description:
    "TenFour Systems is a Terrell, Texas company on a mission to make sure no home-service business ever loses a job to a missed call again.",
})

export default function Page() {
  return <AboutPage locale="en" />
}
