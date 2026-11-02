"use client"

import { usePathname } from "next/navigation"
import { localeFromPathname } from "@/lib/locale"

export function SkipLink() {
  const pathname = usePathname() || "/"
  const locale = localeFromPathname(pathname)

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
    >
      {locale === "es" ? "Saltar al contenido" : "Skip to content"}
    </a>
  )
}
