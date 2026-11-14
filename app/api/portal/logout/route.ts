import { NextResponse } from 'next/server'
import { PORTAL_COOKIE } from '@/lib/admin/portal-token'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL('/portal', request.url), 303)
  response.cookies.set(PORTAL_COOKIE, '', { httpOnly: true, path: '/portal', maxAge: 0 })
  return response
}
