// src/components/Projects/ProjectSpecs.tsx

import {
  Building2,
  Layers3,
  CheckCircle2,
  Ruler,
  Maximize2,
} from "lucide-react";

interface ProjectSpecsProps {
  project: any;
  locale: string;
}

export default function ProjectSpecs({
  project,
}: ProjectSpecsProps) {
  return (
    <section className="border-b border-[#dfe5e2] bg-white">
      <div className="mx-auto grid w-full grid-cols-2 md:grid-cols-5">
        <Spec
          icon={<Building2 size={14} />}
          label="Type"
          value={
            project?.type_operation ||
            "À confirmer"
          }
        />

        <Spec
          icon={<Layers3 size={14} />}
          label="Zonage"
          value={
            project?.zonage ||
            "À confirmer"
          }
        />

        <Spec
          icon={<CheckCircle2 size={14} />}
          label="Statut"
          value={
            project?.statut ||
            "À confirmer"
          }
        />

        <Spec
          icon={<Ruler size={14} />}
          label="Lots"
          value={
            project?.nombre_lots
              ? String(project.nombre_lots)
              : "À confirmer"
          }
        />

        <Spec
          icon={<Maximize2 size={14} />}
          label="Surface"
          value={
            project?.surface_terrain
              ? String(
                  project.surface_terrain
                )
              : "À confirmer"
          }
          className="col-span-2 md:col-span-1"
        />
      </div>
    </section>
  );
}

function Spec({
  icon,
  label,
  value,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`flex min-h-[76px] flex-col justify-center border-r border-b border-[#dfe5e2] px-5 py-4 last:border-r-0 md:min-h-[84px] md:border-b-0 ${className}`}
    >
      <div className="mb-2 flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.18em] text-gray-400">
        {icon}
        <span>{label}</span>
      </div>

      <span className="text-[10px] font-semibold uppercase tracking-wide text-[#094734] md:text-xs">
        {value}
      </span>
    </div>
  );
}