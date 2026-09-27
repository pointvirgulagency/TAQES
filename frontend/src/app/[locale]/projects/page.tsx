import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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
  publier?: boolean;
  type?: ProjectType[];
  FeaturedImage?: ProjectImage;
}

interface Hero {
  surtitre?: string;
  titre?: string;
  description?: any;
  Libellebouton1?: string;
  imagedesktop?: ProjectImage;
}

interface HeroProjet {
  titre?: string;
  projects?: Project[];
  background?: ProjectImage;
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

interface LastSection {
  text?: string;
  description?: string;
  libelle_bouton?: string;
  background?: ProjectImage;
}

interface ProjetPage {
  data?: {
    hero?: Hero;
    HeroProjet?: HeroProjet;
    last_section?: LastSection;
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
    featured?: string;
  }>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;

  const [page, projectsResponse, accueil, territoiresResponse] =
    await Promise.all([
      getProjetsPage(locale),
      getProjects(locale),
      getAccueil(locale),
      getTerritoires(locale),
    ]);

  const t = translations[locale];

  const pageData = page?.data as ProjetPage["data"] | undefined;

  const hero = pageData?.hero;
  const heroProjet = pageData?.HeroProjet;
  const lastSection = pageData?.last_section;

  const projects: Project[] = Array.isArray(projectsResponse?.data)
    ? projectsResponse.data
    : [];

  const typologies: Typology[] = Array.isArray(accueil?.data?.typologie)
    ? accueil.data.typologie
    : [];

  const territoires: Territoire[] = Array.isArray(
    territoiresResponse?.data
  )
    ? territoiresResponse.data
    : [];

  const visibleProjects = projects.filter(
    (project) => project.publier !== false
  );

  const heroProjects: Project[] = Array.isArray(heroProjet?.projects)
    ? heroProjet.projects.filter((project) => project?.publier !== false)
    : [];

  const requestedFeaturedId = resolvedSearchParams.featured
    ? Number(resolvedSearchParams.featured)
    : null;

  const requestedFeaturedIndex =
    requestedFeaturedId !== null && !Number.isNaN(requestedFeaturedId)
      ? heroProjects.findIndex(
          (project) => project.id === requestedFeaturedId
        )
      : -1;

  const featuredIndex = requestedFeaturedIndex >= 0
    ? requestedFeaturedIndex
    : 0;

  const featuredProject = heroProjects[featuredIndex];

  const previousFeaturedProject =
    heroProjects.length > 1
      ? heroProjects[
          (featuredIndex - 1 + heroProjects.length) %
            heroProjects.length
        ]
      : null;

  const nextFeaturedProject =
    heroProjects.length > 1
      ? heroProjects[(featuredIndex + 1) % heroProjects.length]
      : null;

  const buildFeaturedUrl = (projectId: number) => {
    const params = new URLSearchParams();

    params.set("featured", String(projectId));

    if (resolvedSearchParams.typologie) {
      params.set("typologie", resolvedSearchParams.typologie);
    }

    if (resolvedSearchParams.statut) {
      params.set("statut", resolvedSearchParams.statut);
    }

    if (resolvedSearchParams.city) {
      params.set("city", resolvedSearchParams.city);
    }

    return `/${locale}/projects?${params.toString()}`;
  };

  return (
    <main
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-[#F3EEE7]"
    >
      {hero && (
        <section className="relative min-h-[580px] w-full overflow-hidden bg-[#F3EEE7] md:min-h-[680px] lg:min-h-[760px]">
          {hero.imagedesktop?.url && (
            <Image
              src={`${STRAPI_URL}${hero.imagedesktop.url}`}
              alt={
                hero.imagedesktop.alternativeText ||
                hero.titre ||
                "Nos projets"
              }
              fill
              priority
              unoptimized
              className="object-cover object-[40%_bottom]"
              sizes="100vw"
            />
          )}

          <div className="relative z-10 mx-auto flex h-full min-h-[580px] max-w-7xl items-center px-6 py-16 md:min-h-[680px] md:px-12 lg:min-h-[760px] lg:px-16">
            <div className="w-full max-w-xl text-[#094734] md:-ml-12 lg:-ml-24">
              {hero.surtitre && (
                <div className="mb-6 flex items-center gap-3">
                  <p className="text-s font-semibold uppercase tracking-[0.22em] text-[#094734]/70">
                    {hero.surtitre}
                  </p>

                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-[#094734]/30"
                  />
                </div>
              )}

              {hero.titre && (
                <h1 className="font-serif text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl lg:text-[80px]">
                  {hero.titre}
                </h1>
              )}

              {hero.description && (
                <div className="mt-8 max-w-lg font-serif text-xl leading-relaxed text-[#094734]/80 md:text-2xl">
                  {Array.isArray(hero.description) ? (
                    hero.description.map((block: any, index: number) => (
                      <p key={index}>
                        {block.children
                          ?.map((child: any) => child.text)
                          .join("")}
                      </p>
                    ))
                  ) : (
                    <p>{hero.description}</p>
                  )}
                </div>
              )}

              {hero.Libellebouton1 && (
                <div className="mt-10">
                  <Link
                    href={`/${locale}/projects`}
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-[#094734] transition hover:opacity-75"
                  >
                    <span>{hero.Libellebouton1}</span>

                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeWidth={2}
                        d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                      />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {heroProjet && featuredProject && (
        <section className="relative w-full overflow-hidden bg-[#00674F] text-white">
          {heroProjet.background?.url && (
            <Image
              src={`${STRAPI_URL}${heroProjet.background.url}`}
              alt={heroProjet.background.alternativeText || "Arrière-plan"}
              fill
              unoptimized
              className="object-cover object-center"
              sizes="100vw"
            />
          )}

          <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-12 md:px-12 md:py-16 lg:px-20 lg:py-18">
            <div className="mb-10 flex items-center justify-between gap-6 md:mb-12">
              <div className="flex items-center gap-6">
                <h2 className="font-serif text-4xl font-normal tracking-tight md:text-5xl lg:text-[56px]">
                  {heroProjet.titre || "Nos projets à la une"}
                </h2>

                <span
                  aria-hidden="true"
                  className="mt-2 h-px w-20 bg-white/60 md:w-28"
                />
              </div>

              <div className="hidden text-right text-xs uppercase tracking-[0.3em] text-white/80 sm:block">
                HABITER • INVESTIR • DÉVELOPPER
              </div>
            </div>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.05fr)_460px] lg:gap-14">
              <div className="relative min-h-[460px] overflow-hidden md:min-h-[580px] lg:min-h-[620px]">
                {featuredProject.FeaturedImage?.url ? (
                  <Image
                    key={featuredProject.id}
                    src={`${STRAPI_URL}${featuredProject.FeaturedImage.url}`}
                    alt={
                      featuredProject.FeaturedImage.alternativeText ||
                      featuredProject.title ||
                      ""
                    }
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#094734]" />
                )}
              </div>

              <div className="flex min-h-[460px] flex-col justify-between md:min-h-[580px] lg:min-h-[620px]">
                <div>
                  {featuredProject.statut && (
                    <span className="inline-flex rounded-full border border-white/60 px-5 py-1.5 text-sm font-medium text-white">
                      {featuredProject.statut}
                    </span>
                  )}

                  {featuredProject.type_operation && (
                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
                      {featuredProject.type_operation}
                    </p>
                  )}

                  <h3 className="mt-3 font-serif text-4xl font-normal leading-[1.08] md:text-5xl lg:text-[48px]">
                    {featuredProject.title}
                  </h3>

                  {(featuredProject.type?.length ||
                    featuredProject.territoire?.nom) && (
                    <p className="mt-4 text-base text-white/90 md:text-lg">
                      {[
                        featuredProject.type
                          ?.map((item) => item.titre)
                          .filter(Boolean)
                          .join(" et "),
                        featuredProject.territoire?.nom,
                      ]
                        .filter(Boolean)
                        .join("  ·  ")}
                    </p>
                  )}

                  {featuredProject.slug && (
                    <div className="mt-8">
                      <Link
                        href={`/${locale}/projects/${featuredProject.slug}`}
                        className="inline-flex items-center gap-4 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#094734] transition hover:bg-[#EBE2DC]"
                      >
                        <span>{t.projects.viewProject}</span>

                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  )}

                  <p className="mt-8 text-sm font-medium text-white/90">
                    Voir les projets à venir
                    <span className="ml-2 text-base">↓</span>
                  </p>

                  <div className="mt-5 flex items-center gap-6">
                    {previousFeaturedProject ? (
                      <Link
                        href={buildFeaturedUrl(previousFeaturedProject.id)}
                        scroll={false}
                        aria-label="Projet précédent"
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/60 text-white transition hover:bg-white hover:text-[#094734]"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.8}
                            d="M15 18l-6-6 6-6"
                          />
                        </svg>
                      </Link>
                    ) : (
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/30">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.8}
                            d="M15 18l-6-6 6-6"
                          />
                        </svg>
                      </span>
                    )}

                    <span className="text-base font-medium tracking-widest text-white">
                      {String(featuredIndex + 1).padStart(2, "0")} /{" "}
                      {String(heroProjects.length).padStart(2, "0")}
                    </span>

                    {nextFeaturedProject ? (
                      <Link
                        href={buildFeaturedUrl(nextFeaturedProject.id)}
                        scroll={false}
                        aria-label="Projet suivant"
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/60 text-white transition hover:bg-white hover:text-[#094734]"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.8}
                            d="M9 18l6-6-6-6"
                          />
                        </svg>
                      </Link>
                    ) : (
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/30">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.8}
                            d="M9 18l6-6-6-6"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-auto pt-8">
                  <div className="mb-5 h-px w-full bg-white/40" />

                  {nextFeaturedProject && (
                    <Link
                      href={buildFeaturedUrl(nextFeaturedProject.id)}
                      scroll={false}
                      className="grid grid-cols-[150px_minmax(0,1fr)] gap-5"
                    >
                      <div className="relative h-[95px] overflow-hidden">
                        {nextFeaturedProject.FeaturedImage?.url ? (
                          <Image
                            src={`${STRAPI_URL}${nextFeaturedProject.FeaturedImage.url}`}
                            alt={
                              nextFeaturedProject.FeaturedImage
                                .alternativeText ||
                              nextFeaturedProject.title ||
                              ""
                            }
                            fill
                            unoptimized
                            className="object-cover"
                            sizes="150px"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-[#094734]" />
                        )}
                      </div>

                      <div className="flex flex-col justify-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                          À suivre
                        </p>

                        <h4 className="mt-1 font-serif text-xl leading-snug">
                          {nextFeaturedProject.title}
                        </h4>

                        <p className="mt-1.5 text-xs text-white/80">
                          {[
                            nextFeaturedProject.statut,
                            nextFeaturedProject.type
                              ?.map((item) => item.titre)
                              .filter(Boolean)
                              .join(" et "),
                            nextFeaturedProject.territoire?.nom,
                          ]
                            .filter(Boolean)
                            .join("  ·  ")}
                        </p>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
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
          initialTypologie={resolvedSearchParams.typologie ?? ""}
          initialStatut={resolvedSearchParams.statut ?? ""}
          initialLocation={resolvedSearchParams.city ?? ""}
        />
      </section>

      {lastSection && (
        <section className="relative w-full overflow-hidden bg-[#094734] py-14 text-white md:py-18">
          {lastSection.background?.url && (
            <Image
              src={`${STRAPI_URL}${lastSection.background.url}`}
              alt={lastSection.background.alternativeText || ""}
              fill
              unoptimized
              className="object-cover object-right"
              sizes="100vw"
            />
          )}

          <div className="absolute inset-0 bg-[#094734]/45" />

          <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start justify-start gap-8 px-6 md:px-12 lg:flex-row lg:items-center lg:gap-16 lg:px-16">
            <div className="max-w-md text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80">
                ÉCOUTER • CONSEILLER • CONSTRUIRE
              </p>

              {lastSection.text && (
                <h2 className="mt-2 font-serif text-3xl font-medium leading-[1.15] text-white md:text-4xl lg:text-[42px]">
                  {lastSection.text}
                </h2>
              )}
            </div>

            <div
              aria-hidden="true"
              className="hidden h-20 w-px bg-white/30 lg:block"
            />

            <div className="flex flex-col items-start gap-4">
              {lastSection.description && (
                <p className="max-w-xs text-sm font-bold leading-relaxed text-white/90">
                  {lastSection.description}
                </p>
              )}

              {lastSection.libelle_bouton && (
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-3 rounded-full bg-[#F3EEE7] px-8 py-3.5 text-xs font-semibold text-[#094734] shadow-sm transition-all duration-300 hover:bg-white hover:shadow-md"
                >
                  <span>{lastSection.libelle_bouton}</span>

                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-b from-transparent to-[#004233] md:h-40 lg:h-20" />
        </section>
      )}
    </main>
  );
}