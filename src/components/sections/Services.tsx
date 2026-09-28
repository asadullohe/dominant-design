import { getLocale, getTranslations } from "next-intl/server";
import { services } from "@/content/services";
import type { ServiceIcon } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ICON_PATHS: Record<ServiceIcon, string> = {
  house: "M3 11 12 4l9 7M5 10v10h14V10M10 20v-6h4v6",
  cadastre: "M4 4h16v16H4zM4 9h16M9 9v11M13 13h4M13 16h3",
  building: "M5 21V4h10v17M15 9h4v12M8 8h1M11 8h1M8 12h1M11 12h1M8 16h1M11 16h1M3 21h18",
};

export async function Services() {
  const t = await getTranslations("services");
  const locale = await getLocale();

  return (
    <section id="services" className="py-14 lg:py-28">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} lead={t("sub")} />
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            // Reveal owns the entrance transition; the inner article owns the hover lift.
            <Reveal key={service.id} delay={i * 0.1} className="grid">
              <article
                className={`group grid content-start gap-3.5 rounded-card p-7 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(12,10,21,0.35)] ${service.primary ? "bg-tint" : "bg-card"}`}
              >
                <div className="grid size-11 place-items-center rounded-ctl bg-page text-brand">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-[22px] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                    <path d={ICON_PATHS[service.icon]} />
                  </svg>
                </div>
                {service.primary && (
                  <span className="text-[11px] leading-4 font-semibold tracking-[0.07em] text-brand uppercase">{t("primaryTag")}</span>
                )}
                <h3 className="mt-1.5 text-lg leading-6 font-semibold">{service.title[locale]}</h3>
                <p className="text-[15px] leading-[22px] text-text2">{service.description[locale]}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
