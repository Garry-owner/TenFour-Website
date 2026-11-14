import { GlanceBoard } from '@/components/admin/glance-board'
import { cancellationWarnings, repeatCallers, revenueSnapshot } from '@/lib/admin/insights'
import { moneyGrouped } from '@/lib/admin/format'
import { listMessages, loadBoardConfig } from '@/lib/admin/desk-store'
import { loadCalls, loadScenarios, makeLamp } from '@/lib/admin/make'
import { loadClients, loadNotes } from '@/lib/admin/store'
import { twilioLamp } from '@/lib/admin/twilio'
import { wires } from '@/lib/admin/wired'
import { loadLeads, zohoLamp } from '@/lib/admin/zoho'

export const dynamic = 'force-dynamic'

export default async function AdminHomePage() {
  const [leads, calls, clients, scenarios, notes, zoho, make, twilio, config, messages] = await Promise.all([
    loadLeads(),
    loadCalls(),
    loadClients(),
    loadScenarios(),
    loadNotes(),
    zohoLamp(),
    makeLamp(),
    twilioLamp(),
    loadBoardConfig(),
    listMessages(),
  ])
  const liveClients = clients.items.filter((client) => !client.example)
  const revenue = revenueSnapshot(liveClients, config.quitGoal)
  const width = revenue.goal > 0 ? Math.min(100, Math.round((revenue.mrr / revenue.goal) * 100)) : 0
  const today = new Date().toISOString().slice(0, 10)
  return (
    <GlanceBoard
      leads={leads.feed}
      calls={calls}
      clients={clients}
      scenarios={scenarios.items}
      signals={{
        health: {
          twilio: twilio.state,
          make: make.state,
          zoho: zoho.state,
          backup: wires().backup,
        },
        revenue: moneyGrouped(revenue.mrr),
        goal: moneyGrouped(revenue.goal),
        goalWidth: `${width}%`,
        reminders: notes.items
          .filter((note) => note.dueOn && note.dueOn <= today)
          .slice(0, 4)
          .map((note) => ({
            id: note.id,
            title: note.body,
            due: note.dueOn || '',
            href: note.clientId ? `/admin/customers/client/${note.clientId}` : '/admin/log',
          })),
        warnings: cancellationWarnings(liveClients, calls.items, messages),
        repeats: repeatCallers(liveClients, calls.items),
      }}
    />
  )
}
