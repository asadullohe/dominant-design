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

const SERVICE_ICONS: Record<string, string> = { residential: "🏡", cadastre: "📐", "non-residential": "🏢" };

const LOCALE_LABELS: Record<Lead["locale"], string> = { uz: "🇺🇿 Oʻzbekcha", ru: "🇷🇺 Ruscha", en: "🇬🇧 Inglizcha" };

/**
 * The office reads leads in Uzbek regardless of the visitor's language.
 * Telegram HTML allows only http(s)/tg links, so the phone stays plain text (clients make it tappable)
 * and a t.me/+number link opens a chat with the client when their privacy settings allow it.
 */
function formatLead(lead: Lead) {
  const service = services.find((s) => s.id === lead.service);
  const time = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Asia/Tashkent",
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date());

  const lines = [
    "🔔 <b>Yangi ariza</b> · Dominant Design",
    "",
    `👤 <b>Ism:</b> ${escapeHtml(lead.name)}`,
    `📞 <b>Telefon:</b> ${formatPhone(lead.phone)}`,
    `${service ? SERVICE_ICONS[service.id] ?? "📋" : "📋"} <b>Xizmat:</b> ${service ? escapeHtml(service.title.uz) : "tanlanmagan"}`,
  ];
  if (lead.message) {
    lines.push("", "💬 <b>Izoh:</b>", `<blockquote>${escapeHtml(lead.message)}</blockquote>`);
  }
  lines.push(
    "",
    `🌐 Sayt tili: ${LOCALE_LABELS[lead.locale]}`,
    `🕒 ${time}`,
    "",
    `✍️ <a href="https://t.me/+${lead.phone}">Telegramda yozish</a>`,
  );
  return lines.join("\n");
}

/**
 * Posts the lead to the single chat configured in TELEGRAM_CHAT_ID.
 * The destination is never taken from the bot's own updates, so adding the bot
 * to another group cannot redirect leads.
 */
export async function sendLeadToTelegram(lead: Lead) {
  // Trimmed so a stray space or newline pasted into the Netlify UI can't break delivery.
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
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
