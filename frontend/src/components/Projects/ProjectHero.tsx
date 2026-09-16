import Link from "next/link";
import { ArrowRight, MapPin, Layers } from "lucide-react";

interface ProjectHeroProps {
  project: any;
  locale: string;
  strapiUrl: string;
}

export default function ProjectHero({
  project,
  locale,
  strapiUrl,
}: ProjectHeroProps) {
  const imageUrl = project.FeaturedImage?.url
    ? `${strapiUrl.replace(/\/$/, "")}${project.FeaturedImage.url}`
    : "";

  const territoireName =
    project.territoire?.nom ||
    project.territoire?.name ||
    project.localisation;

  return (
    <section className="relative w-full overflow-hidden bg-white text-gray-900">
      {/* Hero Container */}
      <div className="relative flex min-h-[88vh] flex-col lg:flex-row">
        {/* Right Image (Background on desktop) */}
        <div className="relative h-[40vh] w-full lg:absolute lg:inset-0 lg:h-full lg:w-full">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={
                project.FeaturedImage?.alternativeText ||
                project.title ||
                "Project background"
              }
              className="h-full w-full object-cover object-center"
            />
          )}

          {/* Top Right Tagline */}
          <div className="absolute right-10 top-10 hidden items-center gap-4 text-white/90 lg:flex">
            <span className="text-right text-xs font-semibold uppercase tracking-[0.2em] leading-relaxed">
              Des territoires <br /> pour demain
            </span>
            <span className="h-[1px] w-12 bg-white/80" />
          </div>
        </div>

        {/* Left Curved Panel */}
        <div className="relative z-10 flex w-full flex-col justify-between bg-[#094734] px-6 py-12 text-white lg:w-[45%] lg:px-14 lg:py-16">
          {/* Curve Overlay (Desktop) */}
          <svg
            className="pointer-events-none absolute -right-16 top-0 hidden h-full w-16 text-[#094734] lg:block"
            viewBox="0 0 100 800"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,0 Q100,400 0,800 Z" />
          </svg>

          {/* Background Vector Line Overlay */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-15"
            viewBox="0 0 500 800"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <ellipse cx="100" cy="200" rx="300" ry="200" />
            <ellipse cx="100" cy="200" rx="380" ry="260" />
            <ellipse cx="100" cy="200" rx="460" ry="320" />
          </svg>

          <div className="relative z-10">
            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center gap-2 text-xs font-medium text-white/70">
              <Link href={`/${locale}/projects`} className="hover:text-white transition-colors">
                Projets
              </Link>
              <span>/</span>
              <span className="text-white font-semibold">{project.title}</span>
            </nav>

            {/* Title */}
            <h1 className="text-4xl font-serif font-light uppercase tracking-tight text-white md:text-5xl lg:text-6xl">
              {project.title}
            </h1>

            {/* Sub-info Meta */}
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-white/90">
              {territoireName && (
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-white/70" />
                  <span>{territoireName}</span>
                </div>
              )}
              {project.type_operation && (
                <div className="flex items-center gap-2">
                  <Layers size={18} className="text-white/70" />
                  <span>{project.type_operation}</span>
                </div>
              )}
            </div>

            {/* Status Badge */}
            {project.statut && (
              <div className="mt-6 inline-block rounded-full bg-[#dcece6] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#094734]">
                {project.statut}
              </div>
            )}

            {/* Description */}
            {project.description_courte && (
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/90 md:text-base">
                {project.description_courte}
              </p>
            )}

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button className="inline-flex items-center justify-center gap-3 rounded bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#094734] transition-opacity hover:opacity-90">
                <span>Être informé du lancement</span>
                <ArrowRight size={16} />
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-80">
                <span>Opportunités & Partenariats</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Footer Disclaimer */}
          <div className="relative z-10 mt-12 text-xs text-white/50">
            {project.statut
              ? `Projet ${project.statut.toLowerCase()} — Informations susceptibles d'évoluer`
              : "Informations susceptibles d'évoluer"}
          </div>
        </div>
      </div>
    </section>
  );
}