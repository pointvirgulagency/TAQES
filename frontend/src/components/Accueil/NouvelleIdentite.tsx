"use client";

import { Diamond } from "lucide-react";

interface Chiffre {
  id: number;
  valeur: string; // e.g. "15+", "XX"
  libelle: string; // e.g. "années d'expérience", "projets développés"
}

interface NouvelleIdentiteProps {
  data: {
    Titre: string;
    description: any; // string or Strapi rich-text blocks
    Image?: { url: string };
    libellebouton?: string | null;
    lien_boutton?: string | null;
    Chiffres?: Chiffre[];
  };
  strapiUrl: string;
}

// Handles plain strings as well as Strapi's Blocks rich-text array format.
function extractText(value: any): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    return value
      .map((block) =>
        (block?.children ?? []).map((child: any) => child.text ?? "").join("")
      )
      .join(" ")
      .trim();
  }
  return "";
}

export default function NouvelleIdentite({ data, strapiUrl }: NouvelleIdentiteProps) {
  const description = extractText(data.description);
  const chiffres = data.Chiffres ?? [];

  return (
    <section className="relative w-full overflow-hidden">
      {/* Full-bleed background image — "Foncière Alia" branding is already part of this asset */}
      {data.Image && (
        <img
          src={`${strapiUrl}${data.Image.url}`}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Light wash on the right side only, so overlaid text stays legible without
          covering the branded artwork baked into the left side of the image */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/90 lg:to-white/95" />
      {/* Dark fade at the bottom so the timeline row stays legible across the full width */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />

      <div className="relative z-10 flex min-h-[560px] flex-col justify-between px-6 py-10 md:px-10 lg:px-16">
        {/* Two-column area — content docked right, image visible on the left */}
        <div className="flex flex-1 items-center justify-end pt-10">
          <div className="w-full lg:w-1/2">
            <div className="mb-6 flex items-center gap-3">
              <Diamond className="h-7 w-7 text-[#00674F]" strokeWidth={1.5} />
              <span className="text-2xl font-semibold tracking-wide text-[#094734]">
                TAQÈS
              </span>
            </div>

            <h2 className="mb-5 text-3xl font-semibold leading-snug tracking-tight text-[#094734] md:text-4xl">
              {data.Titre}
            </h2>

            {description && (
              <p className="mb-8 text-base leading-relaxed text-gray-600">
                {description}
              </p>
            )}

            {data.libellebouton && (
              <a
                href={data.lien_boutton ?? "#"}
                className="inline-flex w-fit rounded-md bg-[#00674F] px-8 py-4 text-sm font-medium text-[#EBE2DC] transition hover:bg-[#449383]"
              >
                {data.libellebouton}
              </a>
            )}
          </div>
        </div>

        {/* Timeline — full width, sits at the bottom of the image, outside the two columns */}
        {chiffres.length > 0 && (
          <div className="relative pt-10">
            <div className="absolute left-0 right-0 top-10 h-px bg-white/25" />
            <div
              className="grid gap-6"
              style={{
                gridTemplateColumns: `repeat(${Math.min(chiffres.length, 4)}, minmax(0, 1fr))`,
              }}
            >
              {chiffres.map((c) => (
                <div key={c.id} className="flex flex-col items-start gap-4 text-left">
                  <span className="relative z-10 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-[var(--gold-accent,#C9A66B)] bg-[#0B1E3D]" />
                  <div>
                    <strong className="block text-3xl font-semibold text-[#EBE2DC] md:text-4xl">
                      {c.valeur}
                    </strong>
                    <span className="mt-1 block text-sm leading-6 text-[#EBE2DC]/75">
                      {c.libelle}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}