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

  const filteredArticles = articles.filter((article) => {
    if (!selectedCategorie) return true;
    return article.categorie === selectedCategorie;
  });

  const featuredArticle =
    filteredArticles.find((art) => art.featured) || filteredArticles[0];

  const remainingArticles = featuredArticle
    ? filteredArticles.filter((art) => art.id !== featuredArticle.id)
    : filteredArticles;

  function resetFilters() {
    setSelectedCategorie("");
  }

  return (
    <section
      ref={resultsRef}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="bg-white px-6 py-16 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Category Pills */}
        <div className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#094734]/60">
              {locale === "ar" ? "الفئات" : "Catégories"}
            </h3>

            {selectedCategorie && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-medium uppercase tracking-wide text-[#094734]/60 transition hover:text-[#094734]"
              >
                ↻ {locale === "ar" ? "إعادة ضبط" : "Réinitialiser"}
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {CATEGORIES.map((categorie) => {
              const active = selectedCategorie === categorie;

              return (
                <button
                  key={categorie}
                  type="button"
                  onClick={() =>
                    setSelectedCategorie(active ? "" : categorie)
                  }
                  className={`group rounded-full border px-5 py-3 text-left transition ${
                    active
                      ? "border-[#094734] bg-[#094734] text-white"
                      : "border-[#094734]/15 bg-[#F4F6F3] text-[#094734] hover:border-[#094734]/40"
                  }`}
                >
                  <span className="text-xs font-medium uppercase tracking-wider">
                    {categorie}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {filteredArticles.length > 0 ? (
          <>
            {/* Featured Article Section */}
            {featuredArticle && (
              <div className="mb-16">
                <h2 className="mb-6 font-serif text-2xl font-bold text-[#094734] md:text-3xl">
                  {locale === "ar" ? "في الواجهة" : "À la une"}
                </h2>

                <div className="grid grid-cols-1 overflow-hidden rounded-2xl bg-[#EEF2EF] lg:grid-cols-12">
                  {/* Image Column */}
                  <div className="relative min-h-[360px] bg-[#094734]/10 lg:col-span-8 lg:min-h-[460px]">
                    {buildImageUrl(featuredArticle.image?.url) ? (
                      <img
                        src={buildImageUrl(featuredArticle.image?.url)!}
                        alt={
                          featuredArticle.image?.alternativeText ||
                          featuredArticle.titre
                        }
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#094734]/10" />
                    )}
                  </div>

                  {/* Content Column */}
                  <div className="flex flex-col justify-between p-8 lg:col-span-4 lg:p-10">
                    <div>
                      {featuredArticle.categorie && (
                        <span className="inline-block rounded-full bg-[#094734] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                          {featuredArticle.categorie}
                        </span>
                      )}

                      {featuredArticle.Date && (
                        <p className="mt-4 text-xs font-medium text-[#094734]/60">
                          {featuredArticle.Date}
                        </p>
                      )}

                      <h3 className="mt-3 font-serif text-2xl font-bold leading-tight text-[#094734] md:text-3xl">
                        {featuredArticle.titre}
                      </h3>

                      {featuredArticle.introduction && (
                        <p className="mt-4 text-sm leading-relaxed text-[#094734]/70">
                          {featuredArticle.introduction}
                        </p>
                      )}
                    </div>

                    <div className="mt-8">
                      <a
                        href={`/${locale}/actualites/${featuredArticle.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#094734] hover:underline"
                      >
                        {locale === "ar" ? "اقرأ المقال" : "Lire l'article"}
                        <span>{locale === "ar" ? "←" : "→"}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Remaining Articles Grid */}
            {remainingArticles.length > 0 && (
              <div>
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="font-serif text-2xl font-bold text-[#094734] md:text-3xl">
                    {locale === "ar"
                      ? "آخر الأخبار"
                      : "Dernières actualités"}
                  </h2>
                  <p className="text-xs font-semibold text-[#094734]/60">
                    {remainingArticles.length}{" "}
                    {remainingArticles.length === 1
                      ? "article"
                      : "articles"}
                  </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {remainingArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      title={article.titre}
                      excerpt={article.introduction ?? ""}
                      slug={article.slug}
                      categorie={article.categorie ?? ""}
                      date={article.Date ?? ""}
                      locale={locale}
                      imageUrl={buildImageUrl(article.image?.url) ?? undefined}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-xl bg-[#EEF2EF] px-6 py-16 text-center">
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