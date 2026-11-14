import { ReviewQueue } from '@/components/admin/review-queue'
import { listMessages } from '@/lib/admin/desk-store'
import { exampleThread, exampleClient } from '@/lib/admin/example-client'

export const dynamic = 'force-dynamic'

export default async function ReviewPage() {
  const stored = await listMessages()
  const pending = stored.filter((message) => message.language === 'es' && message.reviewStatus === 'pending')
  const sample = pending.length ? pending : exampleThread(exampleClient('example-northside')!)
  return <ReviewQueue items={sample} example={pending.length === 0} />
}
