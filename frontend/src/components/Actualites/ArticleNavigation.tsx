import type { Locale } from "./ArticleTypes";

interface ArticleNavigationProps {
  locale: Locale;
}

export default function ArticleNavigation({
  locale,
}: ArticleNavigationProps) {
  const isArabic = locale === "ar";

  const items = isArabic
    ? ["فهم", "مقارنة", "التحقق", "التصميم"]
    : ["COMPRENDRE", "COMPARER", "VÉRIFIER", "CONCEVOIR"];

  return (
    <nav
      className="w-full border-y border-[#094734]/10 bg-white/80 backdrop-blur-sm"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-row items-center justify-between px-4 py-5">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-5 sm:gap-17"
          >
            <span className="h-[1px] w-8 bg-[#094734]/40 sm:w-12" />

            <span className="text-[12px] font-bold tracking-[0.15em] text-[#094734]/80 sm:text-[14px]">
              {item}
            </span>
          </div>
        ))}
      </div>
    </nav>
  );
}