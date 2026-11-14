export const BLOCKED_SCENARIO_ID = 6998096

export function scenarioTogglePlan(
  id: number,
  on: boolean,
  token: string | undefined,
): { ok: false; message: string } | { ok: true; url: string; method: 'POST'; token: string } {
  if (id === BLOCKED_SCENARIO_ID) {
    return { ok: false, message: 'Scenario 6998096 stays off. Nothing was changed.' }
  }
  if (!Number.isInteger(id) || id <= 0) {
    return { ok: false, message: 'That scenario is not on this board.' }
  }
  if (!token) {
    return { ok: false, message: 'MAKE_API_TOKEN is not set. Nothing was changed.' }
  }
  const action = on ? 'start' : 'stop'
  return {
    ok: true,
    url: `https://us2.make.com/api/v2/scenarios/${id}/${action}`,
    method: 'POST',
    token,
  }
}

export function normalizeMonthly(value: string): 'active' | 'past_due' | 'paused' | 'cancelled' {
  if (value === 'past_due') return 'past_due'
  if (value === 'paused') return 'paused'
  if (value === 'cancelled' || value === 'canceled') return 'cancelled'
  return 'active'
}

export function phoneKey(value: string): string {
  const digits = value.replace(/\D/g, '')
  if (digits.length === 11 && digits.startsWith('1')) return digits.slice(1)
  return digits.length > 10 ? digits.slice(-10) : digits
}

export function searchHit(query: string, fields: string[]): boolean {
  const needle = query.trim().toLowerCase()
  if (needle.length < 2) return false
  const digits = needle.replace(/\D/g, '')
  return fields.some((field) => {
    const text = field.toLowerCase()
    if (text.includes(needle)) return true
    if (digits.length >= 3 && phoneKey(field).includes(digits)) return true
    return false
  })
}
