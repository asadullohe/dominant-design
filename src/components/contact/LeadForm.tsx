"use client";

import { useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { contact } from "@/content/company";
import { services } from "@/content/services";
import { buttonClass } from "@/components/ui/button";
import { invalidFields, isLeadResponse, leadSchema, type LeadField } from "@/lib/lead-schema";
import { Field, inputClass } from "./Field";
import { PhoneInput } from "./PhoneInput";

type Status = { kind: "idle" | "sending" | "success" } | { kind: "error"; reason: "rateLimit" | "server" };

export function LeadForm() {
  const t = useTranslations("form");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<LeadField[]>([]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = { ...Object.fromEntries(new FormData(form)), locale };

    const parsed = leadSchema.safeParse(data);
    if (!parsed.success) {
      const fields = invalidFields(parsed.error);
      setErrors(fields);
      form.querySelector<HTMLElement>(`[name="${fields[0]}"]`)?.focus();
      return;
    }

    setErrors([]);
    setStatus({ kind: "sending" });
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body: unknown = await response.json();
      if (!isLeadResponse(body)) throw new Error(`Unexpected /api/lead response (${response.status})`);
      if (body.ok) {
        form.reset();
        setStatus({ kind: "success" });
      } else if (body.error === "invalid") {
        setErrors(body.fields);
        setStatus({ kind: "idle" });
      } else {
        setStatus({ kind: "error", reason: body.error });
      }
    } catch (error) {
      console.error("[lead] submit failed", error);
      setStatus({ kind: "error", reason: "server" });
    }
  }

  if (status.kind === "success") {
    return (
      <div role="status" className="grid justify-items-start gap-3">
        <div className="grid size-12 place-items-center rounded-[20px] bg-success/15 text-[#0a9c7c]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-[22px]">
            <path d="m5 12 5 5 9-10" />
          </svg>
        </div>
        <h3 className="mt-2 font-display text-xl leading-[26px] font-semibold">{t("success.title")}</h3>
        <p className="max-w-[44ch] text-text2">{t("success.text")}</p>
        <button type="button" onClick={() => setStatus({ kind: "idle" })} className={buttonClass("ghost", "sm")}>
          {t("success.again")}
        </button>
      </div>
    );
  }

  const hasError = (field: LeadField) => errors.includes(field);

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      <Field id="lead-name" label={t("name")} error={hasError("name") ? t("errors.name") : undefined}>
        {(control) => <input {...control} name="name" autoComplete="name" required className={inputClass} />}
      </Field>
      <Field id="lead-phone" label={t("phone")} error={hasError("phone") ? t("errors.phone") : undefined}>
        {(control) => <PhoneInput control={control} name="phone" className={inputClass} />}
      </Field>
      <Field id="lead-service" label={t("service")} className="sm:col-span-2">
        {(control) => (
          <select {...control} name="service" defaultValue="" className={inputClass}>
            <option value="">{t("servicePlaceholder")}</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title[locale]}
              </option>
            ))}
          </select>
        )}
      </Field>
      <Field id="lead-message" label={t("message")} error={hasError("message") ? t("errors.message") : undefined} className="sm:col-span-2">
        {(control) => (
          <textarea {...control} name="message" rows={4} maxLength={1000} placeholder={t("messagePlaceholder")} className={`${inputClass} min-h-[104px] resize-y`} />
        )}
      </Field>
      {/* Honeypot: off-screen and skipped by keyboard and assistive tech, so only bots fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="lead-website">Website</label>
        <input id="lead-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status.kind === "error" && (
        <p role="alert" className="text-sm text-error sm:col-span-2">
          {t(`errors.${status.reason}`)}{" "}
          <a href={contact.telegram.href} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
            {t("fallback")}
          </a>
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
        <p className="max-w-[36ch] text-[13px] leading-[18px] text-text3">{t("note")}</p>
        <button type="submit" disabled={status.kind === "sending"} className={buttonClass("primary")}>
          {status.kind === "sending" ? t("sending") : t("submit")}
        </button>
      </div>
    </form>
  );
}
