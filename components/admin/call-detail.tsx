'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { NoteForm } from '@/components/admin/note-form'
import { useToast } from '@/components/admin/toast'
import { sendJson } from '@/components/admin/ui'
import { FeedBanner, Panel } from '@/components/admin/ui'
import { CALL_LIMITATION, OUTCOME_PICKED } from '@/lib/admin/constants'
import { formatCentral, formatPhone, formatSeconds, placeLine, sourceStamp, telHref } from '@/lib/admin/format'
import type { CallLog, ClientRecord, Feed, GlanceNote, Lead } from '@/lib/admin/types'

export function CallDetailBoard({
  call,
  notice,
  leads,
  notes,
  clients,
  leadsLive,
}: {
  call: CallLog | null
  notice: string | null
  leads: Lead[]
  notes: Feed<GlanceNote>
  clients: Feed<ClientRecord>
  leadsLive: boolean
}) {
  const router = useRouter()
  const toast = useToast()
  const [opening, setOpening] = useState(false)
  if (!call) {
    return (
      <div className="flex flex-col gap-3">
        <h1 className="admin-title text-5xl">Not on the log</h1>
        <FeedBanner notice={notice} />
        <Link className="admin-btn" href="/admin/calls">
          Back to calls
        </Link>
      </div>
    )
  }
  const phone = telHref(call.caller)
  const related = notes.items.filter((item) => item.callSid === call.callSid)
  return (
    <div className="admin-rise flex flex-col gap-4">
      <p className="admin-kicker">Call</p>
      <h1 className="admin-title text-5xl">{call.outcome}</h1>
      <p className="admin-stat-num">{formatSeconds(call.talkSeconds)}</p>
      <p className="admin-kicker">Talk time. Total {formatSeconds(call.totalSeconds)}.</p>
      {call.outcome === OUTCOME_PICKED && <p className="admin-roger">{CALL_LIMITATION}</p>}
      <FeedBanner notice={notice} />
      <Panel>
        <dl className="grid gap-3">
          <div>
            <dt className="admin-kicker">When</dt>
            <dd className="mt-1">{formatCentral(call.startedAt)}</dd>
          </div>
          <div>
            <dt className="admin-kicker">Caller</dt>
            <dd className="mt-1">
              {phone ? (
                <a className="text-xl underline decoration-[var(--primary)]" href={phone}>
                  {formatPhone(call.caller)}
                </a>
              ) : (
                formatPhone(call.caller)
              )}
            </dd>
          </div>
          <div>
            <dt className="admin-kicker">Caller name</dt>
            <dd className="mt-1">{call.callerName || 'Empty'}</dd>
          </div>
          <div>
            <dt className="admin-kicker">City</dt>
            <dd className="mt-1">{placeLine(call.callerCity, call.callerState)}</dd>
          </div>
          <div>
            <dt className="admin-kicker">Outcome detail</dt>
            <dd className="mt-1">{call.outcomeDetail || 'Empty'}</dd>
          </div>
          <div>
            <dt className="admin-kicker">Alert text</dt>
            <dd className="mt-1">{call.alertText || 'Empty'}</dd>
          </div>
          <div>
            <dt className="admin-kicker">Source</dt>
            <dd className="mt-1">
              {sourceStamp(call.source, call.example)}. {call.source || 'Empty'}
            </dd>
          </div>
          <div>
            <dt className="admin-kicker">Call SID</dt>
            <dd className="admin-break mt-1 font-[family-name:var(--ff-overpass)] text-sm">{call.callSid}</dd>
          </div>
        </dl>
      </Panel>
      <button
        type="button"
        className="admin-btn"
        disabled={opening}
        onClick={async () => {
          setOpening(true)
          const result = await sendJson('/api/admin/customers/from-call', 'POST', { callSid: call.callSid })
          setOpening(false)
          const created = result as { clientId?: string }
          if (result.ok && created.clientId) {
            toast(result.message || 'Customer opened.')
            router.push(`/admin/customers/client/${created.clientId}`)
            return
          }
          toast(result.message || 'Nothing was created.', false)
        }}
      >
        {opening ? 'Opening' : 'Open this customer'}
      </button>
      <Panel>
        <h2 className="admin-title mb-3 text-3xl">Glance log</h2>
        <NoteForm
          leads={leads}
          clients={clients.items}
          leadsLive={leadsLive}
          storeLive={notes.state === 'live'}
          preset={
            call.example
              ? undefined
              : { callSid: call.callSid, callLabel: `${call.outcome} ${formatPhone(call.caller)}` }
          }
        />
        {call.example && <p className="admin-kicker mt-2">Example calls are not tied. The note can still stand alone.</p>}
        {related.map((item) => (
          <p key={item.id} className="mt-3 border-t border-[var(--border)] pt-2">
            {item.body}
          </p>
        ))}
      </Panel>
    </div>
  )
}
