import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import RichText from "@/components/RichText";

interface ProjectActualiteProps {
  project: any;
  locale: string;
  strapiUrl: string;
}

export default function ProjectActualite({
  project,
  locale,
  strapiUrl,
}: ProjectActualiteProps) {
  const article =
    project?.actualite;

  if (!article) {
    return null;
  }

  const baseUrl = strapiUrl.replace(
    /\/$/,
    ""
  );

  const image =
    article?.image?.url
      ? `${baseUrl}${article.image.url}`
      : article?.FeaturedImage?.url
        ? `${baseUrl}${article.FeaturedImage.url}`
        : "";

  const slug =
    article?.slug;

  return (
    <section className="bg-[#F1ECE6] px-6 py-14 md:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#449383]">
          Actualité
        </p>

        <h2 className="mt-4 font-serif text-3xl uppercase leading-tight text-[#094734] md:text-4xl">
          L'actualité
          <br />
          du projet
        </h2>

        <div className="mt-8 grid overflow-hidden border border-gray-200 bg-white md:grid-cols-[0.8fr_1.2fr]">
          {image && (
            <div className="min-h-[260px] overflow-hidden">
              <img
                src={image}
                alt={
                  article?.image
                    ?.alternativeText ||
                  article?.title ||
                  "Actualité"
                }
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          )}

          <div className="flex flex-col justify-center p-7 md:p-10">
            <div className="mb-5 flex items-center gap-2 text-[#00674F]">
              <Newspaper size={16} />

              <span className="text-[8px] font-bold uppercase tracking-[0.2em]">
                Actualité TAQÈS
              </span>
            </div>

            {article?.title && (
              <h3 className="font-serif text-2xl uppercase leading-tight text-[#094734] md:text-3xl">
                {article.title}
              </h3>
            )}

            {article?.description && (
              <div className="mt-5 text-xs leading-6 text-gray-600">
                {typeof article.description ===
                "string" ? (
                  <p>
                    {article.description}
                  </p>
                ) : (
                  <RichText
                    content={
                      article.description
                    }
                  />
                )}
              </div>
            )}

            {slug && (
              <Link
                href={`/${locale}/actualites/${slug}`}
                className="mt-7 inline-flex w-fit items-center gap-3 rounded bg-[#00674F] px-5 py-3 text-[9px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#449383]"
              >
                Lire l'article
                <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}