import { cookies } from 'next/headers'
import { MoreBoard } from '@/components/admin/more-board'

export const dynamic = 'force-dynamic'

export default async function MorePage() {
  const shift = (await cookies()).get('tenfour_admin_shift')?.value === 'day' ? 'day' : 'night'
  return <MoreBoard shift={shift} />
}
