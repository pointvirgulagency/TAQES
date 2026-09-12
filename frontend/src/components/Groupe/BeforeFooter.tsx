"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

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

export default function BeforeFooter() {
  const params = useParams();
  const locale = params.locale === "ar" ? "ar" : "fr";
  const c = copy[locale];

  return (
    <section
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="relative min-h-[620px] overflow-hidden bg-[#0a3a2b] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("/footer.png")',
        backgroundPosition: "center 0%",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute right-8 top-1/2 hidden -translate-y-1/2 rotate-180 [writing-mode:vertical-rl] text-[10px] tracking-[0.25em] text-[#EBE2DC]/50 lg:block"
      >
        {c.vertical}
      </div>

      <div className="relative z-10 flex min-h-[620px] items-center px-6 py-20 md:px-12 lg:px-20">
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
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 right-0 select-none font-serif text-[280px] leading-none text-[#EBE2DC]/[0.04] lg:text-[380px]"
      >
        &
      </div>
    </section>
  );
}