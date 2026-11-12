import { EXAMPLE_CALL_NOTICE, OUTCOME_MISSED, OUTCOME_PICKED } from '@/lib/admin/constants'
import type { CallLog } from '@/lib/admin/types'

export function exampleCalls(): CallLog[] {
  return [
    {
      callSid: 'CAEXAMPLE000000000000000000000001',
      example: true,
      startedAt: '2026-11-12T13:40:00.000Z',
      caller: '+12145550100',
      callerName: '',
      callerCity: '',
      callerState: '',
      outcome: OUTCOME_MISSED,
      outcomeDetail: 'Forwarded leg: no-answer',
      talkSeconds: 0,
      totalSeconds: 18,
      alertText: 'Example alert',
      source: 'Example, not the call log',
    },
    {
      callSid: 'CAEXAMPLE000000000000000000000002',
      example: true,
      startedAt: '2026-11-12T02:14:00.000Z',
      caller: '+14695550101',
      callerName: 'Riley North',
      callerCity: 'Fort Worth',
      callerState: 'TX',
      outcome: OUTCOME_PICKED,
      outcomeDetail: 'Forwarded leg: completed',
      talkSeconds: 6,
      totalSeconds: 29,
      alertText: 'Example alert',
      source: 'Example, not the call log',
    },
    {
      callSid: 'CAEXAMPLE000000000000000000000003',
      example: true,
      startedAt: '2026-11-11T22:40:00.000Z',
      caller: '+18175550102',
      callerName: 'Alex Quinn',
      callerCity: 'Arlington',
      callerState: 'TX',
      outcome: OUTCOME_PICKED,
      outcomeDetail: 'Forwarded leg: completed',
      talkSeconds: 214,
      totalSeconds: 228,
      alertText: 'Example alert',
      source: 'Example, not the call log',
    },
    {
      callSid: 'CAEXAMPLE000000000000000000000004',
      example: true,
      startedAt: '2026-11-11T15:05:00.000Z',
      caller: '+19725550103',
      callerName: '',
      callerCity: 'Dallas',
      callerState: 'TX',
      outcome: OUTCOME_MISSED,
      outcomeDetail: 'Forwarded leg: busy',
      talkSeconds: 0,
      totalSeconds: 11,
      alertText: 'Example alert',
      source: 'Example, not the call log',
    },
  ]
}

export { EXAMPLE_CALL_NOTICE }
