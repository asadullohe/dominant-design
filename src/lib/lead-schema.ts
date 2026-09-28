import { z } from "zod";
import { routing } from "@/i18n/routing";
import { services } from "@/content/services";

const serviceIds = services.map((s) => s.id) as [string, ...string[]];

/** Uzbek mobile number: country code 998 + 9 digits, any spacing or punctuation allowed in input. */
const phone = z
  .string()
  .transform((v) => v.replace(/\D/g, ""))
  .refine((v) => /^998\d{9}$/.test(v), { error: "phone" });

// Issue messages are field keys; the form maps them to translated text.
export const leadSchema = z.object({
  name: z.string().trim().min(2, { error: "name" }).max(80, { error: "name" }),
  phone,
  service: z.union([z.literal(""), z.enum(serviceIds)]).default(""),
  message: z.string().trim().max(1000, { error: "message" }).default(""),
  locale: z.enum(routing.locales),
  /** Honeypot: hidden from people, so any value means a bot filled the form. */
  website: z.string().default(""),
});

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;
export type LeadField = "name" | "phone" | "message";

export type LeadResponse =
  | { ok: true }
  | { ok: false; error: "invalid"; fields: LeadField[] }
  | { ok: false; error: "rateLimit" | "server" };

const LEAD_FIELDS: readonly string[] = ["name", "phone", "message"];

/** Field keys of every failed check, in form order and without duplicates. */
export function invalidFields(error: z.ZodError): LeadField[] {
  const found = new Set(error.issues.map((issue) => issue.message).filter((m) => LEAD_FIELDS.includes(m)));
  return (["name", "phone", "message"] as const).filter((f) => found.has(f));
}

export function isLeadResponse(value: unknown): value is LeadResponse {
  if (typeof value !== "object" || value === null || !("ok" in value)) return false;
  if (value.ok === true) return true;
  return "error" in value && typeof value.error === "string";
}

/** "+998 90 123 45 67" from any accepted digits string. */
export function formatPhone(digits: string) {
  const d = digits.replace(/\D/g, "");
  return `+${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10, 12)}`;
}
