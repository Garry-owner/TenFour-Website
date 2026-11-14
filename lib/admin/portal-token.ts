const text = new TextEncoder()
export const PORTAL_COOKIE = 'tenfour_portal'

function secret(): string | null {
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
    for (let i = 0; i < binary.length; i += 1) out[i] = binary.charCodeAt(i)
    return out
  } catch {
    return null
  }
}

async function key(usages: KeyUsage[]) {
  const value = secret()
  if (!value) return null
  const digest = await crypto.subtle.digest('SHA-256', text.encode(value))
  return crypto.subtle.importKey('raw', digest, { name: 'HMAC', hash: 'SHA-256' }, false, usages)
}

export async function createPortalToken(clientId: string, now = Date.now()): Promise<string> {
  const hmac = await key(['sign'])
  if (!hmac) throw new Error('locked')
  const exp = Math.floor(now / 1000) + 14 * 24 * 60 * 60
  const payload = `p1.${clientId}.${exp}`
  const sig = await crypto.subtle.sign('HMAC', hmac, text.encode(payload))
  return `${payload}.${bytesToB64Url(sig)}`
}

export async function readPortalToken(token: string | undefined, now = Date.now()): Promise<string | null> {
  if (!token) return null
  const parts = token.split('.')
  if (parts.length !== 4 || parts[0] !== 'p1') return null
  const exp = Number(parts[2])
  if (!Number.isFinite(exp) || exp * 1000 < now) return null
  const hmac = await key(['verify'])
  if (!hmac) return null
  const sig = b64UrlToBytes(parts[3])
  if (!sig) return null
  const payload = `p1.${parts[1]}.${parts[2]}`
  const ok = await crypto.subtle.verify('HMAC', hmac, sig, text.encode(payload))
  return ok ? parts[1] : null
}

export async function signMark(clientId: string, caller: string, now = Date.now()): Promise<string> {
  const hmac = await key(['sign'])
  if (!hmac) throw new Error('locked')
  const exp = Math.floor(now / 1000) + 7 * 24 * 60 * 60
  const payload = `m1.${clientId}.${caller}.${exp}`
  const sig = await crypto.subtle.sign('HMAC', hmac, text.encode(payload))
  return `${payload}.${bytesToB64Url(sig)}`
}

export async function readMark(token: string): Promise<{ clientId: string; caller: string } | null> {
  const parts = token.split('.')
  if (parts.length !== 5 || parts[0] !== 'm1') return null
  const exp = Number(parts[3])
  if (!Number.isFinite(exp) || exp * 1000 < Date.now()) return null
  const hmac = await key(['verify'])
  if (!hmac) return null
  const sig = b64UrlToBytes(parts[4])
  if (!sig) return null
  const payload = `m1.${parts[1]}.${parts[2]}.${parts[3]}`
  const ok = await crypto.subtle.verify('HMAC', hmac, sig, text.encode(payload))
  return ok ? { clientId: parts[1], caller: decodeURIComponent(parts[2]) } : null
}
