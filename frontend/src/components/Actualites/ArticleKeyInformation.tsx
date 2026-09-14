import type { InformationsClesSection } from "./ArticleTypes";

interface ArticleKeyInformationProps {
  section: InformationsClesSection;
}

export default function ArticleKeyInformation({
  section,
}: ArticleKeyInformationProps) {
  if (!section.informations?.length) {
    return null;
  }

  return (
    <section className="bg-[#EFEAE4] py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        {/* Header with horizontal trailing accent line */}
        {section.titre && (
          <div className="mb-10 flex items-center gap-6">
            <h2 className="font-serif text-2xl font-bold text-[#094734] md:text-3xl">
              {section.titre}
            </h2>
            <div className="h-[1px] flex-1 max-w-xs bg-[#094734]/20" />
          </div>
        )}

        {/* 2-Column Info Cards Grid with Vertical Separator */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-0 md:divide-x md:divide-[#094734]/20">
          {section.informations.map((info, index) => (
            <div
              key={info.id ?? `info-${index}`}
              className={`flex items-start gap-6 ${
                index === 0 ? "md:pr-10 lg:pr-12" : "md:pl-10 lg:pl-12"
              }`}
            >
              {/* Optional Building / Architectural Icon Illustration */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-[#E3DACF]/50 p-2">
                <svg
                  className="h-14 w-14 text-[#094734]/70"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <path d="M3 21h18M5 21V7l7-4 7 4v14M9 10h2m-2 4h2m4-4h2m-2 4h2" />
                </svg>
              </div>

              {/* Text Group */}
              <div className="space-y-1">
                {info.valeur && (
                  <h3 className="font-serif text-3xl font-bold text-[#094734] md:text-4xl">
                    {info.valeur}
                  </h3>
                )}

                {info.description && (
                  <p className="text-xs leading-relaxed text-[#094734]/80 md:text-sm">
                    {info.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Rounded Bottom Alert Pill Banner */}
        <div className="mt-12 flex items-center justify-center gap-3 rounded-full bg-[#E5DDD4] px-6 py-3.5 text-center text-xs font-medium text-[#094734] sm:text-sm">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#A68A68] text-xs font-bold text-white">
            !
          </span>
          <span>
            La typologie ne remplace pas les autorisations d'urbanisme.
          </span>
        </div>
      </div>
    </section>
  );
}