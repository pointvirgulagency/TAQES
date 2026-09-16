import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProjectBySlug, getProjects } from "@/lib/strapi";
import { generateSeoMetadata } from "@/lib/seo";

import ProjectHero from "@/components/Projects/ProjectHero";
import ProjectInformation from "@/components/Projects/ProjectInformation";
import ProjectDescription from "@/components/Projects/ProjectDescription";
import ProjectSpecs from "@/components/Projects/ProjectSpecs";
import ProjectTypologies from "@/components/Projects/ProjectTypologies";
import ProjectMedia from "@/components/Projects/ProjectMedia";
import ProjectLocation from "@/components/Projects/ProjectLocation";
import ProjectEnvironment from "@/components/Projects/ProjectEnvironment";
import ProjectProgress from "@/components/Projects/ProjectProgress";
import ProjectAudience from "@/components/Projects/ProjectAudience";
import ProjectActualite from "@/components/Projects/ProjectActualite";
import ProjectActions from "@/components/Projects/ProjectActions";
import ProjectPlan from "@/components/Projects/ProjectPlan";
import ProjectCTA from "@/components/Projects/ProjectCta";
import OtherProjects from "@/components/Projects/OtherProjects";

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") || "";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  const project = await getProjectBySlug(
    locale as any,
    slug
  );

  if (!project) {
    return {};
  }

  if (!project.SEO) {
    return {
      title: project.title || "TAQÈS",
    };
  }

  return generateSeoMetadata(
    project.SEO,
    locale as "fr" | "ar",
    `/projects/${slug}`
  );
}

export default async function ProjectPage({
  params,
}: PageProps) {
  const { locale, slug } = await params;

  const project = await getProjectBySlug(
    locale as any,
    slug
  );

  if (!project) {
    notFound();
  }

  const projectsResponse = await getProjects(
    locale as any
  );

  const projects = projectsResponse.data ?? [];

  const typeOperation = project.type_operation;

  return (
    <main className="bg-white">
      {typeOperation === "Foncier" ? (
        <>
          <ProjectHero
            project={project}
            locale={locale}
            strapiUrl={STRAPI_URL}
          />

          <ProjectSpecs
            project={project}
            locale={locale}
            strapiUrl={STRAPI_URL}
          />

          <ProjectInformation
            project={project}
            locale={locale}
            strapiUrl={STRAPI_URL}
          />

          <ProjectPlan
            project={project}
            strapiUrl={STRAPI_URL}
          />

          <ProjectTypologies
            project={project}
            locale={locale}
            strapiUrl={STRAPI_URL}
          />

          <ProjectDescription
            project={project}
            locale={locale}
            strapiUrl={STRAPI_URL}
          />

          <ProjectLocation
            project={project}
            strapiUrl={STRAPI_URL}
          />
          <ProjectProgress
            project={project}
            locale={locale}
            strapiUrl={STRAPI_URL}
          />

          <ProjectMedia
            project={project}
            strapiUrl={STRAPI_URL}
          />

          <ProjectActions
            project={project}
            locale={locale}
            strapiUrl={STRAPI_URL}
          />

          <ProjectCTA
            project={project}
            locale={locale}
          />
        </>
      ) : (
        <>
          <ProjectHero
            project={project}
            locale={locale}
            strapiUrl={STRAPI_URL}
          />

          <ProjectSpecs
            project={project}
            locale={locale}
            strapiUrl={STRAPI_URL}
          />

          <ProjectInformation
            project={project}
            locale={locale}
            strapiUrl={STRAPI_URL}
          />

          <ProjectPlan
            project={project}
            strapiUrl={STRAPI_URL}
          />


          <ProjectEnvironment
            project={project}
            locale={locale}
            strapiUrl={STRAPI_URL}
          />

          <ProjectProgress
            project={project}
            locale={locale}
            strapiUrl={STRAPI_URL}
          />

          <ProjectActualite
            project={project}
            locale={locale}
            strapiUrl={STRAPI_URL}
          />

          <ProjectMedia
            project={project}
            strapiUrl={STRAPI_URL}
          />

          <ProjectAudience
            project={project}
            locale={locale}
          />
        </>
      )}

      <OtherProjects
        currentProjectId={project.id}
        locale={locale}
        projects={projects}
        strapiUrl={STRAPI_URL}
      />
    </main>
  );
}