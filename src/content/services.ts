import type { Service } from "./types";

export const services: Service[] = [
  {
    id: "residential",
    icon: "house",
    primary: true,
    title: { uz: "Uy-joy loyihalari", ru: "Жилые проекты", en: "Residential projects" },
    description: {
      uz: "Xususiy uy va kottejlar: eskiz, planirovka, fasad va qurilish uchun ishchi chizmalar.",
      ru: "Частные дома и коттеджи: эскиз, планировка, фасады и рабочие чертежи.",
      en: "Private houses and cottages: sketch, floor plans, facades and construction drawings.",
    },
  },
  {
    id: "cadastre",
    icon: "cadastre",
    // Wording is provisional until the studio confirms how they describe this service.
    title: { uz: "Kadastr loyihalari", ru: "Кадастровые проекты", en: "Cadastral projects" },
    description: {
      uz: "Kadastr hujjatlarini rasmiylashtirish uchun kerakli chizma va loyiha hujjatlari.",
      ru: "Чертежи и проектная документация для оформления кадастра.",
      en: "Drawings and project documents required for cadastral registration.",
    },
  },
  {
    id: "non-residential",
    icon: "building",
    title: { uz: "Noturar joy loyihalari", ru: "Нежилые проекты", en: "Non-residential projects" },
    description: {
      uz: "Doʻkon, ofis, kafe va boshqa tijorat binolari loyihalari.",
      ru: "Магазины, офисы, кафе и другие коммерческие здания.",
      en: "Shops, offices, cafés and other commercial buildings.",
    },
  },
];
