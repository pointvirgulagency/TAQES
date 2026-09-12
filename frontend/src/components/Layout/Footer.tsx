"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

interface FooterProps {
  backgroundSrc?: string;
}

const copy = {
  fr: {
    kicker: "POURSUIVRE L'HISTOIRE",
    title:
      "Notre histoire se poursuit à travers les territoires que nous développons.",
    description:
      "Découvrez les projets qui traduisent aujourd'hui notre vision, notre exigence et notre parole.",
    primary: "Explorer nos projets",
    primaryHref: "/projects",
    secondary: "Échanger avec TAQÈS",
    secondaryHref: "/contact",
    vertical: "DES TERRITOIRES MEILLEURS DEMAIN",
    brandTagline: "Bâtir des territoires d'avenir",
    navigation: {
      title: "Navigation",
      links: [
        { id: "accueil", label: "Accueil", href: "/" },
        { id: "groupe", label: "Le Groupe", href: "/groupe" },
      ],
    },
    projets: {
      title: "Projets",
      links: [
        { id: "projets", label: "Projets", href: "/projects" },
        { id: "actualites", label: "Actualités", href: "/actualites" },
      ],
    },
    liensUtiles: {
      title: "Liens utiles",
      links: [
        { id: "contact", label: "Contact", href: "/contact" },
        { id: "mentions", label: "Mentions légales", href: "/mentions-legales" },
        {
          id: "confidentialite",
          label: "Politique de confidentialité",
          href: "/politique-confidentialite",
        },
      ],
    },
    nousContacter: {
      title: "Nous contacter",
      address: "Agdal, Rabat — Maroc",
      phone: "+212 5 37 64 02 60",
      email: "contact@taqes.ma",
    },
    newsletter: {
      title: "Recevoir nos actualités",
      placeholder: "Votre adresse e-mail",
    },
    rights: "Tous droits réservés",
  },
  ar: {
    kicker: "مواصلة المسيرة",
    title: "تتواصل مسيرتنا عبر الأقاليم التي نطورها.",
    description:
      "اكتشف المشاريع التي تجسد اليوم رؤيتنا وطموحنا والتزامنا.",
    primary: "اكتشف مشاريعنا",
    primaryHref: "/projects",
    secondary: "تواصل مع TAQÈS",
    secondaryHref: "/contact",
    vertical: "أقاليم أفضل، مستقبل أفضل",
    brandTagline: "نبني أقاليم المستقبل",
    navigation: {
      title: "التصفح",
      links: [
        { id: "accueil", label: "الرئيسية", href: "/" },
        { id: "groupe", label: "المجموعة", href: "/groupe" },
      ],
    },
    projets: {
      title: "المشاريع",
      links: [
        { id: "projets", label: "المشاريع", href: "/projects" },
        { id: "actualites", label: "الأخبار", href: "/actualites" },
      ],
    },
    liensUtiles: {
      title: "روابط مفيدة",
      links: [
        { id: "contact", label: "اتصل بنا", href: "/contact" },
        { id: "mentions", label: "الإشعار القانوني", href: "/mentions-legales" },
        {
          id: "confidentialite",
          label: "سياسة الخصوصية",
          href: "/politique-confidentialite",
        },
      ],
    },
    nousContacter: {
      title: "اتصل بنا",
      address: "أكدال، الرباط — المغرب",
      phone: "٥ ٦٤ ٠٢ ٦٠ ٣٧ ٢١٢+",
      email: "contact@taqes.ma",
    },
    newsletter: {
      title: "استلم آخر أخبارنا",
      placeholder: "بريدك الإلكتروني",
    },
    rights: "جميع الحقوق محفوظة",
  },
} as const;

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
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
      <h3 className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-[#EBE2DC]/85">
        {title}
      </h3>
      <div className="mb-3 h-px w-5 bg-[#b98650]" />
      <nav className="flex flex-col gap-2">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/${locale}${item.href}`}
            className="text-xs text-[#EBE2DC]/60 transition-colors hover:text-[#EBE2DC]"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default function Footer({ backgroundSrc = "/footer.png" }: FooterProps) {
  const params = useParams();
  const locale = params.locale === "ar" ? "ar" : "fr";
  const c = copy[locale];
  const year = new Date().getFullYear();

  return (
    <footer
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="relative min-h-[1100px] overflow-hidden bg-[#0a3a2b] bg-cover bg-center bg-no-repeat"
      style={
        backgroundSrc
          ? { backgroundImage: `url("${backgroundSrc}")` }
          : undefined
      }
    >
      <div className="relative z-10 flex min-h-[1100px] flex-col px-6 pt-20 md:px-12 lg:px-20">
        <div
          aria-hidden="true"
          className="absolute right-8 top-1/3 hidden -translate-y-1/2 rotate-180 [writing-mode:vertical-rl] text-[10px] tracking-[0.25em] text-[#EBE2DC]/50 lg:block"
        >
          {c.vertical}
        </div>

        <div className="-translate-y-8 max-w-2xl">
          <div className="mb-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#EBE2DC]/70">
              {c.kicker}
            </p>
            <div className="mt-3 h-[2px] w-8 bg-[#b98650]" />
          </div>

          <h2 className="max-w-2xl font-serif text-[30px] font-normal leading-[1.1] text-[#F4EFE9] md:text-[34px] lg:text-[48px]">
            {c.title}
          </h2>

          <p className="mt-6 max-w-lg text-sm leading-relaxed text-[#EBE2DC]/70 md:text-[20px]">
            {c.description}
          </p>

          <div className="relative mt-10 flex translate-y-8 flex-wrap items-center gap-5">
            <div
              aria-hidden="true"
              className="absolute left-[8%] right-[8%] top-1/2 hidden -translate-y-1/2 border-t border-dashed border-[#b98650]/50 sm:block"
            />

            <Link
              href={`/${locale}${c.primaryHref}`}
              className="group relative z-20 inline-flex items-center gap-3 rounded-full border-2 border-[#b98650] bg-[#12281c] px-7 py-3.5 text-xs font-medium uppercase tracking-[0.08em] text-white transition-colors duration-300 hover:bg-[#EBE2DC] hover:text-[#12281c]"
            >
              {c.primary}
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <span
              aria-hidden="true"
              className="relative z-10 hidden h-2 w-2 rounded-full bg-[#b98650] sm:block"
            />

            <Link
              href={`/${locale}${c.secondaryHref}`}
              className="group relative z-10 inline-flex items-center gap-3 rounded-full bg-[#EBE2DC] px-7 py-3.5 text-xs font-medium uppercase tracking-[0.08em] text-[#12281c] transition-colors duration-300 hover:bg-white"
            >
              {c.secondary}
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 right-0 select-none font-serif text-[280px] leading-none text-[#EBE2DC]/[0.04] lg:text-[380px]"
        >
          &
        </div>

        <div className="relative z-10 mt-auto pb-0 pt-32">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-10 border-t border-[#EBE2DC]/10 pt-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
              <div className="lg:col-span-1">
                <Link href={`/${locale}`} className="inline-block">
                  <img
                    src="/taqesheading.png"
                    alt="TAQÈS"
                    className="h-8 w-auto"
                  />
                </Link>
                <p className="mt-3 max-w-[20ch] text-[11px] uppercase tracking-[0.1em] text-[#EBE2DC]/50">
                  {c.brandTagline}
                </p>
              </div>

              <FooterColumn
                title={c.navigation.title}
                items={c.navigation.links}
                locale={locale}
              />

              <FooterColumn
                title={c.projets.title}
                items={c.projets.links}
                locale={locale}
              />

              <FooterColumn
                title={c.liensUtiles.title}
                items={c.liensUtiles.links}
                locale={locale}
              />

              <div>
                <h3 className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-[#EBE2DC]/85">
                  {c.nousContacter.title}
                </h3>
                <div className="mb-3 h-px w-5 bg-[#b98650]" />
                <div className="flex flex-col gap-2 text-xs text-[#EBE2DC]/60">
                  <p>{c.nousContacter.address}</p>
                  <p
                    dir="ltr"
                    className={locale === "ar" ? "text-right" : undefined}
                  >
                    {c.nousContacter.phone}
                  </p>
                  <p>{c.nousContacter.email}</p>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-[#EBE2DC]/85">
                  {c.newsletter.title}
                </h3>
                <div className="mb-3 h-px w-5 bg-[#b98650]" />
                <form className="flex items-center justify-between border-b border-[#EBE2DC]/30 pb-2">
                  <input
                    type="email"
                    placeholder={c.newsletter.placeholder}
                    className="w-full bg-transparent text-xs text-[#EBE2DC] placeholder:text-[#EBE2DC]/40 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label={locale === "ar" ? "إرسال" : "Envoyer"}
                    className="shrink-0 text-[#EBE2DC] transition-transform hover:translate-x-1"
                  >
                    <ArrowIcon className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-2 border-t border-[#EBE2DC]/10 pt-5 text-[10px] text-[#EBE2DC]/40 sm:flex-row sm:items-center sm:justify-between">
              <p>
                © {year} TAQÈS — {c.rights}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="uppercase tracking-[0.15em]">
                  {c.vertical}
                </span>
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
        </div>
      </div>
    </footer>
  );
}