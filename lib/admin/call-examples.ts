import { BUSINESS_LINE_E164, EXAMPLE_CALL_NOTICE, OUTCOME_MISSED, OUTCOME_PICKED } from './constants'
import { EXAMPLE_TRACKED, atChicagoHour } from './caught'
import type { CallLog } from './types'

function sample(
  now: Date,
  sid: string,
  daysBack: number,
  caller: string,
  outcome: string,
  to: string,
  clientId: string,
  talk: number,
): CallLog {
  return {
    callSid: sid,
    example: true,
    startedAt: atChicagoHour(now, daysBack, 15),
    caller,
    callerName: '',
    callerCity: '',
    callerState: '',
    outcome,
    outcomeDetail: outcome === OUTCOME_MISSED ? 'Forwarded leg: no-answer' : 'Forwarded leg: completed',
    talkSeconds: talk,
    totalSeconds: talk + 12,
    alertText: 'Example alert',
    source: 'Example, not the call log',
    to,
    clientId,
  }
}

export function exampleCalls(now = new Date()): CallLog[] {
  const [north, lake, oak] = EXAMPLE_TRACKED
  return [
    sample(now, 'CAEXAMPLE000000000000000000000011', 0, '+12145550140', OUTCOME_MISSED, north.phone, north.id, 0),
    sample(now, 'CAEXAMPLE000000000000000000000012', 0, '+12145550141', OUTCOME_MISSED, north.phone, north.id, 0),
    sample(now, 'CAEXAMPLE000000000000000000000013', 1, '+14695550142', OUTCOME_MISSED, lake.phone, lake.id, 0),
    sample(now, 'CAEXAMPLE000000000000000000000014', 2, '+18175550143', OUTCOME_MISSED, oak.phone, oak.id, 0),
    sample(now, 'CAEXAMPLE000000000000000000000015', 3, '+12145550144', OUTCOME_MISSED, north.phone, north.id, 0),
    sample(now, 'CAEXAMPLE000000000000000000000016', 6, '+14695550145', OUTCOME_MISSED, lake.phone, lake.id, 0),
    sample(now, 'CAEXAMPLE000000000000000000000017', 8, '+14695550146', OUTCOME_MISSED, lake.phone, lake.id, 0),
    sample(now, 'CAEXAMPLE000000000000000000000018', 12, '+18175550147', OUTCOME_MISSED, oak.phone, oak.id, 0),
    sample(now, 'CAEXAMPLE000000000000000000000019', 40, '+18175550148', OUTCOME_MISSED, oak.phone, oak.id, 0),
    sample(now, 'CAEXAMPLE000000000000000000000001', 0, '+12145550100', OUTCOME_MISSED, BUSINESS_LINE_E164, '', 0),
    sample(now, 'CAEXAMPLE000000000000000000000004', 1, '+19725550103', OUTCOME_MISSED, BUSINESS_LINE_E164, '', 0),
    sample(now, 'CAEXAMPLE000000000000000000000002', 1, '+14695550101', OUTCOME_PICKED, BUSINESS_LINE_E164, '', 6),
    sample(now, 'CAEXAMPLE000000000000000000000003', 2, '+18175550102', OUTCOME_PICKED, north.phone, north.id, 214),
  ]
}

export { EXAMPLE_CALL_NOTICE }
