"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ProjectCategory, ProjectKind } from "@/content/types";
import { Gallery, type GallerySlide } from "@/components/ui/Gallery";
import { Reveal } from "@/components/ui/Reveal";

export interface ProjectCard {
  slug: string;
  category: ProjectCategory;
  kind: ProjectKind;
  title: string;
  cover: string;
  slides: GallerySlide[];
}

type Filter = "all" | ProjectCategory;

export function ProjectGrid({ projects }: { projects: ProjectCard[] }) {
  const t = useTranslations("projects");
  const [filter, setFilter] = useState<Filter>("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  // Only offer filters that actually have projects behind them.
  const filters = useMemo<Filter[]>(() => {
    const present = new Set(projects.map((p) => p.category));
    return ["all", ...(["house", "interior", "commercial"] as const).filter((c) => present.has(c))];
  }, [projects]);

  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const opened = projects.find((p) => p.slug === openSlug);

  return (
    <>
      <div role="group" aria-label={t("title")} className="mb-8 flex flex-wrap gap-2">
        {filters.map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={filter === key}
            onClick={() => setFilter(key)}
            className="h-10 cursor-pointer rounded-full border border-stroke bg-page px-4 text-sm font-medium text-text2 transition-colors hover:text-text aria-pressed:border-text aria-pressed:bg-text aria-pressed:text-page"
          >
            {t(`filters.${key}`)}
          </button>
        ))}
      </div>

      <div className="grid gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, n) => (
          // Keyed by filter too, so a new filter replays the entrance for the cards it shows.
          <Reveal key={`${filter}-${project.slug}`} variant="rise-image" delay={(n % 3) * 0.12}>
            <button
              type="button"
              onClick={() => setOpenSlug(project.slug)}
              aria-label={t("open", { title: project.title })}
              className="group grid w-full cursor-pointer gap-3.5 text-left"
            >
              <div className="card-media relative aspect-[4/3] overflow-hidden rounded-card bg-tint">
                <Image
                  src={project.cover}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.4s] group-hover:scale-[1.04]"
                />
                <span
                  className={`absolute top-3 left-3 rounded-full px-2.5 py-[5px] text-[11px] leading-4 font-semibold tracking-[0.05em] uppercase ${project.kind === "built" ? "bg-brand text-on-brand" : "bg-float text-text"}`}
                >
                  {t(`kind.${project.kind}`)}
                </span>
              </div>
              <div className="card-caption">
                <div className="text-[17px] leading-6 font-semibold">{project.title}</div>
                <div className="mt-0.5 text-sm text-text2">
                  {t(`filters.${project.category}`)} · {t("renders", { count: project.slides.length })}
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <Gallery slides={opened?.slides ?? []} index={0} open={Boolean(opened)} onClose={() => setOpenSlug(null)} />
    </>
  );
}
