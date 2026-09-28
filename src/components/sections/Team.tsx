import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { team } from "@/content/team";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function Team() {
  const t = await getTranslations("team");
  const locale = await getLocale();

  return (
    <section id="team" className="py-14 lg:py-28">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        {/* Founder spans the full width on phones; from tablets up four per row with the last row centred. */}
        <ul className="flex flex-wrap justify-center gap-x-2.5 gap-y-5 [--gap:10px] sm:gap-x-4 sm:gap-y-7 sm:[--gap:16px] lg:gap-x-5 lg:[--gap:20px]">
          {team.map((member, i) => (
            <Reveal
              key={member.id}
              as="li"
              delay={(i % 4) * 0.08}
              className={`group min-w-0 flex-none sm:basis-[calc((100%-3*var(--gap))/4)] ${member.founder ? "basis-full" : "basis-[calc((100%-var(--gap))/2)]"}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-card bg-[#0b0b0b]">
                <Image
                  src={member.photo}
                  alt={member.name[locale]}
                  fill
                  sizes={member.founder ? "(min-width: 640px) 25vw, 100vw" : "(min-width: 640px) 25vw, 50vw"}
                  className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]"
                />
              </div>
              <h3 className="mt-3.5 mb-0.5 text-base leading-[22px] font-semibold">{member.name[locale]}</h3>
              <p className={`text-sm ${member.founder ? "font-semibold text-brand" : "text-text2"}`}>{member.role[locale]}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
