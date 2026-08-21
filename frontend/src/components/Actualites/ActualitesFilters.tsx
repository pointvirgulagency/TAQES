"use client";

import { useMemo, useState } from "react";
import ArticleCard from "@/components/ArticleCard";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;
const PAGE_SIZE = 8;

interface Article {
  id: number;
  title: string;
  slug?: string;
  excerpt?: string;
  categorie?: string;
  publishedAt?: string;
  FeaturedImage?: {
    url: string;
    alternativeText?: string;
  };
}

interface ActualitesFiltersProps {
  articles: Article[];
  locale: "fr" | "ar";
}

const categories = [
  { label: "Toutes les actualités", value: "" },
  { label: "Presse", value: "Presse" },
  { label: "Partenariats", value: "Partenariats" },
  { label: "Événements", value: "Evenements" },
  { label: "Blog & Insights", value: "Blog" },
];

export default function ActualitesFilters({
  articles,
  locale,
}: ActualitesFiltersProps) {
  const [activeCategory, setActiveCategory] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredArticles = useMemo(() => {
    if (!activeCategory) return articles;

    return articles.filter(
      (article) => article.categorie === activeCategory
    );
  }, [articles, activeCategory]);

  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  function handleCategoryChange(value: string) {
    setActiveCategory(value);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <section className="bg-white px-6 py-14 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Category tabs */}
        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((category) => {
            const active = activeCategory === category.value;

            return (
              <button
                key={category.value}
                type="button"
                onClick={() => handleCategoryChange(category.value)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-[#094734] text-white"
                    : "bg-[#EBE2DC]/50 text-[#094734] hover:bg-[#EBE2DC]"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Results */}
        {visibleArticles.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {visibleArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  title={article.title}
                  excerpt={article.excerpt}
                  slug={article.slug}
                  categorie={article.categorie}
                  date={article.publishedAt}
                  locale={locale}
                  imageUrl={
                    article.FeaturedImage
                      ? `${STRAPI_URL}${article.FeaturedImage.url}`
                      : ""
                  }
                />
              ))}
            </div>

            {hasMore && (
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((count) => count + PAGE_SIZE)
                  }
                  className="rounded-full border border-[#094734]/20 px-8 py-3 text-sm font-medium text-[#094734] transition hover:bg-[#EBE2DC]/40"
                >
                  Voir toutes les actualités
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-xl bg-[#EBE2DC]/50 px-6 py-16 text-center">
            <p className="text-lg text-[#094734]/70">
              Aucune actualité ne correspond à cette catégorie.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}