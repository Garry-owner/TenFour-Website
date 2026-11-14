'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { NoteForm } from '@/components/admin/note-form'
import { FeedBanner, Panel, Sheet, sendJson } from '@/components/admin/ui'
import { formatCentral } from '@/lib/admin/format'
import type { ClientRecord, Feed, GlanceNote, Lead } from '@/lib/admin/types'

export function LogBoard({
  notes,
  leads,
  clients,
  leadsLive,
}: {
  notes: Feed<GlanceNote>
  leads: Lead[]
  clients: Feed<ClientRecord>
  leadsLive: boolean
}) {
  const router = useRouter()
  const [editing, setEditing] = useState<GlanceNote | null>(null)
  const [body, setBody] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const [remove, setRemove] = useState<GlanceNote | null>(null)

  function begin(note: GlanceNote) {
    setEditing(note)
    setBody(note.body)
    setMessage('')
  }

  async function save(event: React.FormEvent) {
    event.preventDefault()
    if (!editing) return
    setBusy(true)
    const result = await sendJson(`/api/admin/notes/${editing.id}`, 'PATCH', {
      body,
      leadId: editing.leadId,
      leadLabel: editing.leadLabel,
      clientId: editing.clientId,
      clientLabel: editing.clientLabel,
      callSid: editing.callSid,
      callLabel: editing.callLabel,
    })
    setBusy(false)
    setMessage(result.ok ? 'Note updated.' : result.message)
    if (result.ok) {
      setEditing(null)
      router.refresh()
    }
  }

  return (
    <div className="admin-rise flex flex-col gap-4">
      <div>
        <p className="admin-kicker">Private notes</p>
        <h1 className="admin-title text-6xl">Glance log</h1>
      </div>
      <FeedBanner notice={notes.notice} />
      <Panel>
        <NoteForm leads={leads} clients={clients.items} leadsLive={leadsLive} storeLive={notes.state === 'live'} />
      </Panel>
      {notes.items.length === 0 ? (
        <p className="admin-panel">The log is empty. The first note can be anything you want to remember.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {notes.items.map((note) => (
            <li key={note.id} className="admin-card">
              <p className="whitespace-pre-wrap">{note.body}</p>
              <p className="admin-kicker">
                {[note.leadLabel && `Lead ${note.leadLabel}`, note.clientLabel && `Client ${note.clientLabel}`, note.callLabel && note.callLabel]
                  .filter(Boolean)
                  .join(' · ') || 'Untied'}
              </p>
              <p className="text-sm">{formatCentral(note.createdAt)}</p>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" className="admin-choice" onClick={() => begin(note)}>
                  Edit
                </button>
                <button type="button" className="admin-choice" onClick={() => setRemove(note)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {editing && (
        <form className="admin-panel flex flex-col gap-3" onSubmit={save}>
          <h2 className="admin-title text-3xl">Edit note</h2>
          <textarea className="admin-area" value={body} onChange={(event) => setBody(event.target.value)} />
          {message && <p className="admin-banner">{message}</p>}
          <button className="admin-btn" type="submit" disabled={busy}>
            {busy ? 'Saving' : 'Save note'}
          </button>
        </form>
      )}
      {remove && (
        <Sheet
          title="Remove note"
          body="This deletes the note from the private log only."
          confirmLabel="Remove"
          busy={busy}
          onClose={() => setRemove(null)}
          onConfirm={async () => {
            setBusy(true)
            const result = await sendJson(`/api/admin/notes/${remove.id}`, 'DELETE', { confirm: true })
            setBusy(false)
            if (result.ok) {
              setRemove(null)
              router.refresh()
            } else {
              setMessage(result.message)
              setRemove(null)
            }
          }}
        />
      )}
    </div>
  )
}
