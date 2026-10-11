import type { Config } from "@netlify/functions";
import { timingSafeEqual } from "node:crypto";
import { desc, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { helpRequests } from "../../db/schema.js";

const STATUSES = ["New", "In progress", "Completed", "Cancelled"];

function isAdmin(req: Request) {
  const expected = process.env.ADMIN_PASSWORD;
  const given = req.headers.get("x-admin-password") ?? "";
  if (!expected) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

function clean(value: unknown, max = 200) {
  return String(value ?? "").trim().slice(0, max);
}

export default async (req: Request) => {
  if (req.method === "POST") {
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "Invalid request body" }, { status: 400 });
    }

    const record = {
      reference: "ZC-" + Date.now().toString().slice(-8) + Math.floor(Math.random() * 90 + 10),
      service: clean(body.service),
      urgency: clean(body.urgency),
      name: clean(body.name),
      phone: clean(body.phone, 40),
      town: clean(body.town),
      preferredDate: /^\d{4}-\d{2}-\d{2}$/.test(clean(body.date)) ? clean(body.date) : null,
      payment: clean(body.payment),
      contact: clean(body.contact),
      details: clean(body.details, 2000),
    };

    if (!record.service || !record.urgency || !record.name || !record.phone || !record.town) {
      return Response.json({ error: "Please fill in all required fields." }, { status: 400 });
    }

    const [saved] = await db
      .insert(helpRequests)
      .values(record)
      .returning({ reference: helpRequests.reference, status: helpRequests.status, createdAt: helpRequests.createdAt });
    return Response.json(saved, { status: 201 });
  }

  if (!isAdmin(req)) {
    return Response.json({ error: "Incorrect admin password" }, { status: 401 });
  }

  if (req.method === "GET") {
    const all = await db.select().from(helpRequests).orderBy(desc(helpRequests.createdAt));
    return Response.json(all);
  }

  if (req.method === "PATCH") {
    const { id, status } = await req.json().catch(() => ({}));
    if (!Number.isInteger(id) || !STATUSES.includes(status)) {
      return Response.json({ error: "Invalid update" }, { status: 400 });
    }
    const [updated] = await db.update(helpRequests).set({ status }).where(eq(helpRequests.id, id)).returning();
    return updated ? Response.json(updated) : Response.json({ error: "Not found" }, { status: 404 });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/requests",
};
