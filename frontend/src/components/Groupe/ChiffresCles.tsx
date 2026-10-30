
import RichText from "@/components/RichText";

interface StrapiImage {
  url: string;
}

interface Chiffre {
  id: number;
  valeur: string;
  libelle: string;
}

interface ChiffresClesProps {
  data: Chiffre[];
  chiffreeyebrow?: string | null;
  chiffetitre?: string | null;
  chiffre_soustitre?: string | null;
  chiffresimage?: StrapiImage | StrapiImage[] | null;
  description?: any;
  strapiUrl?: string;
}

export default function ChiffresCles({
  data,
  chiffreeyebrow,
  chiffetitre,
  chiffre_soustitre,
  chiffresimage,
  description,
  strapiUrl,
}: ChiffresClesProps) {
  const rawImage = Array.isArray(chiffresimage)
    ? chiffresimage[0]
    : chiffresimage;

  const backgroundImage =
    rawImage?.url && strapiUrl
      ? `${strapiUrl.replace(/\/$/, "")}${rawImage.url}`
      : undefined;

  // Original desktop positions — unchanged
  const chiffrePositions = [
    { top: "73.3%", left: "15%" },
    { top: "52.5%", left: "33%" },
    { top: "24%", left: "51%" },
    { top: "32.5%", left: "78%" },
    { top: "52.7%", left: "96.5%" },
  ];

  // Original desktop label positions — unchanged
  const labelPositions = [
    { top: "92%", left: "15%" },
    { top: "69%", left: "34%" },
    { top: "40%", left: "52%" },
    { top: "51%", left: "78%" },
    { top: "71%", left: "96.5%" },
  ];

  return (
    <section
      className="relative min-h-[720px] w-full bg-cover bg-no-repeat bg-[position:0%_%] px-4 py-8 sm:px-6 sm:py-10 md:px-14 lg:px-20"
      style={{
        backgroundImage: backgroundImage
          ? `url("${backgroundImage}")`
          : undefined,
      }}
    >
      <div className="relative mx-auto min-h-[620px] max-w-7xl">
        {/* Top-left: eyebrow + accent line + title */}
        <div className="max-w-md pt-2">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#f4ede2]">
            {chiffre_soustitre}
          </p>

          <div className="mb-2 h-[2px] w-10 bg-[#c2825d]" />

          <h2 className="font-serif text-2xl font-normal leading-[1.2] text-[#f4ede2] sm:text-3xl md:text-4xl lg:text-[2.6rem]">
            {chiffetitre || "Une expérience qui se mesure sur le terrain"}
          </h2>
        </div>

        {/* Mobile statistics */}
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:hidden">
          {data?.map((chiffre) => (
            <div
              key={chiffre.id}
              className="flex flex-col items-center text-center"
            >
              <strong className="font-serif text-4xl font-normal leading-none text-[#0b3121] sm:text-5xl">
                {chiffre.valeur}
              </strong>

              <div className="mt-3 flex flex-col items-center">
                <div className="h-4 w-px bg-[#c2825d]" />
                <div className="h-1.5 w-1.5 rounded-full bg-[#c2825d]" />
              </div>

              <span className="mt-3 max-w-[150px] text-center text-[10px] font-semibold uppercase leading-tight tracking-[0.12em] text-[#0b3121] sm:text-[12px]">
                {chiffre.libelle}
              </span>
            </div>
          ))}
        </div>

        {/* Desktop statistics — original percentage layouts */}
        <div className="relative -mt-2 hidden h-[460px] w-full lg:block">
          {data?.map((chiffre, index) => {
            const chiffrePosition =
              chiffrePositions[index] || {
                top: "50%",
                left: "50%",
              };

            const labelPosition =
              labelPositions[index] || {
                top: "50%",
                left: "50%",
              };

            return (
              <div key={chiffre.id}>
                {/* CHIFFRE */}
                <strong
                  className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-serif text-7xl font-normal leading-none text-[#0b3121]"
                  style={{
                    top: chiffrePosition.top,
                    left: chiffrePosition.left,
                  }}
                >
                  {chiffre.valeur}
                </strong>

                {/* LINE + DOT */}
                <div
                  className="absolute flex flex-col items-center"
                  style={{
                    top: `calc(${chiffrePosition.top} + 35px)`,
                    left: chiffrePosition.left,
                    transform: "translateX(-50%)",
                  }}
                >
                  <div className="h-4 w-px bg-[#c2825d]" />
                  <div className="h-1.5 w-1.5 rounded-full bg-[#c2825d]" />
                </div>

                {/* LABEL */}
                <span
                  className="absolute w-[150px] -translate-x-1/2 -translate-y-1/2 text-center text-[12px] font-semibold uppercase leading-tight tracking-[0.12em] text-[#0b3121]"
                  style={{
                    top: labelPosition.top,
                    left: labelPosition.left,
                  }}
                >
                  {chiffre.libelle}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bottom-right: tagline */}
        <div className="relative mt-10 ml-auto max-w-[250px] text-left lg:absolute lg:bottom-4 lg:right-25 lg:mt-0">
          {chiffreeyebrow && (
            <p className="font-serif text-s font-semibold italic leading-relaxed tracking-wide text-[#0b3121]">
              {chiffreeyebrow}
            </p>
          )}

          <div className="mb-3 h-[2px] w-10 bg-[#c2825d]" />

          {description && (
            <div className="mt-1 text-[11px] font-semibold italic leading-relaxed text-[#0b3121] md:text-xs">
              <RichText content={description} />
            </div>
          )}

          <div className="mt-2 ml-auto h-px w-10 bg-[#c2825d]" />
        </div>
      </div>
    </section>
  );
}
