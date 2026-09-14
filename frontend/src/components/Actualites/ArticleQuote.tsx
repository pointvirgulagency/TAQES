import type { CitationSection } from "./ArticleTypes";

interface ArticleQuoteProps {
  section: CitationSection;
}

export default function ArticleQuote({ section }: ArticleQuoteProps) {
  if (!section.citation) {
    return null;
  }

  const background =
    section.fond === "sage"
      ? "bg-[#E8F0EC] text-[#094734]"
      : "bg-[#00674F] text-white";

  return (
    <section className={`w-full ${background}`}>
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-16 text-center md:px-10 md:py-10">
        {/* Centered Small Quote Mark */}
        <span className="font-serif text-3xl leading-none md:text-4xl opacity-90">
          “
        </span>

        {/* Centered Serif Quote Text */}
        <blockquote className="mt-3 font-serif text-2xl font-normal leading-tight tracking-tight md:text-3xl lg:text-4xl max-w-3xl">
          {section.citation}
        </blockquote>

        {/* Author / Subtitle */}
        {section.auteur && (
          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.25em] opacity-75">
            {section.auteur}
          </p>
        )}
      </div>
    </section>
  );
}