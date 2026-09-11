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

  return (
    <Link
      href={projectUrl}
      dir={isArabic ? "rtl" : "ltr"}
      className="group block overflow-hidden rounded-2xl bg-[#EBE2DC]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {imageUrl && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {statut && (
            <span
              className={`absolute top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-[#094734] backdrop-blur-sm ${
                isArabic ? "right-4" : "left-4"
              }`}
            >
              {statut}
            </span>
          )}
        </div>
      )}

      <div className="p-6">
        {typologie && (
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[#00674F]">
            {typologie}
          </p>
        )}

        <h2 className="text-2xl font-semibold text-[#094734]">
          {title}
        </h2>

        {reference && (
          <p className="mt-2 text-xs text-[#094734]/50">
            {isArabic ? `المرجع: ${reference}` : `Réf. ${reference}`}
          </p>
        )}

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#094734]/70">
          {description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {typeOperation && (
            <span className="rounded-full bg-[#094734]/10 px-3 py-1 text-xs text-[#094734]">
              {typeOperation}
            </span>
          )}

          {publicCible && (
            <span className="rounded-full bg-[#094734]/10 px-3 py-1 text-xs text-[#094734]">
              {publicCible}
            </span>
          )}
        </div>

        <div className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-[#00674F]">
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