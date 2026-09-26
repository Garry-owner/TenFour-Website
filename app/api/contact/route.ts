import { NextRequest, NextResponse } from 'next/server'
import {
  GLOBAL_LIMIT,
  GLOBAL_WINDOW_MS,
  MAX_BODY_BYTES,
  PER_IP_LIMIT,
  PER_IP_WINDOW_MS,
  RateLimiter,
  getClientIp,
  isAllowedOrigin,
  validatePayload,
} from '@/lib/contact-guard'

// The Make.com webhook address. This address is treated as public: it is
// visible in the GitHub repo history. What actually protects the webhook is an
// API key that Make.com requires in the x-make-apikey header. That key lives
// only in the Netlify environment variable MAKE_WEBHOOK_API_KEY and must never
// be written in the code. MAKE_WEBHOOK_URL can override the address if needed.
const FALLBACK_WEBHOOK_URL = 'https://hook.us2.make.com/7jbyj4l1ysf5l6ompdzabl47l2p752lq'

const ipLimiter = new RateLimiter(PER_IP_LIMIT, PER_IP_WINDOW_MS)
const globalLimiter = new RateLimiter(GLOBAL_LIMIT, GLOBAL_WINDOW_MS)

const WEBHOOK_TIMEOUT_MS = 8000

function blocked(status: number, reason: string, extraHeaders?: Record<string, string>) {
  console.warn('contact route blocked a request: ' + reason)
  return NextResponse.json({ success: false }, { status, headers: extraHeaders })
}

export async function POST(request: NextRequest) {
  try {
    // 1. Only accept posts that come from this site (browsers always send Origin).
    if (!isAllowedOrigin(request.headers.get('origin'), request.headers.get('referer'))) {
      return blocked(403, 'origin_not_allowed')
    }

    // 2. Refuse oversized bodies before reading them.
    const declaredLength = Number(request.headers.get('content-length') || '0')
    if (declaredLength > MAX_BODY_BYTES) {
      return blocked(413, 'body_too_large')
    }
    const rawText = await request.text()
    if (Buffer.byteLength(rawText, 'utf8') > MAX_BODY_BYTES) {
      return blocked(413, 'body_too_large')
    }

    let parsed: unknown
    try {
      parsed = JSON.parse(rawText)
    } catch {
      return blocked(400, 'body_not_json')
    }

    // 3. Honeypot check: real visitors never see or fill this field.
    // If it has a value, silently pretend success without forwarding to Make.com.
    if (
      parsed &&
      typeof parsed === 'object' &&
      (parsed as Record<string, unknown>).company_website
    ) {
      return NextResponse.json({ success: true })
    }

    // 4. Rate limits. If this step ever throws, let the request continue so a
    // bug here can never drop a real lead.
    try {
      if (!globalLimiter.allow('all')) {
        return blocked(429, 'global_rate_limit', { 'Retry-After': '600' })
      }
      const ip = getClientIp(request.headers)
      if (ip && !ipLimiter.allow(ip)) {
        return blocked(429, 'ip_rate_limit', { 'Retry-After': '600' })
      }
    } catch (limitError) {
      console.error('contact route rate limiter error, continuing', limitError)
    }

    // 5. Keep only the known fields and check each one.
    const result = validatePayload(parsed)
    if (!result.ok) {
      return blocked(400, result.reason)
    }

    // 6. Forward the cleaned payload to Make.com.
    const webhookUrl = process.env.MAKE_WEBHOOK_URL || FALLBACK_WEBHOOK_URL
    const webhookHeaders: Record<string, string> = { 'Content-Type': 'application/json' }
    const apiKey = process.env.MAKE_WEBHOOK_API_KEY
    if (apiKey) {
      webhookHeaders['x-make-apikey'] = apiKey
    } else {
      console.error('contact route: MAKE_WEBHOOK_API_KEY is not set')
    }
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS)
    let res: Response
    try {
      res = await fetch(webhookUrl, {
        method: 'POST',
        headers: webhookHeaders,
        body: JSON.stringify(result.payload),
        signal: controller.signal,
      })
    } finally {
      clearTimeout(timer)
    }

    if (!res.ok) {
      throw new Error('Webhook request failed')
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
