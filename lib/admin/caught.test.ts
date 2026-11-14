import assert from 'node:assert/strict'
import { test } from 'node:test'
import { BUSINESS_LINE_E164, OUTCOME_MISSED } from './constants.ts'
import { EXAMPLE_TRACKED, caughtReport, chicagoMidnight, periodBounds, todayChicago } from './caught.ts'
import { exampleCalls } from './call-examples.ts'
import type { CallLog } from './types.ts'

const noon = new Date('2026-10-14T18:00:00.000Z')

test('a Chicago day starts at local midnight', () => {
  const start = chicagoMidnight(2026, 10, 14)
  const label = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    hour: 'numeric',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(start)
  assert.equal(label, '00:00')
})

test('week runs Sunday through Saturday', () => {
  const week = periodBounds('week', '2026-10-14')
  const start = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', weekday: 'short' }).format(week.start)
  const dayBeforeEnd = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', weekday: 'short' }).format(
    new Date(week.end.getTime() - 60 * 60 * 1000),
  )
  assert.equal(start, 'Sun')
  assert.equal(dayBeforeEnd, 'Sat')
})

test('client totals skip the TenFour line', () => {
  const calls: CallLog[] = [
    {
      callSid: 'CAEXAMPLE000000000000000000000021',
      example: true,
      startedAt: '2026-10-14T18:00:00.000Z',
      caller: '+12145550140',
      callerName: '',
      callerCity: '',
      callerState: '',
      outcome: OUTCOME_MISSED,
      outcomeDetail: 'Forwarded leg: no-answer',
      talkSeconds: 0,
      totalSeconds: 10,
      alertText: '',
      source: 'Example, not the call log',
      to: EXAMPLE_TRACKED[0].phone,
      clientId: EXAMPLE_TRACKED[0].id,
    },
    {
      callSid: 'CAEXAMPLE000000000000000000000022',
      example: true,
      startedAt: '2026-10-14T19:00:00.000Z',
      caller: '+12145550100',
      callerName: '',
      callerCity: '',
      callerState: '',
      outcome: OUTCOME_MISSED,
      outcomeDetail: 'Forwarded leg: no-answer',
      talkSeconds: 0,
      totalSeconds: 8,
      alertText: '',
      source: 'Example, not the call log',
      to: BUSINESS_LINE_E164,
      clientId: '',
    },
  ]
  const report = caughtReport(calls, EXAMPLE_TRACKED, 'day', '2026-10-14')
  assert.equal(report.clientTotal, 1)
  assert.equal(report.tenfourTotal, 1)
  assert.equal(report.rows[0]?.name, 'Northside HVAC')
})

test('example calls for today count clients and keep 555 caller numbers', () => {
  const now = noon
  const report = caughtReport(exampleCalls(now), EXAMPLE_TRACKED, 'day', todayChicago(now))
  assert.ok(report.clientTotal >= 1)
  assert.ok(report.tenfourTotal >= 1)
  for (const call of exampleCalls(now)) {
    const digits = call.caller.replace(/\D/g, '')
    assert.ok(digits.includes('555'), call.caller)
  }
})
