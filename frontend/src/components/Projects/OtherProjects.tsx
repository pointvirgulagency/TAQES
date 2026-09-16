import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Project {
  id: number | string;
  slug: string;
  title: string;
  description_courte?: string;
  FeaturedImage?: {
    url?: string;
    alternativeText?: string | null;
  };
  type?: Array<{
    titre?: string;
  }>;
  location?: Array<{
    nom?: string;
  }>;
  statut?: string;
  type_operation?: string;
  public_cible?: string;
  reference?: string;
}

interface OtherProjectsProps {
  currentProjectId: number | string;
  locale: string;
  projects?: Project[];
  strapiUrl?: string;
}

export default function OtherProjects({
  currentProjectId,
  locale,
  projects = [],
  strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "",
}: OtherProjectsProps) {
  const baseUrl = strapiUrl.replace(/\/$/, "");

  const filteredProjects = projects
    .filter((project) => String(project.id) !== String(currentProjectId))
    .slice(0, 2);

  if (filteredProjects.length === 0) {
    return null;
  }

  return (
    <section className="bg-white px-6 py-10 md:px-10 lg:px-16 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 border-b border-gray-200 pb-3">
          <h2 className="font-serif text-xl uppercase tracking-wider text-[#094734] md:text-2xl">
            Découvrir d'autres projets
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {filteredProjects.map((project) => {
            const imageUrl = project.FeaturedImage?.url
              ? project.FeaturedImage.url.startsWith("http")
                ? project.FeaturedImage.url
                : `${baseUrl}${project.FeaturedImage.url}`
              : "/placeholder.jpg";

            const typologie = project.type?.[0]?.titre || "";
            const location = project.location?.[0]?.nom || "";

            return (
              <Link
                key={project.id}
                href={`/${locale}/projects/${project.slug}`}
                className="group flex h-32 border border-gray-200 bg-white transition-all hover:border-[#094734] hover:shadow-sm md:h-36"
              >
                {/* 65% Image Column */}
                <div className="relative w-[65%] shrink-0 overflow-hidden bg-gray-100">
                  <img
                    src={imageUrl}
                    alt={
                      project.FeaturedImage?.alternativeText ||
                      project.title
                    }
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* 35% Compact Text Column */}
                <div className="flex w-[35%] flex-col justify-between p-3 md:p-3.5">
                  <div>
                    {/* Green Title */}
                    <h3 className="line-clamp-2 font-sans text-xs font-bold leading-tight text-[#094734] md:text-sm">
                      {project.title}
                    </h3>

                    <p className="mt-1 line-clamp-1 text-[11px] text-gray-500">
                      {location || typologie || "Projet foncier"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="inline-block rounded-full bg-[#D8EFE5] px-2.5 py-0.5 text-[10px] font-medium text-[#094734]">
                      {project.statut || "En cours"}
                    </span>

                    <ArrowRight
                      size={14}
                      className="text-gray-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#094734]"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}