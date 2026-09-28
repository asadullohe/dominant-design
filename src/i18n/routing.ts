import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["uz", "ru", "en"],
  defaultLocale: "uz",
  // Most local phones run in Russian or English, so browser language is a poor signal:
  // always open in Uzbek and let visitors switch.
  localeDetection: false,
});
