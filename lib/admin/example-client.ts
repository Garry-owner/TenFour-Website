import { exampleCalls } from '@/lib/admin/call-examples'
import { EXAMPLE_TRACKED } from '@/lib/admin/caught'
import type { ClientRecord, RogerSettings, ThreadMessage } from '@/lib/admin/types'

export function isExampleClientId(id: string): boolean {
  return EXAMPLE_TRACKED.some((client) => client.id === id)
}

export function exampleClient(id: string): ClientRecord | null {
  const tracked = EXAMPLE_TRACKED.find((client) => client.id === id)
  if (!tracked) return null
  const trade = tracked.name.split(' ').slice(1).join(' ') || 'HVAC'
  return {
    id: tracked.id,
    businessName: tracked.name,
    contactName: 'Example owner',
    phone: tracked.phone,
    email: 'owner@example.com',
    trade,
    plan: 'pro',
    setupPaid: true,
    monthlyStatus: 'active',
    founding: false,
    bookingLink: 'https://example.com/book',
    notes: '',
    startDate: '2026-11-01',
    ownerCell: '+12145550199',
    serviceArea: 'Dallas',
    hours: 'Monday to Friday, 8 AM to 6 PM',
    city: 'Dallas',
    zohoContactId: null,
    zohoDealId: null,
    nextChargeDate: '2026-12-01',
    onboardForm: true,
    onboardNumber: true,
    onboardA2p: false,
    onboardTest: false,
    onboardLive: false,
    onboardStuck: true,
    avgJobCents: 35000,
    referredBy: '',
    referralCredit: '',
    reviewUrl: 'https://example.com/review',
    portalEnabled: false,
    example: true,
    createdAt: '2026-11-01T15:00:00.000Z',
    updatedAt: '2026-11-14T15:00:00.000Z',
  }
}

export function exampleRoger(client: ClientRecord): RogerSettings {
  return {
    clientId: client.id,
    enabled: true,
    textBack: `Hi, this is Roger with ${client.businessName}. We missed your call. What is going on?`,
    questions: 'What is your address?\nHow soon do you need someone out?',
    leadPhone: client.ownerCell,
    leadEmail: client.email,
    bookingLink: client.bookingLink,
    pausedUntil: null,
    alertLanguage: 'en',
    closedMessage: 'We are closed today. Roger will still take the details and send them over.',
    updatedAt: client.updatedAt,
  }
}

export function exampleThread(client: ClientRecord): ThreadMessage[] {
  return [
    {
      id: `${client.id}-in`,
      clientId: client.id,
      caller: '+12145550140',
      direction: 'in',
      body: 'Se me apago el aire.',
      bodyEn: 'My air went out.',
      language: 'es',
      reviewStatus: 'pending',
      opened: false,
      at: new Date().toISOString(),
      example: true,
    },
    {
      id: `${client.id}-out`,
      clientId: client.id,
      caller: '+12145550140',
      direction: 'out',
      body: `Hola, soy Roger de ${client.businessName}. Que esta pasando?`,
      bodyEn: `Hi, this is Roger with ${client.businessName}. What is going on?`,
      language: 'es',
      reviewStatus: 'pending',
      opened: false,
      at: new Date().toISOString(),
      example: true,
    },
  ]
}

export function exampleCallsFor(client: ClientRecord) {
  return exampleCalls().filter((call) => call.clientId === client.id || call.to === client.phone)
}
