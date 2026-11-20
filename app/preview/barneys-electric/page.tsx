import type { Metadata } from 'next'
import { PreviewSite } from '@/components/preview/barneys-electric/preview-site'

export const metadata: Metadata = {
  title: "Barney's Electric | Concept Preview",
  description:
    "Concept preview prepared by TenFour Systems for Barney's Electric in Rockwall, Texas. Not an official live site.",
  robots: { index: false, follow: false },
  alternates: { canonical: '/preview/barneys-electric' },
  openGraph: {
    title: "Barney's Electric | Concept Preview",
    description:
      "Concept preview prepared by TenFour Systems for Barney's Electric in Rockwall, Texas. Not an official live site.",
    url: '/preview/barneys-electric',
    siteName: "Barney's Electric",
    type: 'website',
    images: [
      {
        url: '/mockups/barneys-electric/barney-by-truck.jpg',
        width: 882,
        height: 739,
        alt: 'Barney Messenger beside his service truck in Rockwall, Texas.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Barney's Electric | Concept Preview",
    description:
      "Concept preview prepared by TenFour Systems for Barney's Electric in Rockwall, Texas. Not an official live site.",
    images: ['/mockups/barneys-electric/barney-by-truck.jpg'],
  },
}

export default function BarneysElectricPreviewPage() {
  return <PreviewSite />
}
