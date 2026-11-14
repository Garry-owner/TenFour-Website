'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FeedBanner } from '@/components/admin/ui'
import {
  EXAMPLE_TRACKED,
  caughtReport,
  todayChicago,
  type Span,
} from '@/lib/admin/caught'
import { formatCentral, formatPhone, formatSeconds } from '@/lib/admin/format'
import type { CallLog, ClientRecord, Feed } from '@/lib/admin/types'

const SPANS: { id: Span; label: string }[] = [
  { id: 'day', label: 'Day' },
  { id: 'week', label: 'Week' },
  { id: 'month', label: 'Month' },
  { id: 'year', label: 'Year' },
]

export function CaughtPanel({
  calls,
  clients,
  mode,
  initialSpan = 'month',
  initialOn,
  selectedClient = null,
}: {
  calls: Feed<CallLog>
  clients: Feed<ClientRecord>
  mode: 'glance' | 'report' | 'share'
  initialSpan?: Span
  initialOn?: string
  selectedClient?: string | null
}) {
  const router = useRouter()
  const [span, setSpan] = useState<Span>(initialSpan)
  const [on, setOn] = useState(initialOn || todayChicago())
  const example = calls.state === 'example'
  const tracked = example
    ? EXAMPLE_TRACKED
    : clients.items.map((client) => ({
        id: client.id,
        name: client.businessName,
        phone: client.phone,
        example: false,
      }))
  const report = useMemo(() => caughtReport(calls.items, tracked, span, on), [calls.items, tracked, span, on])
  const query = `span=${span}&on=${on}`

  function choose(nextSpan: Span, nextOn = on) {
    setSpan(nextSpan)
    setOn(nextOn)
    if (mode !== 'glance') {
      const client = selectedClient ? `&client=${encodeURIComponent(selectedClient)}` : ''
      router.replace(mode === 'share' ? `/admin/report/share?span=${nextSpan}&on=${nextOn}` : `/admin/report?span=${nextSpan}&on=${nextOn}${client}`)
    }
  }

  if (mode === 'share') {
    return (
      <div className="admin-share">
        {report.example && <p className="admin-stamp">Example data</p>}
        <p className="admin-kicker">Central time</p>
        <p className="admin-stat-num">{String(report.clientTotal)}</p>
        <p className="admin-title text-4xl">{report.label}</p>
        <p className="mt-3 text-lg leading-snug">missed calls caught for local contractors</p>
        <Link className="admin-kicker mt-6 inline-block" href={`/admin/report?${query}`}>
          Back to the report
        </Link>
      </div>
    )
  }

  const selected = selectedClient ? report.rows.find((row) => row.id === selectedClient) : null
  const selectedCalls = selectedClient ? report.callsFor(selectedClient) : []

  return (
    <section className="admin-panel flex flex-col gap-3">
      <div className="flex items-end justify-between gap-3">
        <div>
          {mode === 'report' ? (
            <h1 className="admin-title text-4xl">Missed calls caught</h1>
          ) : (
            <h2 className="admin-title text-3xl">Missed calls caught</h2>
          )}
        </div>
        {report.example && <span className="admin-stamp">Example data</span>}
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Period">
        {SPANS.map((item) => (
          <button key={item.id} type="button" className="admin-choice" aria-pressed={span === item.id} onClick={() => choose(item.id)}>
            {item.label}
          </button>
        ))}
      </div>
      <label className="flex flex-col gap-1.5">
        <span className="admin-kicker">
          {span === 'day' ? 'Day' : span === 'week' ? 'Week of this date' : span === 'month' ? 'Month' : 'Year'}
        </span>
        <input className="admin-field" type="date" value={on} onChange={(event) => choose(span, event.target.value)} />
      </label>
      <p className="admin-kicker">{report.label}. Sunday through Saturday for a week.</p>
      <p className="admin-stat-num">{String(report.clientTotal)}</p>
      <p>missed calls caught for clients</p>
      <p className="admin-kicker">TenFour line, not in that total: {report.tenfourTotal}</p>
      {report.unassigned > 0 && (
        <p className="admin-kicker">{report.unassigned} missed calls did not match a client number.</p>
      )}
      {example && <FeedBanner notice="Example numbers only. These are not your clients and not your callers." />}
      {mode === 'glance' ? (
        <div className="flex flex-wrap gap-3">
          <Link className="admin-kicker" href={`/admin/report?${query}`}>
            Full report
          </Link>
          <Link className="admin-kicker" href={`/admin/report/share?${query}`}>
            Share this stat
          </Link>
        </div>
      ) : (
        <Link className="admin-btn" href={`/admin/report/share?${query}`}>
          Share this stat
        </Link>
      )}
      {mode === 'report' && (
        <ul className="flex flex-col gap-2">
          {report.rows.length === 0 ? (
            <li>No client missed calls in this period.</li>
          ) : (
            report.rows.map((row) => (
              <li key={row.id}>
                <Link className="admin-card" href={`/admin/report?${query}&client=${encodeURIComponent(row.id)}`}>
                  <span className="flex items-center justify-between gap-2">
                    <span className="admin-title text-2xl">{row.name}</span>
                    {row.example && <span className="admin-stamp">Example</span>}
                  </span>
                  <span className="admin-stat-num text-4xl">{row.count}</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
      {selectedClient === 'tenfour' && (
        <CallSlice title="TenFour line" calls={report.callsFor('tenfour')} />
      )}
      {selected && <CallSlice title={selected.name} calls={selectedCalls} />}
      {mode === 'report' && (
        <Link className="admin-kicker" href={`/admin/report?${query}&client=tenfour`}>
          TenFour line calls
        </Link>
      )}
    </section>
  )
}

function CallSlice({ title, calls }: { title: string; calls: CallLog[] }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="admin-title text-3xl">{title}</h2>
      {calls.length === 0 ? (
        <p>No missed calls in this period.</p>
      ) : (
        calls.map((call) => (
          <Link key={call.callSid} className="admin-card" href={`/admin/calls/${call.callSid}`}>
            <span className="admin-kicker">{formatCentral(call.startedAt)}</span>
            <span>{formatPhone(call.caller)}</span>
            <span className="admin-kicker">Called {formatPhone(call.to)} · {formatSeconds(call.talkSeconds)}</span>
            {call.example && <span className="admin-stamp">Example</span>}
          </Link>
        ))
      )}
    </div>
  )
}
