"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { translations } from "@/i18n";

export default function Navbar() {
  const pathname = usePathname();
  const params = useParams();

  const locale =
    params.locale === "ar" ? "ar" : "fr";

  const t = translations[locale] ?? translations.fr;

  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[9999] transition-all duration-500 ${
        scrolled
          ? "border-b border-[#EBE2DC]/10 bg-[#094734]/95 shadow-[0_8px_32px_rgba(0,0,0,0.15)] backdrop-blur-2xl"
          : "bg-[#094734]"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between transition-all duration-500 ${
          scrolled ? "h-20 px-8" : "h-24 px-6"
        }`}
      >
        <Link
          href={`/${locale}`}
          className="inline-flex items-center"
        >
          <Image
            src="/taqesheading.png"
            alt="TAQÈS"
            width={140}
            height={50}
            priority
            className="h-auto w-[140px]"
          />
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {navigation.map((item) => {
            const isHome = item.href === `/${locale}`;

            const active = isHome
              ? pathname === item.href || pathname === `/${locale}/`
              : pathname === item.href ||
                pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative text-sm font-medium uppercase tracking-[0.15em] text-[#EBE2DC] transition"
              >
                {item.label}

                <span
                  className={`absolute -bottom-2 left-0 h-[2px] bg-[#449383] transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <div className="flex items-center rounded-full border border-[#EBE2DC]/20 bg-[#EBE2DC]/10 p-1 backdrop-blur-md">
            <Link
              href={locale === "fr" ? "#" : switchHref}
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
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                locale === "ar"
                  ? "bg-[#00674F] text-[#EBE2DC]"
                  : "text-[#EBE2DC] hover:bg-[#EBE2DC]/10"
              }`}
            >
              AR
            </Link>
          </div>

          <Link
            href={`/${locale}/contact`}
            className="rounded-full bg-[#00674F] px-6 py-3 text-sm font-medium text-[#EBE2DC] transition-all duration-300 hover:bg-[#449383]"
          >
            {t.navigation.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}
