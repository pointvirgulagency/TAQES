import {
  Route,
  Droplets,
  Zap,
  Lightbulb,
} from "lucide-react";

import RichText from "@/components/RichText";

interface ProjectDescriptionProps {
  project: any;
  locale: string;
  strapiUrl: string;
}

export default function ProjectDescription({
  project,
  strapiUrl,
}: ProjectDescriptionProps) {
  const baseUrl = strapiUrl.replace(/\/$/, "");

  const getImageUrl = (image: any) => {
    if (!image?.url) return "";
    return image.url.startsWith("http") ? image.url : `${baseUrl}${image.url}`;
  };

  const gallery = Array.isArray(project?.gallery) ? project.gallery : [];
  const infrastructureImages = gallery.slice(0, 4);

  return (
    <>
      {/* Viabilisation & Infrastructures Section */}
      <section className="bg-[#094734] px-6 py-12 text-white md:px-10 lg:px-16 lg:py-16">
        <div className="mx-auto max-w-7xl">
          {/* Top Header & Icons Row */}
          <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-8 lg:flex-row lg:items-center">
            {/* Title */}
            <h2 className="font-serif text-2xl uppercase tracking-wider md:text-3xl lg:text-4xl">
              Viabilisation &<br />Infrastructures
            </h2>

            {/* Horizontal Icons Bar */}
            <div className="flex items-center justify-between gap-4 md:justify-end md:gap-8">
              <InfrastructureItem icon={<Route size={28} />} label="VOIRIE" />
              <InfrastructureItem icon={<Droplets size={28} />} label="ASSAINISSEMENT" />
              <InfrastructureItem icon={<Zap size={28} />} label="EAU & ÉLECTRICITÉ" />
              <InfrastructureItem icon={<Lightbulb size={28} />} label="ÉCLAIRAGE" />
            </div>
          </div>

          {/* Subtitle / Disclaimer */}
          <p className="mt-6 text-center text-xs font-light text-white/70">
            Équipements et niveau de réalisation à confirmer auprès de TAQÈS.
          </p>

          {/* 4-Column Image Grid */}
          {infrastructureImages.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {infrastructureImages.map((image: any, index: number) => {
                const src = getImageUrl(image);
                if (!src) return null;

                return (
                  <div
                    key={image?.id || index}
                    className="aspect-[4/3] w-full overflow-hidden bg-white/10"
                  >
                    <img
                      src={src}
                      alt={`Infrastructure ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Accessibility Section */}
      {project?.accessibilite && (
        <section className="bg-white px-6 py-14 md:px-10 lg:px-16 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#449383]">
              Accessibilité
            </p>

            <div className="mt-5 max-w-3xl text-sm leading-7 text-gray-600">
              <RichText content={project.accessibilite} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function InfrastructureItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center border-r border-white/20 pr-4 last:border-r-0 md:pr-8">
      <div className="mb-2 text-white">{icon}</div>
      <span className="text-[9px] font-bold tracking-wider text-white/90 md:text-[10px]">
        {label}
      </span>
    </div>
  );
}