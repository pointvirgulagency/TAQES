"use client";

import { useEffect, useRef, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { translations } from "@/i18n";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

const CLIENTS = [
  "B2C",
  "B2B",
  "Mixte",
];

const OPERATIONS = [
  "Développement foncier",
  "Promotion immobilière",
];

const STATUSES = [
  "Réalisé",
  "En cours d'autorisation",
];

const YEARS = Array.from(
  { length: new Date().getFullYear() - 1999 },
  (_, index) =>
    String(new Date().getFullYear() - index)
);

interface ProjectType {
  id?: number;
  titre?: string;
  client?: string;
  description?: string;
}

interface ProjectTerritoire {
  id?: number;
  nom?: string;
}

interface ProjectImage {
  url: string;
  alternativeText?: string | null;
}

interface Project {
  id: number;
  title: string;
  slug?: string;
  description?: string;
  reference?: string;
  localisation?: string;
  territoire?: ProjectTerritoire | null;
  statut?: string;
  type_operation?: string;
  public_cible?: string;
  annee?: string;
  type?: ProjectType[] | null;
  FeaturedImage?: ProjectImage | null;
}

interface ProjectFiltersProps {
  projects: Project[];
  typologies: Array<{
    titre: string;
    description?: string;
    client?: string;
    image?: {
      url: string;
      alternativeText?: string | null;
    };
  }>;
  territoires: Array<{
    id?: number;
    nom?: string;
  }>;
  locale: "fr" | "ar";
  initialTypologie?: string;
  initialStatut?: string;
  initialLocation?: string;
}

export default function ProjectFilters({
  projects = [],
  typologies = [],
  territoires = [],
  locale,
  initialTypologie = "",
  initialStatut = "",
  initialLocation = "",
}: ProjectFiltersProps) {
  const t = translations[locale];

  const [audience, setAudience] = useState("");
  const [selectedTypology, setSelectedTypology] =
    useState(initialTypologie);
  const [territoire, setTerritoire] =
    useState(initialLocation);
  const [status, setStatus] =
    useState(initialStatut);
  const [operation, setOperation] = useState("");
  const [year, setYear] = useState("");
  const [sort, setSort] = useState("recent");

  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTypologie =
      sessionStorage.getItem("selectedTypologie");

    if (savedTypologie) {
      setSelectedTypology(savedTypologie);
      sessionStorage.removeItem("selectedTypologie");

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);

      return;
    }

    if (
      initialTypologie ||
      initialStatut ||
      initialLocation
    ) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [
    initialTypologie,
    initialStatut,
    initialLocation,
  ]);

  const territoryOptions = territoires
    .map((territoire) => territoire.nom)
    .filter(
      (nom): nom is string => Boolean(nom)
    );

  const typologyOptions = typologies
    .map((typology) => typology.titre)
    .filter(
      (titre): titre is string => Boolean(titre)
    );

  const filteredProjects = projects
    .filter((project) => {
      const matchesClient =
        !audience ||
        project.public_cible === audience;

      const matchesTypology =
        !selectedTypology ||
        (Array.isArray(project.type) &&
          project.type.some(
            (item) =>
              item?.titre === selectedTypology
          ));

      const matchesTerritoire =
        !territoire ||
        project.territoire?.nom === territoire;

      const matchesStatus =
        !status ||
        project.statut === status;

      const matchesOperation =
        !operation ||
        project.type_operation === operation;

      const matchesYear =
        !year ||
        project.annee === year;

      return (
        matchesClient &&
        matchesTypology &&
        matchesTerritoire &&
        matchesStatus &&
        matchesOperation &&
        matchesYear
      );
    })
    .sort((a, b) => {
      if (sort === "name") {
        return a.title.localeCompare(b.title);
      }

      if (sort === "oldest") {
        return a.id - b.id;
      }

      return b.id - a.id;
    });

  function resetFilters() {
    setAudience("");
    setSelectedTypology("");
    setTerritoire("");
    setStatus("");
    setOperation("");
    setYear("");
    setSort("recent");
  }

  const resultText =
    filteredProjects.length === 1
      ? t.projects.filters.results.singular
      : t.projects.filters.results.plural;

  return (
    <section
      ref={resultsRef}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="bg-white px-6 py-20 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold text-[#094734] md:text-4xl">
            {t.projects.filters.title}
          </h2>

          <div className="mx-auto mt-3 h-px w-12 bg-[#C7A96B]" />
        </div>

        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#094734]/60">
              {t.projects.filters.typology.label}
            </h3>
          </div>

          {typologies.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {typologies.map((typology) => {
                const active =
                  selectedTypology === typology.titre;

                const imageUrl =
                  typology.image?.url
                    ? `${STRAPI_URL}${typology.image.url}`
                    : "";

                return (
                  <button
                    key={typology.titre}
                    type="button"
                    onClick={() =>
                      setSelectedTypology(
                        active
                          ? ""
                          : typology.titre
                      )
                    }
                    className={`group rounded-xl border p-3 text-center transition ${
                      active
                        ? "border-[#094734] bg-[#094734] text-white"
                        : "border-[#094734]/10 bg-white hover:-translate-y-1 hover:border-[#00674F]/40 hover:shadow-md"
                    }`}
                  >
                    <div className="mb-3 aspect-square overflow-hidden rounded-lg bg-[#EBE2DC]">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={
                            typology.image
                              ?.alternativeText ??
                            typology.titre
                          }
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className={`flex h-full items-center justify-center px-2 text-xs ${
                            active
                              ? "text-white/80"
                              : "text-[#094734]/50"
                          }`}
                        >
                          {typology.titre}
                        </div>
                      )}
                    </div>

                    <p
                      className={`min-h-[40px] text-xs font-medium ${
                        active
                          ? "text-white"
                          : "text-[#094734]"
                      }`}
                    >
                      {typology.titre}
                    </p>

                    <span
                      className={`mx-auto mt-2 flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                        active
                          ? "bg-white text-[#094734]"
                          : "bg-[#094734] text-white"
                      }`}
                    >
                      {locale === "ar"
                        ? "←"
                        : "→"}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-[#094734]/10 bg-[#EBE2DC]/30 px-6 py-8 text-center text-sm text-[#094734]/60">
              Aucune typologie disponible.
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-[#EBE2DC]/50 p-5 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <FilterSelect
              label="Territoire"
              value={territoire}
              onChange={setTerritoire}
              options={territoryOptions}
              placeholder="Tous les territoires"
              locale={locale}
            />

            <FilterSelect
              label="Client"
              value={audience}
              onChange={setAudience}
              options={CLIENTS}
              placeholder="Tous les clients"
              locale={locale}
            />

            <FilterSelect
              label="Typologie"
              value={selectedTypology}
              onChange={setSelectedTypology}
              options={typologyOptions}
              placeholder="Toutes les typologies"
              locale={locale}
            />

            <FilterSelect
              label="Type d'opération"
              value={operation}
              onChange={setOperation}
              options={OPERATIONS}
              placeholder="Toutes les opérations"
              locale={locale}
            />

            <FilterSelect
              label="Statut"
              value={status}
              onChange={setStatus}
              options={STATUSES}
              placeholder="Tous les statuts"
              locale={locale}
            />
          </div>

          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <FilterSelect
              label="Année"
              value={year}
              onChange={setYear}
              options={YEARS}
              placeholder="Toutes les années"
              locale={locale}
            />

            <button
              type="button"
              onClick={resetFilters}
              className="rounded-lg px-4 py-3 text-xs font-medium uppercase tracking-wide text-[#094734]/70 transition hover:text-[#094734]"
            >
              ↻ {t.projects.filters.reset}
            </button>
          </div>
        </div>

        <div className="mt-16">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-[#094734]">
              {filteredProjects.length}{" "}
              {resultText}
            </p>

            <div className="flex items-center gap-3">
              <label className="text-xs font-medium uppercase tracking-wide text-[#094734]/60">
                {t.projects.filters.sort.label}
              </label>

              <select
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value)
                }
                className="rounded-lg border border-[#094734]/10 bg-white px-4 py-2 text-sm text-[#094734] outline-none"
              >
                <option value="recent">
                  {t.projects.filters.sort.recent}
                </option>

                <option value="oldest">
                  {t.projects.filters.sort.oldest}
                </option>

                <option value="name">
                  {t.projects.filters.sort.name}
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
                    description={
                      project.description ?? ""
                    }
                    slug={project.slug ?? ""}
                    reference={project.reference}
                    typologie={
                      Array.isArray(project.type)
                        ? project.type[0]?.titre
                        : undefined
                    }
                    statut={project.statut}
                    typeOperation={
                      project.type_operation
                    }
                    publicCible={
                      project.public_cible
                    }
                    locale={locale}
                    imageUrl={
                      project.FeaturedImage?.url
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
                    {t.projects.filters.loadMore}

                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/40 transition group-hover:translate-x-1">
                      {locale === "ar"
                        ? "←"
                        : "→"}
                    </span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-xl bg-[#EBE2DC]/50 px-6 py-16 text-center">
              <p className="text-lg text-[#094734]/70">
                {t.projects.filters.noResults}
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
  options = [],
  placeholder,
  locale,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options?: string[];
  placeholder: string;
  locale?: "fr" | "ar";
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
        dir={locale === "ar" ? "rtl" : "ltr"}
        className="w-full appearance-none rounded-lg border-0 bg-white px-4 py-3 text-sm text-[#094734] outline-none ring-1 ring-[#094734]/5 focus:ring-2 focus:ring-[#00674F]/30"
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
