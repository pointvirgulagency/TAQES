import type { Metadata } from "next";
import Image from "next/image";

import {
  getAccueil,
  getProjects,
  getProjetsPage,
  getTerritoires,
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

interface ProjectTerritoire {
  id?: number;
  nom?: string;
}

interface Project {
  id: number;
  title: string;
  description?: string;
  slug?: string;
  reference?: string;
  localisation?: string;
  territoire?: ProjectTerritoire | null;
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

interface Territoire {
  id?: number;
  nom?: string;
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

  const [
    pageResponse,
    projectsResponse,
    accueilResponse,
    territoiresResponse,
  ] = await Promise.all([
    getProjetsPage(locale),
    getProjects(locale),
    getAccueil(locale),
    getTerritoires(locale),
  ]);

  const page: ProjetPage = pageResponse;

  const projects: Project[] =
    projectsResponse.data ?? [];

  const typologies: Typology[] =
    accueilResponse.data?.typologie ?? [];

  const territoires: Territoire[] =
    territoiresResponse.data ?? [];

  const hero = page.data?.HeroProjet;

  const featuredProject = projects.find(
    (project) =>
      project.id === hero?.projet?.id
  );

  console.log("HERO:", hero);
  console.log("HERO PROJECT ID:", hero?.projet?.id);
  console.log(
    "PROJECT IDS:",
    projects.map((project) => project.id)
  );
  console.log("FEATURED PROJECT:", featuredProject);
  console.log(
    "FEATURED IMAGE URL:",
    featuredProject?.FeaturedImage?.url
  );

  console.log(
    "STRAPI IMAGE SRC:",
    featuredProject?.FeaturedImage?.url
      ? `${STRAPI_URL}${featuredProject.FeaturedImage.url}`
      : null
  );

  return (
    <main
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-[#F3EEE7]"
    >
      {hero && featuredProject && (
        <section className="relative h-[calc(100vh-116px)] min-h-[730px] overflow-hidden">
          {featuredProject.FeaturedImage?.url && (
            <Image
              src={`${STRAPI_URL}${featuredProject.FeaturedImage.url}`}
              alt={
                featuredProject.FeaturedImage.alternativeText ||
                featuredProject.title
              }
              fill
              priority
              unoptimized
              className="object-cover"
              sizes="100vw"
            />
          )}

          <div className="absolute inset-0 bg-[#094734]/45" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#063d2d]/80 via-[#094734]/20 to-transparent" />

          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-6 pb-16 pt-20 md:px-10 md:pb-20 lg:px-16 lg:pb-24">
            <div className="w-full max-w-5xl text-white">
              {hero.titre && (
                <p className="mb-5 text-sm font-medium uppercase tracking-[0.25em] text-[#EBE2DC]">
                  {hero.titre}
                </p>
              )}

              <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl lg:text-8xl">
                {featuredProject.title}
              </h1>

              {featuredProject.description && (
                <p className="mt-7 max-w-2xl text-base leading-7 text-white/85 md:text-lg md:leading-8">
                  {featuredProject.description}
                </p>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                {featuredProject.type?.[0]?.titre && (
                  <span className="rounded-full bg-white/15 px-5 py-2.5 text-sm font-medium backdrop-blur-md">
                    {featuredProject.type[0].titre}
                  </span>
                )}

                {featuredProject.statut && (
                  <span className="rounded-full bg-white/15 px-5 py-2.5 text-sm font-medium backdrop-blur-md">
                    {featuredProject.statut}
                  </span>
                )}

                {featuredProject.type_operation && (
                  <span className="rounded-full bg-white/15 px-5 py-2.5 text-sm font-medium backdrop-blur-md">
                    {featuredProject.type_operation}
                  </span>
                )}

                {featuredProject.public_cible && (
                  <span className="rounded-full bg-white/15 px-5 py-2.5 text-sm font-medium backdrop-blur-md">
                    {featuredProject.public_cible}
                  </span>
                )}
              </div>

              <div className="mt-8 grid max-w-4xl grid-cols-2 border-t border-white/25 pt-5 md:grid-cols-4">
                {featuredProject.localisation && (
                  <div className="border-white/20 pr-5 md:border-r">
                    <p className="text-xs uppercase tracking-[0.15em] text-white/55">
                      Localisation
                    </p>
                    <p className="mt-2 text-sm font-medium md:text-base">
                      {featuredProject.localisation}
                    </p>
                  </div>
                )}

                {featuredProject.annee && (
                  <div className="border-white/20 px-5 md:border-r">
                    <p className="text-xs uppercase tracking-[0.15em] text-white/55">
                      Année
                    </p>
                    <p className="mt-2 text-sm font-medium md:text-base">
                      {featuredProject.annee}
                    </p>
                  </div>
                )}

                {featuredProject.reference && (
                  <div className="border-white/20 pr-5 md:border-r md:pl-5">
                    <p className="text-xs uppercase tracking-[0.15em] text-white/55">
                      Référence
                    </p>
                    <p className="mt-2 text-sm font-medium md:text-base">
                      {featuredProject.reference}
                    </p>
                  </div>
                )}

                {featuredProject.territoire?.nom && (
                  <div className="pl-0 md:pl-5">
                    <p className="text-xs uppercase tracking-[0.15em] text-white/55">
                      Territoire
                    </p>
                    <p className="mt-2 text-sm font-medium md:text-base">
                      {featuredProject.territoire.nom}
                    </p>
                  </div>
                )}
              </div>

              {featuredProject.slug && (
                <a
                  href={`/${locale}/projects/${featuredProject.slug}`}
                  className="mt-8 inline-flex rounded-full bg-[#EBE2DC] px-8 py-3.5 font-medium text-[#094734] transition hover:bg-white"
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
          territoires={territoires}
          locale={locale}
          initialTypologie={
            resolvedSearchParams.typologie ?? ""
          }
          initialStatut={
            resolvedSearchParams.statut ?? ""
          }
          initialLocation={
            resolvedSearchParams.city ?? ""
          }
        />
      </section>
    </main>
  );
}