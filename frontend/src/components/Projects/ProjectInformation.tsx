// src/components/Projects/ProjectInformation.tsx

import RichText from "@/components/RichText";

interface ProjectInformationProps {
  project: any;
  locale: string;
  strapiUrl: string;
}

export default function ProjectInformation({
  project,
  strapiUrl,
}: ProjectInformationProps) {
  const baseUrl = strapiUrl.replace(/\/$/, "");

  const gallery =
    Array.isArray(project?.gallery)
      ? project.gallery
      : [];

  const image =
    gallery[0]?.url
      ? `${baseUrl}${gallery[0].url}`
      : project?.FeaturedImage?.url
        ? `${baseUrl}${project.FeaturedImage.url}`
        : "";

  return (
    <section className="bg-white px-6 py-14 md:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center lg:gap-16">
        <div>
          <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#449383]">
            Études & réalisation
          </p>

          <h2 className="mt-4 max-w-xl font-serif text-3xl uppercase leading-[1.05] text-[#094734] md:text-4xl lg:text-[2.7rem]">
            Structurer le foncier,
            <br />
            accompagner le territoire
          </h2>

          <div className="mt-6 max-w-xl text-xs leading-6 text-gray-600 md:text-sm md:leading-7">
            {project?.description_complete ? (
              <RichText
                content={
                  project.description_complete
                }
              />
            ) : project?.description_courte ? (
              <p>
                {project.description_courte}
              </p>
            ) : null}
          </div>
        </div>

        {image && (
          <div className="h-[280px] overflow-hidden md:h-[360px]">
            <img
              src={image}
              alt={
                project?.FeaturedImage
                  ?.alternativeText ||
                project?.title ||
                "Projet"
              }
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}