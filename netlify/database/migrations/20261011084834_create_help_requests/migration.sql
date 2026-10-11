CREATE TABLE "help_requests" (
	"id" serial PRIMARY KEY,
	"reference" text NOT NULL UNIQUE,
	"service" text NOT NULL,
	"urgency" text NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"town" text NOT NULL,
	"preferred_date" date,
	"payment" text,
	"contact" text,
	"details" text DEFAULT '' NOT NULL,
	"status" text DEFAULT 'New' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
