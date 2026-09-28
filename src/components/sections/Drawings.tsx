import { getLocale, getTranslations } from "next-intl/server";
import { drawingGroups, drawingSheets } from "@/content/company";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonClass } from "@/components/ui/button";
import { SheetViewer } from "@/components/drawings/SheetViewer";

export async function Drawings() {
  const t = await getTranslations("drawings");
  const locale = await getLocale();

  const sheets = drawingSheets.map((s) => ({
    id: s.id,
    src: s.src,
    width: s.width,
    height: s.height,
    tab: s.tab[locale],
    title: s.title[locale],
  }));

  return (
    <section id="drawings" className="theme-dark py-14 lg:py-28">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} lead={t("sub")} titleClassName="max-w-[22ch]" />
        <div className="grid gap-5 lg:grid-cols-[8fr_4fr] lg:items-start lg:gap-6">
          <Reveal>
            <SheetViewer sheets={sheets} />
          </Reveal>
          <Reveal as="aside" delay={0.12} className="grid gap-[18px] rounded-panel bg-block p-5 lg:p-7">
            <h3 className="text-lg leading-6 font-semibold">{t("listTitle")}</h3>
            <div className="grid">
              {drawingGroups.map((group) => (
                <div key={group.id} className="grid gap-1 border-t border-stroke py-3.5">
                  <div className="font-semibold">{group.title[locale]}</div>
                  <p className="text-sm text-text2">{group.items[locale]}</p>
                </div>
              ))}
            </div>
            <p className="rounded-ctl bg-card px-4 py-3.5 text-sm text-text2">{t("spec")}</p>
            <a href="#contact" className={buttonClass("brand", "md", "w-full")}>
              {t("cta")}
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
