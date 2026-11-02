"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { localeFromPathname, localizeHref } from "@/lib/locale"
import { cn } from "@/lib/utils"

export function BrandLogo({
  className,
  showWordmark = true,
}: {
  className?: string
  showWordmark?: boolean
}) {
  const pathname = usePathname() || "/"
  const locale = localeFromPathname(pathname)

  return (
    <Link
      href={localizeHref("/", locale)}
      className={cn("flex items-center gap-2.5", className)}
      aria-label={locale === "es" ? "Inicio de TenFour Systems" : "TenFour Systems home"}
    >
      <Image
        src="/tenfour-logo.png"
        alt={locale === "es" ? "Logotipo de TenFour Systems" : "TenFour Systems logo"}
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
          <span className="font-mono text-[0.6rem] tracking-[0.42em] text-primary">SYSTEMS</span>
        </span>
      )}
    </Link>
  )
}
