import { ClientsBoard } from '@/components/admin/clients-board'
import { loadClients } from '@/lib/admin/store'

export const dynamic = 'force-dynamic'

export default async function ClientsPage({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const { edit } = await searchParams
  return <ClientsBoard feed={await loadClients()} startOpen={edit === '1'} />
}
