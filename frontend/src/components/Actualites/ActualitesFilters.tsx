"use client";

import { useEffect, useRef, useState } from "react";
import ArticleCard from "@/components/ArticleCard";

interface ArticleImage {
  url: string;
  alternativeText?: string | null;
}

interface Article {
  id: number;
  titre: string;
  slug: string;
  categorie?: string | null;
  Date?: string | null;
  introduction?: string | null;
  image?: ArticleImage | null;
  featured?: boolean;
}

interface ActualitesFiltersProps {
  articles: Article[];
  locale: "fr" | "ar";
  initialCategorie?: string;
}

const CATEGORIES = [
  "Projets & Chantiers",
  "Guide",
  "Décryptage",
  "Territoire",
  "Événement",
];

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

// Returns null instead of empty string "" to prevent browser re-fetches
function buildImageUrl(url?: string | null): string | null {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${STRAPI_URL}${url}`;
}

export default function ActualitesFilters({
  articles = [],
  locale,
  initialCategorie = "",
}: ActualitesFiltersProps) {
  const [selectedCategorie, setSelectedCategorie] =
    useState(initialCategorie);
  const [index, setIndex] = useState(0);

  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!initialCategorie) return;

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }, [initialCategorie]);

  // reset the slider when the category changes
  useEffect(() => {
    setIndex(0);
  }, [selectedCategorie]);

  const filteredArticles = articles.filter((article) => {
    if (!selectedCategorie) return true;
    return article.categorie === selectedCategorie;
  });

  const total = filteredArticles.length;

  // wrap-around index so navigation never gets stuck at the ends
  const safeIndex = total === 0 ? 0 : ((index % total) + total) % total;

  const currentArticle = total > 0 ? filteredArticles[safeIndex] : null;

  const remainingArticles = currentArticle
    ? filteredArticles.filter((art) => art.id !== currentArticle.id)
    : filteredArticles;

  const TABS = ["", ...CATEGORIES];

  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  // keyboard navigation (← / →, mirrored in RTL)
  useEffect(() => {
    if (total < 2) return;

    function onKeyDown(e: KeyboardEvent) {
      const rtl = locale === "ar";
      if (e.key === (rtl ? "ArrowLeft" : "ArrowRight")) goNext();
      if (e.key === (rtl ? "ArrowRight" : "ArrowLeft")) goPrev();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, locale]);

  function resetFilters() {
    setSelectedCategorie("");
  }

  const prevIcon =
    locale === "ar" ? "M8.25 4.5l7.5 7.5-7.5 7.5" : "M15.75 19.5L8.25 12l7.5-7.5";
  const nextIcon =
    locale === "ar" ? "M15.75 19.5L8.25 12l7.5-7.5" : "M8.25 4.5l7.5 7.5-7.5 7.5";

  return (
    <section
      ref={resultsRef}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[#F3EEE7] px-6 py-20 md:px-10 md:py-24 lg:px-16"
    >
      {/* gentle fade when switching articles */}
      <style>{`@keyframes articleFade{from{opacity:0}to{opacity:1}}.article-fade{animation:articleFade .45s ease both}`}</style>

      {/* ghost section number, as in the design */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 start-2 select-none font-serif text-[160px] font-medium italic leading-none text-[#094734]/10 md:text-[220px]"
      >
        02
      </span>

      {/* decorative "+" marks */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute end-24 top-16 select-none text-2xl font-light text-[#094734]/25"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 end-10 select-none text-2xl font-light text-[#094734]/25"
      >
        +
      </span>

      <div className="relative mx-auto max-w-7xl">
        {/* ————— Tabs ————— */}
        <div className="mb-14 border-b border-[#094734]/15 md:mb-20">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
            <p className="pb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#094734]/70">
              {locale === "ar" ? "استكشف المجلة" : "Explorer le journal"}
            </p>

            <nav className="-mb-px flex flex-wrap">
              {TABS.map((categorie) => {
                const active = selectedCategorie === categorie;

                return (
                  <button
                    key={categorie || "all"}
                    type="button"
                    onClick={() => setSelectedCategorie(categorie)}
                    className={`-mb-px border-b-2 px-5 pb-4 pt-1 text-sm transition ${
                      active
                        ? "border-[#094734] font-semibold text-[#094734]"
                        : "border-transparent font-medium text-[#094734]/45 hover:text-[#094734]"
                    }`}
                  >
                    {categorie === ""
                      ? locale === "ar"
                        ? "الكل"
                        : "Tout"
                      : categorie}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* ————— Section heading ————— */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <h2 className="max-w-2xl font-serif text-4xl font-medium leading-[1.05] text-[#094734] md:text-6xl">
            {locale === "ar" ? "مفاتيح للمضي قدماً" : "Les clés pour avancer."}
          </h2>

          {selectedCategorie && (
            <button
              type="button"
              onClick={resetFilters}
              className="pb-2 text-xs font-medium uppercase tracking-wide text-[#094734]/50 transition hover:text-[#094734]"
            >
              ↻ {locale === "ar" ? "إعادة ضبط" : "Réinitialiser"}
            </button>
          )}
        </div>

        {total > 0 ? (
          <>
            {/* ————— Big navigator — cycles through ALL filtered articles ————— */}
            {currentArticle && (
              <div
                key={currentArticle.id}
                className="article-fade mb-20 grid md:mb-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]"
              >
                {/* text panel */}
                <div className="flex flex-col justify-between border-[#094734]/10 py-10 lg:border-s lg:ps-12 lg:pe-8 lg:py-14">
                  <div>
                    {(currentArticle.categorie || currentArticle.Date) && (
                      <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#094734]/55">
                        {currentArticle.categorie && (
                          <span>{currentArticle.categorie}</span>
                        )}
                        {currentArticle.categorie && currentArticle.Date && (
                          <span className="h-px w-6 bg-[#094734]/25" />
                        )}
                        {currentArticle.Date && <span>{currentArticle.Date}</span>}
                      </p>
                    )}

                    <h3 className="mt-6 max-w-lg font-serif text-3xl font-medium leading-[1.1] text-[#094734] md:text-4xl">
                      {currentArticle.titre}
                    </h3>

                    {currentArticle.introduction && (
                      <p className="mt-5 max-w-md text-sm leading-relaxed text-[#094734]/65">
                        {currentArticle.introduction}
                      </p>
                    )}
                  </div>

                  {/* actions: read link + navigation arrows */}
                  <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
                    <a
                      href={`/${locale}/actualites/${currentArticle.slug}`}
                      className="group inline-flex items-center gap-5 text-sm font-medium text-[#094734]"
                    >
                      <span className="flex h-13 w-13 items-center justify-center rounded-full border border-[#094734]/35 p-3.5 transition-colors duration-300 group-hover:border-[#094734] group-hover:bg-[#094734] group-hover:text-[#F3EEE7]">
                        <svg
                          className="h-5 w-5"
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
                        {locale === "ar" ? "اقرأ الدليل" : "Lire le guide"}
                      </span>
                    </a>

                    {total > 1 && (
                      <div className="flex items-center gap-6">
                        {/* counter */}
                        <span className="text-xs font-medium tracking-[0.2em] text-[#094734]/50">
                          {String(safeIndex + 1).padStart(2, "0")}
                          <span className="mx-1.5 text-[#094734]/30">/</span>
                          {String(total).padStart(2, "0")}
                        </span>

                        {/* arrows */}
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={goPrev}
                            aria-label={
                              locale === "ar"
                                ? "المقال السابق"
                                : "Article précédent"
                            }
                            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#094734]/30 text-[#094734] transition-colors duration-300 hover:border-[#094734] hover:bg-[#094734] hover:text-[#F3EEE7]"
                          >
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d={prevIcon}
                              />
                            </svg>
                          </button>

                          <button
                            type="button"
                            onClick={goNext}
                            aria-label={
                              locale === "ar"
                                ? "المقال التالي"
                                : "Article suivant"
                            }
                            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#094734]/30 text-[#094734] transition-colors duration-300 hover:border-[#094734] hover:bg-[#094734] hover:text-[#F3EEE7]"
                          >
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d={nextIcon}
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* image panel */}
                <div className="relative min-h-[320px] bg-[#094734]/10 md:min-h-[460px] lg:min-h-[520px]">
                  {buildImageUrl(currentArticle.image?.url) ? (
                    <img
                      src={buildImageUrl(currentArticle.image?.url)!}
                      alt={
                        currentArticle.image?.alternativeText ||
                        currentArticle.titre
                      }
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#094734]/10" />
                  )}

                  {currentArticle.categorie && (
                    <div className="absolute end-6 top-6 bg-[#EBE2DC] px-5 py-3 md:end-8 md:top-8">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#094734]">
                        {currentArticle.categorie}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-xl bg-[#094734]/5 px-6 py-16 text-center">
            <p className="text-base text-[#094734]/70">
              {locale === "ar"
                ? "لا توجد أخبار في هذه الفئة."
                : "Aucune actualité dans cette catégorie."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}