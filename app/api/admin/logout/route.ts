import { NextResponse } from 'next/server'
import { guardAdmin } from '@/lib/admin/guard'
import { requestIsSecure } from '@/lib/admin/session'
import { SESSION_COOKIE } from '@/lib/admin/session-token'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: Request) {
  const denied = await guardAdmin(request, true)
  if (denied) return denied
  const response = NextResponse.json({ ok: true })
  response.cookies.set({
    name: SESSION_COOKIE,
    value: '',
    httpOnly: true,
    secure: requestIsSecure(request),
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  return response
}
