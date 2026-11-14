export type Locale = 'en' | 'es'

// One canonical host. Netlify serves the bare domain as primary and
// redirects www to it, so every absolute link uses the bare domain.
export const SITE_URL = 'https://tenfoursystems.com'

export function localeFromPathname(pathname: string): Locale {
  return pathname === '/es' || pathname.startsWith('/es/') ? 'es' : 'en'
}

/** Public URL for a site path. `path` is the English path, including `/`. */
export function lp(locale: Locale, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (locale === 'en') return normalized
  return normalized === '/' ? '/es' : `/es${normalized}`
}

export function barePath(pathname: string): string {
  const pathOnly = pathname.split('?')[0]?.split('#')[0] || '/'
  const withoutLocale = pathOnly.replace(/^\/es(?=\/|$)/, '') || '/'
  if (withoutLocale.length > 1 && withoutLocale.endsWith('/')) {
    return withoutLocale.slice(0, -1)
  }
  return withoutLocale
}

export function switchLocalePath(pathname: string, target: Locale): string {
  return lp(target, barePath(pathname))
}

export function absoluteUrl(locale: Locale, path: string): string {
  const localized = lp(locale, path)
  return localized === '/' ? SITE_URL : `${SITE_URL}${localized}`
}
