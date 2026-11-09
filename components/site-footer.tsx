'use client'

import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { SERVICE_AREAS } from '@/app/service-areas/data'
import { BrandLogo } from '@/components/brand-logo'
import { useLocale } from '@/components/use-locale'
import { getCopy } from '@/lib/copy'
import { lp } from '@/lib/locale'

export function SiteFooter() {
  const locale = useLocale()
  const t = getCopy(locale).chrome

  return (
    <footer className="dark border-t-[3px] border-primary bg-background text-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <BrandLogo />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{t.footerBlurb}</p>
          <p className="font-condensed text-lg font-extrabold uppercase tracking-[0.03em] text-primary">{t.footerTagline}</p>
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {t.navigate}
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              ...t.nav,
              { path: '/contact', label: t.bookDemo },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  href={lp(locale, item.path)}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {t.coverage}
          </h3>
          <ul className="space-y-2 text-sm">
            {SERVICE_AREAS.map((area) => (
              <li key={area.slug}>
                <Link
                  href={lp(locale, `/service-areas/${area.slug}`)}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t.tradeIn(locale === 'es' ? area.tradeEs : area.trade, area.city)}
                </Link>
              </li>
            ))}
          </ul>
          <p className="pt-1 text-xs text-muted-foreground">{t.coverageNote}</p>
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {t.contact}
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
            © {new Date().getFullYear()} TenFour Systems. {t.rights}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={lp(locale, '/privacy')}
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              {t.privacy}
            </Link>
            <Link
              href={lp(locale, '/terms')}
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              {t.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
