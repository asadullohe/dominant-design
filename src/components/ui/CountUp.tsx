"use client";

import { useEffect, useRef } from "react";

const COUNTABLE = /^(\d+)(\+?)$/;

/**
 * Counts plain quantities like "500+" up from zero when they scroll into view.
 * Years, ranges and words are rendered as written.
 */
export function CountUp({ value }: { value: string }) {
  const node = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = node.current;
    const match = COUNTABLE.exec(value);
    if (!el || !match || Number(match[1]) >= 1900) return;
    if (!document.documentElement.classList.contains("anim")) return;

    const target = Number(match[1]);
    const suffix = match[2];
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const k = Math.min(1, (now - start) / 1600);
        el.textContent = `${Math.round(target * (1 - Math.pow(1 - k, 3)))}${suffix}`;
        if (k < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return <span ref={node}>{value}</span>;
}
