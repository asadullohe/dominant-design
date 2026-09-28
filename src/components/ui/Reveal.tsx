"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealTag = "div" | "span" | "article" | "aside" | "h2" | "p" | "li" | "section";

interface RevealProps {
  as?: RevealTag;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Named reveal style from globals.css; the default is a soft rise. */
  variant?: "rise-image";
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  id?: string;
}

/**
 * Shows its content with a rise animation the first time it scrolls into view.
 * The visible state is a data attribute (not a class) so React re-renders never reset it.
 */
export function Reveal({ as: Tag = "div", delay = 0, variant, className, style, children, id }: RevealProps) {
  const node = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = node.current;
    if (!el) return;
    if (!document.documentElement.classList.contains("anim")) {
      el.dataset.shown = "";
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.shown = "";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={(el: HTMLElement | null) => {
        node.current = el;
      }}
      id={id}
      data-reveal={variant ?? ""}
      className={className}
      style={{ ...style, "--d": `${delay}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
