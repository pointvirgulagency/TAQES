
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
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat px-5 py-12 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:bg-[center_40%] lg:px-16"
      style={{
        backgroundImage: src ? `url("${src}")` : undefined,
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 grid grid-cols-1 items-center gap-10 sm:gap-12 lg:min-h-[520px] lg:grid-cols-3 lg:gap-16">

          {/* Left content */}
          <div className="flex flex-col justify-center">
            {data.soustitre && (
              <div className="mb-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#c2825d] sm:text-sm">
                  {data.soustitre}
                </p>
                <div className="mt-2 h-px w-8 bg-[#c2825d]" />
              </div>
            )}

            <h2 className="font-serif text-3xl font-normal leading-tight text-[#0b3121] sm:text-4xl md:text-5xl lg:leading-[1.05]">
              {data.titre}
            </h2>

            {data.description && (
              <div className="mt-4 sm:mt-6">
                <RichText
                  content={data.description}
                  className="text-sm leading-7 text-[#5a524c] sm:text-base sm:leading-8"
                />
              </div>
            )}

            <div className="mt-8 hidden lg:block">
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

          {/* Middle spacing - desktop only */}
          <div className="hidden lg:block" />

          {/* Right content */}
          <div className="flex flex-col justify-center pb-2 lg:pb-0">
            {data.titresecond && (
              <h3 className="font-serif text-3xl font-normal leading-tight text-[#0b3121] sm:text-4xl md:text-5xl lg:leading-[1.05]">
                {data.titresecond.split(".").map((part, index, arr) => (
                  <span key={index}>
                    {part.trim()}
                    {index < arr.length - 1 && "."}
                    {index < arr.length - 1 && <br />}
                  </span>
                ))}
              </h3>
            )}

            {data.eyebrow && (
              <div className="mt-4 sm:mt-6">
                <p className="font-serif text-3xl italic text-[#c2825d] sm:text-4xl md:text-5xl lg:text-7xl">
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
