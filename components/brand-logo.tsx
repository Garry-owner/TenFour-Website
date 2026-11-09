'use client'

import Link from 'next/link'
import { useLocale } from '@/components/use-locale'
import { getCopy } from '@/lib/copy'
import { lp } from '@/lib/locale'
import { cn } from '@/lib/utils'

// The T4 mark drawn inline so it can follow the theme.
// The T uses the text color (white on dark, near black on light).
// The 4 is safety orange with a lighter orange on its highlight edges.
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
      <svg
        viewBox="50 170 330 254"
        width={44}
        height={34}
        className="h-9 w-11 shrink-0"
        aria-hidden="true"
        focusable="false"
      >
        <polygon
          className="fill-foreground"
          points="57.3,177.6 258.8,177.6 217.2,230 172,230 172,370.5 141.75,408 111.5,370.5 111.5,230 57.3,230"
        />
        <polygon
          fill="#ff6b1a"
          points="279.8,177.9 343.2,177.9 251.1,294 283,294 342.5,225 342.5,289.5 370.5,289.5 271.2,417.2 230.8,417.2 277.2,340.8 190.6,340.8 190.6,290.2"
        />
        <polygon fill="#ff9a4d" points="342.5,205.5 342.5,225 283,294 281.5,280.5" />
        <polygon fill="#ff9a4d" points="370.5,289.5 373,289.5 373,302.5 282.2,417.2 271.2,417.2" />
      </svg>
      {showWordmark && (
        <span className="hidden min-[380px]:flex flex-col leading-none">
          <span className="font-stencil text-[1.45rem] font-black tracking-[0.08em] text-foreground">
            TENFOUR
          </span>
          <span className="mt-0.5 font-dispatch text-[0.6rem] tracking-[0.5em] text-primary">
            SYSTEMS
          </span>
        </span>
      )}
    </Link>
  )
}
