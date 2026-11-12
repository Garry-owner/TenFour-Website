import type { PlanId, ScenarioCard } from '@/lib/admin/types'

export const BUSINESS_LINE = '(972) 349-5808'
export const BUSINESS_LINE_E164 = '+19723495808'

export const OUTCOME_MISSED = 'Missed'
export const OUTCOME_PICKED = 'Picked up (you or your voicemail)'

export const ROGER_LINE =
  'Roger is not launched. He never answers calls and never books appointments. He texts missed callers back, day or night, asks a few questions, and sends the lead to you. When a client has a booking link, he may text that link. The caller books themselves.'

export const FOUNDING_LINE =
  'Founding offer: setup waived for the first 10 clients. Monthly price is full from day one. Month to month.'

export const FOUNDING_REVIEW =
  'The public offer also asks for an honest review and permission to share how many leads Roger saved.'

export const CALL_LIMITATION =
  'Twilio cannot tell you picking up apart from your cell voicemail. Both show up as “Picked up (you or your voicemail)”. Seconds connected is the clue.'

export const CALL_LIVE_NOTE =
  'Live call logging is not fully on. The Twilio “Call status changes” URL on the business line still needs to be set. This board does not change Twilio.'

export const PLANS: { id: PlanId; name: string; setup: number; month: number }[] = [
  { id: 'base', name: 'Base', setup: 299, month: 299 },
  { id: 'pro', name: 'Pro', setup: 499, month: 499 },
  { id: 'elite', name: 'Elite', setup: 699, month: 699 },
]

export const MONTHLY_STATUSES = [
  { id: 'not_started', label: 'Not started' },
  { id: 'current', label: 'Current' },
  { id: 'past_due', label: 'Past due' },
  { id: 'paused', label: 'Paused' },
] as const

export const FOUNDING_SEATS = 10

// Make team TenFour Systems. These ids are the board's allowlist.
// The backfill scenario stays inactive and has no resume control.
export const MAKE_SCENARIOS: Omit<ScenarioCard, 'liveName' | 'status' | 'notice'>[] = [
  {
    id: 3767837,
    boardName: 'Lead ingestion',
    detail: 'Website signups become a Zoho contact and a deal.',
    control: 'ready',
  },
  {
    id: 6998089,
    boardName: 'Call log',
    detail: 'Twilio call status on the business line writes the call log.',
    control: 'ready',
  },
  {
    id: 6941768,
    boardName: 'Reply saver',
    detail: 'Saves website acknowledgement replies onto existing Zoho contacts.',
    control: 'ready',
  },
  {
    id: 6998096,
    boardName: 'Call log backfill',
    detail: 'One-time backfill. It is inactive and stays off.',
    control: 'locked',
  },
]

export const CALL_LOG_STORE_ID = 199065

export const EXAMPLE_LEAD_NOTICE =
  'Example board. These people are not real. Set the Zoho env vars on this deploy to replace them with website signups.'

export const EXAMPLE_CALL_NOTICE =
  'Example calls. These numbers are fiction. Set MAKE_API_TOKEN to read the business line log in Make.'
