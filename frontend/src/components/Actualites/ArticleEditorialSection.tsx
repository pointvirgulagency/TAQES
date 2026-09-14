import type { SectionEditoriale } from "./ArticleTypes";
import { getImageUrl } from "./article-utils";
import RichText from "../RichText";

interface ArticleEditorialSectionProps {
  section: SectionEditoriale;
  number?: number;
}

export default function ArticleEditorialSection({
  section,
  number,
}: ArticleEditorialSectionProps) {
  const imageUrl = getImageUrl(section.image);
  const isRight = section.position === "droite";

  const background =
    section.fond === "nude"
      ? "bg-[#EBE2DC]"
      : section.fond === "sage"
        ? "bg-[#EEF3F0]"
        : "bg-[#F4F6F3]";

  const image = imageUrl ? (
    <div className="relative min-h-[420px] w-full flex-1 lg:h-full lg:min-h-full">
      <img
        src={imageUrl}
        alt={
          section.image?.alternativeText ||
          section.legende ||
          section.titre ||
          ""
        }
        className="h-full w-full object-cover lg:absolute lg:inset-0"
      />

      {section.legende && (
        <div className="absolute bottom-0 right-0 z-20 max-w-xs rounded-tl-xl bg-[#F8F6F1] p-6 shadow-sm md:p-8">
          <div className="mb-2 h-[2px] w-6 bg-[#C4A484]" />

          <blockquote className="font-serif text-sm font-bold leading-snug text-[#094734] md:text-base">
            {section.legende}
          </blockquote>
        </div>
      )}
    </div>
  ) : null;

  const content = (
    <div
      className={`flex h-full flex-col justify-start pb-12 pt-6 md:pb-16 md:pt-8 lg:pb-20 lg:pt-10 ${
        isRight ? "lg:pl-16 lg:pr-12" : "lg:pl-12 lg:pr-16"
      }`}
    >
      {number !== undefined && (
        <span className="font-serif text-6xl font-semibold leading-none text-[#A8C3B8] md:text-7xl lg:text-8xl">
          {String(number).padStart(2, "0")}
        </span>
      )}

      {section.surtitre && (
        <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-[#449383] md:text-sm">
          {section.surtitre}
        </p>
      )}

      {section.titre && (
        <h2 className="mt-4 max-w-xl font-serif text-3xl font-bold leading-tight text-[#094734] md:text-4xl lg:text-4xl">
          {section.titre}
        </h2>
      )}

      {section.contenu && (
        <div className="mt-6 max-w-xl">
          <RichText
            content={section.contenu}
            className="space-y-4 text-sm leading-relaxed text-[#094734]/80 md:text-base lg:text-xl"
          />
        </div>
      )}
    </div>
  );

  return (
    <section className={`relative w-full ${background}`}>
      <div className="w-full">
        <div className="grid w-full grid-cols-1 items-stretch lg:grid-cols-2">
          {isRight ? (
            <>
              <div className="order-2 w-full lg:order-1">{content}</div>

              <div className="relative order-1 flex w-full flex-col lg:order-2">
                {image}
              </div>
            </>
          ) : (
            <>
              <div className="relative order-1 flex w-full flex-col lg:order-1">
                {image}
              </div>

              <div className="order-2 w-full lg:order-2">{content}</div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}