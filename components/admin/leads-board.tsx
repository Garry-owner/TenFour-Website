'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { FeedBanner } from '@/components/admin/ui'
import { formatCentral, formatPhone, leadName } from '@/lib/admin/format'
import type { Lead, LeadBoard } from '@/lib/admin/types'

const FILTERS = ['All', 'Callback', 'Test', 'Consented', 'No consent'] as const

export function LeadsBoard({ board }: { board: LeadBoard }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')
  const [query, setQuery] = useState('')
  const items = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return board.feed.items.filter((lead) => {
      if (filter === 'Callback' && !lead.needsCallback) return false
      if (filter === 'Test' && !lead.obviousTest && !lead.testField?.value) return false
      if (filter === 'Consented' && lead.consent !== 'yes') return false
      if (filter === 'No consent' && lead.consent !== 'no') return false
      if (!needle) return true
      const hay = [lead.firstName, lead.lastName, lead.email, lead.phone, lead.message, lead.trade || '']
        .join(' ')
        .toLowerCase()
      return hay.includes(needle)
    })
  }, [board.feed.items, filter, query])

  return (
    <div className="admin-rise flex flex-col gap-4">
      <div>
        <p className="admin-kicker">Website signups</p>
        <h1 className="admin-title text-6xl">Leads</h1>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
          Read from Zoho contacts and deals. The Make double-tap lock is not this list. Times are Central.
        </p>
      </div>
      <FeedBanner notice={board.feed.notice} />
      <label className="flex flex-col gap-1.5">
        <span className="admin-kicker">Search</span>
        <input
          className="admin-field"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Name, phone, email"
        />
      </label>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter leads">
        {FILTERS.map((item) => (
          <button
            key={item}
            type="button"
            className="admin-choice"
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      {items.length === 0 ? (
        <p className="admin-panel">Nothing in this slice. The board is still here.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((lead) => (
            <li key={lead.id}>
              <LeadCard lead={lead} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function LeadCard({ lead }: { lead: Lead }) {
  return (
    <Link className="admin-card" href={`/admin/leads/${lead.id}`}>
      <span className="flex items-start justify-between gap-2">
        <span className="admin-title text-3xl">{leadName(lead.firstName, lead.lastName)}</span>
        <span className="flex flex-col items-end gap-1">
          {lead.example && <span className="admin-stamp">Example</span>}
          {lead.obviousTest && <span className="admin-stamp admin-stamp-solid admin-stamp-tilt">Test</span>}
        </span>
      </span>
      <span className="font-[family-name:var(--ff-overpass)]">{formatPhone(lead.phone)}</span>
      <span className="admin-break text-sm text-[var(--muted-foreground)]">{lead.email}</span>
      <span className="flex flex-wrap gap-2">
        <span className="admin-stamp">{lead.stageLabel}</span>
        <span className="admin-kicker">{lead.consent === 'yes' ? 'Text consent' : lead.consent === 'no' ? 'No text consent' : 'Consent unknown'}</span>
      </span>
      {lead.message && <span className="line-clamp-2 text-sm">{lead.message}</span>}
      <span className="admin-kicker">{formatCentral(lead.createdAt)}</span>
    </Link>
  )
}
