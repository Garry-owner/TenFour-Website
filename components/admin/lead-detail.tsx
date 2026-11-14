'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { NoteForm } from '@/components/admin/note-form'
import { FeedBanner, Panel, Sheet, sendJson } from '@/components/admin/ui'
import { formatCentral, formatPhone, leadName, telHref } from '@/lib/admin/format'
import type { ClientRecord, Feed, GlanceNote, LeadDetail, StageChoice } from '@/lib/admin/types'

export function LeadDetailBoard({
  detail,
  notes,
  clients,
}: {
  detail: LeadDetail
  notes: Feed<GlanceNote>
  clients: Feed<ClientRecord>
}) {
  const lead = detail.lead
  if (!lead) {
    return (
      <div className="flex flex-col gap-3">
        <h1 className="admin-title text-5xl">Not on the board</h1>
        <FeedBanner notice={detail.feed.notice} />
        <Link className="admin-btn" href="/admin/leads">
          Back to leads
        </Link>
      </div>
    )
  }
  return (
    <LeadTicket detail={detail} lead={lead} notes={notes} clients={clients} />
  )
}

function LeadTicket({
  detail,
  lead,
  notes,
  clients,
}: {
  detail: LeadDetail
  lead: NonNullable<LeadDetail['lead']>
  notes: Feed<GlanceNote>
  clients: Feed<ClientRecord>
}) {
  const router = useRouter()
  const [sheet, setSheet] = useState<null | { title: string; body: string; confirm: string; run: () => Promise<void> }>(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [note, setNote] = useState('')
  const live = detail.feed.state === 'live'
  const phone = telHref(lead.phone)
  const related = notes.items.filter((item) => item.leadId === lead.id)

  function askStage(choice: StageChoice) {
    const deal = lead.deals[0]
    if (!live) {
      setSheet({
        title: 'Zoho is off',
        body: `This would set the deal to ${choice.zohoStage}. Zoho is not connected, so nothing will be sent.`,
        confirm: 'Got it',
        run: async () => setSheet(null),
      })
      return
    }
    if (!deal) {
      setMessage('This contact has no Zoho deal yet, so there is no stage to change.')
      return
    }
    const warn = !choice.inPicklist && detail.picklistKnown ? ' That name was not in the Zoho stage list we could read.' : ''
    setSheet({
      title: choice.label,
      body: `Write “${choice.zohoStage}” on the Zoho deal “${deal.name}”.${warn}`,
      confirm: 'Write it',
      run: async () => {
        const result = await sendJson(`/api/admin/leads/${lead.id}/stage`, 'POST', {
          bucket: choice.bucket,
          confirm: true,
        })
        setMessage(result.ok ? `Stage set to ${choice.zohoStage}.` : result.message)
        if (result.ok) router.refresh()
        setSheet(null)
      },
    })
  }

  function askTest(value: boolean) {
    if (!live) {
      setSheet({
        title: 'Zoho is off',
        body: 'The test mark stays on this screen until Zoho is connected. Nothing will be sent.',
        confirm: 'Got it',
        run: async () => setSheet(null),
      })
      return
    }
    if (!detail.testField) {
      setSheet({
        title: 'No test field',
        body: 'This Zoho contact has no test field. Obvious tests stay badged here and are not hidden.',
        confirm: 'Got it',
        run: async () => setSheet(null),
      })
      return
    }
    setSheet({
      title: value ? 'Mark test' : 'Clear test',
      body: `Update “${detail.testField.label}” on the Zoho contact.`,
      confirm: 'Write it',
      run: async () => {
        const result = await sendJson(`/api/admin/leads/${lead.id}/test`, 'POST', { value, confirm: true })
        setMessage(result.ok ? 'Test mark updated in Zoho.' : result.message)
        if (result.ok) router.refresh()
        setSheet(null)
      },
    })
  }

  async function saveZohoNote(event: React.FormEvent) {
    event.preventDefault()
    if (!live) {
      setMessage('Zoho is not connected. This note was not saved there. Use the glance log if the private store is up.')
      return
    }
    setBusy(true)
    const result = await sendJson(`/api/admin/leads/${lead.id}/note`, 'POST', { body: note })
    setBusy(false)
    setMessage(result.ok ? 'Note saved on the Zoho contact.' : result.message)
    if (result.ok) {
      setNote('')
      router.refresh()
    }
  }

  return (
    <div className="admin-rise flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="admin-kicker">Lead</p>
          <h1 className="admin-title text-5xl">{leadName(lead.firstName, lead.lastName)}</h1>
        </div>
        <div className="flex flex-col items-end gap-1">
          {lead.example && <span className="admin-stamp">Example</span>}
          {(lead.obviousTest || lead.testField?.value) && (
            <span className="admin-stamp admin-stamp-solid admin-stamp-tilt">Test</span>
          )}
        </div>
      </div>
      <FeedBanner notice={detail.feed.notice} />
      {message && <p className="admin-banner">{message}</p>}
      <Panel>
        <dl className="grid gap-3">
          <Row label="Phone">
            {phone ? (
              <a className="text-xl underline decoration-[var(--primary)]" href={phone}>
                {formatPhone(lead.phone)}
              </a>
            ) : (
              formatPhone(lead.phone)
            )}
          </Row>
          <Row label="Email">
            {lead.email ? (
              <a className="admin-break underline decoration-[var(--primary)]" href={`mailto:${lead.email}`}>
                {lead.email}
              </a>
            ) : (
              'No email'
            )}
          </Row>
          <Row label="Text consent">
            {lead.consent === 'yes' ? 'Yes' : lead.consent === 'no' ? 'No' : 'Unknown'}
          </Row>
          <Row label="Timezone">{lead.timezone || 'Not on the signup'}</Row>
          {lead.faxRaw && <Row label="Fax field">{lead.faxRaw}</Row>}
          <Row label="Trade">{lead.trade || 'Not on this signup'}</Row>
          <Row label="Signed up">{formatCentral(lead.createdAt)}</Row>
          <Row label="Source">{lead.source || 'Website'}</Row>
          {lead.signupClock && <Row label="Signup clock">{lead.signupClock}</Row>}
        </dl>
      </Panel>
      <Panel>
        <h2 className="admin-title mb-2 text-3xl">Message</h2>
        <p className="whitespace-pre-wrap text-base leading-relaxed">{lead.message || 'No message on the deal.'}</p>
      </Panel>
      <Panel>
        <h2 className="admin-title mb-3 text-3xl">Deal stage</h2>
        {lead.deals.length === 0 ? (
          <p>No Zoho deal on this contact yet.</p>
        ) : (
          <ul className="mb-3 flex flex-col gap-2">
            {lead.deals.map((deal) => (
              <li key={deal.id} className="border border-[var(--border)] p-3">
                <p className="admin-title text-2xl">{deal.name}</p>
                <p className="admin-kicker mt-1">{deal.stage}</p>
                <p className="mt-1 text-sm">{formatCentral(deal.createdAt)}</p>
              </li>
            ))}
          </ul>
        )}
        <div className="grid grid-cols-2 gap-2">
          {detail.stages.map((choice) => (
            <button key={choice.bucket} type="button" className="admin-choice" onClick={() => askStage(choice)}>
              {choice.label}
            </button>
          ))}
        </div>
      </Panel>
      <Panel>
        <h2 className="admin-title mb-2 text-3xl">Test mark</h2>
        {lead.testReasons.length > 0 && (
          <ul className="mb-3 list-disc pl-5 text-sm">
            {lead.testReasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        )}
        <p className="mb-3 text-sm text-[var(--muted-foreground)]">
          {detail.testField
            ? `Zoho field: ${detail.testField.label}.`
            : 'No test field was found on the Zoho contact. Obvious tests stay visible and are not hidden.'}
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" className="admin-choice" aria-pressed={lead.testField?.value === true} onClick={() => askTest(true)}>
            Mark test
          </button>
          <button type="button" className="admin-choice" aria-pressed={lead.testField?.value === false} onClick={() => askTest(false)}>
            Not a test
          </button>
        </div>
      </Panel>
      <Panel>
        <h2 className="admin-title mb-2 text-3xl">Zoho note</h2>
        <form className="flex flex-col gap-3" onSubmit={saveZohoNote}>
          <label className="flex flex-col gap-1.5">
            <span className="admin-kicker">Note on the contact</span>
            <textarea className="admin-area" value={note} onChange={(event) => setNote(event.target.value)} maxLength={4000} />
          </label>
          <button className="admin-btn" type="submit" disabled={busy}>
            {busy ? 'Saving' : 'Save to Zoho'}
          </button>
        </form>
        {detail.zohoNotes.length > 0 && (
          <ul className="mt-4 flex flex-col gap-3">
            {detail.zohoNotes.map((item) => (
              <li key={item.id}>
                <p className="admin-kicker">{item.title}</p>
                <p className="whitespace-pre-wrap">{item.body}</p>
                <p className="admin-kicker mt-1">{formatCentral(item.createdAt)}</p>
              </li>
            ))}
          </ul>
        )}
      </Panel>
      <Panel>
        <h2 className="admin-title mb-3 text-3xl">Glance log</h2>
        <NoteForm
          leads={detail.feed.items}
          clients={clients.items}
          leadsLive={live}
          storeLive={notes.state === 'live'}
          preset={{ leadId: lead.id, leadLabel: leadName(lead.firstName, lead.lastName) }}
        />
        {related.length > 0 && (
          <ul className="mt-4 flex flex-col gap-2">
            {related.map((item) => (
              <li key={item.id} className="border-t border-[var(--border)] pt-2">
                <p>{item.body}</p>
                <p className="admin-kicker mt-1">{formatCentral(item.createdAt)}</p>
              </li>
            ))}
          </ul>
        )}
      </Panel>
      {lead.recordNote && (
        <p className="text-sm text-[var(--muted-foreground)]">Zoho contact description: {lead.recordNote}</p>
      )}
      {sheet && (
        <Sheet
          title={sheet.title}
          body={sheet.body}
          confirmLabel={sheet.confirm}
          busy={busy}
          onClose={() => setSheet(null)}
          onConfirm={() => {
            setBusy(true)
            sheet.run().finally(() => setBusy(false))
          }}
        />
      )}
    </div>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="admin-kicker">{label}</dt>
      <dd className="mt-1 text-base">{children}</dd>
    </div>
  )
}
