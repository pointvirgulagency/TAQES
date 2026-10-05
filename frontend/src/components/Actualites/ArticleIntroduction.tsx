import type { Article, Locale } from "./ArticleTypes";

interface ArticleIntroductionProps {
  article: Article;
  locale: Locale;
}

export default function ArticleIntroduction({
  article,
  locale,
}: ArticleIntroductionProps) {
  if (!article.introduction) {
    return null;
  }

  const isArabic = locale === "ar";

  return (
    <section
      className="bg-[#F8F6F0] py-16 md:py-20"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-12 px-6 md:flex-row lg:px-12">
        <div className="max-w-2xl flex-1">
          <p className="text-base leading-relaxed text-[#094734]/80 sm:text-lg">
            <span
              className={`font-serif text-[72px] font-bold leading-none text-[#094734] sm:text-[88px] ${
                isArabic
                  ? "float-right ml-4 mt-1"
                  : "float-left mr-4 mt-1"
              }`}
            >
              {article.introduction.charAt(0)}
            </span>

            {article.introduction.slice(1)}
          </p>
        </div>

        <div className="flex w-full items-center gap-8 md:w-auto">
          <div className="hidden h-28 w-[1px] bg-[#094734]/20 md:block" />

          <div className="max-w-xs space-y-3">
            <div className="h-[2px] w-6 bg-[#C4A484]" />

            {article.intro_eyebrow && (
              <blockquote className="font-serif text-lg font-bold leading-snug text-[#094734] sm:text-xl">
                {article.intro_eyebrow}
              </blockquote>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
