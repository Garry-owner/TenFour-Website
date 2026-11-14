import { CaughtPanel } from '@/components/admin/caught-panel'
import { ReportBoardView } from '@/components/admin/report-board'
import { loadCalls } from '@/lib/admin/make'
import { loadClients, loadReport } from '@/lib/admin/store'
import type { Span } from '@/lib/admin/caught'

export const dynamic = 'force-dynamic'

function spanOf(value: string | undefined): Span {
  if (value === 'day' || value === 'week' || value === 'month' || value === 'year') return value
  return 'month'
}

export default async function ReportPage({
  searchParams,
}: {
  searchParams: Promise<{ span?: string; on?: string; client?: string }>
}) {
  const query = await searchParams
  const [report, calls, clients] = await Promise.all([loadReport(), loadCalls(), loadClients()])
  return (
    <div className="flex flex-col gap-4">
      <CaughtPanel
        calls={calls}
        clients={clients}
        mode="report"
        initialSpan={spanOf(query.span)}
        initialOn={query.on}
        selectedClient={query.client || null}
      />
      <ReportBoardView report={report} />
    </div>
  )
}
