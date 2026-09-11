import type { Metadata } from "next";
import Image from "next/image";

import {
  getAccueil,
  getProjects,
  getProjetsPage,
} from "@/lib/strapi";
import { generateSeoMetadata } from "@/lib/seo";
import ProjectFilters from "@/components/ProjectFilters";
import { translations } from "@/i18n";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;

type Locale = "fr" | "ar";

interface ProjectImage {
  url: string;
  alternativeText?: string | null;
}

interface ProjectType {
  titre?: string;
  client?: string;
  description?: string;
}

interface Project {
  id: number;
  title: string;
  description?: string;
  slug?: string;
  reference?: string;
  localisation?: string;
  ville?: {
    ville?: string;
  };
  statut?: string;
  type_operation?: string;
  public_cible?: string;
  annee?: string;
  type?: ProjectType[];
  FeaturedImage?: ProjectImage;
}

interface Typology {
  titre: string;
  description?: string;
  client?: string;
  image?: {
    url: string;
    alternativeText?: string;
  };
}

interface ProjetPage {
  data?: {
    HeroProjet?: {
      titre?: string;
      projet?: {
        id: number;
      };
    };
    seo?: unknown;
    SEO?: unknown;
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const page = await getProjetsPage(locale);

  return generateSeoMetadata(
    page.data?.seo ?? page.data?.SEO ?? null,
    locale,
    "/projects"
  );
}

export default async function ProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{
    typologie?: string;
    statut?: string;
    city?: string;
  }>;
}) {
  const { locale } = await params;

  const resolvedSearchParams = await searchParams;
  const t = translations[locale];

  const [pageResponse, projectsResponse, accueilResponse] =
    await Promise.all([
      getProjetsPage(locale),
      getProjects(locale),
      getAccueil(locale),
    ]);

  const page: ProjetPage = pageResponse;

  const projects: Project[] = projectsResponse.data ?? [];

  const typologies: Typology[] =
    accueilResponse.data?.typologie ?? [];

  const hero = page.data?.HeroProjet;

  const featuredProject = projects.find(
    (project) => project.id === hero?.projet?.id
  );

  return (
    <main
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-[#F3EEE7]"
    >
      {hero && featuredProject && (
        <section className="relative min-h-[650px] overflow-hidden">
          {featuredProject.FeaturedImage?.url && (
            <Image
              src={`${STRAPI_URL}${featuredProject.FeaturedImage.url}`}
              alt={
                featuredProject.FeaturedImage.alternativeText ||
                featuredProject.title
              }
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          )}

          <div className="absolute inset-0 bg-[#094734]/55" />

          <div className="relative z-10 mx-auto flex min-h-[650px] max-w-7xl items-end px-6 py-20 md:px-10 lg:px-16 lg:py-28">
            <div className="max-w-3xl text-white">
              {hero.titre && (
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#EBE2DC]">
                  {hero.titre}
                </p>
              )}

              <h1 className="text-5xl font-semibold leading-tight md:text-6xl lg:text-7xl">
                {featuredProject.title}
              </h1>

              {featuredProject.description && (
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
                  {featuredProject.description}
                </p>
              )}

              <div className="mt-8 flex flex-wrap gap-4">
                {featuredProject.type?.[0]?.titre && (
                  <span className="rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur-sm">
                    {featuredProject.type[0].titre}
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
                  {t.projects.viewProject}
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="w-full">
        <ProjectFilters
          projects={projects}
          typologies={typologies}
          locale={locale}
          initialTypologie={resolvedSearchParams.typologie ?? ""}
          initialStatut={resolvedSearchParams.statut ?? ""}
          initialLocation={resolvedSearchParams.city ?? ""}
        />
      </section>
    </main>
  );
}