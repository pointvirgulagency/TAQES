import type { Locale } from "./ArticleTypes";

interface ArticleNewsletterProps {
  locale: Locale;
}

export default function ArticleNewsletter({
  locale,
}: ArticleNewsletterProps) {
  const isArabic = locale === "ar";

  return (
    <section className="bg-[#00674F] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 md:px-10 md:py-20 lg:flex-row lg:items-center lg:justify-between lg:px-14">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">
            TAQÈS
          </p>

          <h2 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-[-0.03em] md:text-4xl">
            {isArabic
              ? "اكتشف آخر أخبارنا"
              : "Découvrez nos dernières actualités"}
          </h2>
        </div>

        <a
          href={`/${locale}/actualites`}
          className="inline-flex w-fit rounded-full bg-white px-7 py-3.5 text-sm font-medium text-[#00674F] transition-transform duration-300 hover:-translate-y-0.5"
        >
          {isArabic
            ? "جميع الأخبار"
            : "Toutes les actualités"}
        </a>
      </div>
    </section>
  );
}