import type { CSSProperties } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { stats } from "@/content/company";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { buttonClass } from "@/components/ui/button";
import { HeroMedia } from "./HeroMedia";

const delay = (d: number) => ({ "--d": `${d}s` }) as CSSProperties;

export async function Hero() {
  const t = await getTranslations("hero");
  const locale = await getLocale();

  return (
    <section id="top" className="theme-dark pt-10 lg:pt-[88px]">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[5fr_7fr] lg:gap-14">
          <div>
            <span data-load="" className="eyebrow" style={delay(0.05)}>
              {t("eyebrow")}
            </span>
            <h1
              data-load=""
              style={delay(0.15)}
              className="mt-[18px] font-display text-[32px] leading-[38px] font-semibold tracking-[-0.02em] md:text-[44px] md:leading-[50px] xl:text-[56px] xl:leading-[60px]"
            >
              {t.rich("title", { accent: (chunks) => <em className="text-brand not-italic">{chunks}</em> })}
            </h1>
            <p data-load="" style={delay(0.3)} className="mt-5 max-w-[46ch] text-text2">
              {t("sub")}
            </p>
            <div data-load="" style={delay(0.42)} className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className={buttonClass("brand")}>
                {t("cta")}
              </a>
              <a href="#projects" className={buttonClass("ghost")}>
                {t("ctaSecondary")}
              </a>
            </div>
          </div>
          <HeroMedia alt={t("imageAlt")} caption={t("caption")} />
        </div>

        <dl className="mt-12 grid grid-cols-2 border-t border-stroke lg:mt-20 md:grid-cols-4">
          {stats.map((stat, i) => {
            const value = stat.value[locale];
            const isWord = !/^\d/.test(value);
            return (
              <Reveal
                key={stat.id}
                delay={0.1 + i * 0.08}
                className={`flex min-w-0 flex-col-reverse border-stroke py-7 pr-4 ${i % 2 ? "border-l pl-5" : ""} ${i > 0 ? "md:border-l md:pl-5" : ""} ${i > 1 ? "border-t md:border-t-0" : ""}`}
              >
                <dt className="mt-2.5 text-sm text-text2">{stat.label[locale]}</dt>
                <dd className="font-display text-[32px] leading-none font-semibold text-brand tabular-nums lg:text-[44px]">
                  {isWord ? <span className="text-[clamp(20px,2.4vw,32px)] [overflow-wrap:anywhere]">{value}</span> : <CountUp value={value} />}
                </dd>
              </Reveal>
            );
          })}
        </dl>
      </Container>
    </section>
  );
}
