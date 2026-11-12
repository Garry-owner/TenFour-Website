export type FeedState = 'live' | 'example' | 'offline' | 'error'

export type Feed<T> = {
  state: FeedState
  notice: string | null
  items: T[]
}

export type StageBucket = 'new' | 'contacted' | 'followup' | 'closed'

export type StageChoice = {
  bucket: StageBucket
  label: string
  zohoStage: string
  inPicklist: boolean
}

export type Deal = {
  id: string
  name: string
  stage: string
  bucket: StageBucket | 'other'
  source: string
  createdAt: string | null
  message: string
  manualCallOnly: boolean
}

export type ZohoNote = {
  id: string
  title: string
  body: string
  createdAt: string | null
}

export type TestFieldValue = {
  apiName: string
  label: string
  value: boolean
}

export type Lead = {
  id: string
  example: boolean
  firstName: string
  lastName: string
  email: string
  phone: string
  timezone: string | null
  faxRaw: string | null
  consent: 'yes' | 'no' | 'unknown'
  signupClock: string | null
  recordNote: string | null
  source: string
  createdAt: string | null
  message: string
  trade: string | null
  obviousTest: boolean
  testReasons: string[]
  testField: TestFieldValue | null
  deals: Deal[]
  needsCallback: boolean
  stageLabel: string
  bucket: StageBucket | 'other'
}

export type LeadBoard = {
  feed: Feed<Lead>
  stages: StageChoice[]
  picklistKnown: boolean
  testField: { apiName: string; label: string } | null
}

export type LeadDetail = LeadBoard & {
  lead: Lead | null
  zohoNotes: ZohoNote[]
}

export type CallLog = {
  callSid: string
  example: boolean
  startedAt: string | null
  caller: string
  callerName: string
  callerCity: string
  callerState: string
  outcome: string
  outcomeDetail: string
  talkSeconds: number | null
  totalSeconds: number | null
  alertText: string
  source: string
}

export type PlanId = 'base' | 'pro' | 'elite'
export type MonthlyStatus = 'not_started' | 'current' | 'past_due' | 'paused'

export type ClientRecord = {
  id: string
  businessName: string
  contactName: string
  phone: string
  email: string
  trade: string
  plan: PlanId
  setupPaid: boolean
  monthlyStatus: MonthlyStatus
  founding: boolean
  bookingLink: string
  notes: string
  createdAt: string
  updatedAt: string
}

export type GlanceNote = {
  id: string
  body: string
  leadId: string | null
  leadLabel: string | null
  clientId: string | null
  clientLabel: string | null
  callSid: string | null
  callLabel: string | null
  createdAt: string
  updatedAt: string
}

export type LampState = 'ready' | 'missing' | 'fault'

export type Connections = {
  zoho: LampState
  make: LampState
  twilio: LampState
  store: LampState
  detail: {
    zoho: string
    make: string
    twilio: string
    store: string
  }
}

export type ScenarioCard = {
  id: number
  boardName: string
  detail: string
  control: 'ready' | 'locked'
  liveName: string | null
  status: 'active' | 'inactive' | 'unknown' | 'fault'
  notice: string | null
}

export type ReportRow = {
  id: string
  businessName: string
  plan: PlanId
  founding: boolean
  savedLeads: null
}

export type ReportBoard = {
  monthLabel: string
  store: FeedState
  notice: string | null
  rows: ReportRow[]
  counting: false
}
