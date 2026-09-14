import Link from "next/link";
import type { Article, Locale } from "./ArticleTypes";

interface ArticleBreadcrumbProps {
  article: Article;
  locale: Locale;
}

export default function ArticleBreadcrumb({
  article,
  locale,
}: ArticleBreadcrumbProps) {
  const isArabic = locale === "ar";

  return (
    <div
      className="flex items-center gap-2 text-xs font-semibold text-[#094734]"
      aria-label="Breadcrumb"
    >
      <Link
        href={`/${locale}`}
        className="text-[#094734] transition-opacity hover:opacity-75"
      >
        {isArabic ? "الرئيسية" : "Accueil"}
      </Link>

      <span
        className="text-[#094734]/40"
        aria-hidden
      >
        ›
      </span>

      <Link
        href={`/${locale}/actualites`}
        className="text-[#094734] transition-opacity hover:opacity-75"
      >
        {isArabic ? "الأخبار" : "Actualités"}
      </Link>

      <span
        className="text-[#094734]/40"
        aria-hidden
      >
        ›
      </span>

      <span
        className="max-w-[280px] truncate font-normal text-[#094734]/65"
        title={article.titre}
      >
        {article.titre}
      </span>
    </div>
  );
}