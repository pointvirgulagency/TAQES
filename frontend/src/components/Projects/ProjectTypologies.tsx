interface ProjectTypologiesProps {
  project: any;
  locale: string;
  strapiUrl: string;
}

export default function ProjectTypologies({
  project,
  strapiUrl,
}: ProjectTypologiesProps) {
  const baseUrl = strapiUrl.replace(/\/$/, "");

  const typologies = Array.isArray(project?.type) ? project.type : [];

  if (typologies.length === 0) {
    return null;
  }

  const indicatorColors = ["bg-[#094734]", "bg-[#449383]", "bg-[#366859]"];

  return (
    <section className="bg-white px-6 py-12 md:px-10 lg:px-16 lg:py-15">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-10">
          <h2 className="font-serif text-3xl uppercase tracking-wider text-[#094734] md:text-4xl lg:text-5xl">
            Une composition adaptée aux usages
          </h2>
          <div className="mt-4 h-[2px] w-12 bg-[#094734]/40" />
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {typologies.map((type: any, index: number) => {
            const image = type?.image?.url
              ? `${baseUrl}${type.image.url}`
              : "";

            const squareBg =
              indicatorColors[index % indicatorColors.length];

            return (
              <article
                key={type?.id || type?.documentId || index}
                className="grid grid-cols-1 md:grid-cols-2 overflow-hidden border border-gray-200 bg-[#F9F9F8]"
              >
                {/* Column 1: Text Content */}
                <div className="flex flex-col justify-center p-8">
                  <div className="flex items-center gap-3">
                    <span className={`h-5 w-5 shrink-0 ${squareBg}`} />
                    <h3 className="font-serif text-xl font-bold uppercase tracking-wide text-[#094734] md:text-2xl">
                      {type?.titre}
                    </h3>
                  </div>

                  {type?.description && (
                    <p className="mt-4 text-base leading-relaxed text-gray-700">
                      {type.description}
                    </p>
                  )}
                </div>

                {/* Column 2: Image - Flush Edge-to-Edge */}
                <div className="relative min-h-[220px] w-full h-full">
                  {image && (
                    <img
                      src={image}
                      alt={
                        type?.image?.alternativeText ||
                        type?.titre ||
                        "Typologie"
                      }
                      className="absolute inset-0 block h-full w-full object-cover"
                    />
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer Disclaimer */}
        <div className="mt-6 text-right">
          <p className="text-xs text-gray-500 md:text-sm">
            Répartition et surfaces à confirmer.
          </p>
        </div>
      </div>
    </section>
  );
}