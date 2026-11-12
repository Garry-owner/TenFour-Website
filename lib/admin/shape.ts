import type { Deal, Lead, StageBucket, StageChoice, TestFieldValue } from '@/lib/admin/types'

const ZONES = ['Eastern', 'Central', 'Mountain', 'Pacific']

export type DealInput = {
  id: string
  name: string
  stage: string
  source: string
  createdAt: string | null
  description: string
}

export type LeadInput = {
  id: string
  example?: boolean
  firstName: string
  lastName: string
  email: string
  phone: string
  fax: string
  skypeId: string
  title: string
  contactDescription: string
  source: string
  createdAt: string | null
  trade: string | null
  testField: TestFieldValue | null
  deals: DealInput[]
}

export function bucketOf(stage: string): StageBucket | 'other' {
  const value = stage.trim()
  if (!value) return 'other'
  if (/follow/i.test(value)) return 'followup'
  if (/closed|won|lost/i.test(value)) return 'closed'
  if (/contact/i.test(value)) return 'contacted'
  if (/^new\b/i.test(value)) return 'new'
  return 'other'
}

export function stageChoices(picklist: string[]): StageChoice[] {
  const find = (patterns: RegExp[]) => {
    for (const pattern of patterns) {
      const hit = picklist.find((value) => pattern.test(value.trim()))
      if (hit) return hit
    }
    return null
  }
  const specs: { bucket: StageBucket; label: string; patterns: RegExp[]; fallback: string }[] = [
    { bucket: 'new', label: 'New', patterns: [/^new lead$/i, /^new$/i], fallback: 'New Lead' },
    { bucket: 'contacted', label: 'Contacted', patterns: [/^contacted$/i, /contact/i], fallback: 'Contacted' },
    {
      bucket: 'followup',
      label: 'Follow-up',
      patterns: [/follow[\s-]?up/i],
      fallback: 'Follow-up',
    },
    { bucket: 'closed', label: 'Closed', patterns: [/^closed$/i, /closed won/i], fallback: 'Closed' },
  ]
  return specs.map((spec) => {
    const found = picklist.length ? find(spec.patterns) : null
    return {
      bucket: spec.bucket,
      label: spec.label,
      zohoStage: found || spec.fallback,
      inPicklist: Boolean(found),
    }
  })
}

export function consentFromSkype(value: string): 'yes' | 'no' | 'unknown' {
  if (!value) return 'unknown'
  if (value === 'Form_Opt_In' || /opt[_\s-]?in/i.test(value)) return 'yes'
  if (value === 'No_SMS_Consent' || /no[_\s-]?sms/i.test(value)) return 'no'
  return 'unknown'
}

export function splitFax(fax: string): { timezone: string | null; faxRaw: string | null } {
  const trimmed = fax.trim()
  if (!trimmed) return { timezone: null, faxRaw: null }
  const zone = ZONES.find((item) => item.toLowerCase() === trimmed.toLowerCase())
  if (zone) return { timezone: zone, faxRaw: null }
  return { timezone: null, faxRaw: trimmed }
}

export function cleanDealMessage(description: string): { message: string; manual: boolean } {
  const manual = /^MANUAL CALL ONLY, NO SMS CONSENT\.\s*/i.test(description)
  const message = description.replace(/^MANUAL CALL ONLY, NO SMS CONSENT\.\s*/i, '').trim()
  return { message, manual }
}

export function testReasons(
  input: {
    email: string
    firstName: string
    lastName: string
    phone: string
    message: string
  },
  options?: { skipExampleDomain?: boolean },
): string[] {
  const reasons: string[] = []
  const email = input.email.trim().toLowerCase()
  const name = `${input.firstName} ${input.lastName}`.trim().toLowerCase()
  const digits = input.phone.replace(/\D/g, '')
  if (email.includes('grosam')) reasons.push('Email matches Garry’s own address')
  if (email === 'garry@tenfoursystems.com') reasons.push('TenFour owner email')
  const exampleDomain = email.endsWith('@example.com') || email.endsWith('@example.net')
  if ((exampleDomain && !options?.skipExampleDomain) || email.includes('+test') || /(^|\.)test@/.test(email)) {
    reasons.push('Email looks like a test')
  }
  if (name === 'garry rosam' || name === 'gary rosam') reasons.push('Name matches Garry')
  if (/\btest\b/.test(name)) reasons.push('Name says test')
  if (digits.endsWith('9723495808')) reasons.push('Uses the business line')
  if (/^\s*test\b/i.test(input.message)) reasons.push('Message starts with test')
  return reasons
}

function timeValue(iso: string | null): number {
  if (!iso) return 0
  const time = Date.parse(iso)
  return Number.isNaN(time) ? 0 : time
}

export function shapeLead(input: LeadInput): Lead {
  const fax = splitFax(input.fax)
  const deals: Deal[] = [...input.deals]
    .sort((a, b) => timeValue(b.createdAt) - timeValue(a.createdAt))
    .map((deal) => {
      const cleaned = cleanDealMessage(deal.description)
      const manual = cleaned.manual || /^manual call only\b/i.test(deal.name)
      return {
        id: deal.id,
        name: deal.name,
        stage: deal.stage || 'No stage',
        bucket: bucketOf(deal.stage),
        source: deal.source,
        createdAt: deal.createdAt,
        message: cleaned.message,
        manualCallOnly: manual,
      }
    })
  const latest = deals[0]
  const message = latest?.message || ''
  const reasons = testReasons(
    {
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      phone: input.phone,
      message,
    },
    { skipExampleDomain: Boolean(input.example) },
  )
  const bucket = latest?.bucket ?? 'other'
  const needsCallback = !latest
    ? true
    : latest.bucket === 'closed'
      ? false
      : latest.manualCallOnly || latest.bucket !== 'contacted'
  return {
    id: input.id,
    example: Boolean(input.example),
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    phone: input.phone,
    timezone: fax.timezone,
    faxRaw: fax.faxRaw,
    consent: consentFromSkype(input.skypeId),
    signupClock: input.title || null,
    recordNote: input.contactDescription || null,
    source: input.source,
    createdAt: input.createdAt,
    message,
    trade: input.trade,
    obviousTest: reasons.length > 0,
    testReasons: reasons,
    testField: input.testField,
    deals,
    needsCallback,
    stageLabel: latest?.stage ?? 'No deal',
    bucket,
  }
}

export function sortLeads(leads: Lead[]): Lead[] {
  return [...leads].sort((a, b) => {
    if (a.needsCallback !== b.needsCallback) return a.needsCallback ? -1 : 1
    return timeValue(b.createdAt) - timeValue(a.createdAt)
  })
}
