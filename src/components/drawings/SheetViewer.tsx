"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Gallery } from "@/components/ui/Gallery";

export interface Sheet {
  id: string;
  src: string;
  width: number;
  height: number;
  tab: string;
  title: string;
}

export function SheetViewer({ sheets }: { sheets: Sheet[] }) {
  const t = useTranslations("drawings");
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const sheet = sheets[active];

  return (
    <div>
      <div role="tablist" aria-label={t("eyebrow")} className="mb-3.5 flex flex-wrap gap-2">
        {sheets.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            id={`sheet-tab-${s.id}`}
            aria-selected={i === active}
            aria-controls="sheet-stage"
            onClick={() => setActive(i)}
            className="h-10 cursor-pointer rounded-full border border-stroke px-4 text-sm font-medium text-text2 transition-colors hover:text-text aria-selected:border-brand aria-selected:bg-brand aria-selected:text-on-brand"
          >
            {s.tab}
          </button>
        ))}
      </div>

      <div id="sheet-stage" role="tabpanel" aria-labelledby={`sheet-tab-${sheet.id}`}>
        <button
          type="button"
          aria-label={t("enlarge", { title: sheet.title })}
          onClick={() => setOpen(true)}
          className="group relative block aspect-[1.414] w-full max-w-full cursor-zoom-in overflow-hidden rounded-panel bg-[#f1eee9] p-2 sm:p-5"
        >
          {/* Keyed by sheet so each switch replays the swap animation. */}
          <span key={sheet.id} className="sheet-swap relative block size-full">
            <Image src={sheet.src} alt={sheet.title} fill sizes="(min-width: 1024px) 800px, 100vw" className="object-contain" />
          </span>
          <span aria-hidden="true" className="absolute top-3.5 right-3.5 grid size-10 place-items-center rounded-ctl bg-[rgba(17,17,17,0.72)] text-white transition-transform group-hover:scale-110">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </span>
          <span className="absolute bottom-3.5 left-3.5 rounded-full bg-[rgba(17,17,17,0.72)] px-2.5 py-1.5 text-xs leading-4 font-medium text-white backdrop-blur-md">
            {sheet.title}
          </span>
        </button>
      </div>

      <Gallery
        open={open}
        index={active}
        onClose={() => setOpen(false)}
        slides={sheets.map((s) => ({ src: s.src, alt: s.title, width: s.width, height: s.height }))}
      />
    </div>
  );
}
