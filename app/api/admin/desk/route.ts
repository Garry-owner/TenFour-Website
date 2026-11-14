import { NextResponse } from 'next/server'
import {
  addBlock,
  addHoliday,
  holdThread,
  listMessages,
  patchClientFields,
  removeBlock,
  removeHoliday,
  saveBoardConfig,
  saveMessage,
  setClosedMessage,
  setOutcome,
  setReview,
  setRogerPause,
} from '@/lib/admin/desk-store'
import { mergeAlerts, mergeGates } from '@/lib/admin/gates'
import { boardErrorResponse, guardAdmin, readJson } from '@/lib/admin/guard'
import { isExampleClientId } from '@/lib/admin/example-client'
import { recordAudit, saveRoger } from '@/lib/admin/store'
import { postWired, sendEmail, sendSms, wires } from '@/lib/admin/wired'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function needConfirm(body: Record<string, unknown>) {
  if (body.confirm !== true) {
    return NextResponse.json({ ok: false, message: 'Confirm this before it is saved.' }, { status: 400 })
  }
  return null
}

export async function POST(request: Request) {
  const denied = await guardAdmin(request, true)
  if (denied) return denied
  try {
    const body = await readJson(request)
    const action = typeof body.action === 'string' ? body.action : ''
    const clientId = typeof body.clientId === 'string' ? body.clientId : ''
    if (clientId && isExampleClientId(clientId) && action !== 'gates' && action !== 'goal' && action !== 'alerts') {
      return NextResponse.json({ ok: false, message: 'This is example data. Nothing was saved.' }, { status: 409 })
    }
    if (action === 'pause') {
      const blocked = needConfirm(body)
      if (blocked) return blocked
      const until = typeof body.pausedUntil === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(body.pausedUntil) ? body.pausedUntil : null
      await setRogerPause(clientId, body.enabled === true, until)
      await recordAudit({ action: 'update', entityType: 'roger', entityId: clientId, summary: body.enabled === true ? 'Resumed Roger' : 'Paused Roger' })
      return NextResponse.json({ ok: true, message: body.enabled === true ? 'Roger is set to resume.' : 'Roger is paused on the board.' })
    }
    if (action === 'settings' || action === 'texts') {
      await saveRoger(clientId, body)
      if (action === 'settings') await patchClientFields(clientId, body)
      if (typeof body.closedMessage === 'string') await setClosedMessage(clientId, body.closedMessage)
      await recordAudit({ action: 'update', entityType: 'roger', entityId: clientId, summary: action === 'texts' ? 'Saved Roger texts' : 'Saved client settings' })
      return NextResponse.json({ ok: true, message: 'Saved.' })
    }
    if (action === 'onboard' || action === 'referral' || action === 'billing' || action === 'portal-code') {
      await patchClientFields(clientId, body)
      await recordAudit({ action: 'update', entityType: 'client', entityId: clientId, summary: `Updated ${action.replace('-', ' ')}` })
      return NextResponse.json({ ok: true, message: 'Saved.' })
    }
    if (action === 'block') {
      const blocked = needConfirm(body)
      if (blocked) return blocked
      const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
      if (phone.replace(/\D/g, '').length < 7) {
        return NextResponse.json({ ok: false, message: 'Enter a real phone number.' }, { status: 400 })
      }
      await addBlock(clientId, phone, typeof body.reason === 'string' ? body.reason : '')
      await recordAudit({ action: 'create', entityType: 'client', entityId: clientId, summary: `Blocked ${phone} on the board` })
      return NextResponse.json({ ok: true, message: 'Blocked on the board. Twilio was not changed.' })
    }
    if (action === 'unblock') {
      const blocked = needConfirm(body)
      if (blocked) return blocked
      if (typeof body.blockId === 'string') await removeBlock(body.blockId)
      return NextResponse.json({ ok: true, message: 'Removed the block on the board.' })
    }
    if (action === 'holiday') {
      const onDate = typeof body.onDate === 'string' ? body.onDate : ''
      await addHoliday(typeof body.scope === 'string' ? body.scope : clientId, onDate, typeof body.label === 'string' ? body.label : 'Closed')
      return NextResponse.json({ ok: true, message: 'Closed date saved.' })
    }
    if (action === 'unholiday' && typeof body.holidayId === 'string') {
      await removeHoliday(body.holidayId)
      return NextResponse.json({ ok: true, message: 'Closed date removed.' })
    }
    if (action === 'outcome') {
      const outcome = body.outcome === 'lost' ? 'lost' : 'booked'
      await setOutcome({ clientId, caller: typeof body.caller === 'string' ? body.caller : '', leadId: typeof body.leadId === 'string' ? body.leadId : '', outcome })
      await recordAudit({ action: 'update', entityType: 'client', entityId: clientId, summary: `Marked a lead ${outcome}` })
      return NextResponse.json({ ok: true, message: outcome === 'booked' ? 'Marked booked.' : 'Marked lost.' })
    }
    if (action === 'review') {
      if (typeof body.messageId !== 'string') return NextResponse.json({ ok: false, message: 'Missing the text.' }, { status: 400 })
      await setReview(body.messageId, body.status === 'fixed' ? 'fixed' : 'approved', typeof body.bodyEn === 'string' ? body.bodyEn : undefined)
      return NextResponse.json({ ok: true, message: 'Review saved.' })
    }
    if (action === 'goal') {
      const quitGoal = Number(body.quitGoal)
      if (!Number.isFinite(quitGoal) || quitGoal < 0 || quitGoal > 1_000_000) {
        return NextResponse.json({ ok: false, message: 'Enter a goal in dollars.' }, { status: 400 })
      }
      await saveBoardConfig({ quitGoal: Math.round(quitGoal) })
      return NextResponse.json({ ok: true, message: 'Goal saved.' })
    }
    if (action === 'gates') {
      await saveBoardConfig({ gates: mergeGates(body.gates) })
      return NextResponse.json({ ok: true, message: 'Plan features saved.' })
    }
    if (action === 'alerts') {
      await saveBoardConfig({ alerts: mergeAlerts(body.alerts) })
      return NextResponse.json({ ok: true, message: 'Alert choices saved. Nothing was sent.' })
    }
    if (action === 'resend') {
      const blocked = needConfirm(body)
      if (blocked) return blocked
      if (!wires().resend) return NextResponse.json({ ok: false, message: 'Resend is not connected. Nothing was sent.' }, { status: 409 })
      await postWired(process.env.LEAD_RESEND_URL, body, 'Resend is not connected. Nothing was sent.')
      await recordAudit({ action: 'send', entityType: 'client', entityId: clientId, summary: 'Resent a lead' })
      return NextResponse.json({ ok: true, message: 'Lead resent.' })
    }
    if (action === 'test') {
      const blocked = needConfirm(body)
      if (blocked) return blocked
      if (!wires().test) return NextResponse.json({ ok: false, message: 'Send a test is not wired yet. Nothing was sent.' }, { status: 409 })
      await postWired(process.env.ROGER_TEST_URL, { clientId, test: true }, 'Send a test is not wired yet. Nothing was sent.')
      await recordAudit({ action: 'send', entityType: 'client', entityId: clientId, summary: 'Sent a marked test call' })
      return NextResponse.json({ ok: true, message: 'Test sent. It is marked as a test.' })
    }
    if (action === 'takeover') {
      const blocked = needConfirm(body)
      if (blocked) return blocked
      const to = typeof body.caller === 'string' ? body.caller : ''
      const from = typeof body.from === 'string' ? body.from : ''
      const text = typeof body.body === 'string' ? body.body.trim() : ''
      if (!text) return NextResponse.json({ ok: false, message: 'Write the text first.' }, { status: 400 })
      await sendSms(from, to, text)
      await holdThread(clientId, to)
      await saveMessage({ clientId, caller: to, body: text, language: 'en' })
      await recordAudit({ action: 'send', entityType: 'client', entityId: clientId, summary: `Took over a text to ${to}` })
      return NextResponse.json({ ok: true, message: 'Text sent. Roger stays paused on that thread.' })
    }
    if (action === 'review-request') {
      const blocked = needConfirm(body)
      if (blocked) return blocked
      const to = typeof body.caller === 'string' ? body.caller : ''
      const from = typeof body.from === 'string' ? body.from : ''
      const link = typeof body.reviewUrl === 'string' ? body.reviewUrl : ''
      await sendSms(from, to, `Thanks for booking. If you have a minute, a review helps: ${link}`)
      await recordAudit({ action: 'send', entityType: 'client', entityId: clientId, summary: 'Sent a review request' })
      return NextResponse.json({ ok: true, message: 'Review request sent.' })
    }
    if (action === 'send-report') {
      const blocked = needConfirm(body)
      if (blocked) return blocked
      const channel = body.channel === 'sms' ? 'sms' : 'email'
      const summary = typeof body.summary === 'string' ? body.summary : ''
      if (channel === 'email') {
        const to = typeof body.to === 'string' ? body.to : ''
        await sendEmail(to, 'Your TenFour report', summary)
      } else {
        await sendSms(typeof body.from === 'string' ? body.from : '', typeof body.to === 'string' ? body.to : '', summary)
      }
      await recordAudit({ action: 'send', entityType: 'report', entityId: clientId, summary: `Sent a report by ${channel}` })
      return NextResponse.json({ ok: true, message: 'Report sent.' })
    }
    if (action === 'messages') {
      const items = await listMessages(clientId || undefined)
      return NextResponse.json({ ok: true, items })
    }
    return NextResponse.json({ ok: false, message: 'That action is not on the board.' }, { status: 400 })
  } catch (err) {
    return boardErrorResponse(err)
  }
}
