"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  Building2,
  Layers3,
  Activity,
  Images,
  Play,
  ChevronLeft,
  ChevronRight,
  Pause,
} from "lucide-react";

interface StrapiMedia {
  url: string;
}

interface Projet {
  id: number;
  title: string;
  slug: string;

  FeaturedImage?: StrapiMedia;
  videos?: StrapiMedia[];
  gallery?: StrapiMedia[];

  reference?: string;
  statut?: string;
  type_operation?: string;
  public_cible?: string;

  description_courte?: string;
  description_complete?: unknown;

  localisation?: string;
  ville?: string;
  surface_terrain?: string | number;
  surface_develope?: string | number;
  nombre_lots?: string | number;
  annee?: string | number;
  coordonees?: string;
  brochure?: StrapiMedia;

  typologie?: string;
  type?: unknown;
}

interface ProjetsMisEnAvantProps {
  data: {
    titre: string;
    projects: Projet[];
  };
  strapiUrl: string;
  locale?: "fr" | "ar";
}

function stripMarkdown(value: string) {
  return value
    .replace(/[#*_`>~]/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/\n{2,}/g, " ")
    .replace(/\n/g, " ")
    .trim();
}

function getSecondaryCta(
  statut: string | undefined,
  isArabic: boolean
) {
  if (!statut) return null;

  const value = statut.toLowerCase().trim();

  if (
    value.includes("à venir") ||
    value.includes("a venir") ||
    value.includes("venir")
  ) {
    return isArabic
      ? "كن على اطلاع عند الإطلاق"
      : "Être informé du lancement";
  }

  if (value.includes("autorisation")) {
    return isArabic
      ? "تلقي المعلومات"
      : "Recevoir les informations";
  }

  if (
    value.includes("commercialisation") ||
    value.includes("commercialisé") ||
    value.includes("commercialise")
  ) {
    return isArabic
      ? "تلقي الكتيب"
      : "Recevoir la brochure";
  }

  if (
    value.includes("livré") ||
    value.includes("livre") ||
    value.includes("réalisé") ||
    value.includes("realise")
  ) {
    return isArabic
      ? "اكتشف الإنجاز"
      : "Découvrir la réalisation";
  }

  return null;
}

export default function ProjetsMisEnAvant({
  data,
  strapiUrl,
  locale,
}: ProjetsMisEnAvantProps) {
  const projects = data.projects ?? [];

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  const total = projects.length;

  const resolvedLocale = locale || "fr";
  const isArabic = resolvedLocale === "ar";

  const current = projects[index];

  useEffect(() => {
    if (!playing || total <= 1) return;

    const timer = setInterval(() => {
      setIndex((currentIndex) => (currentIndex + 1) % total);
    }, 6000);

    return () => clearInterval(timer);
  }, [playing, total]);

  if (!current) return null;

  const goPrev = () => {
    setIndex((currentIndex) => (currentIndex - 1 + total) % total);
  };

  const goNext = () => {
    setIndex((currentIndex) => (currentIndex + 1) % total);
  };

  const description = current.description_courte
    ? stripMarkdown(current.description_courte)
    : "";

  const galleryPreview = (current.gallery ?? []).slice(0, 4);

  const secondaryCta = getSecondaryCta(
    current.statut,
    isArabic
  );

  const projectUrl = `/${resolvedLocale}/projects/${current.slug}`;

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      {current.FeaturedImage && (
        <img
          src={`${strapiUrl}${current.FeaturedImage.url}`}
          alt={current.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-[var(--green-dark)]/95 via-[var(--green-dark)]/60 to-[var(--green-dark)]/15" />

      <div className="absolute inset-0 bg-gradient-to-t from-[var(--green-dark)]/80 via-transparent to-transparent" />

      <div className="relative flex min-h-[100svh] flex-col justify-between px-6 pb-8 pt-32 md:px-10 md:pb-10 md:pt-36 lg:px-16">
        <div className="max-w-4xl">
          {/* SURTITRE */}
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--gold-accent)]">
            {data.titre ||
              (isArabic ? "مشروع مميز" : "Projet à la une")}
          </p>

          {/* TITRE */}
          <h2 className="text-5xl font-semibold leading-[0.98] tracking-tight text-[var(--beige-light)] md:text-6xl lg:text-8xl">
            {current.title}
          </h2>

          {/* SOUS-TITRE */}
          {current.typologie && (
            <p className="mt-4 text-2xl font-light leading-tight text-[var(--beige-light)]/80 md:text-3xl">
              {current.typologie}
            </p>
          )}

          {/* DESCRIPTION COURTE */}
          {description && (
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-[var(--beige-light)]/85 md:text-lg">
              {description}
            </p>
          )}

          {/* INFORMATIONS */}
          <div className="mt-8 grid max-w-4xl grid-cols-1 gap-x-12 gap-y-5 sm:grid-cols-2">
            {current.localisation && (
              <div className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-[var(--gold-accent)]"
                  strokeWidth={1.5}
                />

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--beige-light)]/50">
                    {isArabic ? "الموقع" : "Localisation"}
                  </p>

                  <p className="mt-1 text-base text-[var(--beige-light)]">
                    {current.localisation}
                  </p>
                </div>
              </div>
            )}

            {current.type_operation && (
              <div className="flex items-start gap-3">
                <Building2
                  className="mt-0.5 h-5 w-5 shrink-0 text-[var(--gold-accent)]"
                  strokeWidth={1.5}
                />

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--beige-light)]/50">
                    {isArabic
                      ? "طبيعة المشروع"
                      : "Nature du projet"}
                  </p>

                  <p className="mt-1 text-base text-[var(--beige-light)]">
                    {current.type_operation}
                  </p>
                </div>
              </div>
            )}

            {current.typologie && (
              <div className="flex items-start gap-3">
                <Layers3
                  className="mt-0.5 h-5 w-5 shrink-0 text-[var(--gold-accent)]"
                  strokeWidth={1.5}
                />

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--beige-light)]/50">
                    {isArabic ? "التصنيف" : "Typologie"}
                  </p>

                  <p className="mt-1 text-base text-[var(--beige-light)]">
                    {current.typologie}
                  </p>
                </div>
              </div>
            )}

            {current.statut && (
              <div className="flex items-start gap-3">
                <Activity
                  className="mt-0.5 h-5 w-5 shrink-0 text-[var(--gold-accent)]"
                  strokeWidth={1.5}
                />

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--beige-light)]/50">
                    {isArabic ? "الحالة" : "Statut"}
                  </p>

                  <p className="mt-1 text-base text-[var(--beige-light)]">
                    {current.statut}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={projectUrl}
              className="btn-gold group inline-flex items-center gap-3 rounded-md px-7 py-3.5 text-base font-medium"
            >
              <span>
                {isArabic
                  ? "اكتشف المشروع"
                  : "Découvrir le projet"}
              </span>

              <span
                className={`transition-transform duration-300 ${
                  isArabic
                    ? "group-hover:-translate-x-1"
                    : "group-hover:translate-x-1"
                }`}
              >
                {isArabic ? "←" : "→"}
              </span>
            </a>

            {secondaryCta && (
              <button
                type="button"
                className="btn-outline-light rounded-md px-7 py-3.5 text-base font-medium"
              >
                {secondaryCta}
              </button>
            )}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            {(galleryPreview.length > 0 ||
              (current.videos?.length ?? 0) > 0) && (
              <div className="flex items-center gap-3">
                {galleryPreview.map((img, i) => (
                  <img
                    key={i}
                    src={`${strapiUrl}${img.url}`}
                    alt=""
                    className="h-14 w-14 rounded-md object-cover ring-1 ring-[var(--beige-light)]/25 md:h-16 md:w-16"
                  />
                ))}

                {(current.videos?.length ?? 0) > 0 && (
                  <button
                    type="button"
                    aria-label={
                      isArabic
                        ? "عرض فيديو المشروع"
                        : "Voir la vidéo du projet"
                    }
                    className="flex h-14 w-14 items-center justify-center rounded-md bg-[var(--beige-light)]/10 ring-1 ring-[var(--beige-light)]/25 transition hover:bg-[var(--beige-light)]/20 md:h-16 md:w-16"
                  >
                    <Play
                      className="h-5 w-5 text-[var(--beige-light)]"
                      fill="currentColor"
                    />
                  </button>
                )}

                <div className="ml-2 flex items-center gap-2">
                  <Images className="h-4 w-4 text-[var(--gold-accent)]" />

                  <span className="text-xs uppercase tracking-[0.18em] text-[var(--beige-light)]/60">
                    {isArabic
                      ? "استعرض المشاريع"
                      : "Parcourir les projets"}
                  </span>
                </div>
              </div>
            )}

            {/* VISUAL MENTION */}
            <p className="mt-3 text-[10px] uppercase tracking-[0.12em] text-[var(--beige-light)]/45">
              {isArabic
                ? "تصور مفاهيمي غير تعاقدي"
                : "Visualisation conceptuelle non contractuelle"}
            </p>
          </div>

          {/* PROJECT NAVIGATION */}
          {total > 1 && (
            <div className="flex items-center gap-4 self-start md:self-end">
              <button
                type="button"
                onClick={goPrev}
                aria-label={
                  isArabic
                    ? "المشروع السابق"
                    : "Projet précédent"
                }
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--beige-light)]/40 text-[var(--beige-light)] transition hover:bg-[var(--beige-light)]/10"
              >
                <ChevronLeft
                  className={`h-4 w-4 ${
                    isArabic ? "rotate-180" : ""
                  }`}
                />
              </button>

              <span className="text-xs tabular-nums tracking-widest text-[var(--beige-light)]/80">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </span>

              <button
                type="button"
                onClick={goNext}
                aria-label={
                  isArabic
                    ? "المشروع التالي"
                    : "Projet suivant"
                }
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--beige-light)]/40 text-[var(--beige-light)] transition hover:bg-[var(--beige-light)]/10"
              >
                <ChevronRight
                  className={`h-4 w-4 ${
                    isArabic ? "rotate-180" : ""
                  }`}
                />
              </button>

              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                aria-label={
                  playing
                    ? isArabic
                      ? "إيقاف مؤقت"
                      : "Mettre en pause"
                    : isArabic
                      ? "تشغيل التمرير"
                      : "Lancer le défilement"
                }
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--beige-light)]/40 text-[var(--beige-light)] transition hover:bg-[var(--beige-light)]/10"
              >
                {playing ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}