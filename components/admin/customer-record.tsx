'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Field, Panel, Sheet, sendJson } from '@/components/admin/ui'
import { useToast } from '@/components/admin/toast'
import { MONTHLY_STATUSES, PLANS, ROGER_SAVED_LINE } from '@/lib/admin/constants'
import { formatCentral, formatPhone, formatSeconds, leadName, monthlyLabel, planName, telHref } from '@/lib/admin/format'
import type { CustomerBundle } from '@/lib/admin/customer'
import type { MonthlyStatus, PlanId } from '@/lib/admin/types'

type EditMode = 'contact' | 'deal' | 'client' | 'roger' | 'note' | null

export function CustomerRecord({
  bundle,
  initialEdit,
}: {
  bundle: CustomerBundle
  initialEdit: string | null
}) {
  const router = useRouter()
  const toast = useToast()
  const lead = bundle.lead?.lead || null
  const client = bundle.client
  const [edit, setEdit] = useState<EditMode>(
    initialEdit === 'contact' || initialEdit === 'deal' || initialEdit === 'client' || initialEdit === 'roger' || initialEdit === 'note'
      ? initialEdit
      : null,
  )
  const [busy, setBusy] = useState(false)
  const [remove, setRemove] = useState<'lead' | 'client' | null>(null)
  const [contact, setContact] = useState({
    firstName: lead?.firstName || client?.contactName.split(' ')[0] || '',
    lastName: lead?.lastName || client?.contactName.split(' ').slice(1).join(' ') || '',
    phone: lead?.phone || client?.phone || '',
    email: lead?.email || client?.email || '',
    mobile: client?.ownerCell || '',
    business: client?.businessName || '',
    trade: lead?.trade || client?.trade || '',
    city: client?.city || '',
    state: '',
    message: lead?.message || client?.notes || '',
  })
  const [deal, setDeal] = useState({
    stage: lead?.deals[0]?.stage || 'New Lead',
    amount: '',
    dealId: lead?.deals[0]?.id || client?.zohoDealId || '',
  })
  const [planForm, setPlanForm] = useState({
    businessName: client?.businessName || lead?.lastName || 'New client',
    contactName: client?.contactName || (lead ? leadName(lead.firstName, lead.lastName) : ''),
    phone: client?.phone || lead?.phone || '',
    email: client?.email || lead?.email || '',
    trade: client?.trade || lead?.trade || '',
    city: client?.city || '',
    plan: (client?.plan || 'base') as PlanId,
    setupPaid: client?.setupPaid || false,
    monthlyStatus: (client?.monthlyStatus || 'active') as MonthlyStatus,
    founding: client?.founding || false,
    startDate: client?.startDate || '',
    ownerCell: client?.ownerCell || '',
    serviceArea: client?.serviceArea || '',
    hours: client?.hours || '',
    notes: client?.notes || '',
    bookingLink: client?.bookingLink || '',
  })
  const [roger, setRoger] = useState({
    enabled: bundle.roger?.enabled || false,
    textBack: bundle.roger?.textBack || '',
    questions: bundle.roger?.questions || '',
    leadPhone: bundle.roger?.leadPhone || client?.ownerCell || '',
    leadEmail: bundle.roger?.leadEmail || client?.email || '',
    bookingLink: bundle.roger?.bookingLink || client?.bookingLink || '',
  })
  const [note, setNote] = useState('')
  const [zohoNote, setZohoNote] = useState<{ id: string; body: string } | null>(null)
  const title = client?.businessName || (lead ? leadName(lead.firstName, lead.lastName) : 'Customer')
  const phone = telHref(contact.phone)

  async function saveContact() {
    if (!lead || lead.example || !bundle.zohoConnected) {
      toast(
        lead?.example
          ? 'This lead is example data. Nothing was changed.'
          : 'Zoho is not connected. Set ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, and ZOHO_REFRESH_TOKEN. Nothing was changed.',
        false,
      )
      return
    }
    setBusy(true)
    const result = await sendJson(`/api/admin/leads/${lead.id}`, 'PATCH', { ...contact, ...deal })
    setBusy(false)
    toast(result.ok ? 'Contact saved in Zoho.' : result.message, result.ok)
    if (result.ok) {
      setEdit(null)
      router.refresh()
    }
  }

  async function saveClient() {
    if (!bundle.storeLive) {
      toast(bundle.storeNotice || 'The private store is not ready. Nothing was changed.', false)
      return
    }
    setBusy(true)
    const payload = {
      ...planForm,
      zohoContactId: lead && !lead.example ? lead.id : client?.zohoContactId,
      zohoDealId: deal.dealId && /^[0-9]+$/.test(deal.dealId) ? deal.dealId : client?.zohoDealId,
    }
    const result = client
      ? await sendJson(`/api/admin/clients/${client.id}`, 'PATCH', payload)
      : await sendJson('/api/admin/clients', 'POST', payload)
    setBusy(false)
    toast(result.ok ? 'Client saved.' : result.message, result.ok)
    if (result.ok) {
      setEdit(null)
      const created = (result as { client?: { id?: string } }).client
      if (!client && created?.id) router.push(`/admin/customers/client/${created.id}`)
      else router.refresh()
    }
  }

  async function saveRoger() {
    if (!client) {
      toast('Save this person as a client first. Roger settings stay on the private client. Nothing was changed.', false)
      return
    }
    if (!bundle.storeLive) {
      toast(bundle.storeNotice || 'The private store is not ready. Nothing was changed.', false)
      return
    }
    setBusy(true)
    const result = await sendJson(`/api/admin/roger/${client.id}`, 'PUT', roger)
    setBusy(false)
    toast(result.ok ? 'Roger settings saved. They are not wired to the live text-back yet.' : result.message, result.ok)
    if (result.ok) {
      setEdit(null)
      router.refresh()
    }
  }

  async function saveNote() {
    if (!bundle.storeLive) {
      toast(bundle.storeNotice || 'The private store is not ready. Nothing was changed.', false)
      return
    }
    setBusy(true)
    const result = await sendJson('/api/admin/notes', 'POST', {
      body: note,
      leadId: lead && !lead.example ? lead.id : null,
      leadLabel: lead ? leadName(lead.firstName, lead.lastName) : null,
      clientId: client?.id || null,
      clientLabel: client?.businessName || null,
    })
    setBusy(false)
    toast(result.ok ? 'Note logged.' : result.message, result.ok)
    if (result.ok) {
      setNote('')
      setEdit(null)
      router.refresh()
    }
  }

  async function createZoho() {
    if (!bundle.zohoConnected) {
      toast('Zoho is not connected. Set ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, and ZOHO_REFRESH_TOKEN. Nothing was changed.', false)
      return
    }
    setBusy(true)
    const result = await sendJson('/api/admin/leads', 'POST', { ...contact, ...deal })
    setBusy(false)
    toast(result.ok ? 'Created in Zoho.' : result.message, result.ok)
    const created = result as { contactId?: string }
    if (result.ok && created.contactId) router.push(`/admin/customers/lead/${created.contactId}`)
  }

  return (
    <div className="admin-rise flex flex-col gap-4">
      <p className="admin-kicker">{bundle.kind === 'client' ? 'Client' : 'Lead'}</p>
      <div className="flex items-start justify-between gap-3">
        <h1 className="admin-title">{title}</h1>
        {lead?.example && <span className="admin-pill">Example</span>}
        {lead?.obviousTest && <span className="admin-pill admin-pill-solid">Test</span>}
      </div>
      {phone && (
        <a className="admin-btn" href={phone}>
          Call {formatPhone(contact.phone)}
        </a>
      )}

      <Panel>
        <div className="mb-2 flex items-center justify-between gap-2">
          <h2 className="admin-title text-3xl">Contact</h2>
          <button type="button" className="admin-choice" onClick={() => setEdit('contact')}>
            Edit
          </button>
        </div>
        <p className="text-lg">{leadName(contact.firstName, contact.lastName)}</p>
        <p className="admin-break">{contact.email || 'No email'}</p>
        <p>{formatPhone(contact.phone)}</p>
        <p className="admin-kicker">{[contact.business, contact.trade, contact.city].filter(Boolean).join(' · ') || 'No business yet'}</p>
        <p className="mt-2 whitespace-pre-wrap">{contact.message || 'No message'}</p>
      </Panel>

      <Panel>
        <div className="mb-2 flex items-center justify-between gap-2">
          <h2 className="admin-title text-3xl">Deal</h2>
          <button type="button" className="admin-choice" onClick={() => setEdit('deal')}>
            Edit
          </button>
        </div>
        {lead?.deals.length ? (
          lead.deals.map((item) => (
            <p key={item.id}>
              <span className="admin-stamp">{item.stage}</span> {item.name}
            </p>
          ))
        ) : (
          <p>No Zoho deal yet.</p>
        )}
        {!lead && (
          <button type="button" className="admin-btn mt-3" onClick={createZoho}>
            Create in Zoho
          </button>
        )}
      </Panel>

      <Panel>
        <div className="mb-2 flex items-center justify-between gap-2">
          <h2 className="admin-title text-3xl">Plan</h2>
          <button type="button" className="admin-choice" onClick={() => setEdit('client')}>
            Edit
          </button>
        </div>
        {client ? (
          <>
            <p className="admin-title text-4xl">{planName(client.plan)}</p>
            <p>
              Setup {client.founding ? 'Waived' : client.setupPaid ? 'Paid' : 'Unpaid'} · {monthlyLabel(client.monthlyStatus)}
            </p>
            <p className="admin-kicker">
              {client.founding ? 'Founding client' : 'Not founding'}
              {client.startDate ? ` · Started ${client.startDate}` : ''}
            </p>
            <p>{client.serviceArea || 'No service area yet'}</p>
            <p>{client.hours || 'No hours yet'}</p>
          </>
        ) : (
          <p>Not a private client yet. Edit the plan to save one.</p>
        )}
      </Panel>

      <Panel>
        <div className="mb-2 flex items-center justify-between gap-2">
          <h2 className="admin-title text-3xl">Roger</h2>
          <button type="button" className="admin-choice" onClick={() => setEdit('roger')}>
            Edit
          </button>
        </div>
        <p className="text-sm leading-relaxed">{ROGER_SAVED_LINE}</p>
        <p className="admin-kicker mt-2">{bundle.roger?.enabled ? 'On for this client' : 'Off for this client'}</p>
        <p className="mt-2 whitespace-pre-wrap">{bundle.roger?.textBack || 'No text-back wording yet.'}</p>
      </Panel>

      <Panel>
        <div className="mb-2 flex items-center justify-between gap-2">
          <h2 className="admin-title text-3xl">Notes</h2>
          <button type="button" className="admin-choice" onClick={() => setEdit('note')}>
            Add
          </button>
        </div>
        {bundle.notes.map((item) => (
          <p key={item.id} className="border-t border-[var(--border)] py-2">
            {item.body}
            <span className="admin-kicker block">{formatCentral(item.createdAt)}</span>
          </p>
        ))}
        {bundle.zohoNotes.map((item) => (
          <button key={item.id} type="button" className="admin-card text-left" onClick={() => setZohoNote({ id: item.id, body: item.body })}>
            <span className="admin-kicker">Zoho · {item.title}</span>
            <span>{item.body}</span>
          </button>
        ))}
        {bundle.notes.length === 0 && bundle.zohoNotes.length === 0 && <p>No notes yet.</p>}
      </Panel>

      <Panel>
        <h2 className="admin-title mb-2 text-3xl">Calls</h2>
        {bundle.calls.length === 0 ? (
          <p>No matching calls on the log.</p>
        ) : (
          bundle.calls.map((call) => (
            <Link key={call.callSid} className="admin-card" href={`/admin/calls/${call.callSid}`}>
              <span className="admin-stamp">{call.outcome === 'Missed' ? 'Missed' : 'Picked up'}</span>
              <span className="admin-title text-3xl">{formatSeconds(call.talkSeconds)}</span>
              <span className="admin-kicker">{formatCentral(call.startedAt)}</span>
            </Link>
          ))
        )}
      </Panel>

      <div className="grid gap-2">
        {lead && (
          <button type="button" className="admin-btn admin-btn-ghost" onClick={() => setRemove('lead')}>
            Delete Zoho contact
          </button>
        )}
        {client && (
          <button type="button" className="admin-btn admin-btn-ghost" onClick={() => setRemove('client')}>
            Delete client
          </button>
        )}
      </div>

      {edit === 'contact' && (
        <SheetForm title="Edit contact" busy={busy} onClose={() => setEdit(null)} onSave={saveContact}>
          <Field label="First name">
            <input className="admin-field" value={contact.firstName} onChange={(event) => setContact({ ...contact, firstName: event.target.value })} />
          </Field>
          <Field label="Last name">
            <input className="admin-field" value={contact.lastName} onChange={(event) => setContact({ ...contact, lastName: event.target.value })} />
          </Field>
          <Field label="Phone">
            <input className="admin-field" inputMode="tel" value={contact.phone} onChange={(event) => setContact({ ...contact, phone: event.target.value })} />
          </Field>
          <Field label="Email">
            <input className="admin-field" type="email" value={contact.email} onChange={(event) => setContact({ ...contact, email: event.target.value })} />
          </Field>
          <Field label="Business">
            <input className="admin-field" value={contact.business} onChange={(event) => setContact({ ...contact, business: event.target.value })} />
          </Field>
          <Field label="Trade">
            <input className="admin-field" value={contact.trade} onChange={(event) => setContact({ ...contact, trade: event.target.value })} />
          </Field>
          <Field label="City">
            <input className="admin-field" value={contact.city} onChange={(event) => setContact({ ...contact, city: event.target.value })} />
          </Field>
          <Field label="Message">
            <textarea className="admin-area" value={contact.message} onChange={(event) => setContact({ ...contact, message: event.target.value })} />
          </Field>
        </SheetForm>
      )}

      {edit === 'deal' && (
        <SheetForm title="Edit deal" busy={busy} onClose={() => setEdit(null)} onSave={saveContact}>
          <div className="grid grid-cols-2 gap-2">
            {(bundle.lead?.stages || []).map((stage) => (
              <button key={stage.bucket} type="button" className="admin-choice" aria-pressed={deal.stage === stage.zohoStage} onClick={() => setDeal({ ...deal, stage: stage.zohoStage })}>
                {stage.label}
              </button>
            ))}
          </div>
          <Field label="Amount">
            <input className="admin-field" inputMode="decimal" value={deal.amount} onChange={(event) => setDeal({ ...deal, amount: event.target.value })} placeholder="0" />
          </Field>
        </SheetForm>
      )}

      {edit === 'client' && (
        <SheetForm title={client ? 'Edit client' : 'Save as client'} busy={busy} onClose={() => setEdit(null)} onSave={saveClient}>
          <ClientFields planForm={planForm} setPlanForm={setPlanForm} />
        </SheetForm>
      )}

      {edit === 'roger' && (
        <SheetForm title="Roger settings" busy={busy} onClose={() => setEdit(null)} onSave={saveRoger}>
          <p className="text-sm leading-relaxed">{ROGER_SAVED_LINE}</p>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" className="admin-choice" aria-pressed={roger.enabled} onClick={() => setRoger({ ...roger, enabled: true })}>
              On
            </button>
            <button type="button" className="admin-choice" aria-pressed={!roger.enabled} onClick={() => setRoger({ ...roger, enabled: false })}>
              Off
            </button>
          </div>
          <Field label="Text-back wording">
            <textarea className="admin-area" value={roger.textBack} onChange={(event) => setRoger({ ...roger, textBack: event.target.value })} />
          </Field>
          <Field label="Questions Roger asks">
            <textarea className="admin-area" value={roger.questions} onChange={(event) => setRoger({ ...roger, questions: event.target.value })} />
          </Field>
          <Field label="Send leads to this phone">
            <input className="admin-field" inputMode="tel" value={roger.leadPhone} onChange={(event) => setRoger({ ...roger, leadPhone: event.target.value })} />
          </Field>
          <Field label="Send leads to this email">
            <input className="admin-field" type="email" value={roger.leadEmail} onChange={(event) => setRoger({ ...roger, leadEmail: event.target.value })} />
          </Field>
          <Field label="Booking link">
            <input className="admin-field" inputMode="url" value={roger.bookingLink} onChange={(event) => setRoger({ ...roger, bookingLink: event.target.value })} placeholder="https://" />
          </Field>
        </SheetForm>
      )}

      {edit === 'note' && (
        <SheetForm title="Glance note" busy={busy} onClose={() => setEdit(null)} onSave={saveNote}>
          <Field label="Note">
            <textarea className="admin-area" value={note} onChange={(event) => setNote(event.target.value)} />
          </Field>
        </SheetForm>
      )}

      {zohoNote && (
        <SheetForm
          title="Edit Zoho note"
          busy={busy}
          onClose={() => setZohoNote(null)}
          onSave={async () => {
            if (!bundle.zohoConnected) {
              toast('Zoho is not connected. Nothing was changed.', false)
              return
            }
            setBusy(true)
            const result = await sendJson(`/api/admin/notes/zoho/${zohoNote.id}`, 'PATCH', { body: zohoNote.body })
            setBusy(false)
            toast(result.ok ? 'Zoho note saved.' : result.message, result.ok)
            if (result.ok) {
              setZohoNote(null)
              router.refresh()
            }
          }}
        >
          <textarea className="admin-area" value={zohoNote.body} onChange={(event) => setZohoNote({ ...zohoNote, body: event.target.value })} />
        </SheetForm>
      )}

      {remove && (
        <Sheet
          title={remove === 'lead' ? 'Delete Zoho contact' : 'Delete client'}
          body={
            remove === 'lead'
              ? `Delete ${title} from Zoho, including the deal. This does not remove a private client.`
              : `Remove ${title} from the private board. This does not delete Zoho.`
          }
          confirmLabel="Delete"
          busy={busy}
          onClose={() => setRemove(null)}
          onConfirm={async () => {
            setBusy(true)
            const result =
              remove === 'lead' && lead
                ? await sendJson(`/api/admin/leads/${lead.id}`, 'DELETE', { confirm: true })
                : client
                  ? await sendJson(`/api/admin/clients/${client.id}`, 'DELETE', { confirm: true })
                  : { ok: false, message: 'Nothing to delete.' }
            setBusy(false)
            toast(result.ok ? 'Deleted.' : result.message, result.ok)
            if (result.ok) router.push(remove === 'lead' ? '/admin/leads' : '/admin/clients')
          }}
        />
      )}
    </div>
  )
}

function SheetForm({
  title,
  children,
  busy,
  onClose,
  onSave,
}: {
  title: string
  children: React.ReactNode
  busy: boolean
  onClose: () => void
  onSave: () => void
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  const root = document.querySelector('.admin-deck') || document.body
  return createPortal(
    <div className="admin-sheet" role="presentation" onClick={onClose}>
      <form
        className="admin-sheet-card flex max-h-[85dvh] flex-col gap-3 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
        onSubmit={(event) => {
          event.preventDefault()
          onSave()
        }}
      >
        <h2 className="admin-title text-4xl">{title}</h2>
        {children}
        <button className="admin-btn" type="submit" disabled={busy}>
          {busy ? 'Saving' : 'Save'}
        </button>
        <button className="admin-btn admin-btn-ghost" type="button" onClick={onClose}>
          Close
        </button>
      </form>
    </div>,
    root,
  )
}

function ClientFields({
  planForm,
  setPlanForm,
}: {
  planForm: {
    businessName: string
    contactName: string
    phone: string
    email: string
    trade: string
    city: string
    plan: PlanId
    setupPaid: boolean
    monthlyStatus: MonthlyStatus
    founding: boolean
    startDate: string
    ownerCell: string
    serviceArea: string
    hours: string
    notes: string
    bookingLink: string
  }
  setPlanForm: (next: typeof planForm) => void
}) {
  return (
    <>
      <Field label="Business">
        <input className="admin-field" value={planForm.businessName} onChange={(event) => setPlanForm({ ...planForm, businessName: event.target.value })} required />
      </Field>
      <Field label="Owner name">
        <input className="admin-field" value={planForm.contactName} onChange={(event) => setPlanForm({ ...planForm, contactName: event.target.value })} />
      </Field>
      <Field label="Business phone">
        <input className="admin-field" inputMode="tel" value={planForm.phone} onChange={(event) => setPlanForm({ ...planForm, phone: event.target.value })} />
      </Field>
      <Field label="Owner cell for lead alerts">
        <input className="admin-field" inputMode="tel" value={planForm.ownerCell} onChange={(event) => setPlanForm({ ...planForm, ownerCell: event.target.value })} />
      </Field>
      <Field label="Email">
        <input className="admin-field" type="email" value={planForm.email} onChange={(event) => setPlanForm({ ...planForm, email: event.target.value })} />
      </Field>
      <Field label="Trade">
        <input className="admin-field" value={planForm.trade} onChange={(event) => setPlanForm({ ...planForm, trade: event.target.value })} />
      </Field>
      <Field label="City">
        <input className="admin-field" value={planForm.city} onChange={(event) => setPlanForm({ ...planForm, city: event.target.value })} />
      </Field>
      <Field label="Service area">
        <input className="admin-field" value={planForm.serviceArea} onChange={(event) => setPlanForm({ ...planForm, serviceArea: event.target.value })} />
      </Field>
      <Field label="Hours">
        <input className="admin-field" value={planForm.hours} onChange={(event) => setPlanForm({ ...planForm, hours: event.target.value })} />
      </Field>
      <Field label="Start date">
        <input className="admin-field" type="date" value={planForm.startDate} onChange={(event) => setPlanForm({ ...planForm, startDate: event.target.value })} />
      </Field>
      <fieldset>
        <legend className="admin-kicker mb-2">Plan</legend>
        <div className="grid grid-cols-3 gap-2">
          {PLANS.map((plan) => (
            <button key={plan.id} type="button" className="admin-choice" aria-pressed={planForm.plan === plan.id} onClick={() => setPlanForm({ ...planForm, plan: plan.id })}>
              {plan.name} ${plan.month}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="admin-kicker mb-2">Setup paid</legend>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" className="admin-choice" aria-pressed={planForm.setupPaid} onClick={() => setPlanForm({ ...planForm, setupPaid: true })}>
            Yes
          </button>
          <button type="button" className="admin-choice" aria-pressed={!planForm.setupPaid} onClick={() => setPlanForm({ ...planForm, setupPaid: false })}>
            No
          </button>
        </div>
      </fieldset>
      <fieldset>
        <legend className="admin-kicker mb-2">Monthly</legend>
        <div className="grid grid-cols-2 gap-2">
          {MONTHLY_STATUSES.map((status) => (
            <button key={status.id} type="button" className="admin-choice" aria-pressed={planForm.monthlyStatus === status.id} onClick={() => setPlanForm({ ...planForm, monthlyStatus: status.id })}>
              {status.label}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="admin-kicker mb-2">Founding client</legend>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" className="admin-choice" aria-pressed={planForm.founding} onClick={() => setPlanForm({ ...planForm, founding: true })}>
            Yes
          </button>
          <button type="button" className="admin-choice" aria-pressed={!planForm.founding} onClick={() => setPlanForm({ ...planForm, founding: false })}>
            No
          </button>
        </div>
      </fieldset>
      <Field label="Notes">
        <textarea className="admin-area" value={planForm.notes} onChange={(event) => setPlanForm({ ...planForm, notes: event.target.value })} />
      </Field>
    </>
  )
}
