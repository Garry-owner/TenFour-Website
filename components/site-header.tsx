'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { CtaButton } from '@/components/cta-button'
import { LanguageSwitch } from '@/components/language-switch'
import { ThemeToggle } from '@/components/theme-toggle'
import { useLocale } from '@/components/use-locale'
import { getCopy } from '@/lib/copy'
import { lp } from '@/lib/locale'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const pathname = usePathname()
  const locale = useLocale()
  const t = getCopy(locale).chrome
  const [open, setOpen] = useState(false)
  const desktop = locale === 'es' ? 'hidden xl:flex' : 'hidden lg:flex'
  const compact = locale === 'es' ? 'flex xl:hidden' : 'flex lg:hidden'

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header id="site-header" className="sticky top-0 z-50 border-b-[3px] border-primary bg-background text-foreground">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <BrandLogo />

        <nav className={cn('shrink-0 items-center gap-1', desktop)}>
          {t.nav.map((item) => {
            const href = lp(locale, item.path)
            const active = pathname === href
            return (
              <Link
                key={item.path}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'border-b-2 border-transparent transition-colors',
                  locale === 'es'
                    ? 'whitespace-nowrap px-2 py-2 font-condensed text-base font-bold uppercase tracking-[0.05em]'
                    : 'whitespace-nowrap px-2 py-2 font-condensed text-[1.05rem] font-bold uppercase tracking-[0.06em] lg:px-3',
                  active ? 'border-primary text-primary' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className={cn('shrink-0 items-center gap-3', desktop)}>
          <LanguageSwitch />
          <ThemeToggle />
          <CtaButton href={lp(locale, '/contact')} size="default">
            {t.bookDemo}
          </CtaButton>
        </div>

        <div className={cn('items-center gap-2', compact)}>
          <LanguageSwitch short />
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center bg-[#ff6b1a] text-[#0f1011] transition-colors hover:bg-[#ff812e]"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.closeMenu : t.openMenu}
            aria-expanded={open}
            aria-controls="site-menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="site-menu"
          className={cn('border-t border-border bg-background', locale === 'es' ? 'xl:hidden' : 'lg:hidden')}
        >
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {t.nav.map((item) => {
              const href = lp(locale, item.path)
              return (
                <Link
                  key={item.path}
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === href ? 'page' : undefined}
                  className={cn(
                    'border-b border-dashed border-border px-3 py-3 font-condensed text-2xl font-extrabold uppercase tracking-[0.05em] transition-colors hover:text-foreground',
                    pathname === href ? 'border-l-4 border-l-primary bg-secondary text-primary' : 'text-muted-foreground',
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
            <div className="px-1 py-2">
              <LanguageSwitch
                onNavigate={() => setOpen(false)}
                className="h-11 w-full justify-center text-sm"
              />
            </div>
            <CtaButton href={lp(locale, '/contact')} className="mt-2 w-full" onClick={() => setOpen(false)}>
              {t.bookDemo}
            </CtaButton>
          </nav>
        </div>
      )}
    </header>
  )
}
