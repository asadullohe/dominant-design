import { getLocale, getTranslations } from "next-intl/server";
import { projectImages, projects } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectGrid, type ProjectCard } from "@/components/portfolio/ProjectGrid";

export async function Portfolio() {
  const t = await getTranslations("projects");
  const locale = await getLocale();

  // Resolve translations on the server so the client grid only receives plain strings.
  const cards: ProjectCard[] = projects.map((project) => {
    const title = project.title[locale];
    const images = projectImages(project);
    return {
      slug: project.slug,
      category: project.category,
      kind: project.kind,
      title,
      cover: images[0],
      slides: images.map((src, i) => ({ src, alt: `${title} — ${i + 1}`, ...project.size })),
    };
  });

  return (
    <section id="projects" className="pb-14 lg:pb-28">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <ProjectGrid projects={cards} />
      </Container>
    </section>
  );
}
