

interface ArticleCardProps {
  title: string;
  excerpt?: string;
  slug?: string;
  categorie?: string;
  date?: string;
  locale: "fr" | "ar";
  imageUrl?: string;
}

export default function ArticleCard({
  title,
  excerpt,
  slug,
  categorie,
  date,
  locale,
  imageUrl,
}: ArticleCardProps) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString(
        locale === "ar" ? "ar-MA" : "fr-FR",
        { day: "2-digit", month: "long", year: "numeric" }
      )
    : null;

  const href = slug ? `/${locale}/actualites/${slug}` : undefined;

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#094734]/10 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#EBE2DC]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-[#094734]/40">
            Image
          </div>
        )}

        {categorie && (
          <span className="absolute left-4 top-4 rounded-full bg-[#094734] px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white">
            {categorie}
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="mb-2 text-lg font-semibold leading-snug text-[#094734] line-clamp-2">
          {title}
        </h3>

        {excerpt && (
          <p className="mb-4 text-sm leading-relaxed text-[#094734]/70 line-clamp-2">
            {excerpt}
          </p>
        )}

        <div className="flex items-center justify-between">
          {formattedDate && (
            <span className="text-xs text-[#094734]/50">
              {formattedDate}
            </span>
          )}

          {href && (
            <a
              href={href}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EBE2DC] text-[#094734] transition group-hover:bg-[#094734] group-hover:text-white"
              aria-label={title}
            >
              →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}