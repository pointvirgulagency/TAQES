"use client";

import { useMemo, useState } from "react";
import ProjectCard from "@/components/ProjectCard";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;

interface Project {
  id: number;
  title: string;
  slug?: string;
  description: string;
  reference?: string;
  typologie?: string;
  statut?: string;
  type_operation?: string;
  public_cible?: string;
  FeaturedImage?: {
    url: string;
    alternativeText?: string;
  };
}

interface ProjectFiltersProps {
  projects: Project[];
  locale: "fr" | "ar";
}

const typologies = [
  { label: "Foncier", value: "Foncier" },
  { label: "Appartements", value: "Appartements" },
  { label: "Villas", value: "Villas" },
  { label: "Lots R+3", value: "Lots R+3" },
  { label: "Lots R+4", value: "Lots R+4" },
  { label: "Lots Villas", value: "Lots Villas" },
  { label: "Mixte ou tertiaire", value: "Mixte-Tertiaire" },
  { label: "Investissement", value: "Investissement" },
];

export default function ProjectFilters({
  projects,
  locale,
}: ProjectFiltersProps) {
  const [audience, setAudience] = useState<"B2C" | "B2B">("B2C");
  const [selectedTypology, setSelectedTypology] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [availability, setAvailability] = useState("");
  const [sort, setSort] = useState("recent");

  const locations = useMemo(
    () =>
      Array.from(
        new Set(
          projects
            .map((project) => project.reference)
            .filter(Boolean)
        )
      ) as string[],
    [projects]
  );

  const statuses = useMemo(
    () =>
      Array.from(
        new Set(
          projects
            .map((project) => project.statut)
            .filter(Boolean)
        )
      ) as string[],
    [projects]
  );

  const filteredProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      const matchesAudience =
        audience === "B2C"
          ? project.public_cible === "B2C" ||
            project.public_cible === "Mixte"
          : project.public_cible === "B2B" ||
            project.public_cible === "Mixte";

      const matchesTypology =
        !selectedTypology ||
        project.typologie === selectedTypology;

      const matchesLocation =
        !location ||
        project.reference === location;

      const matchesStatus =
        !status ||
        project.statut === status;

      return (
        matchesAudience &&
        matchesTypology &&
        matchesLocation &&
        matchesStatus
      );
    });

    return [...filtered].sort((a, b) => {
      if (sort === "name") {
        return a.title.localeCompare(b.title);
      }

      if (sort === "oldest") {
        return a.id - b.id;
      }

      return b.id - a.id;
    });
  }, [
    projects,
    audience,
    selectedTypology,
    location,
    status,
    sort,
  ]);

  function resetFilters() {
    setAudience("B2C");
    setSelectedTypology("");
    setLocation("");
    setStatus("");
    setAvailability("");
    setSort("recent");
  }

  return (
    <section className="bg-white px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* Title */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold text-[#094734] md:text-4xl">
            Que recherchez-vous ?
          </h2>

          <div className="mx-auto mt-3 h-px w-12 bg-[#C7A96B]" />
        </div>

        {/* Audience */}
        <div className="mb-8 grid grid-cols-2 overflow-hidden rounded-xl border border-[#094734]/10">
          <button
            type="button"
            onClick={() => setAudience("B2C")}
            className={`flex items-center justify-center gap-3 px-6 py-5 text-sm font-medium transition ${
              audience === "B2C"
                ? "bg-[#094734] text-white"
                : "bg-white text-[#094734] hover:bg-[#EBE2DC]/40"
            }`}
          >
            <span>♟</span>
            <span>VOUS ÊTES PARTICULIER</span>
          </button>

          <button
            type="button"
            onClick={() => setAudience("B2B")}
            className={`flex items-center justify-center gap-3 px-6 py-5 text-sm font-medium transition ${
              audience === "B2B"
                ? "bg-[#094734] text-white"
                : "bg-white text-[#094734] hover:bg-[#EBE2DC]/40"
            }`}
          >
            <span>▣</span>
            <span>VOUS ÊTES INVESTISSEUR / PROFESSIONNEL</span>
          </button>
        </div>

        {/* Typologies */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {typologies.map((typology) => {
            const active =
              selectedTypology === typology.value;

            return (
              <button
                key={typology.value}
                type="button"
                onClick={() =>
                  setSelectedTypology(
                    active ? "" : typology.value
                  )
                }
                className={`group rounded-xl border p-3 text-center transition ${
                  active
                    ? "border-[#094734] bg-[#094734] text-white"
                    : "border-[#094734]/10 bg-white hover:-translate-y-1 hover:border-[#00674F]/40 hover:shadow-md"
                }`}
              >
                <div className="mb-3 aspect-square overflow-hidden rounded-lg bg-[#EBE2DC]">
                  <div className="flex h-full items-center justify-center text-xs text-[#094734]/50">
                    Image
                  </div>
                </div>

                <p
                  className={`min-h-[40px] text-xs font-medium ${
                    active
                      ? "text-white"
                      : "text-[#094734]"
                  }`}
                >
                  {typology.label}
                </p>

                <span
                  className={`mx-auto mt-2 flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                    active
                      ? "bg-white text-[#094734]"
                      : "bg-[#094734] text-white"
                  }`}
                >
                  →
                </span>
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <div className="mt-8 rounded-2xl bg-[#EBE2DC]/50 p-5 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">

            <FilterSelect
              label="LOCALISATION"
              value={location}
              onChange={setLocation}
              options={locations}
              placeholder="Toutes les villes"
            />

            <FilterSelect
              label="TYPOLOGIE"
              value={selectedTypology}
              onChange={setSelectedTypology}
              options={typologies.map(
                (typology) => typology.value
              )}
              placeholder="Toutes les typologies"
            />

            <FilterSelect
              label="STATUT"
              value={status}
              onChange={setStatus}
              options={statuses}
              placeholder="Tous les statuts"
            />

            <FilterSelect
              label="DISPONIBILITÉ"
              value={availability}
              onChange={setAvailability}
              options={[
                "Disponible",
                "En cours",
                "Indisponible",
              ]}
              placeholder="Disponible"
            />

            <div className="flex items-end gap-3">
              <button
                type="button"
                onClick={resetFilters}
                className="flex-1 px-3 py-3 text-xs font-medium uppercase tracking-wide text-[#094734]/70 transition hover:text-[#094734]"
              >
                ↻ Réinitialiser
              </button>

              <button
                type="button"
                className="flex-1 rounded-lg bg-[#094734] px-4 py-3 text-xs font-medium uppercase tracking-wide text-white transition hover:bg-[#00674F]"
              >
                Filtrer
              </button>
            </div>

          </div>
        </div>

        {/* Results */}
        <div className="mt-16">

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-sm font-medium text-[#094734]">
              {filteredProjects.length} projets trouvés
            </p>

            <div className="flex items-center gap-3">
              <label className="text-xs font-medium uppercase tracking-wide text-[#094734]/60">
                Trier par :
              </label>

              <select
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value)
                }
                className="rounded-lg border border-[#094734]/10 bg-white px-4 py-2 text-sm text-[#094734] outline-none"
              >
                <option value="recent">
                  Les plus récents
                </option>

                <option value="oldest">
                  Les plus anciens
                </option>

                <option value="name">
                  Nom du projet
                </option>
              </select>
            </div>

          </div>

          {filteredProjects.length > 0 ? (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    title={project.title}
                    description={project.description}
                    slug={project.slug}
                    reference={project.reference}
                    typologie={project.typologie}
                    statut={project.statut}
                    typeOperation={project.type_operation}
                    publicCible={project.public_cible}
                    locale={locale}
                    imageUrl={
                      project.FeaturedImage
                        ? `${STRAPI_URL}${project.FeaturedImage.url}`
                        : ""
                    }
                  />
                ))}
              </div>

              {filteredProjects.length > 8 && (
                <div className="mt-12 flex justify-center">
                  <button
                    type="button"
                    className="group flex items-center gap-4 rounded-full bg-[#094734] px-8 py-3 text-sm font-medium uppercase tracking-wide text-white transition hover:bg-[#00674F]"
                  >
                    Voir plus de projets

                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/40 transition group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-xl bg-[#EBE2DC]/50 px-6 py-16 text-center">
              <p className="text-lg text-[#094734]/70">
                Aucun projet ne correspond à vos critères.
              </p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-[#094734]/60">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full appearance-none rounded-lg border-0 bg-white px-4 py-3 text-sm text-[#094734] outline-none ring-1 ring-[#094734]/5 focus:ring-2 focus:ring-[#00674F]/30"
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}