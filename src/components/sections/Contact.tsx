import { getLocale, getTranslations } from "next-intl/server";
import { contact } from "@/content/company";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonClass } from "@/components/ui/button";
import { LeadForm } from "@/components/contact/LeadForm";
import { MapEmbed } from "@/components/contact/MapEmbed";

export async function Contact() {
  const t = await getTranslations("contact");
  const locale = await getLocale();

  const rows = [
    { key: "phone", value: contact.phone.display, href: contact.phone.href },
    { key: "telegram", value: contact.telegram.handle, href: contact.telegram.href, external: true },
    { key: "instagram", value: contact.instagram.handle, href: contact.instagram.href, external: true },
    { key: "address", value: contact.address[locale] },
    { key: "hours", value: contact.hours },
  ] as const;

  return (
    <section id="contact" className="bg-block py-14 lg:py-28">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} lead={t("sub")} />
        <div className="grid gap-5 lg:grid-cols-[7fr_5fr] lg:gap-6">
          <Reveal className="relative rounded-panel bg-float p-5 sm:p-8 lg:p-10">
            <LeadForm />
          </Reveal>
          <Reveal delay={0.1} className="grid content-start gap-2.5">
            <dl className="rounded-panel bg-float px-6 py-2">
              {rows.map((row) => (
                <div key={row.key} className="flex justify-between gap-4 border-b border-stroke py-4 last:border-b-0">
                  <dt className="text-sm text-text2">{t(`info.${row.key}`)}</dt>
                  <dd className="text-right font-semibold tabular-nums">
                    {"href" in row ? (
                      <a
                        href={row.href}
                        className="hover:text-brand"
                        {...("external" in row ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <MapEmbed lat={contact.map.lat} lng={contact.map.lng} locale={locale} title={t("mapTitle")} />
            <a href={contact.map.href} target="_blank" rel="noopener noreferrer" className={buttonClass("ghost", "md", "w-full bg-float")}>
              {t("map")}
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
