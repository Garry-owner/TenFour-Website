'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from '@/components/use-locale'
import { getCopy } from '@/lib/copy'
import { lp } from '@/lib/locale'
import { cn } from '@/lib/utils'

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
      <Image
        src="/tenfour-logo.png"
        alt={t.logoAlt}
        width={44}
        height={44}
        className="h-9 w-9 object-contain"
        priority
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
