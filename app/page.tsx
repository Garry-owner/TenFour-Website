import type { Metadata } from "next"
import { HomePage } from "@/components/pages/home-page"
import { withHreflang } from "@/lib/locale"

export const metadata: Metadata = withHreflang("/", "en", {
  title: "TenFour Systems. The 24/7 AI Dispatcher for Home Services",
  description:
    "TenFour Systems answers every missed call and qualifies the lead, then sends your booking link or a ready to book lead. We work the second shift so you don't have to.",
  openGraph: {
    description:
      "We catch every missed call and text your next customer back, before your competitor does.",
    siteName: "TenFour Systems",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TenFour Systems, the 24/7 AI dispatcher for home service businesses",
      },
    ],
  },
})

export default function Page() {
  return <HomePage locale="en" />
}
