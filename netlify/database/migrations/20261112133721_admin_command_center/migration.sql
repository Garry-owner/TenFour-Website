CREATE TABLE "admin_clients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"business_name" text NOT NULL,
	"contact_name" text DEFAULT '' NOT NULL,
	"phone" text DEFAULT '' NOT NULL,
	"email" text DEFAULT '' NOT NULL,
	"trade" text DEFAULT '' NOT NULL,
	"plan" text NOT NULL,
	"setup_paid" boolean DEFAULT false NOT NULL,
	"monthly_status" text DEFAULT 'not_started' NOT NULL,
	"founding" boolean DEFAULT false NOT NULL,
	"booking_link" text DEFAULT '' NOT NULL,
	"notes" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "admin_glance_notes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"body" text NOT NULL,
	"lead_id" text,
	"lead_label" text,
	"client_id" uuid,
	"client_label" text,
	"call_sid" text,
	"call_label" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "admin_glance_notes" ADD CONSTRAINT "admin_glance_notes_client_id_admin_clients_id_fkey" FOREIGN KEY ("client_id") REFERENCES "admin_clients"("id") ON DELETE SET NULL;