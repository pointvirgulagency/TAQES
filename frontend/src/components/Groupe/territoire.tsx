
interface StrapiImage {
  url: string;
}

interface TerritoireProps {
  data: {
    territoire_soustitre?: string | null;
    territoire_titre?: string | null;
    territoire_description?: string | null;
  };
  territoire_background?: StrapiImage | StrapiImage[] | null;
  strapiUrl: string;
}

export default function Territoire({
  data,
  territoire_background,
  strapiUrl,
}: TerritoireProps) {
  const backgroundImageData = Array.isArray(territoire_background)
    ? territoire_background[0]
    : territoire_background;

  const backgroundImage = backgroundImageData?.url
    ? `${strapiUrl.replace(/\/$/, "")}${backgroundImageData.url}`
    : undefined;

  return (
    <section
      className="relative min-h-[750px] w-full overflow-hidden bg-no-repeat px-4 py-8 sm:px-6 sm:py-10 md:px-12 lg:px-16"
      style={{
        backgroundImage: backgroundImage
          ? `url("${backgroundImage}")`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "left 40% top 0%",
      }}
    >
      <div className="relative mx-auto min-h-[650px] max-w-7xl">
        <div className="absolute left-0 top-0 z-10 w-full max-w-[300px] sm:max-w-[340px] md:max-w-[360px]">
          {data.territoire_soustitre && (
            <div className="mb-3 sm:mb-4">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#12281c] md:text-[10px] md:tracking-[0.25em]">
                {data.territoire_soustitre}
              </p>
              <div className="mt-2 h-[1px] w-7 bg-[#b98650]" />
            </div>
          )}

          {data.territoire_titre && (
            <h2 className="max-w-[300px] font-serif text-[32px] font-normal leading-[0.98] tracking-[-0.03em] text-[#12281c] sm:text-[36px] md:max-w-[350px] md:text-[42px]">
              {data.territoire_titre}
            </h2>
          )}

          {data.territoire_description && (
            <p className="mt-4 max-w-[270px] text-[11px] font-normal leading-[1.45] text-[#12281c]/75 sm:mt-5 sm:max-w-[300px] md:max-w-[320px] md:text-[16px]">
              {data.territoire_description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
