import Link from "next/link";

interface Article {
  id: number;
  titre: string;
  slug: string;
  categorie?: string;
  date?: string;
  image?: {
    url: string;
  };
}

interface ActualitesProps {
  titre: string;
  data: {
    articlePrincipal?: Article;
    articlesSecondaires?: Article[];
  };
  strapiUrl: string;
}

export default function Actualites({
  titre,
  data,
  strapiUrl,
}: ActualitesProps) {
  return (
    <section className="bg-[#EBE2DC] px-6 py-20 md:px-10 md:py-28 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-5 block text-sm font-medium uppercase tracking-[0.2em] text-[#449383]">
              Actualités
            </span>

            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-[#094734] md:text-4xl lg:text-5xl">
              {titre}
            </h2>
          </div>

          <Link
            href="/actualites"
            className="group inline-flex w-fit items-center gap-3 text-sm font-semibold text-[#094734]"
          >
            <span className="border-b border-[#094734] pb-1">
              Toutes les actualités
            </span>

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Content */}
        <div className="grid gap-12 lg:grid-cols-5">

          {/* Main article */}
          {data.articlePrincipal && (
            <article className="group lg:col-span-3">
              {data.articlePrincipal.image && (
                <div className="mb-7 overflow-hidden">
                  <img
                    src={`${strapiUrl}${data.articlePrincipal.image.url}`}
                    alt={data.articlePrincipal.titre}
                    className="h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] md:h-[500px]"
                  />
                </div>
              )}

              <div>
                <div className="mb-4 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.18em]">
                  {data.articlePrincipal.categorie && (
                    <span className="text-[#00674F]">
                      {data.articlePrincipal.categorie}
                    </span>
                  )}

                  {data.articlePrincipal.date && (
                    <>
                      <span className="h-1 w-1 rounded-full bg-[#449383]" />
                      <span className="text-[#094734]/50">
                        {data.articlePrincipal.date}
                      </span>
                    </>
                  )}
                </div>

                <h3 className="max-w-2xl text-2xl font-semibold leading-tight tracking-tight text-[#094734] md:text-3xl">
                  {data.articlePrincipal.titre}
                </h3>

                <Link
                  href={`/actualites/${data.articlePrincipal.slug}`}
                  className="group/link mt-7 inline-flex items-center gap-3 text-sm font-semibold text-[#094734]"
                >
                  <span className="border-b border-[#094734] pb-1">
                    Lire l'article
                  </span>

                  <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </article>
          )}

          {/* Secondary articles */}
          <div className="lg:col-span-2">
            <div className="border-t border-[#094734]/20">
              {data.articlesSecondaires?.map((article) => (
                <article
                  key={article.id}
                  className="group grid gap-5 border-b border-[#094734]/20 py-7 sm:grid-cols-[160px_1fr] lg:grid-cols-1 xl:grid-cols-[150px_1fr]"
                >
                  {article.image && (
                    <div className="overflow-hidden">
                      <img
                        src={`${strapiUrl}${article.image.url}`}
                        alt={article.titre}
                        className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:h-28 lg:h-36 xl:h-28"
                      />
                    </div>
                  )}

                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em]">
                        {article.categorie && (
                          <span className="text-[#00674F]">
                            {article.categorie}
                          </span>
                        )}

                        {article.date && (
                          <span className="text-[#094734]/50">
                            {article.date}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-semibold leading-snug text-[#094734]">
                        {article.titre}
                      </h3>
                    </div>

                    <Link
                      href={`/actualites/${article.slug}`}
                      className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-medium text-[#094734]"
                    >
                      Lire
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}