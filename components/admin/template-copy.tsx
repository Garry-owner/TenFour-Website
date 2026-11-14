'use client'

import { useState } from 'react'
import { sendJson } from '@/components/admin/ui'
import { useToast } from '@/components/admin/toast'
import { useConfirm } from '@/components/admin/confirm'
import { fillScript } from '@/lib/admin/templates'

export function TemplateCopy({
  scripts,
  clients,
}: {
  scripts: { trade: string; greeting: string; questions: string }[]
  clients: { id: string; name: string }[]
}) {
  const [clientId, setClientId] = useState(clients[0]?.id || '')
  const toast = useToast()
  const confirm = useConfirm()
  return (
    <div className="flex flex-col gap-3">
      <label className="admin-muted">Copy onto
        <select className="admin-field" value={clientId} onChange={(event) => setClientId(event.target.value)}>
          {clients.length === 0 && <option value="">No saved clients yet</option>}
          {clients.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}
        </select>
      </label>
      {scripts.map((script) => (
        <article key={script.trade} className="admin-panel flex flex-col gap-2">
          <h2>{script.trade}</h2>
          <p>{script.greeting}</p>
          <button
            type="button"
            className="admin-btn"
            onClick={async () => {
              const client = clients.find((item) => item.id === clientId)
              if (!client) return toast('Add a client first. Nothing was copied.', false)
              if (!(await confirm('Copy this template', `This replaces the text-back and questions for ${client.name} with the ${script.trade} template. Alert phone, email, and booking link stay as they are. Nothing is sent.`))) return
              const result = await sendJson('/api/admin/desk', 'POST', {
                action: 'texts',
                clientId: client.id,
                textBack: fillScript(script.greeting, client.name, ''),
                questions: fillScript(script.questions, client.name, ''),
                confirm: true,
              })
              toast(result.ok ? `Copied onto ${client.name}.` : result.message, result.ok)
            }}
          >
            Copy to client
          </button>
        </article>
      ))}
    </div>
  )
}
