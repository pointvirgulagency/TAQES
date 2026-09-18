import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  title: string;
  slug: string;
  description: string;
  imageUrl?: string;
  typologie?: string;
  statut?: string;
  typeOperation?: string;
  publicCible?: string;
  reference?: string;
  locale: "fr" | "ar";
};

export default function ProjectCard({
  title,
  slug,
  description,
  imageUrl,
  typologie,
  statut,
  typeOperation,
  publicCible,
  reference,
  locale,
}: ProjectCardProps) {
  const isArabic = locale === "ar";
  const projectUrl = `/${locale}/projects/${slug}`;

  const isUpcoming =
    statut === "À venir" ||
    statut === "En cours d'autorisation" ||
    statut === "En cours de commercialisation";

  return (
    <Link
      href={projectUrl}
      dir={isArabic ? "rtl" : "ltr"}
      className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {imageUrl && (
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
          <Image
            src={imageUrl}
            alt={title}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {statut && (
            <span
              className={`absolute top-3 rounded-full px-3 py-1.5 text-xs font-semibold ${
                isArabic ? "right-3" : "left-3"
              } ${
                isUpcoming
                  ? "bg-[#0B7A4B] text-white"
                  : "border border-[#094734]/15 bg-white/95 text-[#094734]"
              }`}
            >
              {statut}
            </span>
          )}
        </div>
      )}

      <div className="p-5">
        {typologie && (
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#094734]/50">
            {typologie}
          </p>
        )}

        <h3 className="text-base font-bold leading-snug text-[#094734]">
          {title}
        </h3>

        {description && (
          <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-[#094734]/60">
            {description}
          </p>
        )}

        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#0B7A4B]">
          <span>
            {isArabic ? "اكتشف المشروع" : "Voir le projet"}
          </span>

          <span
            className={`transition-transform duration-300 ${
              isArabic
                ? "group-hover:-translate-x-1"
                : "group-hover:translate-x-1"
            }`}
          >
            {isArabic ? "←" : "→"}
          </span>
        </div>
      </div>
    </Link>
  );
}