import type { Metadata } from "next";

import { getArticles, getActualitesPage } from "@/lib/strapi";
import { generateSeoMetadata } from "@/lib/seo";
import ActualitesFilters from "@/components/Actualites/ActualitesFilters";
import RichText from "@/components/RichText";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fr" | "ar" }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const page = await getActualitesPage(locale);

  return generateSeoMetadata(
    page.data?.SEO ?? null,
    locale,
    "/actualites"
  );
}

function HeroGeometricPattern({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 500 500"
      fill="none"
      stroke="#EBE2DC"
      strokeWidth="1.2"
      style={{ opacity: 0.18 }}
    >
      <rect
        x="250"
        y="50"
        width="160"
        height="160"
        transform="rotate(45 250 50)"
      />
      <rect
        x="250"
        y="110"
        width="160"
        height="160"
        transform="rotate(45 250 110)"
      />
      <rect
        x="290"
        y="170"
        width="100"
        height="100"
        transform="rotate(45 290 170)"
      />
    </svg>
  );
}

export default async function ActualitesPage({
  params,
}: {
  params: Promise<{ locale: "fr" | "ar" }>;
}) {
  const { locale } = await params;

  const [page, articles] = await Promise.all([
    getActualitesPage(locale),
    getArticles(locale),
  ]);

  const hero = page.data?.hero;
  const heroArticle = hero?.article;
  const lastSection = page.data?.last_section;

  const heroImageUrl = hero?.imagedesktop?.url
    ? hero.imagedesktop.url.startsWith("http")
      ? hero.imagedesktop.url
      : `${STRAPI_URL}${hero.imagedesktop.url}`
    : null;

  const articleImageUrl = heroArticle?.image?.url
    ? heroArticle.image.url.startsWith("http")
      ? heroArticle.image.url
      : `${STRAPI_URL}${heroArticle.image.url}`
    : null;

  const lastSectionImageUrl = lastSection?.background?.url
    ? lastSection.background.url.startsWith("http")
      ? lastSection.background.url
      : `${STRAPI_URL}${lastSection.background.url}`
    : null;

  return (
    <main
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-[#F3EEE7]"
    >
      <section className="relative overflow-hidden bg-[#094734] pb-36 pt-28 md:pb-48 md:pt-36 lg:pb-56 lg:pt-40">
        {heroImageUrl ? (
          <>
            <img
              src={heroImageUrl}
              alt={
                hero?.imagedesktop?.alternativeText ||
                hero?.titre ||
                "Actualités"
              }
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-[#094734]/80" />
          </>
        ) : (
          <HeroGeometricPattern className="pointer-events-none absolute -top-16 ltr:right-0 rtl:left-0 h-[115%] w-auto" />
        )}

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 md:px-8 lg:px-12">
          <div className="max-w-4xl text-white">
            {hero?.surtitre && (
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#EBE2DC]/70">
                {hero.surtitre}
              </p>
            )}

            {hero?.titre && (
              <h1 className="mt-5 font-serif text-5xl font-medium leading-[1.02] tracking-tight md:text-7xl lg:text-[88px]">
                {hero.titre}
              </h1>
            )}

            {hero?.description && (
              <div className="mt-7 max-w-md text-sm leading-relaxed text-white/70 md:text-[15px]">
                <RichText content={hero.description} />
              </div>
            )}

            <div className="mt-12 flex items-center gap-4 text-[#EBE2DC]">
              <span className="font-serif text-lg italic">01</span>
              <span className="h-px w-12 bg-[#EBE2DC]/40" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#EBE2DC]/80">
                {locale === "ar" ? "الأخبار" : "Actualités"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {heroArticle && (
        <section className="relative z-20 mx-auto -mt-28 w-full max-w-[1400px] px-4 md:-mt-36 md:px-8 lg:-mt-44 lg:px-12">
          <div className="grid w-full overflow-hidden bg-[#094734] shadow-[0_30px_60px_-30px_rgba(9,71,52,0.5)] lg:grid-cols-[1.75fr_1fr]">
            <div className="relative min-h-[340px] bg-[#0b3a2c] md:min-h-[460px] lg:min-h-[520px]">
              {articleImageUrl && (
                <img
                  src={articleImageUrl}
                  alt={
                    heroArticle.image?.alternativeText ||
                    heroArticle.titre ||
                    "Article à la une"
                  }
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}

              <div className="absolute left-0 top-0 z-10 bg-[#EBE2DC] px-6 py-3.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#094734]">
                  {locale === "ar" ? "في الواجهة" : "À la une"}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-between bg-[#094734] px-8 py-10 text-white md:px-10 md:py-12">
              <div>
                {heroArticle.categorie && (
                  <div className="mb-6 flex items-center gap-3">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#EBE2DC]/75">
                      {heroArticle.categorie}
                    </span>
                    <span className="h-px w-8 bg-[#EBE2DC]/40" />
                  </div>
                )}

                <h2 className="font-serif text-3xl font-medium leading-[1.08] md:text-4xl lg:text-[38px]">
                  {heroArticle.titre}
                </h2>

                {heroArticle.introduction && (
                  <p className="mt-5 text-sm leading-6 text-white/70">
                    {heroArticle.introduction}
                  </p>
                )}
              </div>

              <div className="mt-10">
                <div className="mb-6 flex items-center gap-3 text-xs text-white/60">
                  <span className="h-px w-8 bg-white/30" />
                  <span>
                    {locale === "ar"
                      ? "6 دقائق للقراءة"
                      : "6 min de lecture"}
                  </span>
                </div>

                {heroArticle.slug && (
                  <a
                    href={`/${locale}/actualites/${heroArticle.slug}`}
                    className="group flex items-center justify-between gap-4 text-sm font-medium text-white"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/40 transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-[#094734]">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d={
                            locale === "ar"
                              ? "M10.5 4.5L3 12m0 0l7.5 7.5M3 12h18"
                              : "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          }
                        />
                      </svg>
                    </span>

                    <span>
                      {locale === "ar"
                        ? "استكشف المقال"
                        : "Explorer l'article"}
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="pt-12">
        <ActualitesFilters articles={articles?.data ?? []} locale={locale} />
      </div>

      {lastSection && (
        <section className="relative overflow-hidden py-14 md:py-18 lg:py-22">
          {/* Background Image (No dark overlay) */}
          {lastSectionImageUrl && (
            <img
              src={lastSectionImageUrl}
              alt={
                lastSection.background?.alternativeText ||
                lastSection.titre ||
                ""
              }
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          )}

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-12">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">

              {/* Far Left: Title forced onto 2 lines */}
              {lastSection.titre && (
                <div className="lg:col-span-5">
                  <h2 className="max-w-[280px] font-serif text-5xl font-medium leading-[0.95] tracking-tight text-white md:max-w-xs md:text-6xl lg:text-[76px]">
                    {lastSection.titre}
                  </h2>
                </div>
              )}

              {/* Center: Eyebrow + Nude Button aligned in the middle of the section */}
              <div className="flex flex-col items-start gap-5 justify-self-center lg:col-span-5 lg:ps-8">
                {lastSection.eyebrow && (
                  <div className="flex items-center gap-3 text-white/90">
                    <span aria-hidden="true" className="h-px w-6 bg-white/60" />
                    <p className="text-sm font-normal leading-snug">
                      {lastSection.eyebrow}
                    </p>
                  </div>
                )}

                {lastSection.libelle_bouton && (
                  <a
                    href={`/${locale}/projects`}
                    className="inline-flex items-center gap-4 bg-[#EBE2DC] px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#094734] transition-all duration-300 hover:bg-white"
                  >
                    <span>{lastSection.libelle_bouton}</span>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d={
                          locale === "ar"
                            ? "M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                            : "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        }
                      />
                    </svg>
                  </a>
                )}
              </div>

              {/* Right 2 columns empty to balance grid spacing against background design */}
              <div className="hidden lg:col-span-2 lg:block" />

            </div>
          </div>
        </section>
      )}
    </main>
  );
}

