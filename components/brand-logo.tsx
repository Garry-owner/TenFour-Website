'use client'

import Link from 'next/link'
import { useLocale } from '@/components/use-locale'
import { getCopy } from '@/lib/copy'
import { lp } from '@/lib/locale'
import { cn } from '@/lib/utils'

// Lockups include the wordmark under the mark. The component already
// renders a theme-colored wordmark, so frame just the T4 (same viewBox
// as the mark-only logo) from each lockup file.
const MARK_VIEW = '#svgView(viewBox(50,170,330,254))'

export function BrandLogo({
  className,
  showWordmark = true,
}: {
  className?: string
  showWordmark?: boolean
}) {
  const locale = useLocale()
  const t = getCopy(locale).chrome

  return (
    <Link
      href={lp(locale, '/')}
      className={cn('flex shrink-0 items-center gap-2.5', className)}
      aria-label={t.homeLabel}
    >
      <img
        src={`/tenfour-lockup.svg${MARK_VIEW}`}
        alt=""
        width={44}
        height={34}
        className="h-9 w-9 object-contain dark:hidden"
      />
      <img
        src={`/tenfour-lockup-white.svg${MARK_VIEW}`}
        alt=""
        width={44}
        height={34}
        className="hidden h-9 w-9 object-contain dark:block"
      />
      {showWordmark && (
        <span className="hidden min-[380px]:flex flex-col leading-none">
          <span className="font-mono text-sm font-bold tracking-[0.18em] text-foreground">
            TENFOUR
          </span>
          <span className="font-mono text-[0.6rem] tracking-[0.42em] text-primary">
            SYSTEMS
          </span>
        </span>
      )}
    </Link>
  )
}
