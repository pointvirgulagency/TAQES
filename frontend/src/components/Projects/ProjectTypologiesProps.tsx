import {
  Building2,
  Check,
  Layers3,
  Home,
} from "lucide-react";

interface ProjectTypologiesProps {
  project: any;
  locale: string;
  strapiUrl: string;
}

export default function ProjectTypologies({
  project,
  strapiUrl,
}: ProjectTypologiesProps) {
  const baseUrl = strapiUrl.replace(
    /\/$/,
    ""
  );

  const typologies = Array.isArray(
    project?.type
  )
    ? project.type
    : [];

  if (typologies.length === 0) {
    return null;
  }

  return (
    <section className="bg-white px-6 py-14 md:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#449383]">
            Typologies
          </p>

          <h2 className="mt-4 font-serif text-3xl uppercase leading-tight text-[#094734] md:text-4xl">
            Une composition
            <br />
            adaptée aux usages
          </h2>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {typologies.map(
            (
              type: any,
              index: number
            ) => {
              const image =
                type?.image?.url
                  ? `${baseUrl}${type.image.url}`
                  : "";

              return (
                <article
                  key={
                    type?.id ||
                    type?.documentId ||
                    index
                  }
                  className="group grid overflow-hidden border border-gray-200 bg-[#F7F7F5] md:grid-cols-2"
                >
                  <div className="flex min-h-[230px] flex-col justify-between p-7">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center bg-[#00674F] text-white">
                          {type?.titre
                            ?.toLowerCase()
                            .includes(
                              "appartement"
                            ) ? (
                            <Home size={15} />
                          ) : type?.titre
                              ?.toLowerCase()
                              .includes(
                                "lot"
                              ) ? (
                            <Layers3
                              size={15}
                            />
                          ) : (
                            <Building2
                              size={15}
                            />
                          )}
                        </div>

                        <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#449383]">
                          Typologie
                        </span>
                      </div>

                      <h3 className="mt-6 font-serif text-2xl uppercase leading-tight text-[#094734]">
                        {type?.titre}
                      </h3>

                      {type?.description && (
                        <p className="mt-4 text-[10px] leading-5 text-gray-600">
                          {
                            type.description
                          }
                        </p>
                      )}
                    </div>

                    {type?.client && (
                      <div className="mt-6 flex items-center gap-2 text-[8px] font-bold uppercase tracking-wider text-[#00674F]">
                        <Check size={12} />
                        {type.client}
                      </div>
                    )}
                  </div>

                  {image && (
                    <div className="min-h-[230px] overflow-hidden">
                      <img
                        src={image}
                        alt={
                          type?.image
                            ?.alternativeText ||
                          type?.titre ||
                          "Typologie"
                        }
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                </article>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}