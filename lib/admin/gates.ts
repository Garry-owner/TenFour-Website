import type { PlanFeature, PlanGates, PlanId } from '@/lib/admin/types'

export const PLAN_FEATURES: { id: PlanFeature; label: string; detail: string }[] = [
  { id: 'portal', label: 'Client login', detail: 'The client can sign in and see only their own board. Every plan gets this.' },
  { id: 'leads', label: 'Leads and missed calls', detail: 'A basic list of their callers. Every plan gets this.' },
  { id: 'reports', label: 'Date range reports', detail: 'Build a report for any start and end date.' },
  { id: 'pdf', label: 'PDF download', detail: 'Download that report as a PDF.' },
  { id: 'money', label: 'Money caught', detail: 'Average job value times booked leads.' },
  { id: 'reviews', label: 'Review request', detail: 'After a booked job, send the Google review link. Pro and Elite only.' },
]

export const DEFAULT_GATES: PlanGates = {
  base: { portal: true, leads: true, reports: false, pdf: false, money: false, reviews: false },
  pro: { portal: true, leads: true, reports: true, pdf: true, money: true, reviews: true },
  elite: { portal: true, leads: true, reports: true, pdf: true, money: true, reviews: true },
}

// Garry's plan rules (Nov 14, 2026). These cannot be switched on the Plan features screen:
// - every plan gets the basic client portal (login plus their leads and missed calls)
// - review requests are Pro and Elite only, never Base
export function lockedGate(plan: PlanId, feature: PlanFeature): boolean | null {
  if (feature === 'portal' || feature === 'leads') return true
  if (feature === 'reviews' && plan === 'base') return false
  return null
}

function applyLocks(gates: PlanGates): PlanGates {
  for (const plan of ['base', 'pro', 'elite'] as const) {
    for (const feature of PLAN_FEATURES) {
      const locked = lockedGate(plan, feature.id)
      if (locked !== null) gates[plan][feature.id] = locked
    }
  }
  return gates
}

export function mergeGates(value: unknown): PlanGates {
  const gates: PlanGates = {
    base: { ...DEFAULT_GATES.base },
    pro: { ...DEFAULT_GATES.pro },
    elite: { ...DEFAULT_GATES.elite },
  }
  if (!value || typeof value !== 'object') return applyLocks(gates)
  const source = value as Record<string, unknown>
  for (const plan of ['base', 'pro', 'elite'] as const) {
    const row = source[plan]
    if (!row || typeof row !== 'object') continue
    const flags = row as Record<string, unknown>
    for (const feature of PLAN_FEATURES) {
      if (typeof flags[feature.id] === 'boolean') gates[plan][feature.id] = flags[feature.id] as boolean
    }
  }
  return applyLocks(gates)
}

export function planAllows(gates: PlanGates, plan: PlanId, feature: PlanFeature): boolean {
  return Boolean(gates[plan]?.[feature])
}

export const DEFAULT_ALERTS = {
  pushFailure: true,
  textFailure: false,
  emailFailure: true,
  pushPaused: true,
  textPaused: false,
  emailPaused: false,
  pushPayment: true,
  textPayment: true,
  emailPayment: true,
}

export function mergeAlerts(value: unknown) {
  const next = { ...DEFAULT_ALERTS }
  if (!value || typeof value !== 'object') return next
  const source = value as Record<string, unknown>
  for (const key of Object.keys(next) as (keyof typeof next)[]) {
    if (typeof source[key] === 'boolean') next[key] = source[key] as boolean
  }
  return next
}
