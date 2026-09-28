/**
 * Public origin of the site. Netlify exposes the primary site URL as `URL` at build time;
 * `SITE_URL` overrides it once the custom domain is connected.
 */
export const SITE_URL = process.env.SITE_URL ?? process.env.URL ?? "http://localhost:3000";

export const OG_LOCALES = { uz: "uz_UZ", ru: "ru_RU", en: "en_US" } as const;
