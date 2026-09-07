import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

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
      <Image
        src="/tenfour-logo.png"
        alt="TenFour Systems logo"
        width={44}
        height={44}
        className="h-9 w-9 object-contain"
        priority
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
