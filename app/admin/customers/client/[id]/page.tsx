import Link from 'next/link'
import { CustomerRecord } from '@/components/admin/customer-record'
import { loadClientCustomer } from '@/lib/admin/customer'
import { loadDesk } from '@/lib/admin/load-desk'

export const dynamic = 'force-dynamic'

export default async function ClientCustomerPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ edit?: string }>
}) {
  const { id } = await params
  const query = await searchParams
  const desk = await loadDesk(id)
  if (desk?.client.example) {
    return (
      <CustomerRecord
        initialEdit={query.edit || null}
        desk={desk}
        bundle={{
          kind: 'client',
          zohoConnected: false,
          storeLive: false,
          storeNotice: 'Example client. Nothing here is saved.',
          lead: null,
          client: desk.client,
          notes: [],
          zohoNotes: [],
          calls: desk.calls,
          roger: desk.roger,
        }}
      />
    )
  }
  const bundle = await loadClientCustomer(id)
  if (!bundle.client) {
    return (
      <div className="flex flex-col gap-3">
        <h1 className="admin-title">Not on the board</h1>
        <p>{bundle.storeNotice || 'That client is not in the private store.'}</p>
        <Link className="admin-btn" href="/admin/customers/client/example-northside">
          Open the example client
        </Link>
      </div>
    )
  }
  return <CustomerRecord bundle={bundle} initialEdit={query.edit || null} desk={desk} />
}
