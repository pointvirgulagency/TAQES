import { Eye, Target, Gem, Check } from "lucide-react";
import RichText from "@/components/RichText";

interface SectionData {
  titre?: string | null;
  description?: any;
}

interface Valeur {
  id: number;
  titre?: string | null;
}

interface MissionProps {
  vision?: SectionData | null;
  mission?: SectionData | null;
  valeurs?: Valeur[] | null;
}

export default function Mission({
  vision,
  mission,
  valeurs,
}: MissionProps) {
  if (!vision && !mission && !valeurs?.length) {
    return null;
  }

  const midpoint = Math.ceil((valeurs?.length ?? 0) / 2);
  const valeursCol1 = valeurs?.slice(0, midpoint) ?? [];
  const valeursCol2 = valeurs?.slice(midpoint) ?? [];

  return (
    <section className="bg-[#F4F0EA] px-6 py-16 md:px-10 md:py-20 lg:px-16">
      <div className="mx-auto max-w-7xl">

        <h2 className="mb-12 font-serif text-4xl font-normal text-[#094734] md:text-5xl">
          Vision, mission &amp; valeurs
        </h2>

        <div className="grid grid-cols-1 items-stretch lg:grid-cols-3">

          {/* VISION */}
          <div className="flex flex-col px-0 lg:border-r lg:border-[#094734]/15 lg:pr-10">
            {vision && (
              <>
                <div className="mb-4 flex items-center gap-3">
                  <Eye
                    strokeWidth={1.5}
                    className="h-9 w-9 shrink-0 text-[#00674F]"
                  />

                  <h3 className="font-serif text-2xl font-medium text-[#00674F] md:text-3xl">
                    {vision.titre}
                  </h3>
                </div>

                <div className="text-base leading-7 text-[#094734]/60">
                  <RichText
                    content={vision.description}
                    className="leading-6"
                  />
                </div>
              </>
            )}
          </div>

          {/* MISSION */}
          <div className="flex flex-col px-0 lg:border-r lg:border-[#094734]/15 lg:px-10">
            {mission && (
              <>
                <div className="mb-4 flex items-center gap-3">
                  <Target
                    strokeWidth={1.5}
                    className="h-9 w-9 shrink-0 text-[#00674F]"
                  />

                  <h3 className="font-serif text-2xl font-medium text-[#00674F] md:text-3xl">
                    {mission.titre}
                  </h3>
                </div>

                <div className="text-base leading-7 text-[#094734]/60">
                  <RichText
                    content={mission.description}
                    className="leading-6"
                  />
                </div>
              </>
            )}
          </div>

          {/* VALEURS */}
          <div className="flex flex-col px-0 lg:pl-10">
            {valeurs && valeurs.length > 0 && (
              <>
                <div className="mb-4 flex items-center gap-3">
                  <Gem
                    strokeWidth={1.5}
                    className="h-9 w-9 shrink-0 text-[#00674F]"
                  />

                  <h3 className="font-serif text-2xl font-medium text-[#00674F] md:text-3xl">
                    Valeurs
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  <ul className="space-y-3">
                    {valeursCol1.map((valeur) => (
                      <li
                        key={valeur.id}
                        className="flex items-start gap-2 text-base font-medium text-[#094734]/80"
                      >
                        <Check
                          strokeWidth={2.5}
                          className="mt-1 h-4 w-4 shrink-0 text-[#00674F]"
                        />

                        <span>{valeur.titre}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="space-y-3">
                    {valeursCol2.map((valeur) => (
                      <li
                        key={valeur.id}
                        className="flex items-start gap-2 text-base font-medium text-[#094734]/80"
                      >
                        <Check
                          strokeWidth={2.5}
                          className="mt-1 h-4 w-4 shrink-0 text-[#00674F]"
                        />

                        <span>{valeur.titre}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}