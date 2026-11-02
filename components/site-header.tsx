"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"
import { CtaButton } from "@/components/cta-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { localeFromPathname, localizeHref, switchLocalePath, type Locale } from "@/lib/locale"
import { PRIMARY_NAV } from "@/lib/nav"
import { cn } from "@/lib/utils"

const COPY: Record<
  Locale,
  { live: string; book: string; open: string; close: string; language: string }
> = {
  en: {
    live: "Live",
    book: "Book a Demo",
    open: "Open menu",
    close: "Close menu",
    language: "Español",
  },
  es: {
    live: "En vivo",
    book: "Reservar una demo",
    open: "Abrir menú",
    close: "Cerrar menú",
    language: "English",
  },
}

export function SiteHeader() {
  const pathname = usePathname() || "/"
  const locale = localeFromPathname(pathname)
  const copy = COPY[locale]
  const otherHref = switchLocalePath(pathname)
  const [open, setOpen] = useState(false)

  const languageLink = (
    <Link
      href={otherHref}
      hrefLang={locale === "es" ? "en" : "es"}
      onClick={() => setOpen(false)}
      className="whitespace-nowrap rounded-md px-3 py-2 font-mono text-xs uppercase tracking-widest text-primary transition-colors hover:text-foreground"
    >
      {copy.language}
    </Link>
  )

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <BrandLogo />

        <nav className="hidden items-center gap-1 xl:flex">
          {PRIMARY_NAV.map((item) => {
            const href = localizeHref(item.href, locale)
            const active = pathname === href
            return (
              <Link
                key={item.href}
                href={href}
                className={cn(
                  "whitespace-nowrap rounded-md px-3 py-2 font-mono text-xs uppercase tracking-widest transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label[locale]}
              </Link>
            )
          })}
          {languageLink}
        </nav>

        <div className="hidden items-center gap-4 xl:flex">
          <span className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-2 w-2 rounded-full bg-[var(--signal)] animate-signal" />
            </span>
            {copy.live}
          </span>
          <ThemeToggle />
          <CtaButton href={localizeHref("/contact", locale)} size="sm">
            {copy.book}
          </CtaButton>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <Link
            href={otherHref}
            hrefLang={locale === "es" ? "en" : "es"}
            className="rounded-md px-2 py-2 font-mono text-xs uppercase tracking-widest text-primary"
          >
            {copy.language}
          </Link>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? copy.close : copy.open}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background xl:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {PRIMARY_NAV.map((item) => {
              const href = localizeHref(item.href, locale)
              return (
                <Link
                  key={item.href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-3 font-mono text-sm uppercase tracking-widest",
                    pathname === href ? "bg-secondary text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.label[locale]}
                </Link>
              )
            })}
            <Link
              href={otherHref}
              hrefLang={locale === "es" ? "en" : "es"}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 font-mono text-sm uppercase tracking-widest text-primary"
            >
              {copy.language}
            </Link>
            <CtaButton href={localizeHref("/contact", locale)} className="mt-2 w-full">
              {copy.book}
            </CtaButton>
          </nav>
        </div>
      )}
    </header>
  )
}
