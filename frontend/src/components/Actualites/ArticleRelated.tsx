import Link from "next/link";

import type {
  Article,
  Locale,
} from "./ArticleTypes";

import {
  getImageUrl,
} from "./article-utils";

interface ArticleRelatedProps {
  articles: Article[];
  projects: NonNullable<Article["projects"]>;
  locale: Locale;
}

export default function ArticleRelated({
  articles,
  projects,
  locale,
}: ArticleRelatedProps) {
  const isArabic = locale === "ar";

  if (
    articles.length === 0 &&
    projects.length === 0
  ) {
    return null;
  }

  return (
    <section className="bg-[#F4EFE9]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28 lg:px-14">
        {articles.length > 0 && (
          <>
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#449383]">
                  {isArabic
                    ? "اكتشف أيضًا"
                    : "À découvrir"}
                </span>

                <h2 className="mt-3 text-4xl font-medium tracking-[-0.03em] text-[#094734] md:text-5xl">
                  {isArabic
                    ? "مقالات ذات صلة"
                    : "Articles associés"}
                </h2>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => {
                const imageUrl = getImageUrl(
                  article.image
                );

                return (
                  <Link
                    key={article.id}
                    href={`/${locale}/actualites/${article.slug}`}
                    className="group bg-white"
                  >
                    {imageUrl && (
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={
                            article.image
                              ?.alternativeText ||
                            article.titre
                          }
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      {article.categorie && (
                        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#449383]">
                          {article.categorie}
                        </p>
                      )}

                      <h3 className="mt-3 text-2xl font-medium leading-tight tracking-[-0.02em] text-[#094734]">
                        {article.titre}
                      </h3>

                      {article.introduction && (
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#094734]/60">
                          {article.introduction}
                        </p>
                      )}

                      <span className="mt-6 inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.15em] text-[#094734]">
                        {isArabic
                          ? "اقرأ المقال"
                          : "Lire l'article"}

                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {projects.length > 0 && (
          <div className="mt-20 border-t border-[#094734]/10 pt-12">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#449383]">
              {isArabic
                ? "مشاريع مرتبطة"
                : "Projets liés"}
            </span>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => {
                const name =
                  project.nom ||
                  project.titre ||
                  "Projet";

                if (!project.slug) {
                  return (
                    <div
                      key={project.id}
                      className="border border-[#094734]/10 bg-white p-5"
                    >
                      <span className="text-sm font-medium text-[#094734]">
                        {name}
                      </span>
                    </div>
                  );
                }

                return (
                  <Link
                    key={project.id}
                    href={`/${locale}/projets/${project.slug}`}
                    className="group flex items-center justify-between border border-[#094734]/10 bg-white p-5 transition-colors hover:bg-[#094734] hover:text-white"
                  >
                    <span className="text-sm font-medium">
                      {name}
                    </span>

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}