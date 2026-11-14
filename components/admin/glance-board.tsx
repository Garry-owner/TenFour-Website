import type { ReactNode } from 'react'
import Link from 'next/link'
import { AlertCircle, Power, UserRound } from 'lucide-react'
import { CaughtPanel } from '@/components/admin/caught-panel'
import { FeedBanner } from '@/components/admin/ui'
import { EXAMPLE_TRACKED, caughtReport, todayChicago } from '@/lib/admin/caught'
import { PLANS } from '@/lib/admin/constants'
import { formatBoardDate, formatPhone, greetingChicago, leadName, moneyGrouped, relativeShort } from '@/lib/admin/format'
import type { CallLog, ClientRecord, Feed, Lead, ScenarioCard } from '@/lib/admin/types'

export function GlanceBoard({
  leads,
  calls,
  clients,
  scenarios,
}: {
  leads: Feed<Lead>
  calls: Feed<CallLog>
  clients: Feed<ClientRecord>
  scenarios: ScenarioCard[]
}) {
  const now = new Date()
  const today = todayChicago(now)
  const example = leads.state === 'example' || calls.state === 'example'
  const newToday = leads.items.filter((lead) => lead.bucket === 'new' && sameDay(lead.createdAt, today)).length
  const tracked =
    calls.state === 'example'
      ? EXAMPLE_TRACKED
      : clients.items.map((client) => ({
          id: client.id,
          name: client.businessName,
          phone: client.phone,
          example: false,
        }))
  const missedTexted = caughtReport(calls.items, tracked, 'day', today).clientTotal
  const active = clients.items.filter((client) => client.monthlyStatus === 'active')
  const revenue = active.reduce((sum, client) => sum + (PLANS.find((plan) => plan.id === client.plan)?.month || 0), 0)
  const attention = attentionRows(leads.items, clients.items, scenarios, now)
  const recent = [...leads.items].sort((a, b) => time(b.createdAt) - time(a.createdAt)).slice(0, 4)
  const problem = example ? null : leads.notice || calls.notice || (clients.state !== 'live' ? clients.notice : null)

  return (
    <div className="admin-rise flex flex-col gap-5">
      <div>
        <h1 className="admin-greet">{greetingChicago(now)}</h1>
        <p className="mt-2 flex flex-wrap items-center gap-2">
          <span className="admin-muted">{formatBoardDate(now)}</span>
          {example && <span className="admin-pill">Example data</span>}
        </p>
      </div>
      {problem && <FeedBanner notice={problem} />}
      <div className="grid grid-cols-2 gap-2.5">
        <Stat value={String(newToday)} label="New leads today" />
        <Stat value={String(missedTexted)} label="Missed calls texted" />
        <Stat value={String(active.length)} label="Active clients" />
        <Stat value={moneyGrouped(revenue)} label="Monthly revenue" accent />
      </div>
      <section>
        <div className="admin-section">
          <h2>Needs attention</h2>
          <Link className="admin-btn" href={attention[0]?.href || '/admin/leads'}>
            Review
          </Link>
        </div>
        <div className="admin-list">
          {attention.length === 0 ? (
            <div className="admin-row">
              <span className="admin-icon-tile">
                <UserRound size={16} aria-hidden="true" />
              </span>
              <span className="admin-row-copy">
                <strong>All clear</strong>
                <span>Nothing needs a look right now.</span>
              </span>
            </div>
          ) : (
            attention.map((row) => (
              <Link key={row.id} className="admin-row" href={row.href}>
                <span className="admin-icon-tile">{row.icon}</span>
                <span className="admin-row-copy">
                  <strong>{row.title}</strong>
                  <span>{row.subtitle}</span>
                </span>
                {row.meta && <span className="admin-meta">{row.meta}</span>}
              </Link>
            ))
          )}
        </div>
      </section>
      <section>
        <div className="admin-section">
          <h2>Recent leads</h2>
          <Link className="admin-link" href="/admin/leads">
            See all
          </Link>
        </div>
        <div className="admin-list">
          {recent.length === 0 ? (
            <div className="admin-row">
              <span className="admin-row-copy">
                <strong>No leads yet</strong>
                <span>New signups land here.</span>
              </span>
            </div>
          ) : (
            recent.map((lead) => {
              const status = leadStatus(lead)
              const trade = lead.trade || lead.stageLabel
              return (
                <Link key={lead.id} className="admin-row" href={`/admin/customers/lead/${lead.id}`}>
                  <span className="admin-avatar" aria-hidden="true">
                    {initials(lead.firstName, lead.lastName)}
                  </span>
                  <span className="admin-row-copy">
                    <strong>{leadName(lead.firstName, lead.lastName)}</strong>
                    <span>
                      {trade}, {relativeShort(lead.createdAt, now) || 'just now'}
                    </span>
                  </span>
                  <span className={status.hot ? 'admin-status admin-status-hot' : 'admin-status'}>{status.label}</span>
                </Link>
              )
            })
          )}
        </div>
      </section>
      <CaughtPanel calls={calls} clients={clients} mode="glance" />
    </div>
  )
}

function Stat({ value, label, accent = false }: { value: string; label: string; accent?: boolean }) {
  return (
    <article className="admin-stat">
      <p className={accent ? 'admin-num admin-num-accent' : 'admin-num'}>{value}</p>
      <p className="admin-stat-label">{label}</p>
    </article>
  )
}

function attentionRows(leads: Lead[], clients: ClientRecord[], scenarios: ScenarioCard[], now: Date) {
  const rows: { id: string; href: string; title: string; subtitle: string; meta: string; icon: ReactNode }[] = []
  const fresh = leads
    .filter((lead) => lead.bucket === 'new' || lead.needsCallback)
    .sort((a, b) => time(b.createdAt) - time(a.createdAt))
    .slice(0, 2)
  for (const lead of fresh) {
    const bits = [leadName(lead.firstName, lead.lastName), lead.trade || '', formatPhone(lead.phone)].filter((bit) => bit && bit !== 'No number')
    rows.push({
      id: `lead-${lead.id}`,
      href: `/admin/customers/lead/${lead.id}`,
      title: 'New lead',
      subtitle: bits.join(', '),
      meta: relativeShort(lead.createdAt, now),
      icon: <UserRound size={16} aria-hidden="true" />,
    })
  }
  for (const client of clients.filter((item) => item.monthlyStatus === 'past_due')) {
    rows.push({
      id: `client-${client.id}`,
      href: `/admin/customers/client/${client.id}`,
      title: 'Past-due client',
      subtitle: `${client.businessName} is past due`,
      meta: '',
      icon: <AlertCircle size={16} aria-hidden="true" />,
    })
  }
  for (const scenario of scenarios.filter((item) => item.status === 'inactive' && item.control !== 'locked')) {
    rows.push({
      id: `make-${scenario.id}`,
      href: '/admin/make',
      title: 'Make scenario off',
      subtitle: `${scenario.boardName} is turned off`,
      meta: '',
      icon: <Power size={16} aria-hidden="true" />,
    })
  }
  return rows.slice(0, 4)
}

function leadStatus(lead: Lead): { label: string; hot: boolean } {
  if (lead.bucket === 'new') return { label: 'New', hot: true }
  if (lead.bucket === 'contacted') return { label: 'Texted', hot: false }
  if (lead.bucket === 'followup' || lead.needsCallback) return { label: 'Waiting', hot: false }
  if (lead.bucket === 'closed') return { label: 'Closed', hot: false }
  return { label: lead.stageLabel || 'Lead', hot: false }
}

function initials(first: string, last: string) {
  return `${first.trim()[0] || ''}${last.trim()[0] || ''}`.toUpperCase() || '?'
}

function sameDay(iso: string | null, ymd: string) {
  if (!iso) return false
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return false
  return todayChicago(date) === ymd
}

function time(iso: string | null) {
  const value = iso ? Date.parse(iso) : 0
  return Number.isNaN(value) ? 0 : value
}
