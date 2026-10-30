
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
      className="
        relative min-h-[720px] w-full
        bg-cover bg-center bg-no-repeat
        px-5 py-10
        sm:px-6 sm:py-12
        md:px-12
        lg:px-20
      "
      style={{
        backgroundImage: backgroundImage
          ? `url("${backgroundImage}")`
          : undefined,
      }}
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-10 max-w-xl pl-2 sm:mb-12 sm:pl-4 md:pl-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#c2825d]">
            CE QUI NOUS GUIDE
          </p>

          <h2 className="font-serif text-3xl font-normal leading-tight text-white sm:text-4xl md:text-5xl">
            Une vision guidée par nos valeurs
          </h2>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">

          {/* VISION */}
          <div className="flex flex-col pt-2 pl-2 sm:pl-4 md:pt-4 md:pl-10">
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

          {/* TRANSITION */}
          <div className="flex flex-col items-center justify-center pt-2 text-center lg:pt-8 lg:pt-0">
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
                  <div className="mt-4 text-xs leading-relaxed text-[#0b3121] md:text-sm">
                    {typeof transition.description === "string" ? (
                      <p>{transition.description}</p>
                    ) : (
                      <RichText content={transition.description} />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MISSION */}
          <div className="flex flex-col pt-2 pl-2 sm:pl-4 md:pt-8 md:pl-8 lg:pt-16">
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

        {/* MOBILE VALUES */}
        {valeurs && valeurs.length > 0 && (
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:hidden">
            {valeurs.map((valeur) => (
              <div
                key={valeur.id}
                className="flex flex-col items-center text-center"
              >
                <span className="mb-2 h-2 w-2 rounded-full bg-[#0b3121] ring-2 ring-[#c2825d]" />

                <p className="font-serif text-sm font-medium text-[#0b3121] sm:text-base">
                  {valeur.titre}
                </p>

                <div className="mt-1 h-px w-6 bg-[#c2825d]" />
              </div>
            ))}
          </div>
        )}

        {/* DESKTOP VALUES - ORIGINAL POSITIONING PRESERVED */}
        {valeurs && valeurs.length > 0 && (
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            {valeurs.map((valeur, index) => {
              const positions = [
                { left: "22%", top: "72.2%" },
                { left: "40%", top: "82.9%" },
                { left: "57%", top: "80%" },
                { left: "73%", top: "76%" },
              ];

              const position = positions[index] || {
                left: `${20 + index * 15}%`,
                top: "78%",
              };

              return (
                <div
                  key={valeur.id}
                  className="absolute flex flex-col items-center text-center"
                  style={{
                    left: position.left,
                    top: position.top,
                  }}
                >
                  <span className="mb-2 h-2 w-2 rounded-full bg-[#0b3121] ring-2 ring-[#c2825d]" />

                  <p className="whitespace-nowrap font-serif text-sm font-medium text-[#0b3121] md:text-base">
                    {valeur.titre}
                  </p>

                  <div className="mt-1 h-[1px] w-6 bg-[#c2825d]" />
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
