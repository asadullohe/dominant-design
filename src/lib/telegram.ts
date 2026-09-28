import { services } from "@/content/services";
import { formatPhone, type Lead } from "./lead-schema";

interface TelegramReply {
  ok: boolean;
  description?: string;
}

function isTelegramReply(value: unknown): value is TelegramReply {
  return typeof value === "object" && value !== null && "ok" in value && typeof value.ok === "boolean";
}

const escapeHtml = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** The office reads leads in Uzbek regardless of the visitor's language. */
function formatLead(lead: Lead) {
  const service = services.find((s) => s.id === lead.service)?.title.uz ?? "—";
  const time = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Asia/Tashkent",
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date());

  return [
    "🏠 <b>Yangi ariza</b> — Dominant Design sayti",
    "",
    `<b>Ism:</b> ${escapeHtml(lead.name)}`,
    `<b>Telefon:</b> ${formatPhone(lead.phone)}`,
    `<b>Xizmat:</b> ${escapeHtml(service)}`,
    lead.message ? `<b>Izoh:</b> ${escapeHtml(lead.message)}` : null,
    "",
    `Til: ${lead.locale} · ${time}`,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

/**
 * Posts the lead to the single chat configured in TELEGRAM_CHAT_ID.
 * The destination is never taken from the bot's own updates, so adding the bot
 * to another group cannot redirect leads.
 */
export async function sendLeadToTelegram(lead: Lead) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    throw new Error("Telegram is not configured: set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID");
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: formatLead(lead), parse_mode: "HTML", link_preview_options: { is_disabled: true } }),
    signal: AbortSignal.timeout(8000),
  });

  const reply: unknown = await response.json();
  if (!response.ok || !isTelegramReply(reply) || !reply.ok) {
    const detail = isTelegramReply(reply) ? reply.description : "unexpected response";
    throw new Error(`Telegram sendMessage failed (${response.status}): ${detail}`);
  }
}
