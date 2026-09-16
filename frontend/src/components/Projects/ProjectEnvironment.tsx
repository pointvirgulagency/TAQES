import RichText from "@/components/RichText";

interface ProjectEnvironmentProps {
  project: any;
  locale: string;
}

export default function ProjectEnvironment({
  project,
}: ProjectEnvironmentProps) {
  const hasEnvironment =
    project?.environnement_proche ||
    project?.accessibilite ||
    project?.coordonees;

  if (!hasEnvironment) {
    return null;
  }

  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") || "";

  const featuredImage = Array.isArray(project?.FeaturedImage)
    ? project.FeaturedImage[0]
    : project?.FeaturedImage;

  const imageUrl = featuredImage?.url
    ? `${strapiUrl}${featuredImage.url}`
    : null;

  if (project?.type_operation === "Développement foncier") {
    return (
      <section className="bg-[#F1ECE6] px-6 py-14 md:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#449383]">
                Environnement
              </p>

              <h2 className="mt-4 font-serif text-3xl uppercase leading-tight text-[#094734] md:text-4xl">
                Un territoire
                <br />
                en évolution
              </h2>

              {project?.environnement_proche && (
                <div className="mt-6 max-w-xl text-sm leading-7 text-gray-600">
                  <RichText content={project.environnement_proche} />
                </div>
              )}

              {project?.coordonees && (
                <div className="mt-8 border-t border-[#094734]/15 pt-6">
                  <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#449383]">
                    Coordonnées du projet
                  </p>

                  <p className="mt-3 text-sm font-medium text-[#094734]">
                    {project.coordonees}
                  </p>
                </div>
              )}
            </div>

            {imageUrl && (
              <div className="relative overflow-hidden">
                <img
                  src={imageUrl}
                  alt={
                    featuredImage?.alternativeText ||
                    project?.title ||
                    "Environnement du projet"
                  }
                  className="h-full min-h-[400px] w-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F1ECE6] px-6 py-14 md:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2">
          {project?.environnement_proche && (
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#449383]">
                Environnement
              </p>

              <h2 className="mt-4 font-serif text-3xl uppercase leading-tight text-[#094734] md:text-4xl">
                Un territoire
                <br />
                en évolution
              </h2>

              <div className="mt-6 max-w-xl text-sm leading-7 text-gray-600">
                <RichText content={project.environnement_proche} />
              </div>
            </div>
          )}

          {project?.accessibilite && (
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#449383]">
                Accessibilité
              </p>

              <h2 className="mt-4 font-serif text-3xl uppercase leading-tight text-[#094734] md:text-4xl">
                Accéder au
                <br />
                projet
              </h2>

              <div className="mt-6 max-w-xl text-sm leading-7 text-gray-600">
                <RichText content={project.accessibilite} />
              </div>
            </div>
          )}
        </div>

        {project?.coordonees && (
          <div className="mt-12 border-t border-[#094734]/15 pt-8">
            <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#449383]">
              Coordonnées du projet
            </p>

            <p className="mt-3 text-sm font-medium text-[#094734]">
              {project.coordonees}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}