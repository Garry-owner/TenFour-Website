import { CallsBoard } from '@/components/admin/calls-board'
import { loadCalls } from '@/lib/admin/make'

export const dynamic = 'force-dynamic'

export default async function CallsPage() {
  return <CallsBoard feed={await loadCalls()} />
}
