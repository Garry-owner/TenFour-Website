import { ReportBoardView } from '@/components/admin/report-board'
import { loadReport } from '@/lib/admin/store'

export const dynamic = 'force-dynamic'

export default async function ReportPage() {
  return <ReportBoardView report={await loadReport()} />
}
