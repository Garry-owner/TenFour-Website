import { CustomerRecord } from '@/components/admin/customer-record'
import { loadLeadCustomer } from '@/lib/admin/customer'

export const dynamic = 'force-dynamic'

export default async function LeadCustomerPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ edit?: string }>
}) {
  const { id } = await params
  const query = await searchParams
  const bundle = await loadLeadCustomer(id)
  if (!bundle.lead?.lead && !bundle.client) {
    return (
      <div className="flex flex-col gap-3">
        <h1 className="admin-title text-5xl">Not on the board</h1>
        <p>{bundle.lead?.feed.notice || 'That person is not in Zoho or the private store.'}</p>
      </div>
    )
  }
  return <CustomerRecord bundle={bundle} initialEdit={query.edit || null} />
}
