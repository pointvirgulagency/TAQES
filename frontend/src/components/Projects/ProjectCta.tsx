// src/components/Projects/ProjectCTA.tsx

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProjectCTAProps {
  project: any;
  locale: string;
}

export default function ProjectCTA({ project, locale }: ProjectCTAProps) {
  const isSoldOut =
    project?.disponibilite === "Commercialisé" ||
    project?.disponibilite === "100 %";

  return (
    <section className="bg-[#E5E1D8] px-6 py-12 text-center md:px-10 lg:px-16 lg:py-14">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-serif text-2xl uppercase tracking-wide text-[#094734] md:text-3xl">
          {isSoldOut
            ? "Ce projet est entièrement commercialisé"
            : "Découvrez l'évolution de ce projet"}
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-xs leading-relaxed text-gray-700 md:text-sm">
          Découvrez les projets actuellement en développement ou échangez avec
          les équipes TAQÈS.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-3 bg-[#094734] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#094734]/90"
          >
            <span>{project?.cta_b2c || "Voir les autres projets"}</span>
            <ArrowRight size={14} />
          </Link>

          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-3 border border-[#094734] bg-transparent px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#094734] transition hover:bg-[#094734] hover:text-white"
          >
            <span>{project?.cta_b2b || "Nous contacter"}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}