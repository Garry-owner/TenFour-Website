// Guard rails for the public contact form API route (app/api/contact/route.ts).
//
// Why this exists: the route is public, so anyone who finds it can post to it
// directly and bypass the form. These checks keep junk, oversized bodies, and
// floods from reaching Make.com, Zoho, and Twilio.
//
// Design rules:
// 1. A real visitor filling in the real form must always get through.
// 2. If any guard step throws an unexpected error, the caller lets the request
//    continue (fail open), so a bug here can never silently drop a real lead.
// 3. No new dependencies.
//
// Known limit: the rate limiter keeps its counts in memory, so each serverless
// instance counts on its own. It stops casual floods but is not airtight. A
// challenge such as Cloudflare Turnstile is the stronger next step.

export const MAX_BODY_BYTES = 8 * 1024

const ALLOWED_TIMEZONES = ['Eastern', 'Central', 'Mountain', 'Pacific']

// Hosts allowed to post to the route from a browser.
const ALLOWED_HOSTS = [
  'tenfoursystems.com',
  'www.tenfoursystems.com',
  'tenfour-systems-site.netlify.app',
  'main--tenfour-systems-site.netlify.app',
  'localhost',
  '127.0.0.1',
]

// Per IP: at most PER_IP_LIMIT submissions in PER_IP_WINDOW_MS.
export const PER_IP_LIMIT = 5
export const PER_IP_WINDOW_MS = 10 * 60 * 1000

// Per serverless instance: a broad ceiling so a flood cannot run unbounded.
export const GLOBAL_LIMIT = 200
export const GLOBAL_WINDOW_MS = 60 * 60 * 1000

export type CleanPayload = {
  company_website: string
  'First name': string
  'Last name': string
  Phone: string
  'Email Address': string
  Message: string
  Fax: string
  consent_check?: string
}

export type ValidationResult =
  | { ok: true; payload: CleanPayload }
  | { ok: false; reason: string }

// Returns true when the request should be allowed based on where it came from.
// A missing Origin and Referer is allowed (some privacy tools strip both), so a
// real visitor is never blocked by this check alone.
export function isAllowedOrigin(origin: string | null, referer: string | null): boolean {
  const source = origin || referer
  if (!source) return true
  try {
    const host = new URL(source).hostname.toLowerCase()
    return ALLOWED_HOSTS.includes(host)
  } catch {
    return false
  }
}

function asTrimmedString(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

// Keeps only the fields the form really sends, checks each one, and returns a
// clean copy. Anything else in the body is dropped.
export function validatePayload(raw: unknown): ValidationResult {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { ok: false, reason: 'body_not_object' }
  }
  const body = raw as Record<string, unknown>

  const firstName = asTrimmedString(body['First name'], 60)
  const lastName = asTrimmedString(body['Last name'], 60)
  const phone = asTrimmedString(body['Phone'], 30)
  const email = asTrimmedString(body['Email Address'], 120)
  const message = asTrimmedString(body['Message'], 1000)
  const timezone = asTrimmedString(body['Fax'], 20)

  if (!firstName) return { ok: false, reason: 'first_name_missing' }
  if (!lastName) return { ok: false, reason: 'last_name_missing' }

  const phoneDigits = phone.replace(/\D/g, '')
  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    return { ok: false, reason: 'phone_invalid' }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, reason: 'email_invalid' }
  }

  if (!ALLOWED_TIMEZONES.includes(timezone)) {
    return { ok: false, reason: 'timezone_invalid' }
  }

  const clean: CleanPayload = {
    company_website: '',
    'First name': firstName,
    'Last name': lastName,
    Phone: phone,
    'Email Address': email,
    Message: message,
    Fax: timezone,
  }

  // Only present when the box was ticked, exactly like the real form, because
  // the Make.com scenario treats a missing value as no consent.
  if (body['consent_check'] === 'on') {
    clean.consent_check = 'on'
  }

  return { ok: true, payload: clean }
}

// Simple in-memory sliding window counter.
export class RateLimiter {
  private hits = new Map<string, number[]>()

  constructor(
    private limit: number,
    private windowMs: number,
  ) {}

  // Records a hit and returns true if it is within the limit.
  allow(key: string, now: number = Date.now()): boolean {
    const cutoff = now - this.windowMs
    const recent = (this.hits.get(key) || []).filter((t) => t > cutoff)
    if (recent.length >= this.limit) {
      this.hits.set(key, recent)
      return false
    }
    recent.push(now)
    this.hits.set(key, recent)
    this.prune(cutoff)
    return true
  }

  // Keeps the map from growing forever.
  private prune(cutoff: number) {
    if (this.hits.size < 500) return
    for (const [key, times] of this.hits) {
      if (times.every((t) => t <= cutoff)) this.hits.delete(key)
    }
  }
}

// Best guess at the visitor address. Returns an empty string when unknown, and
// the caller then skips the per-IP check instead of lumping everyone together.
export function getClientIp(headers: Headers): string {
  const netlify = headers.get('x-nf-client-connection-ip')
  if (netlify) return netlify.trim()
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return ''
}
