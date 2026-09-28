import type { Project } from "./types";

const LANDSCAPE = { width: 2000, height: 1415 };
const PORTRAIT = { width: 1414, height: 2000 };

// Titles are provisional until the studio confirms real project names.
export const projects: Project[] = [
  {
    slug: "courtyard",
    category: "house",
    kind: "render",
    imageCount: 6,
    size: LANDSCAPE,
    title: { uz: "Bir qavatli hovli uy", ru: "Одноэтажный дом с двором", en: "Single-storey courtyard house" },
  },
  {
    slug: "kitchen",
    category: "interior",
    kind: "render",
    imageCount: 6,
    size: PORTRAIT,
    title: { uz: "Oshxona-mehmonxona interyeri", ru: "Интерьер кухни-гостиной", en: "Kitchen and living room interior" },
  },
  {
    slug: "neoclassic",
    category: "house",
    kind: "render",
    imageCount: 6,
    size: LANDSCAPE,
    title: { uz: "Neoklassik ikki qavatli uy", ru: "Двухэтажный дом в неоклассике", en: "Two-storey neoclassical house" },
  },
  {
    slug: "bedroom",
    category: "interior",
    kind: "render",
    imageCount: 6,
    size: PORTRAIT,
    title: { uz: "Yotoqxona interyeri", ru: "Интерьер спальни", en: "Bedroom interior" },
  },
  {
    slug: "qorakol",
    category: "house",
    kind: "render",
    imageCount: 6,
    size: LANDSCAPE,
    title: { uz: "Qorakoʻldagi hovli uy", ru: "Дом с двором в Каракуле", en: "Courtyard house in Qorakol" },
  },
  {
    slug: "bathroom",
    category: "interior",
    kind: "render",
    imageCount: 5,
    size: PORTRAIT,
    title: { uz: "Hammom interyeri", ru: "Интерьер ванной комнаты", en: "Bathroom interior" },
  },
];

export function projectImages(project: Project): string[] {
  return Array.from({ length: project.imageCount }, (_, i) => `/projects/${project.slug}/${i + 1}.jpg`);
}
