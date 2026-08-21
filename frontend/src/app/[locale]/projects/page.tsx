import type { Metadata } from "next";

import { getProjects, getProjetsPage } from "@/lib/strapi";
import { generateSeoMetadata } from "@/lib/seo";
import ProjectFilters from "@/components/ProjectFilters";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fr" | "ar" }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const page = await getProjetsPage(locale);

  return generateSeoMetadata(
    page.data?.seo ?? null,
    locale,
    "/projets"
  );
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: "fr" | "ar" }>;
}) {
  const { locale } = await params;

  const [page, projects] = await Promise.all([
    getProjetsPage(locale),
    getProjects(locale),
  ]);

  const hero = page.data?.HeroProjet;
  const featuredProject = hero?.projet;

  return (
    <main>
      {hero && featuredProject && (
        <section className="relative min-h-[650px] overflow-hidden">
          {featuredProject.FeaturedImage && (
            <img
              src={`${STRAPI_URL}${featuredProject.FeaturedImage.url}`}
              alt={
                featuredProject.FeaturedImage.alternativeText ||
                featuredProject.title
              }
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />
          )}

          <div className="absolute inset-0 bg-[#094734]/55" />

          <div className="relative z-10 mx-auto flex min-h-[650px] max-w-7xl items-end px-6 py-20 md:px-10 lg:px-16 lg:py-28">
            <div className="max-w-3xl text-white">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#EBE2DC]">
                {hero.titre}
              </p>

              <h1 className="text-5xl font-semibold leading-tight md:text-6xl lg:text-7xl">
                {featuredProject.title}
              </h1>

              {featuredProject.description && (
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
                  {featuredProject.description}
                </p>
              )}

              <div className="mt-8 flex flex-wrap gap-4">
                {featuredProject.typologie && (
                  <span className="rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur-sm">
                    {featuredProject.typologie}
                  </span>
                )}

                {featuredProject.statut && (
                  <span className="rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur-sm">
                    {featuredProject.statut}
                  </span>
                )}

                {featuredProject.type_operation && (
                  <span className="rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur-sm">
                    {featuredProject.type_operation}
                  </span>
                )}
              </div>

              {featuredProject.slug && (
                <a
                  href={`/${locale}/projects/${featuredProject.slug}`}
                  className="mt-8 inline-flex rounded-full bg-[#EBE2DC] px-7 py-3 font-medium text-[#094734] transition hover:bg-white"
                >
                  Voir le projet
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      <ProjectFilters
        projects={projects.data}
        locale={locale}
      />
    </main>
  );
}