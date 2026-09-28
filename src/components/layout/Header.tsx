"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { buttonClass } from "@/components/ui/button";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu } from "./MobileMenu";
import { ScrollProgress } from "./ScrollProgress";
import { NAV_ITEMS } from "./nav";

const MENU_ID = "mobile-menu";

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      burgerRef.current?.focus();
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  return (
    <header ref={headerRef} className="theme-dark sticky top-[env(safe-area-inset-top,0px)] z-20 border-b border-stroke-light">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-[72px] lg:gap-6">
        <a href="#top" aria-label={t("home")}>
          <Logo />
        </a>
        <nav aria-label={t("main")} className="hidden gap-7 text-sm text-text2 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a key={item} href={`#${item}`} className="transition-colors hover:text-text">
              {t(item)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LocaleSwitcher className="hidden sm:flex" />
          <a href="#contact" className={buttonClass("brand", "sm", "hidden lg:inline-flex")}>
            {t("cta")}
          </a>
          <button
            ref={burgerRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={MENU_ID}
            aria-label={t(open ? "menuClose" : "menuOpen")}
            className="relative size-11 flex-none cursor-pointer rounded-ctl bg-block lg:hidden"
          >
            <span className={`absolute inset-x-[13px] h-0.5 rounded-sm bg-text transition-[transform,top] duration-300 ${open ? "top-[21px] rotate-45" : "top-[17px]"}`} />
            <span className={`absolute inset-x-[13px] h-0.5 rounded-sm bg-text transition-[transform,top] duration-300 ${open ? "top-[21px] -rotate-45" : "top-[25px]"}`} />
          </button>
        </div>
      </Container>
      <ScrollProgress />
      <MobileMenu id={MENU_ID} open={open} onClose={close} headerRef={headerRef} />
    </header>
  );
}
