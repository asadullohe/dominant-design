"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Reveal } from "@/components/ui/Reveal";

export interface Step {
  id: string;
  title: string;
  text: string;
}

const noopSubscribe = () => () => {};
const motionAllowed = () => document.documentElement.classList.contains("anim");

/**
 * Numbered steps whose connecting line fills as the section scrolls past,
 * lighting each step when the line reaches it. Without motion every step is lit.
 */
export function ProcessSteps({ steps }: { steps: Step[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(1);
  // The server (and no-JS visitors) render every step lit; the motion class is fixed before hydration.
  const animated = useSyncExternalStore(noopSubscribe, motionAllowed, () => false);

  useEffect(() => {
    if (!animated) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = wrap.current?.getBoundingClientRect();
      if (!rect) return;
      const vh = window.innerHeight;
      setProgress(Math.max(0, Math.min(1, (vh * 0.8 - rect.top) / (rect.height + vh * 0.35))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [animated]);

  const last = steps.length - 1;

  return (
    <div ref={wrap} className="relative">
      {animated && (
        <div aria-hidden="true" className="absolute top-5 left-5 hidden h-px w-[80%] bg-text3 lg:block">
          <span className="-mt-px block h-0.5 origin-left bg-brand" style={{ transform: `scaleX(${progress})` }} />
        </div>
      )}
      <ol className="grid gap-2.5 md:grid-cols-2 lg:grid-cols-5 lg:gap-0">
        {steps.map((step, i) => {
          const lit = !animated || progress >= i / last - 0.001;
          return (
            <Reveal
              key={step.id}
              as="li"
              delay={i * 0.1}
              className="rounded-card bg-float p-6 lg:rounded-none lg:bg-transparent lg:p-0 lg:pr-6"
            >
              <div
                className={`relative z-[1] grid size-10 place-items-center rounded-full font-display text-sm leading-none font-semibold transition-[background-color,color,box-shadow,scale] duration-500 ${
                  lit ? "scale-[1.08] bg-brand text-on-brand" : "bg-float text-text2 shadow-[inset_0_0_0_1px_var(--text3)] lg:bg-block"
                }`}
              >
                {i + 1}
              </div>
              <h3 className="mt-5 mb-2 text-[17px] leading-6 font-semibold">{step.title}</h3>
              <p className="text-[15px] leading-[22px] text-text2">{step.text}</p>
            </Reveal>
          );
        })}
      </ol>
    </div>
  );
}
