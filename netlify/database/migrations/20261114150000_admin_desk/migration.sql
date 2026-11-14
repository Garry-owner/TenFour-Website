ALTER TABLE "admin_clients" ADD COLUMN "next_charge_date" date;--> statement-breakpoint
ALTER TABLE "admin_clients" ADD COLUMN "onboard_form" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_clients" ADD COLUMN "onboard_number" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_clients" ADD COLUMN "onboard_a2p" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_clients" ADD COLUMN "onboard_test" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_clients" ADD COLUMN "onboard_live" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_clients" ADD COLUMN "onboard_stuck" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_clients" ADD COLUMN "avg_job_cents" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_clients" ADD COLUMN "referred_by" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_clients" ADD COLUMN "referral_credit" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_clients" ADD COLUMN "review_url" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_clients" ADD COLUMN "portal_code_hash" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_roger_settings" ADD COLUMN "paused_until" date;--> statement-breakpoint
ALTER TABLE "admin_roger_settings" ADD COLUMN "alert_language" text DEFAULT 'en' NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_roger_settings" ADD COLUMN "closed_message" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_glance_notes" ADD COLUMN "due_on" date;--> statement-breakpoint
ALTER TABLE "admin_audit_log" ADD COLUMN "actor" text DEFAULT 'You' NOT NULL;--> statement-breakpoint
CREATE TABLE "admin_blocks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"client_id" uuid NOT NULL,
	"phone" text NOT NULL,
	"reason" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "admin_opt_outs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"client_id" uuid NOT NULL,
	"phone" text NOT NULL,
	"source" text DEFAULT 'stop' NOT NULL,
	"at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "admin_messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"client_id" text DEFAULT '' NOT NULL,
	"caller" text DEFAULT '' NOT NULL,
	"direction" text DEFAULT 'in' NOT NULL,
	"body" text DEFAULT '' NOT NULL,
	"body_en" text DEFAULT '' NOT NULL,
	"language" text DEFAULT 'en' NOT NULL,
	"review_status" text DEFAULT 'none' NOT NULL,
	"opened" boolean DEFAULT false NOT NULL,
	"at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "admin_holidays" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"client_id" text DEFAULT '' NOT NULL,
	"on_date" date NOT NULL,
	"label" text DEFAULT '' NOT NULL
);--> statement-breakpoint
CREATE TABLE "admin_outcomes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"client_id" text DEFAULT '' NOT NULL,
	"caller" text DEFAULT '' NOT NULL,
	"lead_id" text DEFAULT '' NOT NULL,
	"outcome" text NOT NULL,
	"at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "admin_thread_holds" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"client_id" text DEFAULT '' NOT NULL,
	"caller" text DEFAULT '' NOT NULL,
	"at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
CREATE TABLE "admin_board_settings" (
	"id" text PRIMARY KEY DEFAULT 'board',
	"quit_goal" integer DEFAULT 10000 NOT NULL,
	"gates" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"alert_prefs" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"closed_message" text DEFAULT '' NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);--> statement-breakpoint
ALTER TABLE "admin_blocks" ADD CONSTRAINT "admin_blocks_client_id_admin_clients_id_fkey" FOREIGN KEY ("client_id") REFERENCES "admin_clients"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "admin_opt_outs" ADD CONSTRAINT "admin_opt_outs_client_id_admin_clients_id_fkey" FOREIGN KEY ("client_id") REFERENCES "admin_clients"("id") ON DELETE CASCADE;
