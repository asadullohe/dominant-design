"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";

// Elevation sketch of the hero house; each path is traced on load, then the render fades in over it.
const SKETCH_PATHS = [
  "M20 240H380",
  "M70 150h170v90H70z",
  "M190 90h150v70H190z",
  "M215 96v58M240 96v58M265 96v58M290 96v58M315 96v58",
  "M100 185h26v55h-26z",
];
const SKETCH_ACCENT = "M140 172h72v40h-72z";

interface HeroMediaProps {
  alt: string;
  caption: string;
}

export function HeroMedia({ alt, caption }: HeroMediaProps) {
  const layer = useRef<HTMLDivElement>(null);

  // Gentle parallax while the hero is on screen.
  useEffect(() => {
    if (!document.documentElement.classList.contains("anim")) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (window.scrollY > window.innerHeight * 1.5 || !layer.current) return;
      layer.current.style.transform = `translateY(${window.scrollY * 0.08}px) scale(1.06)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="relative pt-[30px] pl-[30px]">
      <span className="dim dim-top" aria-hidden="true">
        <b>12 400</b>
      </span>
      <span className="dim dim-left" aria-hidden="true">
        <b>9 300</b>
      </span>
      <div className="relative aspect-[4/3] max-w-full overflow-hidden rounded-panel bg-[var(--art-bg)]">
        <div ref={layer} className="absolute inset-0 scale-[1.06] will-change-transform">
          <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="hero-drawing absolute inset-0 size-full">
            <defs>
              <pattern id="hero-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M20 0H0V20" fill="none" stroke="rgba(255,255,255,0.05)" />
              </pattern>
            </defs>
            <rect x="-50" y="-50" width="500" height="400" fill="url(#hero-grid)" />
            <g fill="none" stroke="var(--art-line)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              {SKETCH_PATHS.map((d, i) => (
                <path key={d} d={d} pathLength={1} style={{ "--i": i } as CSSProperties} />
              ))}
              <path d={SKETCH_ACCENT} pathLength={1} stroke="#EE8322" style={{ "--i": SKETCH_PATHS.length } as CSSProperties} />
            </g>
          </svg>
          <Image
            src="/hero.jpg"
            alt={alt}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1024px) 700px, 100vw"
            className="hero-photo object-cover"
          />
        </div>
        <span className="absolute bottom-3.5 left-3.5 z-10 rounded-full bg-[rgba(17,17,17,0.72)] px-2.5 py-1.5 text-xs leading-4 font-medium text-white backdrop-blur-md">
          {caption}
        </span>
      </div>
    </div>
  );
}
