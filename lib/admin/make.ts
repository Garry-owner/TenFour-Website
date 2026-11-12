import { exampleCalls, EXAMPLE_CALL_NOTICE } from '@/lib/admin/call-examples'
import { CALL_LOG_STORE_ID, MAKE_SCENARIOS } from '@/lib/admin/constants'
import { BoardError, fetchTimeout } from '@/lib/admin/guard'
import type { CallLog, Feed, ScenarioCard } from '@/lib/admin/types'

export function makeConfigured(): boolean {
  return Boolean(process.env.MAKE_API_TOKEN)
}

function makeBase(): string {
  const raw = process.env.MAKE_API_BASE || 'https://us2.make.com/api/v2'
  let url: URL
  try {
    url = new URL(raw)
  } catch {
    throw new BoardError('MAKE_API_BASE is not a URL.', 'make')
  }
  if (url.protocol !== 'https:' || url.hostname !== 'us2.make.com') {
    throw new BoardError('Make reads stay on us2.make.com.', 'make')
  }
  return 'https://us2.make.com/api/v2'
}

async function makeGet(path: string): Promise<Record<string, unknown>> {
  const token = process.env.MAKE_API_TOKEN
  if (!token) throw new BoardError('Make is not connected on this deploy.', 'make')
  let response: Response
  try {
    response = await fetchTimeout(`${makeBase()}${path}`, {
      headers: { Authorization: `Token ${token}` },
    })
  } catch {
    throw new BoardError('Make could not be reached.', 'make')
  }
  if (!response.ok) throw new BoardError('Make refused the read.', 'make')
  const json = (await response.json().catch(() => null)) as Record<string, unknown> | null
  return json || {}
}

function str(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function seconds(value: unknown): number | null {
  const number = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : NaN
  if (!Number.isFinite(number)) return null
  return Math.max(0, Math.round(number))
}

function startedAt(value: unknown): string | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    const ms = value < 10_000_000_000 ? value * 1000 : value
    return new Date(ms).toISOString()
  }
  if (typeof value === 'string' && value.trim()) {
    const time = Date.parse(value)
    if (!Number.isNaN(time)) return new Date(time).toISOString()
  }
  return null
}

function parseCall(record: unknown): CallLog | null {
  if (!record || typeof record !== 'object') return null
  const row = record as Record<string, unknown>
  const data =
    row.data && typeof row.data === 'object' ? (row.data as Record<string, unknown>) : row
  const callSid = str(data.call_sid) || str(row.key)
  if (!/^[A-Za-z0-9]{10,64}$/.test(callSid)) return null
  return {
    callSid,
    example: false,
    startedAt: startedAt(data.started_at),
    caller: str(data.caller),
    callerName: str(data.caller_name),
    callerCity: str(data.caller_city),
    callerState: str(data.caller_state),
    outcome: str(data.outcome) || 'Unknown',
    outcomeDetail: str(data.outcome_detail),
    talkSeconds: seconds(data.talk_seconds),
    totalSeconds: seconds(data.total_seconds),
    alertText: str(data.alert_text),
    source: str(data.source),
  }
}

export async function loadCalls(): Promise<Feed<CallLog>> {
  if (!makeConfigured()) {
    return { state: 'example', notice: EXAMPLE_CALL_NOTICE, items: exampleCalls() }
  }
  try {
    const items: CallLog[] = []
    for (let offset = 0; offset < 500; offset += 100) {
      const json = await makeGet(
        `/data-stores/${CALL_LOG_STORE_ID}/data?pg[limit]=100&pg[offset]=${offset}&pg[sortDir]=desc`,
      )
      const records = (json.records || json.dataStoreRecords || []) as unknown[]
      if (!Array.isArray(records) || records.length === 0) break
      for (const record of records) {
        const call = parseCall(record)
        if (call) items.push(call)
      }
      if (records.length < 100) break
    }
    items.sort((a, b) => {
      const left = a.startedAt ? Date.parse(a.startedAt) : 0
      const right = b.startedAt ? Date.parse(b.startedAt) : 0
      return right - left
    })
    return { state: 'live', notice: null, items }
  } catch (err) {
    return {
      state: 'error',
      notice: err instanceof BoardError ? err.message : 'The call log could not be read.',
      items: [],
    }
  }
}

export async function loadCall(sid: string): Promise<{ feed: Feed<CallLog>; call: CallLog | null }> {
  const feed = await loadCalls()
  return { feed, call: feed.items.find((item) => item.callSid === sid) || null }
}

function scenarioStatus(json: Record<string, unknown>): 'active' | 'inactive' | 'unknown' {
  const scenario = (json.scenario && typeof json.scenario === 'object' ? json.scenario : json) as Record<
    string,
    unknown
  >
  if (scenario.islinked === true || scenario.status === 'active') return 'active'
  if (scenario.islinked === false || scenario.status === 'inactive') return 'inactive'
  return 'unknown'
}

function scenarioName(json: Record<string, unknown>): string | null {
  const scenario = (json.scenario && typeof json.scenario === 'object' ? json.scenario : json) as Record<
    string,
    unknown
  >
  return str(scenario.name) || null
}

export async function loadScenarios(): Promise<{ connected: boolean; notice: string | null; items: ScenarioCard[] }> {
  if (!makeConfigured()) {
    return {
      connected: false,
      notice: 'Make is not connected. Status below is the last known design, not a live read.',
      items: MAKE_SCENARIOS.map((scenario) => ({
        ...scenario,
        liveName: null,
        status: 'unknown',
        notice: null,
      })),
    }
  }
  const items = await Promise.all(
    MAKE_SCENARIOS.map(async (scenario): Promise<ScenarioCard> => {
      try {
        const json = await makeGet(`/scenarios/${scenario.id}`)
        return {
          ...scenario,
          liveName: scenarioName(json),
          status: scenarioStatus(json),
          notice: null,
        }
      } catch (err) {
        return {
          ...scenario,
          liveName: null,
          status: 'fault',
          notice: err instanceof BoardError ? err.message : 'Make could not be read.',
        }
      }
    }),
  )
  return { connected: true, notice: null, items }
}

export async function makeLamp(): Promise<{ state: 'ready' | 'missing' | 'fault'; detail: string }> {
  if (!makeConfigured()) return { state: 'missing', detail: 'MAKE_API_TOKEN is not set.' }
  try {
    await makeGet(`/scenarios/${6998089}`)
    return { state: 'ready', detail: 'Make accepted a read of the call log scenario.' }
  } catch (err) {
    return { state: 'fault', detail: err instanceof BoardError ? err.message : 'Make could not be reached.' }
  }
}
