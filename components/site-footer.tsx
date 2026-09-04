import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <BrandLogo />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            The 24/7 AI dispatcher for home service businesses. We answer, qualify, and book so no
            call goes unanswered.
          </p>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            We work the second shift so you don&apos;t have to.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Navigate
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { href: '/how-it-works', label: 'How It Works' },
              { href: '/pricing', label: 'Pricing' },
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Book a Demo' },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Contact
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
                href="tel:+12312182360"
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone className="h-4 w-4 text-primary" />
                (231) 218 2360
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
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 sm:flex-row sm:px-6">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} TenFour Systems. All rights reserved.
          </p>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Status: <span className="text-[var(--signal)]">Operational</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
