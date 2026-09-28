/** Dominant Design house mark, redrawn as vectors from the supplied logo. Dark parts follow `currentColor`. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="260 120 1320 880" aria-hidden="true" className={className}>
      <g fill="currentColor">
        <polygon points="443,600 443,455 583,359 583,198 682,198 682,291 918,130 1172,303 1062,378 918,290" />
        <polygon points="443,800 443,680 885,385 885,500" />
        <polygon points="443,988 443,878 885,580 885,988" />
        <polygon points="270,988 270,795 377,725 377,988" />
        <polygon points="950,383 1003,418 950,455" />
      </g>
      <g fill="#EE8322">
        <polygon points="1125,418 1232,345 1392,452 1392,598" />
        <polygon points="950,988 950,530 1027,485 1027,988" />
        <polygon points="1095,988 1095,485 1148,518 1148,988" />
        <polygon points="1216,988 1216,565 1270,600 1270,988" />
        <polygon points="1338,988 1338,645 1392,680 1392,988" />
        <polygon points="1460,988 1460,727 1565,797 1565,988" />
      </g>
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-3">
      <LogoMark className="h-7 w-10 flex-none" />
      <span className="font-display text-[15px] leading-none font-semibold tracking-[0.02em] whitespace-nowrap">
        DOMINANT <span className="text-brand">DESIGN</span>
      </span>
    </span>
  );
}
