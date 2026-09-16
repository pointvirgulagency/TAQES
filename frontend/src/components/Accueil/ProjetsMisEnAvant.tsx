"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StrapiMedia {
  url: string;
  alternativeText?: string | null;
}

interface Territoire {
  id?: number;
  nom?: string;
  latitude?: string;
  longitude?: string;
}

interface Typologie {
  id?: number;
  titre?: string;
}

interface Projet {
  id: number;
  title: string;
  slug: string;
  FeaturedImage?: StrapiMedia;
  statut?: string;
  type_operation?: string;
  description_courte?: string;
  territoire?: Territoire;
  type?: Typologie[];
  cta_b2c?: string;
  cta_b2b?: string;
  mention?: unknown;
  publier?: boolean;
}

interface ProjetsMisEnAvantProps {
  data: {
    titre?: string;
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

function getMention(value: unknown): string {
  if (!Array.isArray(value)) return "";

  return value
    .map((block) => {
      if (!block || typeof block !== "object") return "";

      const children =
        "children" in block && Array.isArray(block.children)
          ? block.children
          : [];

      return children
        .map((child) =>
          child &&
          typeof child === "object" &&
          "text" in child &&
          typeof child.text === "string"
            ? child.text
            : ""
        )
        .join("");
    })
    .join(" ")
    .trim();
}

export default function ProjetsMisEnAvant({
  data,
  strapiUrl,
  locale = "fr",
}: ProjetsMisEnAvantProps) {
  const projects = (data.projects ?? []).filter(
    (project) => project.publier !== false
  );

  const [index, setIndex] = useState(0);

  const total = projects.length;
  const isArabic = locale === "ar";
  const current = projects[index];

  useEffect(() => {
    if (index >= total && total > 0) {
      setIndex(0);
    }
  }, [index, total]);

  if (!current) return null;

  const description = current.description_courte
    ? stripMarkdown(current.description_courte)
    : "";

  const typologie =
    current.type?.find((item) => item.titre)?.titre || "";

  const territoireName = current.territoire?.nom || "";
  const mention = getMention(current.mention);

  const projectDetailUrl = `/${locale}/projects/${current.slug}`;

  const tags = [
    territoireName,
    current.type_operation,
    typologie,
    current.statut,
  ].filter(Boolean);

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="relative min-h-[85vh] w-full overflow-hidden bg-[#062c20]"
    >
      {/* Background Image */}
      {current.FeaturedImage && (
        <img
          src={`${strapiUrl}${current.FeaturedImage.url}`}
          alt={
            current.FeaturedImage.alternativeText || current.title
          }
          className="absolute inset-0 h-full w-full object-cover object-right"
        />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#062c20] via-[#062c20]/85 via-50% to-transparent" />

      {/* Main Container */}
      <div className="relative flex min-h-[85vh] flex-col justify-between px-8 pb-10 pt-28 md:px-16 lg:px-24">
        {/* Content Section */}
        <div className="max-w-2xl text-white">
          {/* Subtitle Badge */}
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.25em] text-[#d6be96]">
            <span>
              —{" "}
              {data.titre ||
                (isArabic ? "مشروع مميز" : "PROJET À LA UNE")}
            </span>

            {total > 1 && (
              <span className="font-light text-white/50">
                {String(index + 1).padStart(2, "0")}/
                {String(total).padStart(2, "0")}
              </span>
            )}
          </div>

          {/* Main Title */}
          <h1 className="mt-6 font-serif text-5xl font-normal leading-[1.1] text-white md:text-6xl lg:text-7xl">
            {current.title}
          </h1>

          {/* Description Paragraph */}
          {description && (
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/90 md:text-lg">
              {description}
            </p>
          )}

          {/* Bulleted Tags */}
          {tags.length > 0 && (
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-medium text-white/90 md:text-base">
              {tags.map((tag, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#d6be96]" />
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={projectDetailUrl}
              className="inline-flex items-center gap-3 rounded-sm bg-[#d6be96] px-8 py-4 text-sm font-semibold tracking-wider text-[#062c20] transition-colors hover:bg-[#c4ab83]"
            >
              <span>
                {isArabic
                  ? "اكتشف المشروع"
                  : "Découvrir le projet"}
              </span>
              <span className="text-base">→</span>
            </Link>

            <button
              type="button"
              className="inline-flex items-center gap-3 rounded-sm border border-white/50 bg-transparent px-8 py-4 text-sm font-semibold tracking-wider text-white backdrop-blur-xs transition-colors hover:bg-white/10"
            >
              <span>
                {isArabic
                  ? "كن مطلعاً"
                  : "Être informé du lancement"}
              </span>
              <span className="text-base">→</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar Navigation */}
        <div className="mt-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">
              {isArabic ? "تصفح المشاريع" : "PARCOURIR LES PROJETS"}
            </span>

            {total > 1 && (
              <div className="flex items-center gap-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={`h-[2px] transition-all duration-300 ${
                      i === index
                        ? "w-20 bg-white"
                        : "w-10 bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            {total > 1 && (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setIndex(
                      (currentIndex) =>
                        (currentIndex - 1 + total) % total
                    )
                  }
                  aria-label="Previous"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white/10"
                >
                  <ChevronLeft
                    className={`h-5 w-5 ${
                      isArabic ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setIndex(
                      (currentIndex) =>
                        (currentIndex + 1) % total
                    )
                  }
                  aria-label="Next"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d6be96] text-[#062c20] transition hover:bg-[#c4ab83]"
                >
                  <ChevronRight
                    className={`h-5 w-5 ${
                      isArabic ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            )}

            <p className="text-xs tracking-wide text-white/50">
              {mention ||
                "Visualisation conceptuelle non contractuelle"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}