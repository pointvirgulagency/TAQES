"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { translations } from "@/i18n";

export default function Footer() {
  const params = useParams();
  const locale = (params.locale as "fr" | "ar") || "fr";
  const t = translations[locale];

  const navigation = [
    {
      id: "accueil",
      label: t.footer.accueil,
      href: `/${locale}`,
    },
    {
      id: "groupe",
      label: t.footer.groupe,
      href: `/${locale}/groupe`,
    },
    {
      id: "projets",
      label: t.footer.projets,
      href: `/${locale}/projects`,
    },
    {
      id: "actualites",
      label: t.footer.actualites,
      href: `/${locale}/actualites`,
    },
  ];

  const projects = [
    {
      id: "foncier",
      label: t.footer.foncier,
      href: `/${locale}/projects`,
    },
    {
      id: "lots-r3",
      label: t.footer.lotsR3,
      href: `/${locale}/projects`,
    },
    {
      id: "lots-r4",
      label: t.footer.lotsR4,
      href: `/${locale}/projects`,
    },
    {
      id: "villas",
      label: t.footer.villas,
      href: `/${locale}/projects`,
    },
  ];

  const usefulLinks = [
    {
      id: "territoires",
      label: t.footer.territoires,
      href: `/${locale}/territoires`,
    },
    {
      id: "engagements",
      label: t.footer.engagements,
      href: `/${locale}/engagements`,
    },
    {
      id: "documentation",
      label: t.footer.documentation,
      href: `/${locale}/documentation`,
    },
    {
      id: "reclamations",
      label: t.footer.reclamations,
      href: `/${locale}/e-reclam`,
    },
  ];

  return (
    <footer
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="bg-[#094734] px-6 py-12 text-[#EBE2DC] md:px-10 lg:px-16"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">

        {/* Brand */}
        <div>
          <Link href={`/${locale}`} className="inline-block">
            <img
              src="/images/logo-taqes-footer.svg"
              alt="TAQÈS"
              className="h-10 w-auto"
            />
          </Link>

          <p className="mt-5 max-w-xs text-xs leading-5 text-[#EBE2DC]/60">
            {t.footer.description}
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.08em]">
            {t.footer.navigation}
          </h3>

          <nav className="flex flex-col gap-2.5">
            {navigation.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="text-xs text-[#EBE2DC]/65 transition-colors hover:text-[#EBE2DC]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Projects */}
        <div>
          <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.08em]">
            {t.footer.projetsTitle}
          </h3>

          <nav className="flex flex-col gap-2.5">
            {projects.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="text-xs text-[#EBE2DC]/65 transition-colors hover:text-[#EBE2DC]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Useful links */}
        <div>
          <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.08em]">
            {t.footer.usefulLinksTitle}
          </h3>

          <nav className="flex flex-col gap-2.5">
            {usefulLinks.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="text-xs text-[#EBE2DC]/65 transition-colors hover:text-[#EBE2DC]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.08em]">
            {t.footer.contact}
          </h3>

          <div className="flex flex-col gap-3 text-xs text-[#EBE2DC]/65">
            <p>{t.footer.address}</p>
            <p>{t.footer.phone}</p>
            <p>{t.footer.email}</p>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.08em]">
            {t.footer.newsletterTitle}
          </h3>

          <form className="flex items-center border-b border-[#EBE2DC]/30 pb-2">
            <input
              type="email"
              placeholder={t.footer.emailPlaceholder}
              className="min-w-0 flex-1 bg-transparent text-xs text-[#EBE2DC] outline-none placeholder:text-[#EBE2DC]/40"
            />

            <button
              type="submit"
              aria-label={t.footer.subscribe}
              className="ms-3 text-sm text-[#EBE2DC]/70 transition-colors hover:text-[#EBE2DC]"
            >
              →
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="mx-auto mt-10 max-w-7xl border-t border-[#EBE2DC]/10 pt-5 text-[10px] text-[#EBE2DC]/40">
        <div className="flex flex-col justify-between gap-3 sm:flex-row">
          <p>
            © {new Date().getFullYear()} TAQÈS — {t.footer.rights}
          </p>

          <div className="flex gap-5">
            <Link
              href={`/${locale}/mentions-legales`}
              className="transition-colors hover:text-[#EBE2DC]"
            >
              {t.footer.legalNotice}
            </Link>

            <Link
              href={`/${locale}/politique-confidentialite`}
              className="transition-colors hover:text-[#EBE2DC]"
            >
              {t.footer.privacyPolicy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}