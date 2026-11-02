import type { Locale } from "@/lib/locale"

export type NavItem = {
  href: string
  label: Record<Locale, string>
}

export const PRIMARY_NAV: NavItem[] = [
  { href: "/how-it-works", label: { en: "How It Works", es: "Cómo funciona" } },
  { href: "/pricing", label: { en: "Pricing", es: "Precios" } },
  { href: "/about", label: { en: "About", es: "Nosotros" } },
  { href: "/roger", label: { en: "Meet Roger", es: "Conoce a Roger" } },
  { href: "/faq", label: { en: "FAQ", es: "Preguntas" } },
]

export const FOOTER_NAV: NavItem[] = [
  ...PRIMARY_NAV,
  { href: "/contact", label: { en: "Book a Demo", es: "Reservar una demo" } },
]
