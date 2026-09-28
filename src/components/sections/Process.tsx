import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessSteps } from "./ProcessSteps";

// Provisional steps until the studio confirms its real workflow.
const STEP_IDS = ["consultation", "sketch", "design", "visualisation", "supervision"] as const;

export async function Process() {
  const t = await getTranslations("process");
  const steps = STEP_IDS.map((id) => ({ id, title: t(`steps.${id}.title`), text: t(`steps.${id}.text`) }));

  return (
    <section id="process" className="bg-block py-14 lg:py-28">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <ProcessSteps steps={steps} />
      </Container>
    </section>
  );
}
