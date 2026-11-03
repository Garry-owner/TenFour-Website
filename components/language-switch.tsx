'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { localeFromPathname, switchLocalePath } from '@/lib/locale'
import { getCopy } from '@/lib/copy'
import { cn } from '@/lib/utils'

export function LanguageSwitch({
  onNavigate,
  className,
}: {
  onNavigate?: () => void
  className?: string
}) {
  const pathname = usePathname() || '/'
  const locale = localeFromPathname(pathname)
  const t = getCopy(locale).chrome
  const enHref = switchLocalePath(pathname, 'en')
  const esHref = switchLocalePath(pathname, 'es')
  const item = 'rounded-sm px-1 py-1 transition-colors'
  const active = 'text-foreground'
  const idle = 'text-muted-foreground hover:text-foreground'

  return (
    <nav
      aria-label={t.language}
      className={cn(
        'inline-flex h-9 items-center rounded-md border border-border bg-card px-2 font-mono text-[0.7rem]',
        className,
      )}
    >
      {locale === 'en' ? (
        <span className={cn(item, active)} aria-current="page" lang="en">
          English
        </span>
      ) : (
        <Link
          href={enHref}
          hrefLang="en"
          lang="en"
          onClick={onNavigate}
          className={cn(item, idle)}
        >
          English
        </Link>
      )}
      <span className="px-1 text-muted-foreground/70" aria-hidden="true">
        /
      </span>
      {locale === 'es' ? (
        <span className={cn(item, active)} aria-current="page" lang="es">
          Español
        </span>
      ) : (
        <Link
          href={esHref}
          hrefLang="es"
          lang="es"
          onClick={onNavigate}
          className={cn(item, idle)}
        >
          Español
        </Link>
      )}
    </nav>
  )
}
