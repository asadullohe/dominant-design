import { getTranslations } from "next-intl/server";
import { contact } from "@/content/company";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { NAV_ITEMS } from "./nav";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");

  return (
    <footer className="theme-dark pt-14 pb-8">
      <Container>
        <div className="grid gap-8 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <a href="#top" aria-label={nav("home")}>
              <Logo />
            </a>
            <p className="mt-4 max-w-[32ch] text-text2">{t("tagline")}</p>
          </div>
          <div>
            <h2 className="mb-3.5 text-[11px] leading-4 font-semibold tracking-[0.07em] text-text3 uppercase">{t("sections")}</h2>
            <ul className="grid gap-2.5 text-text2">
              {NAV_ITEMS.filter((item) => item !== "contact").map((item) => (
                <li key={item}>
                  <a href={`#${item}`} className="hover:text-text">
                    {nav(item)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-3.5 text-[11px] leading-4 font-semibold tracking-[0.07em] text-text3 uppercase">{t("contact")}</h2>
            <ul className="grid gap-2.5 text-text2">
              <li>
                <a href={contact.phone.href} className="tabular-nums hover:text-text">
                  {contact.phone.display}
                </a>
              </li>
              <li>
                <a href={contact.telegram.href} target="_blank" rel="noopener noreferrer" className="hover:text-text">
                  Telegram · {contact.telegram.handle}
                </a>
              </li>
              <li>
                <a href={contact.instagram.href} target="_blank" rel="noopener noreferrer" className="hover:text-text">
                  Instagram · {contact.instagram.handle}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-stroke pt-6 text-[13px] text-text3">
          <span>
            © {new Date().getFullYear()} Dominant Design. {t("rights")}
          </span>
          <LocaleSwitcher />
        </div>
      </Container>
    </footer>
  );
}
