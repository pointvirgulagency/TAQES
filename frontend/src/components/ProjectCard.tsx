import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  title: string;
  description: string;
  imageUrl?: string;
  slug?: string;
  typologie?: string;
  statut?: string;
  typeOperation?: string;
  publicCible?: string;
  reference?: string;
  locale: string;
};

export default function ProjectCard({
  title,
  description,
  imageUrl,
  slug,
  typologie,
  statut,
  typeOperation,
  publicCible,
  reference,
  locale,
}: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-[#EBE2DC]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
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
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-[#094734] backdrop-blur-sm">
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
            Réf. {reference}
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

        {slug && (
          <Link
            href={`/${locale}/projects/${slug}`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#00674F] transition-colors hover:text-[#094734]"
          >
            Voir le projet
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        )}
      </div>
    </article>
  );
}