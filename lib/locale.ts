import type { Metadata } from "next"

export type Locale = "en" | "es"

export const BASE_URL = "https://www.tenfoursystems.com"

export function localeFromPathname(pathname: string): Locale {
  if (pathname === "/es" || pathname.startsWith("/es/")) return "es"
  return "en"
}

export function stripLocale(pathname: string): string {
  if (pathname === "/es") return "/"
  if (pathname.startsWith("/es/")) return pathname.slice(3)
  return pathname || "/"
}

export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href

  const hashIndex = href.indexOf("#")
  const queryIndex = href.indexOf("?")
  let cut = href.length
  if (hashIndex !== -1) cut = Math.min(cut, hashIndex)
  if (queryIndex !== -1) cut = Math.min(cut, queryIndex)

  const path = href.slice(0, cut)
  const suffix = href.slice(cut)
  const bare = stripLocale(path)

  if (locale === "en") return `${bare}${suffix}`
  if (bare === "/") return `/es${suffix}`
  return `/es${bare}${suffix}`
}

export function switchLocalePath(pathname: string): string {
  const locale = localeFromPathname(pathname)
  return localizeHref(stripLocale(pathname), locale === "es" ? "en" : "es")
}

export function absoluteUrl(path: string): string {
  if (path === "/") return BASE_URL
  return `${BASE_URL}${path}`
}

export function withHreflang(englishPath: string, locale: Locale, metadata: Metadata): Metadata {
  const localizedPath = localizeHref(englishPath, locale)
  const canonical = absoluteUrl(localizedPath)
  const enUrl = absoluteUrl(englishPath)
  const esUrl = absoluteUrl(localizeHref(englishPath, "es"))
  const title = typeof metadata.title === "string" ? metadata.title : undefined
  const description = typeof metadata.description === "string" ? metadata.description : undefined
  const openGraph = metadata.openGraph ?? {}
  const spanishSocial = locale === "es"

  return {
    ...metadata,
    alternates: {
      canonical,
      languages: {
        en: enUrl,
        es: esUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      ...openGraph,
      url: canonical,
      locale: spanishSocial ? "es_MX" : "en_US",
      ...(spanishSocial && title && !openGraph.title ? { title } : {}),
      ...(spanishSocial && description && !openGraph.description ? { description } : {}),
    },
    ...(spanishSocial
      ? {
          twitter: {
            card: "summary_large_image" as const,
            images: ["/og-image.png"],
            ...metadata.twitter,
            ...(title ? { title } : {}),
            ...(description ? { description } : {}),
          },
        }
      : {}),
  }
}
