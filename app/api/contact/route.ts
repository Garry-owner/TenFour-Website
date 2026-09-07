import { NextRequest, NextResponse } from 'next/server'

const WEBHOOK_URL = 'https://hook.us2.make.com/7jbyj4l1ysf5l6ompdzabl47l2p752lq'

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()

    // Honeypot check: real visitors never see or fill this field.
    // If it has a value, silently pretend success without forwarding to Make.com.
    if (payload.company_website) {
      return NextResponse.json({ success: true })
    }

    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      throw new Error('Webhook request failed')
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
