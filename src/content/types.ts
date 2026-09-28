import type { Locale } from "next-intl";

/** A value translated into every site locale. */
export type Localized<T = string> = Record<Locale, T>;

export type ProjectCategory = "house" | "interior" | "commercial";
export type ProjectKind = "render" | "built";

export interface Project {
  slug: string;
  category: ProjectCategory;
  kind: ProjectKind;
  /** Number of gallery images in /public/projects/<slug>/, named 1.jpg … n.jpg. 1.jpg is the cover. */
  imageCount: number;
  /** Intrinsic size of the cover, used to reserve layout space. */
  cover: { width: number; height: number };
  title: Localized;
}

export type ServiceIcon = "house" | "cadastre" | "building";

export interface Service {
  id: string;
  icon: ServiceIcon;
  /** Highlighted as the studio's core line of work. */
  primary?: boolean;
  title: Localized;
  description: Localized;
}

export interface TeamMember {
  id: string;
  name: Localized;
  role: Localized;
  /** Path under /public; portraits are shot 3:4. */
  photo: string;
  founder?: boolean;
}

export interface Stat {
  id: string;
  value: Localized;
  label: Localized;
}

export interface DrawingSheet {
  id: string;
  /** Watermarked sheet under /public/drawings/. */
  src: string;
  width: number;
  height: number;
  tab: Localized;
  title: Localized;
}

export interface DrawingGroup {
  id: string;
  title: Localized;
  items: Localized;
}

export interface ContactInfo {
  phone: { display: string; href: string };
  telegram: { handle: string; href: string };
  instagram: { handle: string; href: string };
  address: Localized;
  hours: string;
  mapHref: string;
}
