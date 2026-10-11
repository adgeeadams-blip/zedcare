import { pgTable, serial, text, timestamp, date } from "drizzle-orm/pg-core";

export const helpRequests = pgTable("help_requests", {
  id: serial().primaryKey(),
  reference: text().notNull().unique(),
  service: text().notNull(),
  urgency: text().notNull(),
  name: text().notNull(),
  phone: text().notNull(),
  town: text().notNull(),
  preferredDate: date("preferred_date"),
  payment: text(),
  contact: text(),
  details: text().notNull().default(""),
  status: text().notNull().default("New"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
