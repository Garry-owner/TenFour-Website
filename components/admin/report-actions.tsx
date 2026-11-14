'use client'

import { useState } from 'react'
import { LogoMark } from '@/components/brand-logo'
import { Sheet, sendJson } from '@/components/admin/ui'
import { useToast } from '@/components/admin/toast'
import type { PeriodReport } from '@/lib/admin/insights'

export function ReportPreview({
  report,
  clientId,
  email,
  phone,
  fromNumber,
  emailWired,
  smsWired,
  example,
}: {
  report: PeriodReport
  clientId: string
  email: string
  phone: string
  fromNumber: string
  emailWired: boolean
  smsWired: boolean
  example: boolean
}) {
  const toast = useToast()
  const [confirm, setConfirm] = useState<'email' | 'sms' | null>(null)
  const [busy, setBusy] = useState(false)
  const text = [
    report.summary,
    `Missed calls caught: ${report.missed}`,
    `Callers texted back: ${report.texted}`,
    `Booking links sent: ${report.bookingLinks}`,
    `After hours: ${report.afterHours}. Business hours: ${report.businessHours}.`,
    report.busiest,
    report.money ? `Money caught: ${report.money}` : '',
    ...report.leads.map((lead) => `${lead.name}, ${lead.phone}`),
  ].filter(Boolean).join('\n')

  return (
    <div className="flex flex-col gap-4">
      <article className="admin-panel flex flex-col gap-3">
        <LogoMark className="h-8 w-8" />
        <p className="admin-kicker">TenFour</p>
        <h1 className="admin-title">Client report</h1>
        <p>{report.summary}</p>
        <p>Missed calls caught: {report.missed}</p>
        <p>Callers texted back: {report.texted}</p>
        <p>Booking links sent: {report.bookingLinks}</p>
        {report.bookingNote && <p className="admin-muted">{report.bookingNote}</p>}
        <p>After hours {report.afterHours}. Business hours {report.businessHours}.</p>
        <p className="admin-muted">{report.hoursNote}</p>
        <p>{report.busiest}</p>
        <p>Languages: {report.languages.length ? report.languages.map((row) => `${row.language} ${row.count}`).join(', ') : 'none yet'}</p>
        {report.languageNote && <p className="admin-muted">{report.languageNote}</p>}
        {report.money && <p>Money caught: {report.money}</p>}
        <div>
          <p className="admin-muted">Leads sent to the owner</p>
          {report.leads.length === 0 ? <p>None in this period.</p> : report.leads.map((lead) => (
            <p key={lead.phone} className="admin-pii">{lead.name}, {lead.phone}</p>
          ))}
        </div>
      </article>
      <a className="admin-btn" href={`/api/admin/reports/pdf?client=${clientId}&from=${report.from}&to=${report.to}`}>Download PDF</a>
      <button
        type="button"
        className="admin-btn admin-btn-ghost"
        onClick={async () => {
          await navigator.clipboard.writeText(window.location.href)
          toast('Link copied. It opens on this board after you sign in.', true)
        }}
      >
        Copy link
      </button>
      <button type="button" className="admin-btn admin-btn-ghost" disabled={!emailWired || !email} onClick={() => setConfirm('email')}>Send to email</button>
      <button type="button" className="admin-btn admin-btn-ghost" disabled={!smsWired || !phone} onClick={() => setConfirm('sms')}>Send to phone</button>
      {!emailWired && <p className="admin-muted">Email is not connected. Nothing will be sent.</p>}
      {!smsWired && <p className="admin-muted">Texting is not connected. Nothing will be sent.</p>}
      {confirm && (
        <Sheet
          title={confirm === 'email' ? 'Send by email' : 'Send by text'}
          body={`To ${confirm === 'email' ? email : phone}. ${report.summary}`}
          confirmLabel="Send"
          busy={busy}
          onClose={() => setConfirm(null)}
          onConfirm={async () => {
            if (example) {
              toast('This is example data. Nothing was sent.', false)
              setConfirm(null)
              return
            }
            setBusy(true)
            const result = await sendJson('/api/admin/desk', 'POST', {
              action: 'send-report',
              confirm: true,
              clientId,
              channel: confirm,
              to: confirm === 'email' ? email : phone,
              from: fromNumber,
              summary: text,
            })
            setBusy(false)
            toast(result.message || (result.ok ? 'Sent.' : 'Not sent.'), result.ok)
            setConfirm(null)
          }}
        />
      )}
    </div>
  )
}
