import RichText from "@/components/RichText";

interface StrapiImage {
  url: string;
}

interface SectionData {
  titre?: string | null;
  soustitre?: string | null;
  description?: any;
  image?: StrapiImage | StrapiImage[] | null;
}

interface Valeur {
  id: number;
  titre?: string | null;
}

interface MissionProps {
  vision?: SectionData | null;
  mission?: SectionData | null;
  transition?: SectionData | null;
  valeurs?: Valeur[] | null;
  strapiUrl: string;
}

export default function Mission({
  vision,
  mission,
  transition,
  valeurs,
  strapiUrl,
}: MissionProps) {
  if (!vision && !mission && !valeurs?.length && !transition) {
    return null;
  }

  const missionImage = Array.isArray(mission?.image)
    ? mission.image[0]
    : mission?.image;

  const backgroundImage = missionImage?.url
    ? `${strapiUrl.replace(/\/$/, "")}${missionImage.url}`
    : undefined;

  return (
    <section
      className="relative min-h-[720px] w-full bg-cover bg-center bg-no-repeat px-6 py-12 md:px-12 lg:px-20"
      style={{
        backgroundImage: backgroundImage
          ? `url("${backgroundImage}")`
          : undefined,
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-xl pl-4 md:pl-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#c2825d]">
            CE QUI NOUS GUIDE
          </p>
          <h2 className="font-serif text-3xl font-normal leading-tight text-white md:text-5xl">
            Une vision portée par la parole
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col pt-4 pl-6 md:pl-10">
            {vision && (
              <div className="max-w-xs">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#0b3121] ring-2 ring-[#c2825d]" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0b3121]">
                    {vision.titre}
                  </span>
                </div>
                <div className="mb-3 h-[2px] w-10 bg-[#c2825d]" />
                <div className="text-xs leading-relaxed text-[#0b3121] md:text-sm">
                  <RichText content={vision.description} />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center justify-center pt-8 text-center lg:pt-0">
            {transition && (
              <div className="max-w-xs">
                {transition.titre && (
                  <h3 className="font-serif text-3xl font-normal text-[#0b3121] md:text-4xl">
                    {transition.titre}
                  </h3>
                )}
                {transition.soustitre && (
                  <p className="mt-1 font-serif text-base italic text-[#c2825d] md:text-lg">
                    {transition.soustitre}
                  </p>
                )}
                {transition.description && (
                  <p className="mt-4 text-xs leading-relaxed text-[#0b3121] md:text-sm">
                    {transition.description}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col pt-8 lg:pt-16 pl-4 md:pl-8">
            {mission && (
              <div className="ml-auto max-w-xs">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#0b3121] ring-2 ring-[#c2825d]" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0b3121]">
                    {mission.titre || "MISSION"}
                  </span>
                </div>
                <div className="mb-3 h-[2px] w-10 bg-[#c2825d]" />
                <div className="text-xs leading-relaxed text-[#0b3121] md:text-sm">
                  <RichText content={mission.description} />
                </div>
              </div>
            )}
          </div>
        </div>

        {valeurs && valeurs.length > 0 && (
          <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4 lg:mt-32">
            {valeurs.map((valeur) => (
              <div key={valeur.id} className="flex flex-col items-center text-center">
                <span className="mb-2 h-2 w-2 rounded-full bg-[#0b3121] ring-2 ring-[#c2825d]" />
                <p className="font-serif text-sm font-medium text-[#0b3121] md:text-base">
                  {valeur.titre}
                </p>
                <div className="mt-1 h-[1px] w-6 bg-[#c2825d]" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}