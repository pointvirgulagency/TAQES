import { Check } from "lucide-react";

interface ProjectProgressProps {
  project: any;
  locale?: string;
  strapiUrl: string
}

interface ParsedStep {
  label: string;
  status?: string;
  completed?: boolean;
}

export default function ProjectProgress({
  project,
}: ProjectProgressProps) {
  // 1. Extract dynamic steps from Strapi rich text or structured array
  const rawSteps = Array.isArray(project?.avancement) ? project.avancement : [];

  const extractedSteps: ParsedStep[] = rawSteps
    .map((block: any) => {
      if (typeof block === "string") {
        return { label: block, completed: true };
      }

      if (block?.label || block?.title) {
        return {
          label: block.label || block.title,
          status: block.status || block.sublabel,
          completed: block.completed !== false,
        };
      }

      // Rich text block parser
      const text =
        block?.children
          ?.map((child: any) => child?.text || "")
          .join("")
          .trim() || "";

      return { label: text, completed: true };
    })
    .filter((step: ParsedStep) => Boolean(step.label));

  // 2. Default fallback steps if none provided in Strapi
  const defaultSteps: ParsedStep[] = [
    { label: "Études", status: "Terminée", completed: true },
    { label: "Autorisation", status: "Terminée", completed: true },
    { label: "Aménagement", status: "Terminé", completed: true },
    { label: "Commercialisation", status: "Terminée", completed: true },
    {
      label: "Projet Réalisé",
      status: project?.annee || project?.periode_projet || "2024",
      completed: true,
    },
  ];

  const stepsToDisplay =
    extractedSteps.length > 0
      ? extractedSteps
      : project?.phase
      ? [{ label: project.phase, status: project?.periode_projet, completed: true }]
      : defaultSteps;

  if (stepsToDisplay.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white px-6 py-12 md:px-10 lg:px-16 lg:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Main Section Heading */}
        <h2 className="mb-12 font-serif text-2xl uppercase tracking-wider text-[#094734] md:text-3xl lg:text-4xl">
          Du foncier au lotissement réalisé
        </h2>

        {/* Timeline Layout */}
        <div className="relative w-full">
          {/* Horizontal Connecting Line (Desktop) */}
          <div
            className="absolute top-4 left-[10%] right-[10%] z-0 hidden h-[2px] bg-[#094734] md:block"
            aria-hidden="true"
          />

          {/* Steps Items */}
          <div
            className={`relative z-10 grid gap-8 md:gap-4 ${
              stepsToDisplay.length <= 5
                ? "grid-cols-2 md:grid-cols-5"
                : "grid-cols-2 md:grid-cols-6"
            }`}
          >
            {stepsToDisplay.slice(0, 6).map((step, index) => {
              const isCompleted = step.completed !== false;
              const isLast = index === stepsToDisplay.length - 1;
              const subtext =
                step.status ||
                (isLast && project?.periode_projet
                  ? project.periode_projet
                  : null);

              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  {/* Badge Icon */}
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                      isCompleted
                        ? "bg-[#094734] text-white"
                        : "border-2 border-gray-300 bg-white text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <Check size={16} strokeWidth={2.5} />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-current" />
                    )}
                  </div>

                  {/* Step Title */}
                  <span className="mt-4 max-w-[140px] text-xs font-bold uppercase tracking-wider text-[#094734]">
                    {step.label}
                  </span>

                  {/* Step Subtext / Date */}
                  {subtext && (
                    <span className="mt-1 text-[11px] text-gray-500">
                      {subtext}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}