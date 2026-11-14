import { TRADE_SCRIPTS } from '@/lib/admin/templates'
import { loadClients } from '@/lib/admin/store'
import { TemplateCopy } from '@/components/admin/template-copy'

export const dynamic = 'force-dynamic'

export default async function TemplatesPage() {
  const clients = await loadClients()
  return (
    <div className="admin-rise flex flex-col gap-4">
      <h1 className="admin-title">Roger scripts</h1>
      <p className="admin-muted">Starter texts for the trades. Copy one onto a client in one tap. Placeholders become the business name when you copy.</p>
      <TemplateCopy
        scripts={TRADE_SCRIPTS}
        clients={clients.items.map((client) => ({ id: client.id, name: client.businessName }))}
      />
    </div>
  )
}
