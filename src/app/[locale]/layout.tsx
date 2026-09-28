import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { OG_LOCALES, SITE_URL } from "@/lib/site";
import "../globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter", display: "swap" });
const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600"],
  variable: "--font-unbounded",
  display: "swap",
});

// Leads <body> so it runs before the page paints.
// 1. Motion is opt-in: `anim` is added before first paint, so reveal effects never hide content
//    for visitors without JS or with reduced motion enabled. It must not live in <head>: on the
//    production domain Netlify injects a "hosted on Netlify" comment plus a newline there, head
//    hydration then fails (React #418) and a head-rendered script lost the class.
// 2. Next renders no comments or whitespace in <head>, so any such node is Netlify's; removing it
//    avoids the #418 whenever this runs before React starts hydrating (the async chunks can win).
const BOOT_SCRIPT = [
  "for(const n of Array.from(document.head.childNodes))if(n.nodeType===8||(n.nodeType===3&&!n.data.trim()))n.remove();",
  "if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window)document.documentElement.classList.add('anim')",
].join("");

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: { ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])), "x-default": "/uz" },
    },
    openGraph: {
      type: "website",
      siteName: "Dominant Design",
      title: t("title"),
      description: t("description"),
      locale: OG_LOCALES[locale],
      url: `/${locale}`,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Dominant Design" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og.png"],
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html lang={locale} className={`${inter.variable} ${unbounded.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
