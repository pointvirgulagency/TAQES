"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

const TerritoiresMap = dynamic(() => import("./TerritoiresMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full min-h-[560px] w-full bg-[#EBE2DC]" />
  ),
});

interface Territoire {
  id?: number;
  documentId?: string;
  nom?: string;
  slug?: string;
  description?: unknown;
  latitude?: number;
  longitude?: number;
  date?: string;
  image?: {
    url: string;
    formats?: {
      thumbnail?: {
        url: string;
      };
    };
  };
  projects?: unknown[];
}

interface TerritoiresProps {
  data?: Territoire[];
  titre?: string;
  descriptionTerritoires?: string;
}

export default function Territoires({
  data = [],
  titre,
  descriptionTerritoires,
}: TerritoiresProps) {
  const params = useParams();
  const locale = params.locale === "ar" ? "ar" : "fr";

  const territoires = Array.isArray(data) ? data : [];
  const [selectedTerritoire, setSelectedTerritoire] =
    useState<Territoire | null>(null);

  useEffect(() => {
    if (territoires.length === 0) {
      setSelectedTerritoire(null);
      return;
    }

    setSelectedTerritoire((current) => {
      if (!current) return territoires[0];

      const stillExists = territoires.some(
        (territoire) =>
          territoire.documentId === current.documentId ||
          territoire.id === current.id
      );

      return stillExists ? current : territoires[0];
    });
  }, [territoires]);

  if (territoires.length === 0) {
    return (
      <section className="flex min-h-[500px] items-center justify-center bg-[#EBE2DC] px-6 py-20">
        <p className="text-lg text-[#094734]/60">
          Aucun territoire disponible.
        </p>
      </section>
    );
  }

  const projectCount = Array.isArray(selectedTerritoire?.projects)
    ? selectedTerritoire.projects.length
    : null;

  const projectsUrl = `/${locale}/projects`;

  const selectedCityUrl = selectedTerritoire?.nom
    ? `/${locale}/projects?city=${encodeURIComponent(
        selectedTerritoire.nom
      )}`
    : projectsUrl;

  return (
    <section className="relative overflow-hidden bg-[#EBE2DC] px-6 py-20 md:px-10 lg:px-16 lg:py-28 xl:px-20">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-10 lg:grid-cols-[420px_1fr] lg:items-start">
          <div className="flex flex-col">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#00674F]" />
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#00674F]">
                NOS PROJETS SUR LA CARTE
              </p>
            </div>

            <h2 className="text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-[#094734] md:text-5xl">
              {titre}
            </h2>

            <p className="mt-6 max-w-sm text-base leading-7 text-[#094734]/65">
              {descriptionTerritoires}
            </p>

            <p className="mt-4 max-w-sm text-sm leading-6 text-[#094734]/45">
              Sélectionnez une localisation sur la carte pour explorer les projets
              correspondants.
            </p>

            <Link
              href={projectsUrl}
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#094734] px-6 py-3 text-sm font-medium text-[#F4F0E8] transition hover:bg-[#00674F]"
            >
              Voir tous les projets
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            {selectedTerritoire && (
              <div className="mt-12 border-t border-[#094734]/15 pt-6">
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#00674F]/25 bg-[#00674F]/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#00674F]">
                  <MapPin className="h-3 w-3" />
                  Localisation sélectionnée
                </div>

                <h3 className="text-2xl font-medium tracking-[-0.02em] text-[#094734]">
                  {selectedTerritoire.nom}
                </h3>

                <p className="mt-1.5 text-sm text-[#094734]/55">
                  {projectCount !== null
                    ? `${projectCount} projet${
                        projectCount > 1 ? "s" : ""
                      } associé${projectCount > 1 ? "s" : ""}`
                    : "Découvrez les projets associés à ce territoire."}
                </p>

                <Link
                  href={selectedCityUrl}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#00674F] underline decoration-[#00674F]/30 underline-offset-4 transition hover:text-[#094734] hover:decoration-[#094734]/40"
                >
                  Voir les projets à {selectedTerritoire.nom}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </div>

          <div className="relative min-h-[560px] overflow-hidden bg-[#D8D3C9]">
            <TerritoiresMap
              territoires={territoires}
              selectedTerritoire={selectedTerritoire}
              onSelectTerritoire={setSelectedTerritoire}
            />
          </div>
        </div>
      </div>
    </section>
  );
}