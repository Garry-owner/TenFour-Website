import { MakeBoard } from '@/components/admin/make-board'
import { loadScenarios } from '@/lib/admin/make'

export const dynamic = 'force-dynamic'

export default async function MakePage({ searchParams }: { searchParams: Promise<{ confirm?: string }> }) {
  const { confirm } = await searchParams
  const board = await loadScenarios()
  return <MakeBoard connected={board.connected} notice={board.notice} items={board.items} initialConfirm={confirm || null} />
}
