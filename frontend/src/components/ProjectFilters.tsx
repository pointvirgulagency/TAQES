"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { translations } from "@/i18n";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

interface ProjectType {
  id?: number;
  titre?: string;
  client?: string;
  description?: string;
}

interface ProjectVille {
  id?: number;
  ville?: string;
}

interface ProjectImage {
  url: string;
  alternativeText?: string;
}

interface Project {
  id: number;
  title: string;
  slug?: string;
  description?: string;
  reference?: string;
  localisation?: string;
  ville?: ProjectVille | null;
  statut?: string;
  type_operation?: string;
  public_cible?: string;
  annee?: string;
  type?: ProjectType[] | null;
  FeaturedImage?: ProjectImage | null;
}

interface ProjectFiltersProps {
  projects: Project[];
  locale: "fr" | "ar";
  initialTypologie?: string;
  initialStatut?: string;
  initialLocation?: string;
}

export default function ProjectFilters({
  projects = [],
  locale,
  initialTypologie = "",
  initialStatut = "",
  initialLocation = "",
}: ProjectFiltersProps) {
  const t = translations[locale];

  const [audience, setAudience] =
    useState<"B2C" | "B2B">("B2C");

  const [selectedTypology, setSelectedTypology] =
    useState(initialTypologie);

  const [location, setLocation] =
    useState(initialLocation);

  const [status, setStatus] =
    useState(initialStatut);

  const [operation, setOperation] =
    useState("");

  const [year, setYear] =
    useState("");

  const [sort, setSort] =
    useState("recent");

  const resultsRef =
    useRef<HTMLDivElement>(null);

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

  const typologies = useMemo(() => {
    const values = projects.flatMap((project) =>
      Array.isArray(project.type)
        ? project.type
            .map((item) => item?.titre)
            .filter(
              (value): value is string =>
                typeof value === "string" &&
                value.trim().length > 0
            )
        : []
    );

    return Array.from(new Set(values));
  }, [projects]);

  const locations = useMemo(() => {
    const values = projects
      .map((project) => project.ville?.ville)
      .filter(
        (value): value is string =>
          typeof value === "string" &&
          value.trim().length > 0
      );

    return Array.from(new Set(values));
  }, [projects]);

  const statuses = useMemo(() => {
    const values = projects
      .map((project) => project.statut)
      .filter(
        (value): value is string =>
          typeof value === "string" &&
          value.trim().length > 0
      );

    return Array.from(new Set(values));
  }, [projects]);

  const operations = useMemo(() => {
    const values = projects
      .map((project) => project.type_operation)
      .filter(
        (value): value is string =>
          typeof value === "string" &&
          value.trim().length > 0
      );

    return Array.from(new Set(values));
  }, [projects]);

  const years = useMemo(() => {
    const values = projects
      .map((project) => project.annee)
      .filter(
        (value): value is string =>
          typeof value === "string" &&
          value.trim().length > 0
      );

    return Array.from(new Set(values)).sort(
      (a, b) => Number(b) - Number(a)
    );
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      const matchesAudience =
        !project.public_cible ||
        audience === "B2C"
          ? project.public_cible === "B2C" ||
            project.public_cible === "Mixte"
          : project.public_cible === "B2B" ||
            project.public_cible === "Mixte";

      const matchesTypology =
        !selectedTypology ||
        (Array.isArray(project.type) &&
          project.type.some(
            (item) =>
              item?.titre === selectedTypology
          ));

      const matchesLocation =
        !location ||
        project.ville?.ville === location;

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
        matchesAudience &&
        matchesTypology &&
        matchesLocation &&
        matchesStatus &&
        matchesOperation &&
        matchesYear
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
    operation,
    year,
    sort,
  ]);

  function resetFilters() {
    setAudience("B2C");
    setSelectedTypology("");
    setLocation("");
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
            <span>
              {t.projects.filters.audience.individual}
            </span>
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
            <span>
              {t.projects.filters.audience.professional}
            </span>
          </button>
        </div>

        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[#094734]/60">
              {t.projects.filters.typology.label}
            </h3>
          </div>

          {typologies.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
              {typologies.map((typology) => {
                const active =
                  selectedTypology === typology;

                return (
                  <button
                    key={typology}
                    type="button"
                    onClick={() =>
                      setSelectedTypology(
                        active ? "" : typology
                      )
                    }
                    className={`group rounded-xl border p-3 text-center transition ${
                      active
                        ? "border-[#094734] bg-[#094734] text-white"
                        : "border-[#094734]/10 bg-white hover:-translate-y-1 hover:border-[#00674F]/40 hover:shadow-md"
                    }`}
                  >
                    <div className="mb-3 aspect-square overflow-hidden rounded-lg bg-[#EBE2DC]">
                      <div className="flex h-full items-center justify-center px-2 text-xs text-[#094734]/50">
                        {typology}
                      </div>
                    </div>

                    <p
                      className={`min-h-[40px] text-xs font-medium ${
                        active
                          ? "text-white"
                          : "text-[#094734]"
                      }`}
                    >
                      {typology}
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
              label={t.projects.filters.location.label}
              value={location}
              onChange={setLocation}
              options={locations}
              placeholder={
                t.projects.filters.location.placeholder
              }
              locale={locale}
            />

            <FilterSelect
              label={t.projects.filters.typology.label}
              value={selectedTypology}
              onChange={setSelectedTypology}
              options={typologies}
              placeholder={
                t.projects.filters.typology.placeholder
              }
              locale={locale}
            />

            <FilterSelect
              label={t.projects.filters.status.label}
              value={status}
              onChange={setStatus}
              options={statuses}
              placeholder={t.projects.filters.status.placeholder}
              locale={locale}
            />

            <FilterSelect
              label="Type d'opération"
              value={operation}
              onChange={setOperation}
              options={operations}
              placeholder="Toutes les opérations"
              locale={locale}
            />

            <FilterSelect
              label="Année"
              value={year}
              onChange={setYear}
              options={years}
              placeholder="Toutes les années"
              locale={locale}
            />
          </div>

          <div className="mt-4 flex justify-end">
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
              {filteredProjects.length} {resultText}
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
                {filteredProjects.map((project) => {
                  console.log(
                    "PROJECT CARD DATA:",
                    project
                  );

                  return (
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
                  );
                })}
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

        {Array.isArray(options) &&
          options
            .filter(
              (option) =>
                typeof option === "string" &&
                option.trim().length > 0
            )
            .map((option) => (
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