import { CaughtPanel } from '@/components/admin/caught-panel'
import type { Span } from '@/lib/admin/caught'
import { loadCalls } from '@/lib/admin/make'
import { loadClients } from '@/lib/admin/store'

export const dynamic = 'force-dynamic'

function spanOf(value: string | undefined): Span {
  if (value === 'day' || value === 'week' || value === 'month' || value === 'year') return value
  return 'month'
}

export default async function ShareStatPage({
  searchParams,
}: {
  searchParams: Promise<{ span?: string; on?: string }>
}) {
  const query = await searchParams
  const [calls, clients] = await Promise.all([loadCalls(), loadClients()])
  return (
    <CaughtPanel
      calls={calls}
      clients={clients}
      mode="share"
      initialSpan={spanOf(query.span)}
      initialOn={query.on}
    />
  )
}
