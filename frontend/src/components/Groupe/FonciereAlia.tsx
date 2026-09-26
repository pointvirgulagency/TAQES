import RichText from "@/components/RichText";

interface RichTextBlock {
  type: string;
  children: {
    type: string;
    text: string;
  }[];
}

interface StrapiImage {
  url: string;
}

interface FonciereAliaProps {
  data: {
    titre: string;
    titresecond?: string;
    eyebrow?: string;
    soustitre?: string;
    description?: string | RichTextBlock[];
    fondPlan?: StrapiImage;
    image?: StrapiImage[];
  };
  strapiUrl: string;
}

export default function FonciereAlia({
  data,
  strapiUrl,
}: FonciereAliaProps) {
  const image = data.image?.[0];
  const src = image ? `${strapiUrl}${image.url}` : undefined;

  return (
    <section
      className="relative overflow-hidden bg-cover bg-[center_40%] bg-no-repeat px-6 py-16 md:px-10 md:py-20 lg:px-16"
      style={{
        backgroundImage: src ? `url("${src}")` : undefined,
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 grid min-h-[520px] grid-cols-1 items-center lg:grid-cols-3 lg:gap-16">
          <div className="flex flex-col justify-center">
            {data.soustitre && (
              <div className="mb-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#c2825d] md:text-sm">
                  {data.soustitre}
                </p>
                <div className="mt-2 h-[1px] w-8 bg-[#c2825d]" />
              </div>
            )}

            <h2 className="font-serif text-4xl font-normal leading-[1.05] text-[#0b3121] md:text-5xl">
              {data.titre}
            </h2>

            <div className="mt-6">
              <RichText
                content={data.description}
                className="text-sm leading-7 text-[#5a524c] md:text-base md:leading-8"
              />
            </div>

            <div className="mt-12 hidden lg:block">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect
                  x="2.5"
                  y="2.5"
                  width="13"
                  height="13"
                  stroke="#c2825d"
                  strokeOpacity="0.4"
                  transform="rotate(45 9 9)"
                />
              </svg>
            </div>
          </div>

          <div />

          <div className="flex flex-col justify-center">
            {data.titresecond && (
              <h3 className="font-serif text-4xl font-normal leading-[1.05] text-[#0b3121] md:text-5xl">
                {data.titresecond}
              </h3>
            )}

            {data.eyebrow && (
              <div className="mt-6">

                <p className="font-serif italic text-base text-[#c2825d] md:text-7xl">
                  {data.eyebrow}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}