"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getArticles } from "@/lib/strapi";
import RichText from "@/components/RichText";

interface RichTextChild {
  type?: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
}

interface RichTextBlock {
  type?: string;
  level?: number;
  format?: string;
  children?: RichTextChild[];
}

interface Article {
  id: number;
  titre: string;
  slug: string;
  categorie?: string;
  Date?: string;
  contenu?: string | RichTextBlock[] | null;
  featured?: boolean;
  image?: {
    url: string;
  }[];
}

interface Projet {
  id: number;
  titre: string;
  slug: string;
  image?: {
    url: string;
  };
}

interface ActualitesProps {
  titre: string;
  projets?: Projet[];
  strapiUrl: string;
}

const FILTERS = ["Tous", "Territoires", "Conseils", "Projets"] as const;

function formatDate(value?: string) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 15L15 5M15 5H7M15 5V13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Actualites({
  titre,
  projets,
  strapiUrl,
}: ActualitesProps) {
  const params = useParams();
  const locale = (params.locale as "fr" | "ar") || "fr";

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] =
    useState<(typeof FILTERS)[number]>("Tous");

  useEffect(() => {
    let cancelled = false;

    async function fetchFeaturedArticles() {
      try {
        setLoading(true);
        const response = await getArticles(locale);
        if (cancelled) return;

        const fetchedArticles: Article[] = Array.isArray(response)
          ? response
          : response?.data ?? [];

        const featuredArticles = fetchedArticles
          .filter((article) => article.featured === true)
          .sort((a, b) => {
            const dateA = a.Date ? new Date(a.Date).getTime() : 0;
            const dateB = b.Date ? new Date(b.Date).getTime() : 0;
            return dateB - dateA;
          });

        setArticles(featuredArticles);
      } catch (error) {
        console.error("Failed to fetch featured articles:", error);
        if (!cancelled) setArticles([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchFeaturedArticles();

    return () => {
      cancelled = true;
    };
  }, [locale]);

  const filteredArticles = useMemo(() => {
    if (activeFilter === "Tous") return articles;
    return articles.filter(
      (article) =>
        article.categorie?.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [articles, activeFilter]);

  const visibleArticles = filteredArticles.slice(0, 4);
  const articlePrincipal = visibleArticles[0];
  const articlesSecondaires = visibleArticles.slice(1, 4);

  return (
    <section className="bg-[#F4EFE9] px-6 py-14 md:px-10 lg:px-14">
      <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Left: intro + filters */}
        <div className="flex flex-col justify-between lg:col-span-3">
          <div>
            <p className="text-[13px] text-[#094734]/60">Le journal Tagès</p>
            <h2 className="mt-3 font-serif text-[34px] leading-[1.12] text-[#094734] md:text-[38px]">
              {titre || "Regards sur les territoires"}
            </h2>
            <p className="mt-4 max-w-[26ch] text-[14px] leading-relaxed text-[#094734]/65">
              Décrypter les usages, les projets et les transformations qui
              façonnent les territoires de demain.
            </p>
          </div>

          <div className="mt-10 lg:mt-0">
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((filter) => {
                const isActive = filter === activeFilter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-full px-4 py-[7px] text-[13px] transition-colors duration-200 ${
                      isActive
                        ? "bg-[#094734] text-[#F4EFE9]"
                        : "border border-[#094734]/25 text-[#094734]/70 hover:border-[#094734]/50"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            <Link
              href={`/${locale}/actualites`}
              className="group mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-[#094734]"
            >
              Voir toutes les actualités
              <ArrowIcon className="h-3.5 w-3.5 -rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-[13px] text-[#094734]/40 lg:col-span-9">
            Chargement...
          </div>
        )}

        {/* Main featured article */}
        {!loading && articlePrincipal && (
          <Link
            href={`/${locale}/actualites/${articlePrincipal.slug}`}
            className="group flex flex-col overflow-hidden bg-white lg:col-span-5"
          >
            <div className="relative h-[280px] overflow-hidden md:h-[340px]">
              <span className="absolute left-4 top-4 z-10 font-serif text-3xl text-white">
                01
              </span>
              {articlePrincipal.image?.[0] ? (
                <img
                  src={`${strapiUrl}${articlePrincipal.image[0].url}`}
                  alt={articlePrincipal.titre}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              ) : (
                <div className="h-full w-full bg-[#094734]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>

            <div className="relative flex items-start justify-between gap-4 px-5 py-5">
              <div>
                <div className="flex items-center gap-2 text-[12px] text-[#094734]/55">
                  {articlePrincipal.categorie && (
                    <span className="font-medium text-[#00674F]">
                      {articlePrincipal.categorie}
                    </span>
                  )}
                  {articlePrincipal.categorie && articlePrincipal.Date && (
                    <span aria-hidden="true">·</span>
                  )}
                  {articlePrincipal.Date && (
                    <span>{formatDate(articlePrincipal.Date)}</span>
                  )}
                </div>
                <h3 className="mt-2 max-w-[34ch] font-serif text-[19px] leading-snug text-[#094734]">
                  {articlePrincipal.titre}
                </h3>
                {articlePrincipal.contenu && (
                  <div className="mt-2 hidden text-[12px] leading-relaxed text-[#094734]/50 md:line-clamp-2">
                    <RichText content={articlePrincipal.contenu} />
                  </div>
                )}
              </div>

              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#094734] text-white transition-transform duration-300 group-hover:rotate-45">
                <ArrowIcon className="h-4 w-4" />
              </span>
            </div>
          </Link>
        )}

        {/* Secondary articles list */}
        {!loading && articlesSecondaires.length > 0 && (
          <div className="flex flex-col divide-y divide-dashed divide-[#094734]/25 lg:col-span-4">
            {articlesSecondaires.map((article, index) => (
              <Link
                key={article.id}
                href={`/${locale}/actualites/${article.slug}`}
                className="group flex items-center gap-4 py-4 first:pt-0 last:pb-0"
              >
                <span className="font-serif text-[15px] text-[#094734]/35">
                  {String(index + 2).padStart(2, "0")}
                </span>

                <div className="h-14 w-16 shrink-0 overflow-hidden rounded-sm bg-[#094734]/10">
                  {article.image?.[0] ? (
                    <img
                      src={`${strapiUrl}${article.image[0].url}`}
                      alt={article.titre}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                  ) : null}
                </div>

                <div className="min-w-0 flex-1">
                  {article.categorie && (
                    <p className="text-[11px] font-medium text-[#00674F]">
                      {article.categorie}
                    </p>
                  )}
                  <p className="mt-1 line-clamp-2 text-[14px] font-medium leading-snug text-[#094734]">
                    {article.titre}
                  </p>
                </div>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#094734]/25 text-[#094734] transition-colors duration-300 group-hover:border-[#094734] group-hover:bg-[#094734] group-hover:text-white">
                  <ArrowIcon className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* No featured articles */}
        {!loading && visibleArticles.length === 0 && (
          <div className="text-[13px] text-[#094734]/40 lg:col-span-9">
            Aucune actualité à la une.
          </div>
        )}
      </div>

      {/* Related projects, kept below the main grid so the 3-column layout above stays clean */}
      {projets && projets.length > 0 && (
        <div className="mx-auto mt-10 flex max-w-[1800px] flex-col items-start justify-between gap-4 border-t border-[#094734]/15 pt-6 md:flex-row md:items-center">
          <Link
            href={`/${locale}/projets`}
            className="group inline-flex items-center gap-2 text-[14px] font-medium text-[#094734]"
          >
            Voir tous nos projets
            <ArrowIcon className="h-3.5 w-3.5 -rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <div className="flex gap-2">
            {projets.slice(0, 3).map((projet) => (
              <Link
                key={projet.id}
                href={`/${locale}/projets/${projet.slug}`}
                className="group h-14 w-20 shrink-0 overflow-hidden rounded-sm"
              >
                {projet.image ? (
                  <img
                    src={`${strapiUrl}${projet.image.url}`}
                    alt={projet.titre}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                ) : (
                  <div className="h-full w-full bg-[#094734]/20" />
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}