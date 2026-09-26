"use client";

import { useEffect, useRef, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { translations } from "@/i18n";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

const TYPES_BIEN = [
  "Lots de terrain",
  "Appartements & Commerces",
];

const STATUTS = [
  "À venir",
  "En cours de commercialisation",
  "Livré",
];

interface ProjectType {
  id?: number;
  titre?: string;
  description?: string;
  client?: string;
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
  profile?: string | string[];
  disponibilite?: string;
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

function normalize(value?: string | null) {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "'")
    .trim()
    .toLowerCase();
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

  const [selectedTypology, setSelectedTypology] =
    useState(initialTypologie);

  const [ville, setVille] = useState(initialLocation);

  const [typeBien, setTypeBien] = useState("");

  const [status, setStatus] = useState(initialStatut);

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

  const filteredProjects = projects.filter((project) => {
    const matchesTypology =
      !selectedTypology ||
      project.type?.some(
        (item) =>
          normalize(item?.titre) ===
          normalize(selectedTypology)
      );

    const matchesVille =
      !ville ||
      normalize(project.territoire?.nom) ===
        normalize(ville);

    const matchesTypeBien =
      !typeBien ||
      normalize(project.type_operation) ===
        normalize(typeBien);

    const matchesStatus =
      !status ||
      normalize(project.statut) ===
        normalize(status) ||
      normalize(project.disponibilite) ===
        normalize(status);

    return (
      matchesTypology &&
      matchesVille &&
      matchesTypeBien &&
      matchesStatus
    );
  });

  const villes = Array.from(
    new Set(
      territoires
        .map((item) => item.nom)
        .filter(
          (value): value is string =>
            Boolean(value)
        )
    )
  );

  function resetFilters() {
    setSelectedTypology("");
    setVille("");
    setTypeBien("");
    setStatus("");
  }

  return (
    <section
      ref={resultsRef}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="bg-[#F7F3EE] px-6 py-16 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* ===== Que recherchez-vous ? ===== */}
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-3xl font-semibold text-[#094734] md:text-4xl">
            {locale === "ar"
              ? "ماذا تبحث؟"
              : "Que recherchez-vous ?"}
          </h2>

          <p className="hidden text-right text-[10px] font-semibold uppercase tracking-[0.2em] text-[#094734]/40 md:block">
            {locale === "ar" ? (
              "مشاريع لكل إقليم"
            ) : (
              <>
                Des projets
                <br />
                pour chaque territoire
              </>
            )}
          </p>
        </div>

        {/* ===== Typology cards ===== */}
        {typologies.length > 0 ? (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
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
                  className={`group overflow-hidden rounded-lg border bg-white p-1.5 text-center transition ${
                    active
                      ? "border-[#0B7A4B] ring-2 ring-[#0B7A4B]/40"
                      : "border-[#094734]/10 hover:border-[#0B7A4B]/40"
                  }`}
                >
                  <div className="aspect-square overflow-hidden rounded-md">
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
                      <div className="flex h-full items-center justify-center bg-[#F7F3EE] px-1.5 text-center text-[9px] text-[#094734]/50">
                        {typology.titre}
                      </div>
                    )}
                  </div>

                  <p className="mt-1.5 pb-0.5 text-center text-[12px] font-medium text-[#0B7A4B]">
                    {typology.titre}
                  </p>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-[#094734]/10 bg-white px-6 py-8 text-center text-sm text-[#094734]/60">
            Aucune typologie disponible.
          </div>
        )}

        {/* ===== Filter bar ===== */}
        <div className="mt-10 grid items-end gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <FilterSelect
            label={
              locale === "ar"
                ? "المدينة"
                : "Ville"
            }
            value={ville}
            onChange={setVille}
            options={villes}
            placeholder={
              locale === "ar"
                ? "جميع المدن"
                : "Toutes"
            }
            locale={locale}
          />

          <FilterSelect
            label={
              locale === "ar"
                ? "نوع العقار"
                : "Type de bien"
            }
            value={typeBien}
            onChange={setTypeBien}
            options={TYPES_BIEN}
            placeholder={
              locale === "ar"
                ? "جميع الأنواع"
                : "Tous"
            }
            locale={locale}
          />

          <FilterSelect
            label={
              locale === "ar"
                ? "حالة المشروع"
                : "Statut du projet"
            }
            value={status}
            onChange={setStatus}
            options={STATUTS}
            placeholder={
              locale === "ar"
                ? "جميع الحالات"
                : "Tous"
            }
            locale={locale}
          />

          <button
            type="button"
            onClick={resetFilters}
            className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#094734] transition hover:text-[#0B7A4B]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#094734]/20 text-sm">
              ↻
            </span>

            {t.projects.filters.reset}
          </button>
        </div>

        {/* ===== Tous les projets ===== */}
        <div className="mt-20">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-[#094734] md:text-4xl">
                {locale === "ar"
                  ? "جميع المشاريع"
                  : "Tous les projets"}
              </h2>

              <div className="mt-3 h-px w-12 bg-[#C7A96B]" />
            </div>

            <p className="hidden text-right text-[10px] font-semibold uppercase tracking-[0.2em] text-[#094734]/40 md:block">
              {locale === "ar" ? (
                "أماكن، روابط، آفاق"
              ) : (
                <>
                  Des lieux, des liens,
                  <br />
                  des horizons
                </>
              )}
            </p>
          </div>

          <p className="mb-6 text-sm font-medium text-[#094734]">
            {filteredProjects.length}{" "}
            {filteredProjects.length === 1
              ? t.projects.filters.results.singular
              : t.projects.filters.results.plural}
          </p>

          {filteredProjects.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={
                    [
                      project.type?.[0]?.titre,
                      project.localisation,
                    ]
                      .filter(Boolean)
                      .join(" - ") ||
                    project.description ||
                    ""
                  }
                  slug={project.slug ?? ""}
                  reference={project.reference}
                  typologie={project.type_operation}
                  statut={project.statut}
                  typeOperation={project.type_operation}
                  publicCible={
                    Array.isArray(project.profile)
                      ? project.profile.join(", ")
                      : project.profile
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
          ) : (
            <div className="rounded-xl bg-white px-6 py-16 text-center">
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
  options,
  placeholder,
  locale,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  locale: "fr" | "ar";
}) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-[#094734]">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        dir={locale === "ar" ? "rtl" : "ltr"}
        className="w-full appearance-none rounded-lg border border-[#094734]/10 bg-white px-4 py-3 text-sm text-[#094734] outline-none transition focus:border-[#0B7A4B]/40 focus:ring-2 focus:ring-[#0B7A4B]/20"
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}