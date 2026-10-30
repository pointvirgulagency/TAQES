
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { translations } from "@/i18n";

export default function Navbar() {
  const pathname = usePathname();
  const params = useParams();

  const locale = params.locale === "ar" ? "ar" : "fr";
  const isArabic = locale === "ar";

  const t = translations[locale] ?? translations.fr;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close the mobile menu after route navigation.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent background scrolling while the menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navigation = [
    {
      label: t.navigation.home,
      href: `/${locale}`,
    },
    {
      label: t.navigation.group,
      href: `/${locale}/groupe`,
    },
    {
      label: t.navigation.projects,
      href: `/${locale}/projects`,
    },
    {
      label: t.navigation.news,
      href: `/${locale}/actualites`,
    },
    {
      label: t.navigation.contact,
      href: `/${locale}/contact`,
    },
  ];

  const otherLocale = locale === "fr" ? "ar" : "fr";

  const switchHref = pathname.replace(
    `/${locale}`,
    `/${otherLocale}`
  );

  const isActive = (href: string) => {
    const isHome = href === `/${locale}`;

    return isHome
      ? pathname === href || pathname === `/${locale}/`
      : pathname === href || pathname.startsWith(href + "/");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      dir={isArabic ? "rtl" : "ltr"}
      className={`fixed inset-x-0 top-0 z-[9999] transition-all duration-500 ${
        scrolled
          ? "border-b border-[#EBE2DC]/10 bg-[#094734]/95 shadow-[0_8px_32px_rgba(0,0,0,0.15)] backdrop-blur-2xl"
          : "bg-[#094734]"
      }`}
    >
      {/* MAIN NAVBAR */}
      <div
        className={`relative mx-auto flex max-w-7xl items-center justify-between transition-all duration-500 ${
          scrolled ? "h-20 px-6 sm:px-8" : "h-24 px-6"
        }`}
      >
        {/* LOGO */}
        <Link
          href={`/${locale}`}
          onClick={closeMenu}
          className="inline-flex items-center"
        >
          <Image
            src="/taqesheading.png"
            alt="TAQÈS"
            width={140}
            height={50}
            priority
            className="h-auto w-[120px] sm:w-[140px]"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-10 lg:flex">
          {navigation.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative text-sm font-medium uppercase tracking-[0.15em] text-[#EBE2DC] transition"
              >
                {item.label}

                <span
                  className={`absolute -bottom-2 start-0 h-[2px] bg-[#449383] transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden items-center gap-6 lg:flex">
          <LanguageSwitcher
            locale={locale}
            switchHref={switchHref}
          />

          <Link
            href={`/${locale}/contact`}
            className="rounded-full bg-[#00674F] px-6 py-3 text-sm font-medium text-[#EBE2DC] transition-all duration-300 hover:bg-[#449383]"
          >
            {t.navigation.cta}
          </Link>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={
            menuOpen
              ? isArabic
                ? "إغلاق القائمة"
                : "Fermer le menu"
              : isArabic
                ? "فتح القائمة"
                : "Ouvrir le menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#EBE2DC]/20 text-[#EBE2DC] transition hover:bg-[#EBE2DC]/10 lg:hidden"
        >
          {menuOpen ? (
            <X size={23} strokeWidth={1.7} />
          ) : (
            <Menu size={23} strokeWidth={1.7} />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        id="mobile-navigation"
        aria-hidden={!menuOpen}
        className={`absolute inset-x-0 top-full overflow-hidden border-t border-[#EBE2DC]/10 bg-[#094734]/[0.98] backdrop-blur-2xl transition-all duration-300 ease-in-out lg:hidden ${
          menuOpen
            ? "visible max-h-[calc(100dvh-5rem)] opacity-100"
            : "invisible max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-6 py-6 sm:px-8">
          {navigation.map((item, index) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                tabIndex={menuOpen ? 0 : -1}
                className={`flex items-center justify-between border-b border-[#EBE2DC]/10 py-5 text-sm font-medium uppercase tracking-[0.12em] transition ${
                  active
                    ? "text-[#449383]"
                    : "text-[#EBE2DC] hover:text-[#449383]"
                }`}
                style={{
                  transitionDelay: menuOpen
                    ? `${index * 35}ms`
                    : "0ms",
                }}
              >
                <span>{item.label}</span>

                <span className="text-lg" aria-hidden="true">
                  {isArabic ? "←" : "→"}
                </span>
              </Link>
            );
          })}

          {/* MOBILE LANGUAGE + CTA */}
          <div className="flex flex-col gap-6 pt-7">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-widest text-[#EBE2DC]/60">
                {isArabic ? "اللغة" : "Langue"}
              </span>

              <LanguageSwitcher
                locale={locale}
                switchHref={switchHref}
                onNavigate={closeMenu}
              />
            </div>

            <Link
              href={`/${locale}/contact`}
              onClick={closeMenu}
              tabIndex={menuOpen ? 0 : -1}
              className="w-full rounded-full bg-[#00674F] px-6 py-4 text-center text-sm font-semibold text-[#EBE2DC] transition hover:bg-[#449383]"
            >
              {t.navigation.cta}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

function LanguageSwitcher({
  locale,
  switchHref,
  onNavigate,
}: {
  locale: "fr" | "ar";
  switchHref: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex items-center rounded-full border border-[#EBE2DC]/20 bg-[#EBE2DC]/10 p-1 backdrop-blur-md">
      <Link
        href={locale === "fr" ? "#" : switchHref}
        onClick={onNavigate}
        aria-current={locale === "fr" ? "page" : undefined}
        className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
          locale === "fr"
            ? "bg-[#00674F] text-[#EBE2DC]"
            : "text-[#EBE2DC] hover:bg-[#EBE2DC]/10"
        }`}
      >
        FR
      </Link>

      <Link
        href={locale === "ar" ? "#" : switchHref}
        onClick={onNavigate}
        aria-current={locale === "ar" ? "page" : undefined}
        className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
          locale === "ar"
            ? "bg-[#00674F] text-[#EBE2DC]"
            : "text-[#EBE2DC] hover:bg-[#EBE2DC]/10"
        }`}
      >
        AR
      </Link>
    </div>
  );
}
