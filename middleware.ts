import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { localeFromPathname } from '@/lib/locale'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const locale = localeFromPathname(pathname)
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-locale', locale)
  requestHeaders.set('x-pathname', pathname)
  const adminPage = pathname === '/admin' || pathname.startsWith('/admin/')
  requestHeaders.set('x-admin', adminPage ? '1' : '0')

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })
  response.headers.set('Content-Language', locale)
  if (adminPage || pathname.startsWith('/api/admin')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    response.headers.set('Cache-Control', 'private, no-store')
  }
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\..*).*)'],
}
