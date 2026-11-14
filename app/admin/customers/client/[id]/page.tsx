import Link from 'next/link'
import { CustomerRecord } from '@/components/admin/customer-record'
import { loadClientCustomer } from '@/lib/admin/customer'

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
  const bundle = await loadClientCustomer(id)
  if (!bundle.client) {
    return (
      <div className="flex flex-col gap-3">
        <h1 className="admin-title text-5xl">Not on the board</h1>
        <p>{bundle.storeNotice || 'That client is not in the private store.'}</p>
        <Link className="admin-btn" href="/admin/clients">
          Clients
        </Link>
      </div>
    )
  }
  return <CustomerRecord bundle={bundle} initialEdit={query.edit || null} />
}
