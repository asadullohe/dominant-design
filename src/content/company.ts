import type { ContactInfo, DrawingGroup, DrawingSheet, Stat } from "./types";

export const stats: Stat[] = [
  { id: "projects", value: { uz: "500+", ru: "500+", en: "500+" }, label: { uz: "loyiha bajarilgan", ru: "выполненных проектов", en: "projects delivered" } },
  { id: "since", value: { uz: "2021", ru: "2021", en: "2021" }, label: { uz: "yildan beri ishlaymiz", ru: "работаем с этого года", en: "working since" } },
  { id: "timeline", value: { uz: "14–30", ru: "14–30", en: "14–30" }, label: { uz: "kunda loyiha tayyor", ru: "дней на проект", en: "days per project" } },
  { id: "consultation", value: { uz: "Bepul", ru: "Бесплатно", en: "Free" }, label: { uz: "birinchi konsultatsiya", ru: "первая консультация", en: "first consultation" } },
];

export const drawingSheets: DrawingSheet[] = [
  { id: "plan", src: "/drawings/plan.jpg", width: 2200, height: 1555, tab: { uz: "Reja", ru: "План", en: "Plan" }, title: { uz: "Holat rejasi", ru: "Планировка", en: "Layout plan" } },
  { id: "facade", src: "/drawings/facade.jpg", width: 2200, height: 1555, tab: { uz: "Fasad", ru: "Фасад", en: "Facade" }, title: { uz: "Fasad", ru: "Фасад", en: "Facade" } },
  { id: "3d", src: "/drawings/3d.jpg", width: 2200, height: 1555, tab: { uz: "3D", ru: "3D", en: "3D" }, title: { uz: "3D koʻrinish", ru: "3D-вид", en: "3D view" } },
  { id: "section", src: "/drawings/section.jpg", width: 1555, height: 2200, tab: { uz: "Qirqim", ru: "Разрез", en: "Section" }, title: { uz: "Qirqim", ru: "Разрез", en: "Section" } },
];

export const drawingGroups: DrawingGroup[] = [
  {
    id: "plans",
    title: { uz: "Rejalar", ru: "Планы", en: "Plans" },
    items: {
      uz: "Umumiy maʼlumotlar, holat rejasi, devorlar, markirovka, oʻlchamlar, zina",
      ru: "Общие данные, планировка, стены, маркировка, размеры, лестница",
      en: "General data, layout, walls, marking, dimensions, stairs",
    },
  },
  {
    id: "structure",
    title: { uz: "Konstruksiya", ru: "Конструктив", en: "Structure" },
    items: {
      uz: "Podushka, podval, poydevor, orayopma, perimichka, tom",
      ru: "Подушка, подвал, фундамент, перекрытие, перемычки, кровля",
      en: "Footings, basement, foundation, floor slab, lintels, roof",
    },
  },
  {
    id: "facades",
    title: { uz: "Fasad va qirqim", ru: "Фасады и разрез", en: "Facades and section" },
    items: { uz: "Ikki fasad va qirqim", ru: "Два фасада и разрез", en: "Two facades and a section" },
  },
  {
    id: "3d",
    title: { uz: "3D koʻrinish", ru: "3D-виды", en: "3D views" },
    items: { uz: "Qavat va binoning 3D modeli", ru: "3D-модель этажа и здания", en: "3D model of the floor and the building" },
  },
];

export const contact: ContactInfo = {
  phone: { display: "+998 33 118 33 00", href: "tel:+998331183300" },
  telegram: { handle: "@dominant_design", href: "https://t.me/dominant_design" },
  instagram: { handle: "@dominant.design", href: "https://instagram.com/dominant.design" },
  address: {
    uz: "Bagʻdod tumani, Davlat xizmatlari markazi, 2-qavat",
    ru: "Багдадский район, Центр госуслуг, 2-й этаж",
    en: "Baghdad district, Public Services Centre, 2nd floor",
  },
  hours: "08:00–20:00",
  // Google Maps place "DOMINANT DESIGN" (40.4607057, 71.2135499), shared by the studio.
  mapHref: "https://maps.app.goo.gl/6Y9wJ8d1vejzbYbM6",
};
