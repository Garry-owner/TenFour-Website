"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Mail, MapPin, Phone } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"
import { serviceAreaCopy, SERVICE_AREAS } from "@/app/service-areas/data"
import { localeFromPathname, localizeHref, type Locale } from "@/lib/locale"
import { FOOTER_NAV } from "@/lib/nav"

const COPY: Record<
  Locale,
  {
    blurb: string
    slogan: string
    navigate: string
    coverage: string
    coverageNote: string
    contact: string
    rights: string
    privacy: string
    terms: string
    status: string
    operational: string
  }
> = {
  en: {
    blurb:
      "The 24/7 AI dispatcher for home service businesses. We catch every missed call and text back so no lead goes cold.",
    slogan: "We work the second shift so you don't have to.",
    navigate: "Navigate",
    coverage: "Featured Coverage",
    coverageNote: "Serving every trade across the full DFW metroplex.",
    contact: "Contact",
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    status: "Status",
    operational: "Operational",
  },
  es: {
    blurb:
      "El despachador con IA las 24 horas para negocios de servicios del hogar. Captamos cada llamada perdida y respondemos por texto para que ningún prospecto se enfríe.",
    slogan: "Trabajamos el segundo turno para que tú no tengas que hacerlo.",
    navigate: "Navegar",
    coverage: "Cobertura destacada",
    coverageNote: "Atendemos todos los oficios en todo el metroplex de DFW.",
    contact: "Contacto",
    rights: "Todos los derechos reservados.",
    privacy: "Política de privacidad",
    terms: "Términos de servicio",
    status: "Estado",
    operational: "En operación",
  },
}

export function SiteFooter() {
  const pathname = usePathname() || "/"
  const locale = localeFromPathname(pathname)
  const copy = COPY[locale]
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <BrandLogo />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{copy.blurb}</p>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">{copy.slogan}</p>
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {copy.navigate}
          </h3>
          <ul className="space-y-2 text-sm">
            {FOOTER_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={localizeHref(item.href, locale)}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {copy.coverage}
          </h3>
          <ul className="space-y-2 text-sm">
            {SERVICE_AREAS.map((area) => (
              <li key={area.slug}>
                <Link
                  href={localizeHref(`/service-areas/${area.slug}`, locale)}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {serviceAreaCopy(area, locale).footerLabel}
                </Link>
              </li>
            ))}
          </ul>
          <p className="pt-1 text-xs text-muted-foreground">{copy.coverageNote}</p>
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {copy.contact}
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="mailto:garry@tenfoursystems.com"
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4 text-primary" />
                garry@tenfoursystems.com
              </a>
            </li>
            <li>
              <a
                href="tel:+19723495808"
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone className="h-4 w-4 text-primary" />
                (972) 349 5808
              </a>
            </li>
            <li className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              Terrell, Texas
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6">
          <p className="font-mono text-xs text-muted-foreground">
            © {year} TenFour Systems. {copy.rights}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={localizeHref("/privacy", locale)}
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              {copy.privacy}
            </Link>
            <Link
              href={localizeHref("/terms", locale)}
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              {copy.terms}
            </Link>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {copy.status}: <span className="text-[var(--signal)]">{copy.operational}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
