"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

interface Chiffre {
  id: number;
  valeur: string;
  libelle: string;
  description?: any;
}

interface NouvelleIdentiteProps {
  data: {
    Titre: string;
    description: any;
    Image?: { url: string };
    LogoAlia?: { url: string };
    LogoTaqes?: { url: string };
    libellebouton?: string | null;
    lien_boutton?: string | null;
    Chiffres?: Chiffre[];
  };
  strapiUrl: string;
}

function extractText(value: any): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    return value
      .map((block) =>
        (block?.children ?? [])
          .map((child: any) => child?.text ?? "")
          .join("")
      )
      .join(" ")
      .trim();
  }
  return "";
}

export default function NouvelleIdentite({
  data,
  strapiUrl,
}: NouvelleIdentiteProps) {
  const params = useParams();
  const locale = typeof params?.locale === "string" ? params.locale : "fr";

  const chiffres = data.Chiffres ?? [];
  const description = extractText(data.description);

  const aliaLogo = data.LogoAlia
    ? `${strapiUrl}${data.LogoAlia.url}`
    : "/img.png";

  const taqesLogo = data.LogoTaqes
    ? `${strapiUrl}${data.LogoTaqes.url}`
    : "/taqesheader.png";

  const buttonLink = data.lien_boutton || `/${locale}/groupe`;

  return (
    <section className="relative w-full overflow-hidden bg-[#f1ece5]">
      {data.Image && (
        <>
          <img
            src={`${strapiUrl}${data.Image.url}`}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#f1ece5]/85" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 py-16 md:px-10 lg:px-16 lg:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#094734]/55">
              Notre histoire
            </p>

            <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-[#094734] md:text-5xl lg:text-6xl">
              De {data.Titre} à TAQÈS
            </h2>

            {description && (
              <p className="mt-5 max-w-lg text-sm leading-6 text-[#094734]/65 line-clamp-2 md:text-base">
                {description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-7 lg:pt-4">
            <img
              src={aliaLogo}
              alt="Foncière Alia"
              className="h-16 w-auto object-contain md:h-20 lg:h-24"
            />

            <span className="text-3xl font-light text-[#094734]/50">→</span>

            <img
              src={taqesLogo}
              alt="TAQÈS"
              className="h-16 w-auto object-contain md:h-20 lg:h-24"
            />
          </div>
        </div>

        {chiffres.length > 0 && (
          <div className="mt-12 lg:mt-14">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5 lg:gap-3">
              {chiffres.map((c) => {
                const itemDescription = extractText(c.description);

                return (
                  <div
                    key={c.id}
                    className="group relative min-h-[175px] cursor-default px-5 py-5 transition-all duration-300 hover:-translate-y-2 hover:bg-[#094734] hover:shadow-lg"
                  >
                    <div className="mb-5 h-3 w-3 rounded-full bg-[#094734]/50 transition-colors duration-300 group-hover:bg-white" />

                    <p className="font-serif text-2xl font-medium text-[#094734] transition-colors duration-300 group-hover:text-white">
                      {c.valeur}
                    </p>

                    <div className="mt-3 border-t border-[#094734]/15 pt-3 transition-colors duration-300 group-hover:border-white/20">
                      <p className="text-sm font-medium leading-6 text-[#094734] transition-colors duration-300 group-hover:text-white">
                        {c.libelle}
                      </p>

                      {itemDescription && (
                        <p className="mt-2 text-xs leading-5 text-[#094734]/60 transition-colors duration-300 group-hover:text-white/65">
                          {itemDescription}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {data.libellebouton && (
          <div className="mt-10 flex justify-center lg:mt-12">
            <Link
              href={buttonLink}
              className="inline-flex items-center gap-3 rounded-full bg-[#094734] px-7 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#07392a] hover:shadow-lg"
            >
              {data.libellebouton}
              <span className="text-lg leading-none">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}