import Link from "next/link";

import type {
  CTASection,
  Locale,
} from "./ArticleTypes";

import { getLocalizedUrl } from "./article-utils";

interface ArticleCTAProps {
  section: CTASection;
  locale: Locale;
}

export default function ArticleCTA({
  section,
  locale,
}: ArticleCTAProps) {
  if (
    !section.titre &&
    !section.description &&
    !section.libelle_boutton
  ) {
    return null;
  }

  // Button background & text styling controlled by Strapi section.fond
  const button =
    section.fond === "vert"
      ? "bg-[#00674F] text-white hover:bg-[#00523F]"
      : section.fond === "sage"
        ? "bg-[#00674F] text-white hover:bg-[#00523F]"
        : section.fond === "nude"
          ? "bg-[#C4A484] text-white hover:bg-[#B39373]"
          : "bg-[#00674F] text-white hover:bg-[#00523F]";

  // Safe fallback for button properties
  const targetUrl = section.lien || (section as any).url || (section as any).href || "#";
  const buttonLabel = section.libelle_boutton || (section as any).bouton_texte || "Explorer";

  return (
    <section className="w-full px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-[#E8F0EC] p-8 text-[#094734] md:flex-row md:items-center md:px-12 md:py-10">
          <div className="flex-1 space-y-1.5">
            {section.surtitre && (
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-60">
                {section.surtitre}
              </p>
            )}

            {section.titre && (
              <h2 className="font-serif text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
                {section.titre}
              </h2>
            )}

            {section.description && (
              <p className="text-sm font-normal opacity-80 md:text-base">
                {section.description}
              </p>
            )}
          </div>

          <Link
            href={targetUrl !== "#" ? getLocalizedUrl(targetUrl, locale) : "#"}
            className={`inline-flex shrink-0 items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all duration-300 hover:gap-3 ${button}`}
          >
            <span>{buttonLabel}</span>
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}