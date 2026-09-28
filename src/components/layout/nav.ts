/** In-page sections linked from the header, mobile menu and footer, in display order. */
export const NAV_ITEMS = ["services", "projects", "process", "team", "contact"] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
