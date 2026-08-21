import type { Metadata } from "next";

import { getArticles, getActualitesPage } from "@/lib/strapi";
import { generateSeoMetadata } from "@/lib/seo";
import ActualitesFilters from "@/components/Actualites/ActualitesFilters";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fr" | "ar" }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const page = await getActualitesPage(locale);

  return generateSeoMetadata(
    page.data?.SEO ?? null,
    locale,
    "/actualites"
  );
}

export default async function ActualitesPage({
  params,
}: {
  params: Promise<{ locale: "fr" | "ar" }>;
}) {
  const { locale } = await params;

  const [page, articles] = await Promise.all([
    getActualitesPage(locale),
    getArticles(locale),
  ]);

  const hero = page.data?.Hero;

  return (
    <main>
      <section className="relative min-h-[420px] overflow-hidden">
        {hero?.imagedesktop && (
          <img
            src={`${STRAPI_URL}${hero.imagedesktop.url}`}
            alt={hero.imagedesktop.alternativeText || hero.titre}
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
        )}

        <div className="absolute inset-0 bg-[#094734]/45" />

        <div className="relative z-10 mx-auto flex min-h-[420px] max-w-7xl items-end px-6 py-16 md:px-10 lg:px-16 lg:py-20">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl font-semibold leading-tight md:text-6xl">
              {hero?.titre || "Actualités"}
            </h1>

            {hero?.description && (
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/85">
                {hero.description}
              </p>
            )}
          </div>
        </div>
      </section>

      <ActualitesFilters
        articles={articles.data ?? []}
        locale={locale}
      />
    </main>
  );
}