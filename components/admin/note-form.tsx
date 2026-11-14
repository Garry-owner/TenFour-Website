'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Field, sendJson } from '@/components/admin/ui'
import type { ClientRecord, Lead } from '@/lib/admin/types'
import { leadName } from '@/lib/admin/format'

export function NoteForm({
  leads,
  clients,
  leadsLive,
  storeLive,
  preset,
}: {
  leads: Lead[]
  clients: ClientRecord[]
  leadsLive: boolean
  storeLive: boolean
  preset?: { leadId?: string; leadLabel?: string; callSid?: string; callLabel?: string; clientId?: string }
}) {
  const router = useRouter()
  const [body, setBody] = useState('')
  const [leadId, setLeadId] = useState(preset?.leadId && leadsLive ? preset.leadId : '')
  const [clientId, setClientId] = useState(preset?.clientId || '')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!storeLive) {
      setMessage('The private store is not ready on this deploy. The note was not saved.')
      return
    }
    setBusy(true)
    const lead = leads.find((item) => item.id === leadId)
    const client = clients.find((item) => item.id === clientId)
    const result = await sendJson('/api/admin/notes', 'POST', {
      body,
      leadId: leadId || null,
      leadLabel: lead ? leadName(lead.firstName, lead.lastName) : preset?.leadLabel || null,
      clientId: clientId || null,
      clientLabel: client?.businessName || null,
      callSid: preset?.callSid || null,
      callLabel: preset?.callLabel || null,
    })
    setBusy(false)
    setMessage(result.ok ? 'Logged.' : result.message)
    if (result.ok) {
      setBody('')
      router.refresh()
    }
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={onSubmit}>
      <Field label="Glance note">
        <textarea
          className="admin-area"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          maxLength={2000}
          placeholder="What just happened?"
          onKeyDown={(event) => {
            if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
              event.currentTarget.form?.requestSubmit()
            }
          }}
        />
      </Field>
      <Field label="Tie to a lead">
        <select
          className="admin-select"
          value={leadId}
          onChange={(event) => setLeadId(event.target.value)}
          disabled={!leadsLive}
        >
          <option value="">{leadsLive ? 'No lead' : 'Leads are examples, so this tie stays off'}</option>
          {leadsLive &&
            leads.map((lead) => (
              <option key={lead.id} value={lead.id}>
                {leadName(lead.firstName, lead.lastName)}
              </option>
            ))}
        </select>
      </Field>
      <Field label="Tie to a client">
        <select className="admin-select" value={clientId} onChange={(event) => setClientId(event.target.value)}>
          <option value="">No client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.businessName}
            </option>
          ))}
        </select>
      </Field>
      {preset?.callSid && (
        <p className="admin-kicker">Tied to this call when you save.</p>
      )}
      <button className="admin-btn" type="submit" disabled={busy}>
        {busy ? 'Logging' : 'Log it'}
      </button>
      {message && <p className="admin-banner">{message}</p>}
    </form>
  )
}
