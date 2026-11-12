'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { FeedBanner } from '@/components/admin/ui'
import { CALL_LIMITATION, CALL_LIVE_NOTE, OUTCOME_MISSED, OUTCOME_PICKED } from '@/lib/admin/constants'
import { formatCentral, formatPhone, formatSeconds, placeLine, sourceStamp } from '@/lib/admin/format'
import type { CallLog, Feed } from '@/lib/admin/types'

const FILTERS = ['All', 'Missed', 'Picked up'] as const

export function CallsBoard({ feed }: { feed: Feed<CallLog> }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')
  const items = useMemo(
    () =>
      feed.items.filter((call) => {
        if (filter === 'Missed') return call.outcome === OUTCOME_MISSED
        if (filter === 'Picked up') return call.outcome === OUTCOME_PICKED
        return true
      }),
    [feed.items, filter],
  )
  return (
    <div className="admin-rise flex flex-col gap-4">
      <div>
        <p className="admin-kicker">Business line</p>
        <h1 className="admin-title text-6xl">Calls</h1>
      </div>
      <p className="admin-roger">{CALL_LIMITATION}</p>
      <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{CALL_LIVE_NOTE}</p>
      <FeedBanner notice={feed.notice} />
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter calls">
        {FILTERS.map((item) => (
          <button key={item} type="button" className="admin-choice" aria-pressed={filter === item} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
      </div>
      {items.length === 0 ? (
        <p className="admin-panel">No calls in this slice.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((call) => (
            <li key={call.callSid}>
              <Link className="admin-card" href={`/admin/calls/${call.callSid}`}>
                <span className="flex items-center justify-between gap-2">
                  <span className={`admin-stamp ${call.outcome === OUTCOME_MISSED ? 'admin-stamp-solid' : ''}`}>
                    {call.outcome === OUTCOME_PICKED ? 'Picked up' : call.outcome}
                  </span>
                  <span className="admin-kicker">{sourceStamp(call.source, call.example)}</span>
                </span>
                <span className="admin-title text-5xl">{formatSeconds(call.talkSeconds)}</span>
                <span className="font-[family-name:var(--ff-overpass)]">{formatPhone(call.caller)}</span>
                <span className="text-sm">{placeLine(call.callerCity, call.callerState)}</span>
                <span className="admin-kicker">{formatCentral(call.startedAt)}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
