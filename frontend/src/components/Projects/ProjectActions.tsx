import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProjectActionsProps {
  project: any;
  locale: string;
  strapiUrl: string
}

export default function ProjectActions({ project, locale }: ProjectActionsProps) {
  const stats = [
    { value: project?.annee || project?.periode_projet || "2024", label: "Réalisation" },
    { value: project?.zonage || "R+3 / R+4", label: "Zonage" },
    { value: project?.disponibilite || "100 %", label: "Commercialisé" },
  ];

  return (
    <>
      <section className="bg-[#094734] px-6 py-12 text-white md:px-10 lg:px-16 lg:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-[1fr_1fr]">
          <div className="border-b border-white/20 pb-8 md:border-b-0 md:border-r md:pb-0 md:pr-10">
            <h2 className="font-serif text-2xl uppercase tracking-wide md:text-3xl lg:text-4xl">
              {project?.subtitle || "Une étape de l'héritage foncière Alia"}
            </h2>
            <p className="mt-4 text-xs leading-relaxed text-white/80 md:text-sm">
              {project?.description_courte ||
                `Le ${project?.title || "projet"} s'inscrit dans la continuité des opérations foncières de Foncière Alia, et participe à la structuration durable du territoire.`}
            </p>
          </div>

          <div className="grid grid-cols-3 divide-x divide-white/20 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="px-2">
                <div className="font-serif text-2xl font-light md:text-3xl lg:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-[9px] font-semibold uppercase tracking-widest text-white/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}