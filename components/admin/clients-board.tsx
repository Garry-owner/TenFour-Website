'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FeedBanner, Field, Panel, Sheet, sendJson } from '@/components/admin/ui'
import { FOUNDING_LINE, FOUNDING_REVIEW, FOUNDING_SEATS, MONTHLY_STATUSES, PLANS } from '@/lib/admin/constants'
import { formatPhone, monthlyLabel, planName, planPrice, setupLabel, telHref } from '@/lib/admin/format'
import type { ClientRecord, Feed, MonthlyStatus, PlanId } from '@/lib/admin/types'

const EMPTY = {
  businessName: '',
  contactName: '',
  phone: '',
  email: '',
  trade: '',
  plan: 'base' as PlanId,
  setupPaid: false,
  monthlyStatus: 'active' as MonthlyStatus,
  founding: false,
  bookingLink: '',
  notes: '',
  startDate: '',
  ownerCell: '',
  serviceArea: '',
  hours: '',
  city: '',
}

export function ClientsBoard({ feed, startOpen = false }: { feed: Feed<ClientRecord>; startOpen?: boolean }) {
  const router = useRouter()
  const [draft, setDraft] = useState(EMPTY)
  const [editing, setEditing] = useState<string | null>(null)
  const [open, setOpen] = useState(startOpen)
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const [removeId, setRemoveId] = useState<ClientRecord | null>(null)
  const founding = feed.items.filter((client) => client.founding).length
  const live = feed.state === 'live'

  function startNew() {
    setEditing(null)
    setDraft(EMPTY)
    setOpen(true)
    setMessage('')
  }

  function startEdit(client: ClientRecord) {
    setEditing(client.id)
    setDraft({
      businessName: client.businessName,
      contactName: client.contactName,
      phone: client.phone,
      email: client.email,
      trade: client.trade,
      plan: client.plan,
      setupPaid: client.setupPaid,
      monthlyStatus: client.monthlyStatus,
      founding: client.founding,
      bookingLink: client.bookingLink,
      notes: client.notes,
      startDate: client.startDate || '',
      ownerCell: client.ownerCell,
      serviceArea: client.serviceArea,
      hours: client.hours,
      city: client.city,
    })
    setOpen(true)
    setMessage('')
  }

  async function save(event: React.FormEvent) {
    event.preventDefault()
    if (!live) {
      setMessage('The private store is not ready, so this client was not saved.')
      return
    }
    setBusy(true)
    const result = editing
      ? await sendJson(`/api/admin/clients/${editing}`, 'PATCH', draft)
      : await sendJson('/api/admin/clients', 'POST', draft)
    setBusy(false)
    setMessage(result.ok ? 'Saved on the private board.' : result.message)
    if (result.ok) {
      setOpen(false)
      router.refresh()
    }
  }

  return (
    <div className="admin-rise flex flex-col gap-4">
      <div>
        <p className="admin-kicker">Private roster</p>
        <h1 className="admin-title text-6xl">Clients</h1>
      </div>
      <p className="admin-roger">{FOUNDING_LINE}</p>
      <p className="text-sm text-[var(--muted-foreground)]">{FOUNDING_REVIEW}</p>
      <div className="grid gap-2">
        {PLANS.map((plan) => (
          <p key={plan.id} className="admin-kicker">
            {plan.name} ${plan.setup} setup / ${plan.month} month
          </p>
        ))}
      </div>
      <p className="admin-title text-4xl">
        {String(founding).padStart(2, '0')}
        <span className="text-2xl"> / {FOUNDING_SEATS} founding</span>
      </p>
      <FeedBanner notice={feed.notice} />
      {feed.items.length === 0 && (
        <Panel>
          <p className="admin-title text-5xl">No clients yet</p>
          <p className="mt-3 text-base leading-relaxed">
            Nobody is paying. When someone is actually on Base, Pro, or Elite, add them here. This roster stays in the
            private store, not in Zoho, Make, or Twilio.
          </p>
        </Panel>
      )}
      <ul className="flex flex-col gap-2">
        {feed.items.map((client) => {
          const phone = telHref(client.phone)
          return (
            <li key={client.id} className="admin-card">
              <span className="flex items-start justify-between gap-2">
                <span className="admin-title text-3xl">{client.businessName}</span>
                {client.founding && <span className="admin-stamp admin-stamp-solid">Founding</span>}
              </span>
              <span className="admin-kicker">
                {planName(client.plan)} · {planPrice(client.plan)}
              </span>
              <span>
                Setup {setupLabel(client.founding, client.setupPaid)} · Monthly {monthlyLabel(client.monthlyStatus)}
              </span>
              {client.contactName && <span>{client.contactName}</span>}
              {phone && (
                <a className="underline decoration-[var(--primary)]" href={phone}>
                  {formatPhone(client.phone)}
                </a>
              )}
              {client.trade && <span className="admin-kicker">{client.trade}</span>}
              <button type="button" className="admin-btn admin-btn-ghost" onClick={() => startEdit(client)}>
                Edit
              </button>
            </li>
          )
        })}
      </ul>
      <button type="button" className="admin-btn" onClick={startNew}>
        Add a client
      </button>
      {open && (
        <form className="admin-panel flex flex-col gap-3" onSubmit={save}>
          <h2 className="admin-title text-4xl">{editing ? 'Edit client' : 'New client'}</h2>
          <Field label="Business">
            <input className="admin-field" value={draft.businessName} onChange={(event) => setDraft({ ...draft, businessName: event.target.value })} required />
          </Field>
          <Field label="Contact name">
            <input className="admin-field" value={draft.contactName} onChange={(event) => setDraft({ ...draft, contactName: event.target.value })} />
          </Field>
          <Field label="Phone">
            <input className="admin-field" inputMode="tel" value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} />
          </Field>
          <Field label="Email">
            <input className="admin-field" type="email" value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} />
          </Field>
          <Field label="Trade">
            <input className="admin-field" value={draft.trade} onChange={(event) => setDraft({ ...draft, trade: event.target.value })} />
          </Field>
          <fieldset>
            <legend className="admin-kicker mb-2">Plan</legend>
            <div className="grid grid-cols-3 gap-2">
              {PLANS.map((plan) => (
                <button key={plan.id} type="button" className="admin-choice" aria-pressed={draft.plan === plan.id} onClick={() => setDraft({ ...draft, plan: plan.id })}>
                  {plan.name}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="admin-kicker mb-2">Setup paid</legend>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" className="admin-choice" aria-pressed={draft.setupPaid} onClick={() => setDraft({ ...draft, setupPaid: true })}>
                Paid
              </button>
              <button type="button" className="admin-choice" aria-pressed={!draft.setupPaid} onClick={() => setDraft({ ...draft, setupPaid: false })}>
                Unpaid
              </button>
            </div>
            {draft.founding && <p className="mt-2 text-sm">Founding clients show setup as waived.</p>}
          </fieldset>
          <fieldset>
            <legend className="admin-kicker mb-2">Monthly</legend>
            <div className="grid grid-cols-2 gap-2">
              {MONTHLY_STATUSES.map((status) => (
                <button key={status.id} type="button" className="admin-choice" aria-pressed={draft.monthlyStatus === status.id} onClick={() => setDraft({ ...draft, monthlyStatus: status.id })}>
                  {status.label}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="admin-kicker mb-2">Founding client</legend>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" className="admin-choice" aria-pressed={draft.founding} onClick={() => setDraft({ ...draft, founding: true })}>
                Yes
              </button>
              <button type="button" className="admin-choice" aria-pressed={!draft.founding} onClick={() => setDraft({ ...draft, founding: false })}>
                No
              </button>
            </div>
          </fieldset>
          <Field label="Booking link">
            <input className="admin-field" inputMode="url" value={draft.bookingLink} onChange={(event) => setDraft({ ...draft, bookingLink: event.target.value })} placeholder="https://" />
          </Field>
          <Field label="Owner cell">
            <input className="admin-field" inputMode="tel" value={draft.ownerCell} onChange={(event) => setDraft({ ...draft, ownerCell: event.target.value })} />
          </Field>
          <Field label="City">
            <input className="admin-field" value={draft.city} onChange={(event) => setDraft({ ...draft, city: event.target.value })} />
          </Field>
          <Field label="Service area">
            <input className="admin-field" value={draft.serviceArea} onChange={(event) => setDraft({ ...draft, serviceArea: event.target.value })} />
          </Field>
          <Field label="Hours">
            <input className="admin-field" value={draft.hours} onChange={(event) => setDraft({ ...draft, hours: event.target.value })} />
          </Field>
          <Field label="Start date">
            <input className="admin-field" type="date" value={draft.startDate} onChange={(event) => setDraft({ ...draft, startDate: event.target.value })} />
          </Field>
          <Field label="Notes">
            <textarea className="admin-area" value={draft.notes} onChange={(event) => setDraft({ ...draft, notes: event.target.value })} />
          </Field>
          {message && <p className="admin-banner">{message}</p>}
          <button className="admin-btn" type="submit" disabled={busy}>
            {busy ? 'Saving' : 'Save client'}
          </button>
          {editing && (
            <button
              type="button"
              className="admin-btn admin-btn-ghost"
              onClick={() => setRemoveId(feed.items.find((item) => item.id === editing) || null)}
            >
              Remove client
            </button>
          )}
        </form>
      )}
      {removeId && (
        <Sheet
          title="Remove client"
          body={`Remove ${removeId.businessName} from the private board. This does not touch Zoho, Make, or Twilio.`}
          confirmLabel="Remove"
          busy={busy}
          onClose={() => setRemoveId(null)}
          onConfirm={async () => {
            setBusy(true)
            const result = await sendJson(`/api/admin/clients/${removeId.id}`, 'DELETE', { confirm: true })
            setBusy(false)
            setMessage(result.ok ? 'Removed from the private board.' : result.message)
            if (result.ok) {
              setRemoveId(null)
              setOpen(false)
              router.refresh()
            }
          }}
        />
      )}
    </div>
  )
}
