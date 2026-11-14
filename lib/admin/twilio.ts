import { fetchTimeout } from '@/lib/admin/guard'

function basic(): { sid: string; header: string } | null {
  const sid = process.env.TWILIO_ACCOUNT_SID || ''
  const key = process.env.TWILIO_API_KEY || ''
  const secret = process.env.TWILIO_API_SECRET || ''
  const token = process.env.TWILIO_AUTH_TOKEN || ''
  if (!/^AC[0-9a-f]{32}$/i.test(sid)) return null
  if (/^SK[0-9a-f]{32}$/i.test(key) && secret) {
    return { sid, header: `Basic ${btoa(`${key}:${secret}`)}` }
  }
  if (token) return { sid, header: `Basic ${btoa(`${sid}:${token}`)}` }
  return null
}

export function twilioConfigured(): boolean {
  return Boolean(process.env.TWILIO_ACCOUNT_SID && (process.env.TWILIO_AUTH_TOKEN || process.env.TWILIO_API_SECRET))
}

export async function twilioLamp(): Promise<{ state: 'ready' | 'missing' | 'fault'; detail: string }> {
  if (!twilioConfigured()) {
    return { state: 'missing', detail: 'Twilio read credentials are not set.' }
  }
  const auth = basic()
  if (!auth) return { state: 'fault', detail: 'Twilio credentials are incomplete.' }
  try {
    const response = await fetchTimeout(`https://api.twilio.com/2010-04-01/Accounts/${auth.sid}.json`, {
      headers: { Authorization: auth.header },
    })
    if (!response.ok) return { state: 'fault', detail: 'Twilio refused the account read.' }
    const json = (await response.json().catch(() => null)) as { friendly_name?: string } | null
    return { state: 'ready', detail: json?.friendly_name || 'Twilio account read succeeded.' }
  } catch {
    return { state: 'fault', detail: 'Twilio could not be reached.' }
  }
}
