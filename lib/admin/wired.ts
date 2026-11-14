import { BoardError, fetchTimeout } from '@/lib/admin/guard'
import { phoneKey } from '@/lib/admin/policies'
import { twilioConfigured } from '@/lib/admin/twilio'

export function wires() {
  const sid = process.env.TWILIO_ACCOUNT_SID || ''
  const token = process.env.TWILIO_AUTH_TOKEN || ''
  const senders = (process.env.TWILIO_SENDERS || '')
    .split(',')
    .map((item) => phoneKey(item))
    .filter((item) => item.length >= 10)
  return {
    email: Boolean(process.env.SENDGRID_API_KEY && process.env.REPORT_FROM_EMAIL),
    sms: senders.length > 0 && /^AC[0-9a-f]{32}$/i.test(sid) && Boolean(token),
    test: Boolean(process.env.ROGER_TEST_URL),
    resend: Boolean(process.env.LEAD_RESEND_URL),
    backup: process.env.NIGHTLY_BACKUP === 'ok' ? ('ready' as const) : ('missing' as const),
    twilioRead: twilioConfigured(),
    senders,
  }
}

export async function sendEmail(to: string, subject: string, text: string): Promise<void> {
  const key = process.env.SENDGRID_API_KEY
  const from = process.env.REPORT_FROM_EMAIL
  if (!key || !from) throw new BoardError('Email is not connected. Nothing was sent.', 'input')
  const response = await fetchTimeout('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: from },
      subject,
      content: [{ type: 'text/plain', value: text }],
    }),
  })
  if (!response.ok) throw new BoardError('Email did not send. Nothing else was changed.', 'input')
}

export async function sendSms(from: string, to: string, body: string): Promise<void> {
  const gate = wires()
  const sid = process.env.TWILIO_ACCOUNT_SID || ''
  const token = process.env.TWILIO_AUTH_TOKEN || ''
  if (!gate.sms || !gate.senders.includes(phoneKey(from))) {
    throw new BoardError('Texting is not connected for this number. Nothing was sent.', 'twilio')
  }
  const response = await fetchTimeout(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${sid}:${token}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ From: from, To: to, Body: body }).toString(),
  })
  if (!response.ok) throw new BoardError('The text did not send. Nothing else was changed.', 'twilio')
}

export async function postWired(url: string | undefined, payload: unknown, missing: string): Promise<void> {
  if (!url) throw new BoardError(missing, 'input')
  const response = await fetchTimeout(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new BoardError('That connection refused the request. Nothing else was changed.', 'input')
}
