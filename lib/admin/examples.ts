import { EXAMPLE_LEAD_NOTICE } from '@/lib/admin/constants'
import { shapeLead, sortLeads, type LeadInput } from '@/lib/admin/shape'
import type { Lead } from '@/lib/admin/types'

const samples: LeadInput[] = [
  {
    id: 'example-mara',
    example: true,
    firstName: 'Mara',
    lastName: 'Ellison',
    email: 'mara.ellison@example.com',
    phone: '+12145550142',
    fax: 'Central',
    skypeId: 'Form_Opt_In',
    title: 'Local hour: 8 AM (example)',
    contactDescription: 'https://www.tenfoursystems.com/contact',
    source: 'Website Form',
    createdAt: '2026-11-12T14:10:00.000Z',
    trade: 'HVAC',
    testField: null,
    deals: [
      {
        id: 'example-deal-mara',
        name: 'Repair: Ellison',
        stage: 'New Lead',
        source: 'Website Form',
        createdAt: '2026-11-12T14:10:00.000Z',
        description: 'Water heater is out and the house is cold. Example only.',
      },
    ],
  },
  {
    id: 'example-luis',
    example: true,
    firstName: 'Luis',
    lastName: 'Ortega',
    email: 'luis.ortega@example.com',
    phone: '+14695550177',
    fax: 'Central',
    skypeId: 'Form_Opt_In',
    title: '',
    contactDescription: 'https://www.tenfoursystems.com/contact',
    source: 'Website Form',
    createdAt: '2026-11-11T18:22:00.000Z',
    trade: null,
    testField: null,
    deals: [
      {
        id: 'example-deal-luis',
        name: 'Repair: Ortega',
        stage: 'Contacted',
        source: 'Website Form',
        createdAt: '2026-11-11T18:22:00.000Z',
        description: 'Asked for a quote on a panel upgrade. Example only.',
      },
    ],
  },
  {
    id: 'example-casey',
    example: true,
    firstName: 'Casey',
    lastName: 'Sample',
    email: 'casey.sample@example.com',
    phone: '+19725550199',
    fax: 'Central',
    skypeId: 'No_SMS_Consent',
    title: '',
    contactDescription: 'https://www.tenfoursystems.com/contact',
    source: 'Website Form',
    createdAt: '2026-11-10T15:00:00.000Z',
    trade: null,
    testField: null,
    deals: [
      {
        id: 'example-deal-casey',
        name: 'Manual Call Only: Sample',
        stage: 'New Lead',
        source: 'Website Form',
        createdAt: '2026-11-10T15:00:00.000Z',
        description: 'MANUAL CALL ONLY, NO SMS CONSENT. test signup, please ignore',
      },
    ],
  },
  {
    id: 'example-june',
    example: true,
    firstName: 'June',
    lastName: 'Patel',
    email: 'june.patel@example.com',
    phone: '+18175550110',
    fax: 'Central',
    skypeId: 'Form_Opt_In',
    title: '',
    contactDescription: 'https://www.tenfoursystems.com/contact',
    source: 'Website Form',
    createdAt: '2026-11-01T20:05:00.000Z',
    trade: null,
    testField: null,
    deals: [
      {
        id: 'example-deal-june',
        name: 'Repair: Patel',
        stage: 'Closed',
        source: 'Website Form',
        createdAt: '2026-11-01T20:05:00.000Z',
        description: 'Drain cleared. Example only.',
      },
    ],
  },
]

export function exampleLeads(): Lead[] {
  return sortLeads(samples.map((sample) => shapeLead(sample)))
}

export { EXAMPLE_LEAD_NOTICE }
