import { boolean, date, integer, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

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
  nextChargeDate: date('next_charge_date'),
  onboardForm: boolean('onboard_form').notNull().default(false),
  onboardNumber: boolean('onboard_number').notNull().default(false),
  onboardA2p: boolean('onboard_a2p').notNull().default(false),
  onboardTest: boolean('onboard_test').notNull().default(false),
  onboardLive: boolean('onboard_live').notNull().default(false),
  onboardStuck: boolean('onboard_stuck').notNull().default(false),
  avgJobCents: integer('avg_job_cents').notNull().default(0),
  referredBy: text('referred_by').notNull().default(''),
  referralCredit: text('referral_credit').notNull().default(''),
  reviewUrl: text('review_url').notNull().default(''),
  portalCodeHash: text('portal_code_hash').notNull().default(''),
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
  pausedUntil: date('paused_until'),
  alertLanguage: text('alert_language').notNull().default('en'),
  closedMessage: text('closed_message').notNull().default(''),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export const auditLog = pgTable('admin_audit_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  at: timestamp('at', { withTimezone: true }).notNull().defaultNow(),
  action: text('action').notNull(),
  entityType: text('entity_type').notNull(),
  entityId: text('entity_id').notNull().default(''),
  summary: text('summary').notNull(),
  actor: text('actor').notNull().default('You'),
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
  dueOn: date('due_on'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export const blocks = pgTable('admin_blocks', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: uuid('client_id')
    .notNull()
    .references(() => clients.id, { onDelete: 'cascade' }),
  phone: text('phone').notNull(),
  reason: text('reason').notNull().default(''),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const optOuts = pgTable('admin_opt_outs', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: uuid('client_id')
    .notNull()
    .references(() => clients.id, { onDelete: 'cascade' }),
  phone: text('phone').notNull(),
  source: text('source').notNull().default('stop'),
  at: timestamp('at', { withTimezone: true }).notNull().defaultNow(),
})

export const messages = pgTable('admin_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: text('client_id').notNull().default(''),
  caller: text('caller').notNull().default(''),
  direction: text('direction').notNull().default('in'),
  body: text('body').notNull().default(''),
  bodyEn: text('body_en').notNull().default(''),
  language: text('language').notNull().default('en'),
  reviewStatus: text('review_status').notNull().default('none'),
  opened: boolean('opened').notNull().default(false),
  at: timestamp('at', { withTimezone: true }).notNull().defaultNow(),
})

export const holidays = pgTable('admin_holidays', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: text('client_id').notNull().default(''),
  onDate: date('on_date').notNull(),
  label: text('label').notNull().default(''),
})

export const outcomes = pgTable('admin_outcomes', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: text('client_id').notNull().default(''),
  caller: text('caller').notNull().default(''),
  leadId: text('lead_id').notNull().default(''),
  outcome: text('outcome').notNull(),
  at: timestamp('at', { withTimezone: true }).notNull().defaultNow(),
})

export const threadHolds = pgTable('admin_thread_holds', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: text('client_id').notNull().default(''),
  caller: text('caller').notNull().default(''),
  at: timestamp('at', { withTimezone: true }).notNull().defaultNow(),
})

export const boardSettings = pgTable('admin_board_settings', {
  id: text('id').primaryKey().default('board'),
  quitGoal: integer('quit_goal').notNull().default(10000),
  gates: jsonb('gates').notNull().default({}),
  alertPrefs: jsonb('alert_prefs').notNull().default({}),
  closedMessage: text('closed_message').notNull().default(''),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})
