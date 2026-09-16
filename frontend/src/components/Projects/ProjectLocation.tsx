import { MapPin } from "lucide-react";

interface ProjectLocationProps {
  project: any;
  strapiUrl: string;
}

export default function ProjectLocation({
  project,
  strapiUrl,
}: ProjectLocationProps) {
  const baseUrl = strapiUrl.replace(/\/$/, "");

  const location = Array.isArray(project?.location)
    ? project.location[0]
    : project?.location;

  if (!location) {
    return null;
  }

  const image = location?.image?.url
    ? `${baseUrl}${location.image.url}`
    : "";

  const title = location?.titre || "";
  const description = location?.description || "";
  const name = location?.nom || "";

  const latitude = location?.latitude || "";
  const longitude = location?.longitude || "";

  return (
    <section className="bg-white px-6 py-12 md:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3 md:items-stretch">
        {/* Location information */}
        <div className="flex flex-col justify-center pr-2">
          {title && (
            <>
              <h2 className="font-serif text-2xl uppercase leading-tight tracking-wide text-[#094734] md:text-3xl lg:text-4xl">
                {title}
              </h2>

              <div className="mt-3 h-[2px] w-10 bg-[#094734]/40" />
            </>
          )}

          {description && (
            <p className="mt-6 text-sm leading-relaxed text-gray-600 md:text-base">
              {description}
            </p>
          )}
        </div>

        {/* Location graphic */}
        <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden bg-[#EAECE6] md:min-h-[250px]">
          <div className="absolute inset-0 opacity-40">
            <svg
              className="h-full w-full"
              viewBox="0 0 400 300"
              fill="none"
              stroke="#9FB1A7"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M-10 180 Q 120 120 220 200 T 420 150" />
              <path d="M50 -10 Q 150 150 180 310" />
              <path d="M200 -10 Q 220 180 380 310" />

              <circle
                cx="210"
                cy="140"
                r="45"
                fill="#DCE3DC"
                opacity="0.4"
              />
            </svg>
          </div>

          {name && (
            <div className="relative z-10 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#094734] text-white shadow-md">
                <MapPin size={18} />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-[#094734]">
                {name}
              </span>
            </div>
          )}

          {(latitude || longitude) && (
            <span className="absolute bottom-3 left-3 text-[9px] text-gray-500">
              {latitude}
              {latitude && longitude ? ", " : ""}
              {longitude}
            </span>
          )}
        </div>

        {/* Location image */}
        <div className="relative min-h-[220px] w-full overflow-hidden bg-gray-100 md:min-h-[250px]">
          {image && (
            <img
              src={image}
              alt={
                location?.image?.alternativeText ||
                name ||
                title ||
                "Localisation du projet"
              }
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
}