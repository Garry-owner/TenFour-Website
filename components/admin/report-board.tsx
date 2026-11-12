import { FeedBanner, Panel } from '@/components/admin/ui'
import { ROGER_LINE } from '@/lib/admin/constants'
import { planName } from '@/lib/admin/format'
import type { ReportBoard } from '@/lib/admin/types'

export function ReportBoardView({ report }: { report: ReportBoard }) {
  return (
    <div className="admin-rise flex flex-col gap-4">
      <div>
        <p className="admin-kicker">{report.monthLabel}</p>
        <h1 className="admin-title text-6xl">Report</h1>
      </div>
      <p className="admin-roger">{ROGER_LINE}</p>
      <FeedBanner notice={report.notice} />
      {report.rows.length === 0 ? (
        <Panel>
          <p className="admin-title text-5xl">Nothing to count</p>
          <p className="mt-3 leading-relaxed">
            Saved leads per client show up here when a client is on the roster and Roger is actually saving their
            leads. There is no estimated number on this board.
          </p>
        </Panel>
      ) : (
        <ul className="flex flex-col gap-2">
          {report.rows.map((row) => (
            <li key={row.id} className="admin-card">
              <span className="admin-title text-3xl">{row.businessName}</span>
              <span className="admin-kicker">
                {planName(row.plan)}
                {row.founding ? ' · Founding' : ''}
              </span>
              <span className="admin-title text-4xl">Not counting</span>
              <span className="text-sm text-[var(--muted-foreground)]">Saved leads</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
