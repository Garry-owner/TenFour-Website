import Link from 'next/link'
import { NoteForm } from '@/components/admin/note-form'
import { CountUp, FeedBanner, Panel } from '@/components/admin/ui'
import { ROGER_LINE } from '@/lib/admin/constants'
import { formatCentral, formatPhone, formatSeconds, leadName, sourceStamp } from '@/lib/admin/format'
import type { CallLog, ClientRecord, Feed, GlanceNote, Lead } from '@/lib/admin/types'

export function GlanceBoard({
  leads,
  calls,
  notes,
  clients,
}: {
  leads: Feed<Lead>
  calls: Feed<CallLog>
  notes: Feed<GlanceNote>
  clients: Feed<ClientRecord>
}) {
  const callbacks = leads.items.filter((lead) => lead.needsCallback)
  const fresh = leads.items.filter((lead) => lead.bucket === 'new')
  const missed = calls.items.filter((call) => call.outcome === 'Missed')
  return (
    <div className="admin-rise flex flex-col gap-4">
      <div className="relative">
        <p className="admin-watermark" aria-hidden="true">
          10-4
        </p>
        <p className="admin-kicker relative">Morning board</p>
        <h1 className="admin-title relative mt-1 text-6xl">Glance</h1>
      </div>
      <p className="admin-roger">{ROGER_LINE}</p>
      <FeedBanner notice={leads.notice} />
      {calls.notice && calls.notice !== leads.notice ? <FeedBanner notice={calls.notice} /> : null}
      <div className="grid grid-cols-2 gap-2">
        <Stat kicker="New" value={fresh.length} />
        <Stat kicker="Callback" value={callbacks.length} />
        <Stat kicker="Missed" value={missed.length} />
        <Stat kicker="Clients" value={clients.items.length} />
      </div>
      <Panel>
        <div className="mb-3 flex items-end justify-between gap-3">
          <h2 className="admin-title text-3xl">Call these back</h2>
          <Link className="admin-kicker" href="/admin/leads">
            All leads
          </Link>
        </div>
        {callbacks.length === 0 ? (
          <p>No callbacks on this board.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {callbacks.slice(0, 4).map((lead) => (
              <li key={lead.id}>
                <Link className="admin-card" href={`/admin/customers/lead/${lead.id}`}>
                  <span className="flex items-center justify-between gap-2">
                    <span className="admin-title text-2xl">{leadName(lead.firstName, lead.lastName)}</span>
                    {lead.obviousTest && <span className="admin-stamp admin-stamp-tilt">Test</span>}
                  </span>
                  <span className="font-[family-name:var(--ff-overpass)] text-sm">{formatPhone(lead.phone)}</span>
                  <span className="text-sm text-[var(--muted-foreground)]">{lead.stageLabel}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Panel>
      <Panel>
        <div className="mb-3 flex items-end justify-between gap-3">
          <h2 className="admin-title text-3xl">Recent calls</h2>
          <Link className="admin-kicker" href="/admin/calls">
            Call log
          </Link>
        </div>
        {calls.items.length === 0 ? (
          <p>No calls on this board.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {calls.items.slice(0, 3).map((call) => (
              <li key={call.callSid}>
                <Link className="admin-card" href={`/admin/calls/${call.callSid}`}>
                  <span className="flex items-center justify-between gap-2">
                    <span className="admin-stamp admin-stamp-solid">{call.outcome === 'Missed' ? 'Missed' : 'Picked up'}</span>
                    <span className="admin-kicker">{sourceStamp(call.source, call.example)}</span>
                  </span>
                  <span className="admin-title text-4xl">{formatSeconds(call.talkSeconds)}</span>
                  <span className="text-sm">{formatCentral(call.startedAt)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Panel>
      <Panel>
        <h2 className="admin-title mb-3 text-3xl">Log a glance</h2>
        <NoteForm
          leads={leads.items}
          clients={clients.items}
          leadsLive={leads.state === 'live'}
          storeLive={notes.state === 'live' || clients.state === 'live'}
        />
        {notes.state !== 'live' && notes.notice && <p className="admin-banner mt-3">{notes.notice}</p>}
      </Panel>
      {notes.items.length > 0 && (
        <Panel>
          <h2 className="admin-title mb-3 text-3xl">Latest notes</h2>
          <ul className="flex flex-col gap-3">
            {notes.items.slice(0, 3).map((note) => (
              <li key={note.id} className="border-b border-[var(--border)] pb-3">
                <p>{note.body}</p>
                <p className="admin-kicker mt-1">{formatCentral(note.createdAt)}</p>
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </div>
  )
}

function Stat({ kicker, value }: { kicker: string; value: number }) {
  return (
    <article className="admin-stat">
      <p className="admin-kicker">{kicker}</p>
      <p className="admin-stat-num">
        <CountUp value={value} />
      </p>
    </article>
  )
}
