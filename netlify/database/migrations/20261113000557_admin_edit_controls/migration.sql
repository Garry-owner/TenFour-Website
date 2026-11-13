CREATE TABLE "admin_audit_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"at" timestamp with time zone DEFAULT now() NOT NULL,
	"action" text NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" text DEFAULT '' NOT NULL,
	"summary" text NOT NULL,
	"before" jsonb,
	"after" jsonb
);
--> statement-breakpoint
CREATE TABLE "admin_roger_settings" (
	"client_id" uuid PRIMARY KEY,
	"enabled" boolean DEFAULT false NOT NULL,
	"text_back" text DEFAULT '' NOT NULL,
	"questions" text DEFAULT '' NOT NULL,
	"lead_phone" text DEFAULT '' NOT NULL,
	"lead_email" text DEFAULT '' NOT NULL,
	"booking_link" text DEFAULT '' NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "admin_clients" ADD COLUMN "start_date" date;--> statement-breakpoint
ALTER TABLE "admin_clients" ADD COLUMN "owner_cell" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_clients" ADD COLUMN "service_area" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_clients" ADD COLUMN "hours" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_clients" ADD COLUMN "city" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_clients" ADD COLUMN "zoho_contact_id" text;--> statement-breakpoint
ALTER TABLE "admin_clients" ADD COLUMN "zoho_deal_id" text;--> statement-breakpoint
ALTER TABLE "admin_clients" ALTER COLUMN "monthly_status" SET DEFAULT 'active';--> statement-breakpoint
ALTER TABLE "admin_roger_settings" ADD CONSTRAINT "admin_roger_settings_client_id_admin_clients_id_fkey" FOREIGN KEY ("client_id") REFERENCES "admin_clients"("id") ON DELETE CASCADE;