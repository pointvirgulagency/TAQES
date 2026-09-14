import type { Metadata } from "next";

import { getArticles, getActualitesPage } from "@/lib/strapi";
import { generateSeoMetadata } from "@/lib/seo";
import ActualitesFilters from "@/components/Actualites/ActualitesFilters";
import RichText from "@/components/RichText";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "";

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

  const hero = page.data?.hero;

  const imageUrl = hero?.imagedesktop?.url
    ? hero.imagedesktop.url.startsWith("http")
      ? hero.imagedesktop.url
      : `${STRAPI_URL}${hero.imagedesktop.url}`
    : null;

  return (
    <main
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-white"
    >
      <section className="relative min-h-[420px] overflow-hidden bg-[#094734]">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={
              hero?.imagedesktop?.alternativeText ||
              hero?.titre ||
              "Actualités"
            }
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
        )}

        <div className="absolute inset-0 bg-[#094734]/50" />

        <div className="relative z-10 mx-auto flex min-h-[420px] max-w-7xl items-end px-6 pb-16 pt-24 md:px-10 lg:px-16 lg:pb-20">
          <div className="max-w-3xl text-white">
            {hero?.surtitre && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EBE2DC]/80">
                {hero.surtitre}
              </p>
            )}

            {hero?.titre && (
              <h1 className="mt-2 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                {hero.titre}
              </h1>
            )}

            {hero?.description && (
              <div className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
                <RichText content={hero.description} />
              </div>
            )}
          </div>
        </div>
      </section>

      <ActualitesFilters
        articles={articles?.data ?? []}
        locale={locale}
      />
    </main>
  );
}