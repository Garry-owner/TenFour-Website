import { NextResponse } from 'next/server'
import { matchPortal } from '@/lib/admin/desk-store'
import { boardErrorResponse, readJson } from '@/lib/admin/guard'
import { PORTAL_COOKIE, createPortalToken } from '@/lib/admin/portal-token'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await readJson(request)
    const phone = typeof body.phone === 'string' ? body.phone : ''
    const code = typeof body.code === 'string' ? body.code : ''
    const id = await matchPortal(phone, code)
    if (!id) {
      return NextResponse.json({ ok: false, message: 'That phone and code did not match. Nothing was opened.' }, { status: 401 })
    }
    const token = await createPortalToken(id)
    const response = NextResponse.json({ ok: true })
    response.cookies.set(PORTAL_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: new URL(request.url).protocol === 'https:',
      path: '/portal',
      maxAge: 14 * 24 * 60 * 60,
    })
    return response
  } catch (err) {
    return boardErrorResponse(err)
  }
}
