import type { Article, Locale } from "./ArticleTypes";
import ArticleBreadcrumb from "./ArticleBreadcrumb";
import { formatArticleDate, getImageUrl } from "./article-utils";

interface ArticleHeroProps {
  article: Article;
  locale: Locale;
}

export default function ArticleHero({
  article,
  locale,
}: ArticleHeroProps) {
  const imageUrl = getImageUrl(article.image);
  const date = formatArticleDate(article.Date, locale);
  const isArabic = locale === "ar";

  return (
    <section
      className="relative w-full overflow-hidden bg-[#F8F6F0] text-[#094734]"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="mx-auto flex min-h-[580px] w-full max-w-[1500px] flex-col lg:flex-row">
        <div className="relative z-10 flex flex-1 flex-col px-6 pb-12 pt-40 md:px-12 md:pt-44 lg:w-1/2 lg:px-16 lg:py-32">
          <ArticleBreadcrumb
            article={article}
            locale={locale}
          />
            <br/>
          <div className="mt-auto flex flex-col items-start">
            {article.categorie && (
              <div className="mb-6 rounded-full bg-[#094734] px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-white">
                {article.categorie}
              </div>
            )}

            <h1 className="font-serif text-3xl font-bold leading-[1.0] text-[#094734] sm:text-4xl md:text-5xl lg:text-[50px]">
              {article.titre}
            </h1>

            {article.introduction && (
              <p className="mt-6 text-base leading-relaxed text-[#094734]/90 sm:text-lg">
                {article.introduction}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-6 text-s font-medium text-[#094734]/90">
              {date && (
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-[#094734]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={4}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>

                  <time dateTime={article.Date}>
                    {date}
                  </time>
                </div>
              )}

              {date && (
                <span
                  className="h-3 w-[1px] bg-[#094734]/20"
                  aria-hidden
                />
              )}

              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 text-[#094734]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <span>
                  {isArabic
                    ? "6 دقائق قراءة"
                    : "6 min de lecture"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative min-h-[360px] flex-1 lg:min-h-full lg:w-1/2">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={
                article.image?.alternativeText ||
                article.titre
              }
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}

          <div
            className={`pointer-events-none absolute inset-y-0 hidden lg:block ${
              isArabic
                ? "right-[-1px] rotate-180"
                : "left-[-1px]"
            } h-full w-24 text-[#F8F6F0]`}
          >
            <svg
              className="h-full w-full fill-current"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path d="M 0,0 C 80,30 20,70 0,100 L 0,0 Z" />
            </svg>
          </div>

          <div className="absolute right-8 top-8 hidden max-w-[200px] text-right lg:block">
            <p className="font-serif text-sm italic leading-tight text-[#094734]">
              Des territoires durables pour demain
            </p>

            <div className="ml-auto mt-2 h-[1px] w-8 bg-[#094734]" />
          </div>
        </div>
      </div>
    </section>
  );
}