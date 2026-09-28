import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  lead?: string;
  /** Extra content on the right, e.g. filters. */
  aside?: ReactNode;
  titleClassName?: string;
}

export function SectionHeading({ eyebrow, title, lead, aside, titleClassName = "max-w-[18ch]" }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-6 lg:mb-14">
      <div>
        <Reveal as="span" className="eyebrow">
          {eyebrow}
        </Reveal>
        <Reveal
          as="h2"
          delay={0.08}
          className={`mt-3.5 font-display text-[28px] leading-[34px] font-semibold tracking-[-0.01em] lg:text-[40px] lg:leading-[46px] ${titleClassName}`}
        >
          {title}
        </Reveal>
      </div>
      {lead && (
        <Reveal as="p" delay={0.16} className="mt-4 max-w-[56ch] text-text2">
          {lead}
        </Reveal>
      )}
      {aside && <Reveal delay={0.16}>{aside}</Reveal>}
    </div>
  );
}
