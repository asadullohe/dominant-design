const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-ctl font-semibold transition-[background-color,box-shadow,transform] duration-150 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  brand: "bg-brand text-on-brand hover:bg-brand-hover",
  primary: "bg-text text-page hover:opacity-90",
  ghost: "text-text shadow-[inset_0_0_0_1px_var(--stroke)] hover:shadow-[inset_0_0_0_1px_var(--text3)]",
} as const;

const sizes = {
  md: "h-12 px-[22px] text-[15px]",
  sm: "h-10 px-4 text-sm",
} as const;

/** Class names for button-styled links and buttons, so both share one look. */
export function buttonClass(variant: keyof typeof variants = "brand", size: keyof typeof sizes = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}
