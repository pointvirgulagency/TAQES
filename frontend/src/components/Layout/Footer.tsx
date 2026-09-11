"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { translations } from "@/i18n";

// Local copy for the new footer sections. Fold these into your i18n
// `translations` object (under `footer`) once the wording is final —
// they're kept here so this component doesn't depend on keys that
// don't exist yet in your i18n file.
const copy = {
  fr: {
    ctaTitle: "Un projet, un foncier, une opportunité à développer ?",
    ctaButton: "Échanger avec TAQÈS",
    tagline: "L'immobilier nouvelle génération",
    decouvrir: "Découvrir",
    echanger: "Échanger",
    nousRetrouver: "Nous retrouver",
    decouvrirLinks: [
      { id: "heritage", label: "De l'héritage à l'avenir", href: "/groupe" },
      { id: "projets", label: "Nos projets", href: "/projects" },
      { id: "territoires", label: "Nos territoires", href: "/territoires" },
      { id: "journal", label: "Le Journal TAQÈS", href: "/actualites" },
    ],
    echangerLinks: [
      { id: "contact", label: "Nous contacter", href: "/contact" },
      {
        id: "opportunites",
        label: "Opportunités & Partenariats",
        href: "/opportunites",
      },
      { id: "reclamation", label: "Réclamation", href: "/e-reclam" },
      { id: "recrutement", label: "Recrutement", href: "/recrutement" },
    ],
    address: "Agdal, Rabat — Maroc",
    phone: "+212 5 37 64 02 60",
    email: "contact@taqes.ma",
    rights: "L'immobilier nouvelle génération",
    legalNotice: "Mentions légales",
    privacyPolicy: "Politique de confidentialité",
    cookies: "Gestion des cookies",
  },
  ar: {
    ctaTitle: "مشروع، وعاء عقاري، فرصة للتطوير؟",
    ctaButton: "تواصل مع TAQÈS",
    tagline: "العقار من الجيل الجديد",
    decouvrir: "اكتشف",
    echanger: "تواصل",
    nousRetrouver: "أوجدنا",
    decouvrirLinks: [
      { id: "heritage", label: "من الإرث إلى المستقبل", href: "/groupe" },
      { id: "projets", label: "مشاريعنا", href: "/projects" },
      { id: "territoires", label: "أقاليمنا", href: "/territoires" },
      { id: "journal", label: "مجلة TAQÈS", href: "/actualites" },
    ],
    echangerLinks: [
      { id: "contact", label: "اتصل بنا", href: "/contact" },
      { id: "opportunites", label: "فرص وشراكات", href: "/opportunites" },
      { id: "reclamation", label: "شكاية", href: "/e-reclam" },
      { id: "recrutement", label: "توظيف", href: "/recrutement" },
    ],
    address: "أكدال، الرباط — المغرب",
    phone: "٥ ٦٤ ٠٢ ٦٠ ٣٧ ٢١٢+",
    email: "contact@taqes.ma",
    rights: "العقار من الجيل الجديد",
    legalNotice: "الإشعار القانوني",
    privacyPolicy: "سياسة الخصوصية",
    cookies: "إدارة ملفات تعريف الارتباط",
  },
} as const;

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 10H16M16 10L11 5M16 10L11 15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronUpIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 12L10 7L15 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FooterColumn({
  title,
  items,
  locale,
}: {
  title: string;
  items: readonly { id: string; label: string; href: string }[];
  locale: string;
}) {
  return (
    <div>
      <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#EBE2DC]/50">
        {title}
      </h3>
      <nav className="flex flex-col gap-2.5">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/${locale}${item.href}`}
            className="text-xs text-[#EBE2DC]/70 transition-colors hover:text-[#EBE2DC]"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default function Footer() {
  const params = useParams();

  const locale = params.locale === "ar" ? "ar" : "fr";
  const t = translations[locale] ?? translations.fr;
  const c = copy[locale];

  const year = new Date().getFullYear();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer dir={locale === "ar" ? "rtl" : "ltr"} className="relative bg-[#094734]">
      {/* Scroll to top */}
      <div className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
        <button
          type="button"
          onClick={scrollToTop}
          aria-label={locale === "ar" ? "العودة إلى الأعلى" : "Revenir en haut"}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-[#094734]/15 bg-[#F4EFE9] text-[#094734] shadow-sm transition-transform duration-300 hover:-translate-y-0.5"
        >
          <ChevronUpIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Decorative diamond pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[420px] opacity-[0.06] lg:block"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='84' height='84' viewBox='0 0 84 84'%3E%3Cg fill='none' stroke='%23EBE2DC' stroke-width='1.5'%3E%3Cpath d='M42 4L80 42L42 80L4 42Z'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: "84px 84px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-16 md:px-10 lg:px-16">
        {/* CTA */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-xl font-serif text-[28px] leading-[1.2] text-[#F4EFE9] md:text-[34px]">
            {c.ctaTitle}
          </h2>

          <Link
            href={`/${locale}/contact`}
            className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-[#EBE2DC] px-6 py-3 text-sm font-medium text-[#094734] transition-colors duration-300 hover:bg-white"
          >
            {c.ctaButton}
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="my-10 border-t border-[#EBE2DC]/15" />

        {/* Columns */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div>
            <Link href={`/${locale}`} className="inline-block">
              <img src="/taqesheading.png" alt="TAQÈS" className="h-9 w-auto" />
            </Link>
            <p className="mt-4 max-w-[22ch] text-xs leading-5 text-[#EBE2DC]/60">
              {c.tagline}
            </p>
          </div>

          <FooterColumn title={c.decouvrir} items={c.decouvrirLinks} locale={locale} />
          <FooterColumn title={c.echanger} items={c.echangerLinks} locale={locale} />

          {/* Nous retrouver */}
          <div>
            <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#EBE2DC]/50">
              {c.nousRetrouver}
            </h3>
            <div className="flex flex-col gap-2.5 text-xs text-[#EBE2DC]/70">
              <p>{c.address}</p>
              <p dir="ltr" className={locale === "ar" ? "text-right" : undefined}>
                {c.phone}
              </p>
              <p>{c.email}</p>
              <div className="mt-1 flex gap-4">
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-[#EBE2DC]"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-[#EBE2DC]"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-[#EBE2DC]/10 pt-5 text-[10px] text-[#EBE2DC]/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} TAQÈS — {c.rights}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link
              href={`/${locale}/mentions-legales`}
              className="transition-colors hover:text-[#EBE2DC]"
            >
              {c.legalNotice}
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              href={`/${locale}/politique-confidentialite`}
              className="transition-colors hover:text-[#EBE2DC]"
            >
              {c.privacyPolicy}
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              href={`/${locale}/gestion-cookies`}
              className="transition-colors hover:text-[#EBE2DC]"
            >
              {c.cookies}
            </Link>
            <span aria-hidden="true">·</span>
            <div className="flex items-center gap-1">
              <Link
                href="/fr"
                className={
                  locale === "fr"
                    ? "text-[#EBE2DC]"
                    : "transition-colors hover:text-[#EBE2DC]"
                }
              >
                FR
              </Link>
              <span aria-hidden="true">/</span>
              <Link
                href="/ar"
                className={
                  locale === "ar"
                    ? "text-[#EBE2DC]"
                    : "transition-colors hover:text-[#EBE2DC]"
                }
              >
                AR
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}