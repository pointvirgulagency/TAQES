"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowUpRight, ArrowRight } from "lucide-react";

interface ArticleImage {
  url: string;
  alternativeText?: string | null;
}

interface Article {
  id: number;
  titre: string;
  slug: string;
  categorie?: string;
  Date?: string;
  image?: ArticleImage | null;
}

interface ArticlesAccueil {
  eyebrow?: string | null;
  titre?: string | null;
  description?: string | null;
  libelle_bouton?: string | null;
  actualites?: Article[] | null;
}

interface ActualitesProps {
  articles?: ArticlesAccueil | null;
  strapiUrl: string;
}

function formatDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function Actualites({ articles, strapiUrl }: ActualitesProps) {
  const params = useParams();
  const locale = (params.locale as "fr" | "ar") || "fr";

  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");

  const baseUrl = strapiUrl.replace(/\/$/, "");
  const articleList = articles?.actualites ?? [];

  const categories = [
    "Tous",
    ...Array.from(
      new Set(articleList.map((a) => a.categorie).filter(Boolean) as string[])
    ),
  ];

  const filteredArticles =
    selectedCategory === "Tous"
      ? articleList
      : articleList.filter((a) => a.categorie === selectedCategory);

  const articlePrincipal = filteredArticles[0] ?? articleList[0] ?? null;
  const articlesSecondaires =
    selectedCategory === "Tous"
      ? articleList.slice(1, 4)
      : filteredArticles.slice(1, 4);

  const getImageUrl = (img?: ArticleImage | null) => {
    if (!img?.url) return "";
    return img.url.startsWith("http") ? img.url : `${baseUrl}${img.url}`;
  };

  return (
    <section className="bg-[#F3EEE7] px-6 py-10 md:px-10 lg:px-14">
      <div className="mx-auto grid max-w-[1550px] grid-cols-1 items-stretch gap-8 lg:grid-cols-12">

        {/* Left Column */}
        <div className="flex flex-col justify-between py-1 lg:col-span-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B28A60]">
              {articles?.eyebrow || "LE JOURNAL TAQÈS"}
            </p>

            <h2 className="mt-2 font-serif text-3xl leading-[1.08] text-[#094734] md:text-[38px]">
              {articles?.titre || "Regards sur\nles territoires"}
            </h2>

            <div className="mt-3 h-[2px] w-7 bg-[#094734]" />

            <p className="mt-3.5 max-w-[24ch] text-[16px] leading-relaxed text-[#094734]/70">
              {articles?.description ||
                "Décrypter les usages, les projets et les transformations qui façonnent les territoires de demain."}
            </p>

            {/* Category Filter Pills */}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {(categories.length > 1
                ? categories
                : ["Tous", "Territoires", "Conseils", "Projets"]
              ).map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-3 py-1 text-[11px] font-medium transition-colors ${
                      isActive
                        ? "bg-[#094734] text-white"
                        : "border border-[#9E8E7E]/30 bg-transparent text-[#094734] hover:bg-white/40"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 lg:mt-0">
            <Link
              href={`/${locale}/actualites`}
              className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-[#094734]"
            >
              <span className="border-b border-[#094734]/30">
                {articles?.libelle_bouton || "Voir toutes les actualités"}
              </span>
              <ArrowUpRight
                size={13}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>

        {/* Center Column: Featured Article 01 */}
        {articlePrincipal ? (
          <div className="lg:col-span-5">
            <Link
              href={`/${locale}/actualites/${articlePrincipal.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm"
            >
              <div className="relative h-[230px] w-full shrink-0 overflow-hidden bg-gray-100 md:h-[260px]">
                <div className="absolute left-5 top-4 z-10 flex flex-col items-start">
                  <span className="font-serif text-3xl font-normal text-[#9E8E7E]">
                    01
                  </span>
                  <div className="mt-0.5 h-[1.5px] w-5 bg-[#9E8E7E]" />
                </div>

                {articlePrincipal.image ? (
                  <img
                    src={getImageUrl(articlePrincipal.image)}
                    alt={
                      articlePrincipal.image.alternativeText ||
                      articlePrincipal.titre
                    }
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-[#094734]/10" />
                )}
              </div>

              <div className="flex flex-1 items-end justify-between p-4.5">
                <div className="pr-3">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#B28A60]">
                    {articlePrincipal.categorie && (
                      <span>{articlePrincipal.categorie}</span>
                    )}
                    {articlePrincipal.categorie && articlePrincipal.Date && (
                      <span className="text-[#B28A60]/60">•</span>
                    )}
                    {articlePrincipal.Date && (
                      <span className="text-[#B28A60]/80">
                        {formatDate(articlePrincipal.Date)}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-1.5 font-serif text-[19px] leading-tight text-[#094734] md:text-[21px]">
                    {articlePrincipal.titre}
                  </h3>
                </div>

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#094734] text-white transition-transform duration-300 group-hover:scale-105">
                  <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          </div>
        ) : null}

        {/* Right Column: Clean Article List (02, 03, 04) */}
        <div className="flex flex-col justify-between space-y-2 py-1 lg:col-span-4">
          {articlesSecondaires.map((article, index) => {
            const itemNumber = String(index + 2).padStart(2, "0");

            return (
              <div key={article.id} className="flex items-center gap-3">
                <span className="w-5 font-serif text-base text-[#9E8E7E]">
                  {itemNumber}
                </span>

                <Link
                  href={`/${locale}/actualites/${article.slug}`}
                  className="group flex flex-1 items-center justify-between rounded-xl border border-[#094734]/10 bg-white/40 p-2.5 transition-all duration-300 hover:border-[#094734]/25 hover:bg-white hover:shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-20 shrink-0 overflow-hidden rounded bg-gray-200">
                      {article.image ? (
                        <img
                          src={getImageUrl(article.image)}
                          alt={
                            article.image.alternativeText || article.titre
                          }
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : null}
                    </div>

                    <div className="min-w-0">
                      {article.categorie && (
                        <p className="text-[9px] font-bold uppercase tracking-wider text-[#B28A60]">
                          {article.categorie}
                        </p>
                      )}
                      <h4 className="mt-0.5 line-clamp-2 font-serif text-[13px] font-normal leading-snug text-[#094734]">
                        {article.titre}
                      </h4>
                    </div>
                  </div>

                  <span className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#094734]/20 text-[#094734] transition-colors duration-200 group-hover:border-[#094734] group-hover:bg-[#094734] group-hover:text-white">
                    <ArrowRight size={13} />
                  </span>
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}