import Link from 'next/link'
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
  return (
    <Link
      href="/"
      className={cn('flex items-center gap-2.5', className)}
      aria-label="TenFour Systems home"
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
        <span className="flex flex-col leading-none">
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
