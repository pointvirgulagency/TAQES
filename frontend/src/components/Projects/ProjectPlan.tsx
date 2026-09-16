import { Maximize2, MoveUp } from "lucide-react";
import RichText from "@/components/RichText";

interface ProjectPlanProps {
  project: any;
  strapiUrl: string;
}

export default function ProjectPlan({
  project,
  strapiUrl,
}: ProjectPlanProps) {
  const baseUrl = strapiUrl.replace(/\/$/, "");
  const plan = project?.Plan;

  if (!plan) {
    return null;
  }

  const images = Array.isArray(plan.image) ? plan.image : [];
  const mainImage = images[0];

  if (!mainImage?.url) {
    return null;
  }

  const imageUrl = `${baseUrl}${mainImage.url}`;
  const valeurs = Array.isArray(plan.valeurs) ? plan.valeurs : [];

  const getColor = (valeur: string) => {
    switch (valeur?.toLowerCase().trim()) {
      case "vert":
        return "#094734";
      case "gris":
        return "#CCCCCC";
      case "vert clair":
        return "#449383";
      case "beige":
        return "#EBE2DC";
      default:
        return "#CCCCCC";
    }
  };

  return (
    <section className="w-full bg-[#F4F2ED] px-6 py-12 md:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                <span>Le plan</span>
                <span className="h-[1px] w-8 bg-gray-400" />
              </div>

              {plan.titre && (
                <h2 className="mt-4 font-serif text-3xl uppercase tracking-wide text-[#094734] md:text-4xl">
                  {plan.titre}
                </h2>
              )}

              {plan.description && (
                <div className="mt-6 text-sm leading-7 text-gray-600">
                  <RichText content={plan.description} />
                </div>
              )}

              {valeurs.length > 0 && (
                <div className="mt-8 flex flex-col gap-4 text-xs font-bold uppercase tracking-wider text-[#094734]">
                  {valeurs.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3"
                    >
                      <span
                        className="h-5 w-5 shrink-0"
                        style={{
                          backgroundColor: getColor(item.valeur),
                        }}
                      />
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-10">
              <a
                href={imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#094734] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
              >
                <span>Agrandir le plan</span>
                <Maximize2 size={16} />
              </a>
            </div>
          </div>

          <div className="relative flex flex-col items-center justify-center lg:col-span-7">
            <div className="absolute right-0 top-0 flex flex-col items-center text-xs font-bold text-[#094734]">
              <span>N</span>
              <MoveUp size={14} className="-mt-1" />
            </div>

            <div className="w-full py-6">
              <img
                src={imageUrl}
                alt={
                  mainImage.alternativeText ||
                  plan.titre ||
                  `Plan de ${project?.title || "ce projet"}`
                }
                className="mx-auto max-h-[500px] w-full object-contain"
              />
            </div>

            <div className="mt-2 w-full text-right">
              <p className="text-[10px] text-gray-500">
                Schéma indicatif — plan définitif à intégrer après validation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}