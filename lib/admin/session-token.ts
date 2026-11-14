export const SESSION_COOKIE = 'tenfour_admin'
export const SESSION_SECONDS = 14 * 24 * 60 * 60

const text = new TextEncoder()

function sessionSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || null
}

function bytesToB64Url(bytes: ArrayBuffer): string {
  const view = new Uint8Array(bytes)
  let binary = ''
  for (const byte of view) binary += String.fromCharCode(byte)
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/g, '')
}

function b64UrlToBytes(value: string): Uint8Array | null {
  try {
    const padded = value + '='.repeat((4 - (value.length % 4)) % 4)
    const binary = atob(padded.replaceAll('-', '+').replaceAll('_', '/'))
    const out = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i)
    return out
  } catch {
    return null
  }
}

async function hmacKey(secret: string, usages: KeyUsage[]) {
  const digest = await crypto.subtle.digest('SHA-256', text.encode(secret))
  return crypto.subtle.importKey('raw', digest, { name: 'HMAC', hash: 'SHA-256' }, false, usages)
}

export async function createSessionToken(now = Date.now()): Promise<string> {
  const secret = sessionSecret()
  if (!secret || !process.env.ADMIN_PASSWORD) {
    throw new Error('locked')
  }
  const exp = Math.floor(now / 1000) + SESSION_SECONDS
  const payload = `v1.${exp}`
  const key = await hmacKey(secret, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', key, text.encode(payload))
  return `${payload}.${bytesToB64Url(sig)}`
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  const secret = sessionSecret()
  if (!token || !secret || !process.env.ADMIN_PASSWORD) return false
  const parts = token.split('.')
  if (parts.length !== 3 || parts[0] !== 'v1') return false
  const exp = Number(parts[1])
  if (!Number.isFinite(exp) || exp * 1000 <= Date.now()) return false
  const sig = b64UrlToBytes(parts[2])
  if (!sig) return false
  const key = await hmacKey(secret, ['verify'])
  const payload = text.encode(`v1.${parts[1]}`)
  const copy = new Uint8Array(sig.byteLength)
  copy.set(sig)
  return crypto.subtle.verify('HMAC', key, copy, payload)
}

export async function passwordMatches(input: string): Promise<'ok' | 'wrong' | 'locked'> {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return 'locked'
  if (!input || input.length > 200) return 'wrong'
  const [left, right] = await Promise.all([
    crypto.subtle.digest('SHA-256', text.encode(input)),
    crypto.subtle.digest('SHA-256', text.encode(expected)),
  ])
  const a = new Uint8Array(left)
  const b = new Uint8Array(right)
  if (a.length !== b.length) return 'wrong'
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i]
  return diff === 0 ? 'ok' : 'wrong'
}
