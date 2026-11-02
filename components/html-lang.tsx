"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { localeFromPathname } from "@/lib/locale"

export function HtmlLang() {
  const pathname = usePathname() || "/"

  useEffect(() => {
    document.documentElement.lang = localeFromPathname(pathname) === "es" ? "es" : "en"
  }, [pathname])

  return null
}
