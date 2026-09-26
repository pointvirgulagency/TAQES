"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface Typology {
  titre: string;
  description?: string;
  client?: string;
  image?: {
    url: string;
    alternativeText?: string;
  };
}

export default function TypologiesSection({
  typologies,
  locale,
}: {
  typologies: Typology[];
  locale: "fr" | "ar";
}) {
  const router = useRouter();

  const isArabic = locale === "ar";

  function getImageUrl(typology: Typology) {
    if (!typology.image?.url) {
      return undefined;
    }

    return typology.image.url.startsWith("http")
      ? typology.image.url
      : `${process.env.NEXT_PUBLIC_STRAPI_URL}${typology.image.url}`;
  }

  function handleTypologyClick(titre: string) {
    sessionStorage.setItem("selectedTypologie", titre);
    router.push(`/${locale}/projects`);
  }

  const orderedTypologies =
    typologies.length > 0
      ? [
          typologies[typologies.length - 1],
          ...typologies.slice(0, -1),
        ]
      : [];

  const featured = orderedTypologies[0];
  const normalTypologies = orderedTypologies.slice(1);

  const topTypologies = normalTypologies.slice(0, 2);
  const remainingTypologies = normalTypologies.slice(2);

  const labels = {
    eyebrow: isArabic ? "مشروعك" : "VOTRE PROJET",

    title: isArabic
      ? "ما الذي تبحث عنه؟"
      : "Que recherchez-vous ?",

    description: isArabic
      ? "استكشف مشاريع TAQES واعثر على المشروع الذي يلبي توقعاتك."
      : "Explorez les projets TAQÈS et trouvez celui qui répond à vos attentes.",

    discover: isArabic
      ? "اكتشف"
      : "DÉCOUVRIR",

    allProjects: isArabic
      ? "عرض جميع المشاريع"
      : "Voir tous les projets",
  };

  if (orderedTypologies.length === 0) {
    return (
      <section
        dir={isArabic ? "rtl" : "ltr"}
        className="w-full bg-[#F3EEE7]"
      >
        <div className="mx-auto max-w-[1600px] px-6 py-10 lg:px-10">
          <p className="text-sm text-[#094734]">
            {isArabic
              ? "لا توجد تصنيفات متاحة."
              : "Aucune typologie disponible."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="w-full bg-[#F3EEE7] lg:h-[calc(100vh-260px)]"
    >
      <div className="mx-auto h-full max-w-[1600px] px-6 py-4 lg:px-10">
        <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">

          {/* ================================================== */}
          {/* LEFT SIDE                                          */}
          {/* ================================================== */}

          <div className="flex flex-col justify-center">

            {/* EYEBROW */}
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-5 bg-[#B59672]" />

              <span className="text-[11px] font-semibold tracking-[0.2em] text-[#094734]">
                {labels.eyebrow}
              </span>
            </div>

            {/* TITLE */}
            <h2 className="max-w-[280px] font-serif text-[28px] leading-[1.05] tracking-[-0.02em] text-[#094734] xl:text-[32px]">
              {labels.title}
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-4 max-w-[270px] text-[13px] leading-[1.5] text-[#52756B]">
              {labels.description}
            </p>

            {/* ALL PROJECTS */}
            <button
              type="button"
              onClick={() => router.push(`/${locale}/projects`)}
              className="mt-6 inline-flex w-fit items-center gap-1 border-b border-[#094734]/30 pb-0.5 text-[13px] font-semibold text-[#094734] transition hover:border-[#094734]"
            >
              {labels.allProjects}

              <ArrowRight
                className={`h-3.5 w-3.5 ${
                  isArabic ? "rotate-180" : ""
                }`}
                strokeWidth={1.8}
              />
            </button>
          </div>

          {/* ================================================== */}
          {/* RIGHT SIDE - DESKTOP                              */}
          {/* ================================================== */}

          <div className="hidden min-w-0 h-full lg:block">

            <div className="grid h-full grid-cols-[1.05fr_1.95fr] gap-2">

              {/* ================================================== */}
              {/* FEATURED - LAST STRAPI ITEM                       */}
              {/* ================================================== */}

              {featured && (
                <button
                  type="button"
                  onClick={() =>
                    handleTypologyClick(featured.titre)
                  }
                  className="group relative h-full min-h-0 overflow-hidden rounded-[14px] text-start"
                >
                  {getImageUrl(featured) && (
                    <Image
                      src={getImageUrl(featured)!}
                      alt={
                        featured.image?.alternativeText ??
                        featured.titre
                      }
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="35vw"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 start-0 w-full p-4 xl:p-5">
                    <h3 className="font-serif text-[20px] leading-[1.1] text-white xl:text-[22px]">
                      {featured.titre}
                    </h3>

                    {featured.description && (
                      <p className="mt-1.5 max-w-[90%] text-[12px] leading-[1.4] text-white/80 line-clamp-2">
                        {featured.description}
                      </p>
                    )}

                    <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.14em] text-white">
                      {labels.discover}

                      <ArrowRight
                        className={`h-3 w-3 ${
                          isArabic ? "rotate-180" : ""
                        }`}
                        strokeWidth={2}
                      />
                    </span>
                  </div>
                </button>
              )}

              {/* ================================================== */}
              {/* SMALL CARDS AREA                                 */}
              {/* ================================================== */}

              <div className="grid h-full min-w-0 grid-rows-2 gap-2">

                {/* TOP ROW */}
                {topTypologies.length > 0 && (
                  <div className="grid min-h-0 grid-cols-2 gap-2">
                    {topTypologies.map((typology, index) => (
                      <TypologyCard
                        key={`top-${typology.titre}-${index}`}
                        typology={typology}
                        locale={locale}
                        isArabic={isArabic}
                        discoverLabel={labels.discover}
                        onClick={() =>
                          handleTypologyClick(typology.titre)
                        }
                        size="top"
                      />
                    ))}
                  </div>
                )}

                {/* BOTTOM ROW */}
                {remainingTypologies.length > 0 && (
                  <div className="grid min-h-0 grid-cols-3 gap-2">
                    {remainingTypologies.map((typology, index) => (
                      <TypologyCard
                        key={`remaining-${typology.titre}-${index}`}
                        typology={typology}
                        locale={locale}
                        isArabic={isArabic}
                        discoverLabel={labels.discover}
                        onClick={() =>
                          handleTypologyClick(typology.titre)
                        }
                        size="small"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ================================================== */}
          {/* MOBILE                                             */}
          {/* ================================================== */}

          <div className="grid grid-cols-2 gap-2 lg:hidden">

            {/* FEATURED */}
            {featured && (
              <button
                type="button"
                onClick={() =>
                  handleTypologyClick(featured.titre)
                }
                className="group relative col-span-2 min-h-[220px] overflow-hidden rounded-[14px] text-start"
              >
                {getImageUrl(featured) && (
                  <Image
                    src={getImageUrl(featured)!}
                    alt={
                      featured.image?.alternativeText ??
                      featured.titre
                    }
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="100vw"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                <div className="absolute bottom-0 start-0 w-full p-3.5">
                  <h3 className="font-serif text-[18px] leading-tight text-white">
                    {featured.titre}
                  </h3>

                  {featured.description && (
                    <p className="mt-1.5 text-[11px] leading-[1.4] text-white/80 line-clamp-2">
                      {featured.description}
                    </p>
                  )}

                  <span className="mt-2.5 inline-flex items-center gap-1.5 text-[9px] font-bold tracking-[0.14em] text-white">
                    {labels.discover}

                    <ArrowRight
                      className={`h-3 w-3 ${
                        isArabic ? "rotate-180" : ""
                      }`}
                      strokeWidth={2}
                    />
                  </span>
                </div>
              </button>
            )}

            {/* ALL OTHER CARDS */}
            {normalTypologies.map((typology, index) => (
              <TypologyCard
                key={`mobile-${typology.titre}-${index}`}
                typology={typology}
                locale={locale}
                isArabic={isArabic}
                discoverLabel={labels.discover}
                onClick={() =>
                  handleTypologyClick(typology.titre)
                }
                size="mobile"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TypologyCard({
  typology,
  locale,
  isArabic,
  discoverLabel,
  onClick,
  size,
}: {
  typology: Typology;
  locale: "fr" | "ar";
  isArabic: boolean;
  discoverLabel: string;
  onClick: () => void;
  size: "top" | "small" | "mobile";
}) {
  const imageUrl = typology.image?.url
    ? typology.image.url.startsWith("http")
      ? typology.image.url
      : `${process.env.NEXT_PUBLIC_STRAPI_URL}${typology.image.url}`
    : undefined;

  const sizeClasses = {
    top: "h-full min-h-0",
    small: "h-full min-h-0",
    mobile: "min-h-[150px]",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative block w-full overflow-hidden rounded-[14px] text-start ${sizeClasses[size]}`}
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={
            typology.image?.alternativeText ??
            typology.titre
          }
          fill
          unoptimized
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes={
            size === "mobile"
              ? "50vw"
              : "(max-width: 1024px) 33vw, 25vw"
          }
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      <div className="absolute bottom-0 start-0 w-full p-3">
        <h3
          className={`font-serif leading-tight text-white ${
            size === "top"
              ? "text-[16px]"
              : "text-[14px]"
          }`}
        >
          {typology.titre}
        </h3>

        {typology.description && (
          <p className="mt-1 line-clamp-2 text-[10px] leading-[1.35] text-white/80">
            {typology.description}
          </p>
        )}

        <span className="mt-2 inline-flex items-center gap-1.5 text-[9px] font-bold tracking-[0.14em] text-white">
          {discoverLabel}

          <ArrowRight
            className={`h-3 w-3 ${
              isArabic ? "rotate-180" : ""
            }`}
            strokeWidth={2}
          />
        </span>
      </div>
    </button>
  );
}