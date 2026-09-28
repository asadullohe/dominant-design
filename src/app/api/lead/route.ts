import { invalidFields, leadSchema, type LeadResponse } from "@/lib/lead-schema";
import { allowRequest } from "@/lib/rate-limit";
import { sendLeadToTelegram } from "@/lib/telegram";

const reply = (body: LeadResponse, status = 200) => Response.json(body, { status });

function clientIp(request: Request) {
  return (
    request.headers.get("x-nf-client-connection-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export async function POST(request: Request) {
  if (!allowRequest(clientIp(request))) {
    return reply({ ok: false, error: "rateLimit" }, 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return reply({ ok: false, error: "invalid", fields: [] }, 400);
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return reply({ ok: false, error: "invalid", fields: invalidFields(parsed.error) }, 400);
  }

  // A filled honeypot means a bot: answer like a success so it learns nothing, but send nothing.
  if (parsed.data.website) {
    return reply({ ok: true });
  }

  try {
    await sendLeadToTelegram(parsed.data);
  } catch (error) {
    console.error("[lead] delivery to Telegram failed", error);
    return reply({ ok: false, error: "server" }, 502);
  }

  return reply({ ok: true });
}
