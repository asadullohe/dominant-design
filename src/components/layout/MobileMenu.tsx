"use client";

import { useEffect, useState, type CSSProperties, type MouseEvent, type RefObject } from "react";
import { useTranslations } from "next-intl";
import { contact } from "@/content/company";
import { buttonClass } from "@/components/ui/button";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { NAV_ITEMS } from "./nav";

interface MobileMenuProps {
  id: string;
  open: boolean;
  onClose: () => void;
  headerRef: RefObject<HTMLElement | null>;
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-5 flex-none text-text3 transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function MobileMenu({ id, open, onClose, headerRef }: MobileMenuProps) {
  const t = useTranslations("nav");
  const [top, setTop] = useState(64);

  // Keep the panel glued to the header's bottom edge, which moves with the safe-area inset and page zoom.
  useEffect(() => {
    if (!open) return;
    const place = () => setTop(Math.max(0, headerRef.current?.getBoundingClientRect().bottom ?? 64));
    place();
    document.body.style.overflow = "hidden";
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("scroll", place);
      window.removeEventListener("resize", place);
    };
  }, [open, headerRef]);

  // Scroll after the body lock is released, otherwise the anchor jump is swallowed.
  const goTo = (event: MouseEvent<HTMLAnchorElement>, hash: string) => {
    event.preventDefault();
    onClose();
    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView();
      history.replaceState(null, "", `#${hash}`);
    });
  };

  if (!open) return null;

  return (
    <div
      id={id}
      className="menu-panel fixed inset-x-0 bottom-0 z-[19] flex flex-col justify-between gap-8 overflow-y-auto overscroll-contain bg-page px-4 pt-3 pb-[calc(env(safe-area-inset-bottom,0px)+24px)] sm:px-8 lg:hidden"
      style={{ top }}
    >
      <nav aria-label={t("main")} className="grid">
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item}
            href={`#${item}`}
            onClick={(e) => goTo(e, item)}
            data-menu-item=""
            style={{ "--i": i } as CSSProperties}
            className="group flex items-center justify-between gap-4 border-b border-stroke py-[18px] font-display text-[26px] leading-[1.15] font-semibold tracking-[-0.01em]"
          >
            {t(item)}
            <ArrowIcon />
          </a>
        ))}
      </nav>
      <div data-menu-item="" style={{ "--i": NAV_ITEMS.length + 1 } as CSSProperties} className="grid gap-4">
        <a href="#contact" onClick={(e) => goTo(e, "contact")} className={buttonClass("brand", "md", "w-full")}>
          {t("cta")}
        </a>
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <div className="grid gap-0.5 text-sm text-text2">
            <a href={contact.phone.href} className="font-semibold text-text tabular-nums">
              {contact.phone.display}
            </a>
            <a href={contact.telegram.href} target="_blank" rel="noopener noreferrer">
              Telegram · {contact.telegram.handle}
            </a>
          </div>
          <LocaleSwitcher />
        </div>
      </div>
    </div>
  );
}
