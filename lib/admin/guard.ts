import { NextResponse } from 'next/server'
import { readCookie } from '@/lib/admin/session'
import { SESSION_COOKIE, verifySessionToken } from '@/lib/admin/session-token'

export class BoardError extends Error {
  constructor(
    message: string,
    readonly code: 'zoho' | 'make' | 'store' | 'input' | 'twilio',
  ) {
    super(message)
  }
}

export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin')
  if (!origin) return false
  let originHost = ''
  try {
    originHost = new URL(origin).host
  } catch {
    return false
  }
  const host = (request.headers.get('x-forwarded-host') || request.headers.get('host') || '')
    .split(',')[0]
    ?.trim()
  return Boolean(host) && originHost === host
}

export async function guardAdmin(request: Request, mutation = false): Promise<NextResponse | null> {
  if (mutation && !sameOrigin(request)) {
    return NextResponse.json(
      { ok: false, message: 'That request did not come from the board.' },
      { status: 403 },
    )
  }
  const ok = await verifySessionToken(readCookie(request, SESSION_COOKIE))
  if (!ok) {
    return NextResponse.json({ ok: false, message: 'The board is locked.' }, { status: 401 })
  }
  return null
}

export async function readJson(request: Request, max = 20_000): Promise<Record<string, unknown>> {
  const declared = Number(request.headers.get('content-length') || '0')
  if (declared > max) throw new BoardError('That is too long to save.', 'input')
  const text = await request.text()
  if (text.length > max) throw new BoardError('That is too long to save.', 'input')
  try {
    const parsed = JSON.parse(text) as unknown
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new BoardError('The board could not read that.', 'input')
    }
    return parsed as Record<string, unknown>
  } catch (err) {
    if (err instanceof BoardError) throw err
    throw new BoardError('The board could not read that.', 'input')
  }
}

export function boardErrorResponse(err: unknown) {
  if (err instanceof BoardError) {
    const status = err.code === 'input' ? 400 : err.code === 'store' ? 503 : 502
    return NextResponse.json({ ok: false, message: err.message }, { status })
  }
  return NextResponse.json({ ok: false, message: 'The board could not finish that.' }, { status: 500 })
}

export function asString(value: unknown, max = 500): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

export function asBoolean(value: unknown): boolean {
  return value === true || value === 'true' || value === 'on' || value === 'yes'
}

const hits = new Map<string, number[]>()

export function loginLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((time) => now - time < 15 * 60 * 1000)
  if (recent.length >= 8) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  return false
}

export function clientIp(request: Request): string {
  const netlify = request.headers.get('x-nf-client-connection-ip')
  if (netlify) return netlify
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown'
  return 'unknown'
}

export async function fetchTimeout(url: string, init: RequestInit = {}, ms = 8000): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), ms)
  try {
    return await fetch(url, { ...init, signal: controller.signal, cache: 'no-store' })
  } finally {
    clearTimeout(timer)
  }
}
