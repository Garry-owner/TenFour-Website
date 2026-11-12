import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

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
  monthlyStatus: text('monthly_status').notNull().default('not_started'),
  founding: boolean('founding').notNull().default(false),
  bookingLink: text('booking_link').notNull().default(''),
  notes: text('notes').notNull().default(''),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
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
