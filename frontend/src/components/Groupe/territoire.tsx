interface StrapiImage {
  url: string;
}

interface TerritoireItem {
  id: number;
  nom?: string | null;
  titre?: string | null;
}

interface TerritoireProps {
  data: {
    territoire?: TerritoireItem[] | null;
    territoire_soustitre?: string | null;
    territoire_titre?: string | null;
    territoire_description?: string | null;
    territoire_button?: string | null;
  };
  territoire_background?: StrapiImage | StrapiImage[] | null;
  strapiUrl: string;
}

const markerConfig: { top: string; left: string }[] = [
  { top: "15%", left: "59.2%" },
  { top: "27%", left: "86%" },
  { top: "69%", left: "34.8%" },
  { top: "76%", left: "59.3%" },
];

export default function Territoire({
  data,
  territoire_background,
  strapiUrl,
}: TerritoireProps) {
  const territoires = data.territoire
    ? [
        data.territoire[1],
        data.territoire[2],
        data.territoire[0],
        data.territoire[3],
      ].filter(Boolean)
    : [];

  const backgroundImageData = Array.isArray(territoire_background)
    ? territoire_background[0]
    : territoire_background;

  const backgroundImage = backgroundImageData?.url
    ? `${strapiUrl.replace(/\/$/, "")}${backgroundImageData.url}`
    : undefined;

  return (
    <section
      className="relative min-h-[750px] w-full overflow-hidden bg-cover bg-center bg-no-repeat px-6 py-10 md:px-12 lg:px-16"
      style={{
        backgroundImage: backgroundImage
          ? `url("${backgroundImage}")`
          : undefined,
      }}
    >
      <div className="relative mx-auto min-h-[650px] max-w-7xl">
        <div className="absolute left-0 top-0 z-10 max-w-[360px]">
          {data.territoire_soustitre && (
            <div className="mb-4">
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#12281c] md:text-[10px]">
                {data.territoire_soustitre}
              </p>
              <div className="mt-2 h-[1px] w-7 bg-[#b98650]" />
            </div>
          )}

          {data.territoire_titre && (
            <h2 className="max-w-[350px] font-serif text-[36px] font-normal leading-[0.98] tracking-[-0.03em] text-[#12281c] md:text-[42px]">
              {data.territoire_titre}
            </h2>
          )}

          {data.territoire_description && (
            <p className="mt-5 max-w-[320px] text-[11px] font-normal leading-[1.45] text-[#12281c]/75 md:text-[12px]">
              {data.territoire_description}
            </p>
          )}
        </div>

        <div className="absolute inset-0 min-h-[650px] w-full">
          {territoires.map((territoire, index) => {
            const config = markerConfig[index] || {
              top: "50%",
              left: "50%",
            };

            return (
              <div
                key={territoire.id}
                className="absolute z-20 flex -translate-x-1/2 -translate-y-full flex-col items-center"
                style={{
                  top: config.top,
                  left: config.left,
                }}
              >
                <div className="flex flex-col items-center rounded-md bg-[#ebe2dc]/85 px-4 py-2 text-center leading-none">
                  {territoire.nom && (
                    <h3 className="whitespace-nowrap font-serif text-[19px] font-bold leading-[1] tracking-[-0.02em] text-[#0d1f16] md:text-[21px]">
                      {territoire.nom}
                    </h3>
                  )}

                  {territoire.titre && (
                    <span className="mt-1 whitespace-nowrap font-serif text-[11px] font-medium italic leading-[1.1] text-[#3c5548] md:text-[12px]">
                      {territoire.titre}
                    </span>
                  )}
                </div>

                <div className="mt-3">
                  <div className="h-2 w-2 rounded-full bg-[#0d1f16] ring-2 ring-[#b98650]" />
                </div>
              </div>
            );
          })}
        </div>

        {data.territoire_button && (
          <div className="absolute bottom-0 right-12 z-0 flex translate-y-10 flex-col items-end">
            <a
              href="#"
              className="inline-flex items-center gap-4 rounded-full border-2 border-[#b98650] bg-[#12281c] px-6 py-2.5 text-[10px] font-medium uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-[#12281c] hover:text-white"
            >
              <span>{data.territoire_button}</span>
              <span aria-hidden="true" className="text-base leading-none">
                →
              </span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}