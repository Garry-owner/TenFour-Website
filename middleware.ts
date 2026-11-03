import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { localeFromPathname } from '@/lib/locale'

export function middleware(request: NextRequest) {
  const locale = localeFromPathname(request.nextUrl.pathname)
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-locale', locale)

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })
  response.headers.set('Content-Language', locale)
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\..*).*)'],
}
