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
    sousTitre?: string;
    description?: string | RichTextBlock[];
    // Faint cadastral / architectural line-drawing behind the collage
    fondPlan?: StrapiImage;
    // Top-right wide panorama (village / landscape view)
    imagePanorama?: StrapiImage;
    // Aerial coastline shot, overlapping the panorama on the left
    imageAerienne?: StrapiImage;
    // Bottom-left architectural elevation sketch
    imageCroquis?: StrapiImage;
    // Bottom-middle finished building photo
    imageBatiment?: StrapiImage;
    // Bottom-right construction site / crane photo
    imageChantier?: StrapiImage;
  };
  strapiUrl: string;
}

export default function FonciereAlia({ data, strapiUrl }: FonciereAliaProps) {
  const src = (image?: StrapiImage) =>
    image ? `${strapiUrl}${image.url}` : undefined;

  const collageImages = [
    data.imagePanorama,
    data.imageAerienne,
    data.imageCroquis,
    data.imageBatiment,
    data.imageChantier,
  ].filter(Boolean) as StrapiImage[];

  return (
    <section className="relative overflow-hidden bg-[#F4F0EA] px-6 py-16 md:px-10 md:py-20 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-stretch">
        {/* Text column — ~34% */}
        <div className="relative z-10 flex flex-col justify-center lg:w-[34%]">
          <h2 className="font-serif text-4xl font-normal leading-[1.05] text-[#094734] md:text-5xl">
            {data.titre}
          </h2>

          {data.sousTitre && (
            <p className="mt-4 text-base text-[#094734]/80 md:text-lg">
              {data.sousTitre}
            </p>
          )}

          <div className="mt-6">
            <RichText
              content={data.description}
              className="space-y-4 text-sm leading-7 text-[#094734]/70 md:text-base md:leading-8"
            />
          </div>

          {/* Decorative diamond marker, bottom-left */}
          <div className="mt-12 hidden lg:block">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect
                x="2.5"
                y="2.5"
                width="13"
                height="13"
                stroke="#094734"
                strokeOpacity="0.35"
                transform="rotate(45 9 9)"
              />
            </svg>
          </div>
        </div>

        {/* Image collage column — ~66% */}
        <div className="relative min-h-[320px] lg:w-[66%]">
          {/* Faint cadastral / architectural line drawing behind the photos */}
          {data.fondPlan && (
            <img
              src={src(data.fondPlan)}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -left-[20%] -top-[10%] hidden h-[130%] w-[140%] object-contain opacity-[0.35] mix-blend-multiply lg:block"
            />
          )}

          {/* Desktop collage — fixed positions matching the reference layout */}
          <div className="relative hidden aspect-[815/433] w-full lg:block">
            {data.imagePanorama && (
              <img
                src={src(data.imagePanorama)}
                alt={data.titre}
                className="absolute right-0 top-0 h-[44%] w-[52%] object-cover shadow-sm"
              />
            )}

            {data.imageAerienne && (
              <img
                src={src(data.imageAerienne)}
                alt=""
                className="absolute left-[16%] top-[18%] h-[52%] w-[32%] object-cover shadow-sm [clip-path:polygon(4%_18%,22%_2%,55%_0%,82%_10%,100%_28%,96%_55%,100%_82%,78%_100%,45%_96%,15%_100%,0%_78%,2%_45%)]"
              />
            )}

            {data.imageCroquis && (
              <img
                src={src(data.imageCroquis)}
                alt=""
                className="absolute bottom-0 left-[12%] h-[42%] w-[33%] object-cover shadow-sm"
              />
            )}

            {data.imageBatiment && (
              <img
                src={src(data.imageBatiment)}
                alt=""
                className="absolute bottom-0 left-[46%] h-[40%] w-[24%] object-cover shadow-sm"
              />
            )}

            {data.imageChantier && (
              <img
                src={src(data.imageChantier)}
                alt=""
                className="absolute bottom-0 right-0 h-[42%] w-[29%] object-cover shadow-sm"
              />
            )}
          </div>

          {/* Mobile / tablet fallback — simple stacked grid, no absolute positioning */}
          {collageImages.length > 0 && (
            <div className="grid grid-cols-2 gap-3 lg:hidden">
              {collageImages.map((image, i) => (
                <img
                  key={i}
                  src={src(image)}
                  alt=""
                  className={`w-full rounded-sm object-cover ${
                    i === 0 ? "col-span-2 h-48" : "h-36"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}