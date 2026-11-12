import { ClientsBoard } from '@/components/admin/clients-board'
import { loadClients } from '@/lib/admin/store'

export const dynamic = 'force-dynamic'

export default async function ClientsPage() {
  return <ClientsBoard feed={await loadClients()} />
}
