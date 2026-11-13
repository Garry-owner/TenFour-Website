import { boolean, date, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

// Private command-center records. Website leads stay in Zoho.
// Call rows stay in the Make call log. Nothing here is committed as data.

export const clients = pgTable('admin_clients', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessName: text('business_name').notNull(),
  contactName: text('contact_name').notNull().default(''),
  phone: text('phone').notNull().default(''),
  email: text('email').notNull().default(''),
  trade: text('trade').notNull().default(''),
  plan: text('plan').notNull(),
  setupPaid: boolean('setup_paid').notNull().default(false),
  monthlyStatus: text('monthly_status').notNull().default('active'),
  founding: boolean('founding').notNull().default(false),
  bookingLink: text('booking_link').notNull().default(''),
  notes: text('notes').notNull().default(''),
  startDate: date('start_date'),
  ownerCell: text('owner_cell').notNull().default(''),
  serviceArea: text('service_area').notNull().default(''),
  hours: text('hours').notNull().default(''),
  city: text('city').notNull().default(''),
  zohoContactId: text('zoho_contact_id'),
  zohoDealId: text('zoho_deal_id'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export const rogerSettings = pgTable('admin_roger_settings', {
  clientId: uuid('client_id')
    .primaryKey()
    .references(() => clients.id, { onDelete: 'cascade' }),
  enabled: boolean('enabled').notNull().default(false),
  textBack: text('text_back').notNull().default(''),
  questions: text('questions').notNull().default(''),
  leadPhone: text('lead_phone').notNull().default(''),
  leadEmail: text('lead_email').notNull().default(''),
  bookingLink: text('booking_link').notNull().default(''),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export const auditLog = pgTable('admin_audit_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  at: timestamp('at', { withTimezone: true }).notNull().defaultNow(),
  action: text('action').notNull(),
  entityType: text('entity_type').notNull(),
  entityId: text('entity_id').notNull().default(''),
  summary: text('summary').notNull(),
  before: jsonb('before'),
  after: jsonb('after'),
})

export const glanceNotes = pgTable('admin_glance_notes', {
  id: uuid('id').primaryKey().defaultRandom(),
  body: text('body').notNull(),
  leadId: text('lead_id'),
  leadLabel: text('lead_label'),
  clientId: uuid('client_id').references(() => clients.id, { onDelete: 'set null' }),
  clientLabel: text('client_label'),
  callSid: text('call_sid'),
  callLabel: text('call_label'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})
