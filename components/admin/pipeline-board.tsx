'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sheet, sendJson } from '@/components/admin/ui'
import { useToast } from '@/components/admin/toast'
import { leadName } from '@/lib/admin/format'
import type { Lead } from '@/lib/admin/types'

const COLUMNS = [
  { id: 'new', label: 'New', bucket: 'new' },
  { id: 'texted', label: 'Texted', bucket: 'contacted' },
  { id: 'booked', label: 'Booked', bucket: 'followup' },
  { id: 'lost', label: 'Lost', bucket: 'closed' },
] as const

function columnFor(lead: Lead): (typeof COLUMNS)[number]['id'] {
  if (/book/i.test(lead.stageLabel)) return 'booked'
  if (/lost/i.test(lead.stageLabel)) return 'lost'
  if (lead.bucket === 'contacted') return 'texted'
  if (lead.bucket === 'followup') return 'booked'
  if (lead.bucket === 'closed') return 'lost'
  return 'new'
}

export function PipelineBoard({ leads, zoho }: { leads: Lead[]; zoho: boolean }) {
  const toast = useToast()
  const router = useRouter()
  const [picked, setPicked] = useState<{ lead: Lead; bucket: string; label: string } | null>(null)
  const [busy, setBusy] = useState(false)
  return (
    <div className="admin-rise flex flex-col gap-4">
      <h1 className="admin-title">Pipeline</h1>
      <p className="admin-muted">Tap a lead, then the column it belongs in. Zoho changes only after you confirm, and only when Zoho is connected.</p>
      {!zoho && <p className="admin-note"><span>Zoho is not connected. Moving a lead will not change Zoho.</span></p>}
      {COLUMNS.map((column) => (
        <section key={column.id}>
          <h2 className="mb-2">{column.label}</h2>
          <div className="admin-list">
            {leads.filter((lead) => columnFor(lead) === column.id).map((lead) => (
              <div key={lead.id} className="admin-row">
                <span className="admin-row-copy">
                  <strong className="admin-pii">{leadName(lead.firstName, lead.lastName)}</strong>
                  <span className="admin-pii">{lead.stageLabel}</span>
                </span>
                <span className="flex flex-col gap-1">
                  {COLUMNS.filter((item) => item.id !== column.id).map((item) => (
                    <button key={item.id} type="button" className="admin-link text-left" onClick={() => setPicked({ lead, bucket: item.bucket, label: item.label })}>
                      {item.label}
                    </button>
                  ))}
                </span>
              </div>
            ))}
            {leads.filter((lead) => columnFor(lead) === column.id).length === 0 && <p className="admin-row">None</p>}
          </div>
        </section>
      ))}
      {picked && (
        <Sheet
          title={`Move to ${picked.label}`}
          body={zoho ? 'This writes the stage in Zoho.' : 'Zoho is not connected. Nothing will be changed.'}
          confirmLabel={zoho ? 'Move it' : 'Close'}
          busy={busy}
          onClose={() => setPicked(null)}
          onConfirm={async () => {
            if (!zoho || picked.lead.example) {
              toast('Zoho is not connected. Nothing was changed.', false)
              setPicked(null)
              return
            }
            setBusy(true)
            const result = await sendJson(`/api/admin/leads/${picked.lead.id}/stage`, 'POST', { confirm: true, bucket: picked.bucket })
            setBusy(false)
            toast(result.ok ? 'Stage updated.' : result.message, result.ok)
            setPicked(null)
            if (result.ok) router.refresh()
          }}
        />
      )}
    </div>
  )
}
