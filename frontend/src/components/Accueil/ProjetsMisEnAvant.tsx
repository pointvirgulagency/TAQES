"use client";

import { useEffect, useState } from "react";
import {
  Tag,
  Activity,
  Repeat,
  Users,
  Hash,
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
  description?: string; // rich text / markdown
  FeaturedImage?: StrapiMedia;
  gallery?: StrapiMedia[];
  videos?: StrapiMedia[];
  reference?: string;
  typologie?: string;
  statut?: string;
  type_operation?: string;
  public_cible?: string;
}

interface ProjetsMisEnAvantProps {
  data: {
    titre: string;
    projects: Projet[];
  };
  strapiUrl: string;
}

// Strip basic markdown syntax so the rich-text description reads cleanly as plain text in the hero.
function stripMarkdown(md: string) {
  return md
    .replace(/[#*_`>~]/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/\n{2,}/g, " ")
    .replace(/\n/g, " ")
    .trim();
}

export default function ProjetsMisEnAvant({
  data,
  strapiUrl,
}: ProjetsMisEnAvantProps) {
  const projects = data.projects ?? [];
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  const total = projects.length;
  const current = projects[index];

  useEffect(() => {
    if (!playing || total <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 6000);
    return () => clearInterval(t);
  }, [playing, total]);

  if (!current) return null;

  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  const badges = [
    current.typologie && { icon: Tag, label: current.typologie },
    current.statut && { icon: Activity, label: current.statut },
    current.type_operation && { icon: Repeat, label: current.type_operation },
    current.public_cible && { icon: Users, label: current.public_cible },
  ].filter(Boolean) as { icon: typeof Tag; label: string }[];

  const galleryPreview = (current.gallery ?? []).slice(0, 4);

  return (
    <section className="relative min-h-[110vh] w-full overflow-hidden">
      {current.FeaturedImage && (
        <img
          src={`${strapiUrl}${current.FeaturedImage.url}`}
          alt={current.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Legibility gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--green-dark)]/95 via-[var(--green-dark)]/55 to-[var(--green-dark)]/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--green-dark)]/70 via-transparent to-transparent" />

      {/* pt-40 clears the fixed header height — adjust to match your header */}
      <div className="relative flex min-h-[110vh] flex-col justify-between px-6 pb-16 pt-40 md:px-10 md:pb-20 lg:px-16">
        <div className="max-w-3xl">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--gold-accent)]">
              Projet à la une
            </p>
            {current.reference && (
              <span className="flex items-center gap-1 text-xs uppercase tracking-widest text-[var(--beige-light)]/60">
                <Hash className="h-3.5 w-3.5" />
                {current.reference}
              </span>
            )}
          </div>

          <h2 className="mb-6 text-6xl font-semibold leading-[1.05] tracking-tight text-[var(--beige-light)] md:text-7xl lg:text-8xl">
            {current.title}
          </h2>

          {current.description && (
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-[var(--beige-light)]/85 md:text-xl">
              {stripMarkdown(current.description).slice(0, 220)}
              {stripMarkdown(current.description).length > 220 ? "…" : ""}
            </p>
          )}

          {badges.length > 0 && (
            <div className="mb-10 flex flex-wrap gap-8">
              {badges.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <Icon className="h-5 w-5 shrink-0 text-[var(--gold-accent)]" strokeWidth={1.5} />
                  <span className="text-base leading-tight text-[var(--beige-light)]/90">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="mb-10 flex flex-wrap gap-5">
            <a href={`/projets/${current.slug}`} className="btn-gold rounded-md px-8 py-4 text-base font-medium">
              Découvrir le projet
            </a>
            <button className="btn-outline-light rounded-md px-8 py-4 text-base font-medium">
              Demander la documentation
            </button>
          </div>

          {(galleryPreview.length > 0 || (current.videos?.length ?? 0) > 0) && (
            <div className="flex items-center gap-4">
              {galleryPreview.map((img, i) => (
                <img
                  key={i}
                  src={`${strapiUrl}${img.url}`}
                  alt=""
                  className="h-16 w-16 rounded-md object-cover ring-1 ring-[var(--beige-light)]/30"
                />
              ))}
              {(current.videos?.length ?? 0) > 0 && (
                <button
                  aria-label="Voir la vidéo du projet"
                  className="flex h-16 w-16 items-center justify-center rounded-md bg-[var(--beige-light)]/10 ring-1 ring-[var(--beige-light)]/30 transition hover:bg-[var(--beige-light)]/20"
                >
                  <Play className="h-5 w-5 text-[var(--beige-light)]" />
                </button>
              )}
              {galleryPreview.length > 0 && (
                <span className="flex items-center gap-1 text-xs uppercase tracking-widest text-[var(--beige-light)]/60">
                  <Images className="h-3.5 w-3.5" />
                  Galerie
                </span>
              )}
            </div>
          )}
        </div>

        {total > 1 && (
          <div className="flex items-center gap-4 self-end">
            <button
              onClick={goPrev}
              aria-label="Projet précédent"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--beige-light)]/40 text-[var(--beige-light)] transition hover:bg-[var(--beige-light)]/10"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span className="text-xs tabular-nums tracking-widest text-[var(--beige-light)]/80">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>

            <button
              onClick={goNext}
              aria-label="Projet suivant"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--beige-light)]/40 text-[var(--beige-light)] transition hover:bg-[var(--beige-light)]/10"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Mettre en pause" : "Lancer le défilement"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--beige-light)]/40 text-[var(--beige-light)] transition hover:bg-[var(--beige-light)]/10"
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}