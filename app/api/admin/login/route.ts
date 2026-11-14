import { NextResponse } from 'next/server'
import { clientIp, loginLimited } from '@/lib/admin/guard'
import { requestIsSecure } from '@/lib/admin/session'
import { createSessionToken, passwordMatches, SESSION_COOKIE, SESSION_SECONDS } from '@/lib/admin/session-token'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: Request) {
  if (loginLimited(clientIp(request))) {
    return NextResponse.json(
      { ok: false, message: 'Too many tries. Wait a few minutes and try again.' },
      { status: 429 },
    )
  }
  let password = ''
  try {
    const body = (await request.json()) as { password?: unknown }
    password = typeof body.password === 'string' ? body.password : ''
  } catch {
    password = ''
  }
  const result = await passwordMatches(password)
  if (result === 'locked') {
    return NextResponse.json(
      { ok: false, locked: true, message: 'The board is bolted. ADMIN_PASSWORD is not set on this deploy.' },
      { status: 503 },
    )
  }
  if (result !== 'ok') {
    return NextResponse.json(
      { ok: false, message: 'That password did not open the board.' },
      { status: 401 },
    )
  }
  const token = await createSessionToken()
  const response = NextResponse.json({ ok: true })
  response.cookies.set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: requestIsSecure(request),
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_SECONDS,
  })
  return response
}
