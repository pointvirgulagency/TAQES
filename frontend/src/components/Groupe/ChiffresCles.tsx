import { Globe2, Users, Building2, PercentCircle, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Chiffre {
  id: number;
  valeur: string;
  libelle: string;
  icone?: string;
}

interface ChiffresClesProps {
  data: Chiffre[];
}

// Fallback icon per stat when Strapi doesn't provide one, matched by keyword.
const ICONS: { match: RegExp; icon: LucideIcon }[] = [
  { match: /exp[ée]rience/i, icon: Globe2 },
  { match: /projet/i, icon: Users },
  { match: /bien|livr/i, icon: Building2 },
  { match: /commercialis|%/i, icon: PercentCircle },
  { match: /territoire|intervention/i, icon: MapPin },
];

function resolveIcon(libelle: string): LucideIcon {
  const found = ICONS.find(({ match }) => match.test(libelle));
  return found ? found.icon : Globe2;
}

export default function ChiffresCles({ data }: ChiffresClesProps) {
  return (
    <section className="border-y border-[#094734]/10 bg-[#EBE2DC]/30 px-6 py-16 md:px-10 md:py-20 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-3 lg:grid-cols-5 lg:gap-y-0">
          {data.map((chiffre, index) => {
            const Icon = resolveIcon(chiffre.libelle);

            return (
              <article
                key={chiffre.id}
                className={`flex flex-col items-center justify-center gap-4 px-6 text-center ${
                  index !== 0
                    ? "border-l border-[#094734]/10"
                    : ""
                }`}
              >
                <Icon
                  strokeWidth={1.25}
                  className="h-8 w-8 text-[#00674F]"
                />

                <strong className="font-serif text-4xl font-normal leading-none text-[#00674F] md:text-5xl">
                  {chiffre.valeur}
                </strong>

                <span className="max-w-[140px] text-[10px] uppercase leading-4 tracking-[0.12em] text-[#094734]/60">
                  {chiffre.libelle}
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}