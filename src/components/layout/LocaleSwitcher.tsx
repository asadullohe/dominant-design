"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher({ className = "" }: { className?: string }) {
  const t = useTranslations("nav");
  const current = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t("language")} className={`flex rounded-full bg-block p-[3px] ${className}`}>
      {routing.locales.map((locale) => (
        <Link
          key={locale}
          href={pathname}
          locale={locale}
          hrefLang={locale}
          aria-current={locale === current ? "true" : undefined}
          className="rounded-full px-2.5 py-2 text-xs leading-none font-semibold text-text2 uppercase transition-colors hover:text-text aria-[current=true]:bg-card aria-[current=true]:text-text"
        >
          {locale}
        </Link>
      ))}
    </nav>
  );
}
