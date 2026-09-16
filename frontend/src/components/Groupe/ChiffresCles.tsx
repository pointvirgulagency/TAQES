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

  // Position of each CHIFFRE
  const chiffrePositions = [
    { top: "73.3%", left: "15%" },
    { top: "52.5%", left: "33%" },
    { top: "24%", left: "51%" },
    { top: "32.5%", left: "78%" },
    { top: "52.7%", left: "96.5%" },
  ];

  // Position of each LABEL
  // Change these independently from chiffrePositions
  const labelPositions = [
    { top: "92%", left: "15%" },
    { top: "69%", left: "34%" },
    { top: "40%", left: "52%" },
    { top: "51%", left: "78%" },
    { top: "71%", left: "96.5%" },
  ];

  return (
    <section
      className="relative min-h-[720px] w-full bg-cover bg-no-repeat bg-[position:0%_%] px-6 py-10 md:px-14 lg:px-20"
      style={{
        backgroundImage: backgroundImage
          ? `url("${backgroundImage}")`
          : undefined,
      }}
    >
      <div className="mx-auto max-w-7xl relative min-h-[620px]">
        {/* Top-left: eyebrow + accent line + title */}
        <div className="max-w-md pt-2">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#f4ede2]">
            {chiffre_soustitre}
          </p>

          <div className="mb-2 h-[2px] w-10 bg-[#c2825d]" />

          <h2 className="font-serif text-3xl font-normal leading-[1.2] text-[#f4ede2] md:text-4xl lg:text-[2.6rem]">
            {chiffetitre || "Une expérience qui se mesure sur le terrain"}
          </h2>
        </div>

        {/* Stat markers container */}
        <div className="relative w-full h-[460px] -mt-2">
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
                {/* CHIFFRE — position completely independent */}
                <strong
                  className="absolute -translate-x-1/2 -translate-y-1/2 font-serif text-5xl font-normal leading-none md:text-4xl lg:text-7xl whitespace-nowrap text-[#0b3121]"
                  style={{
                    top: chiffrePosition.top,
                    left: chiffrePosition.left,
                  }}
                >
                  {chiffre.valeur}
                </strong>

                {/* LINE + DOT — kept with the chiffre */}
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

                {/* LABEL — position completely independent */}
                <span
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-[150px] text-center text-[12px] font-semibold uppercase leading-tight tracking-[0.12em] text-[#0b3121]"
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

        {/* Bottom-right: the long tagline */}
        <div className="absolute bottom-4 right-25 max-w-[250px] text-left">
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