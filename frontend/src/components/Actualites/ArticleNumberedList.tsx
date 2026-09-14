import type { ListeNumeroteeSection } from "./ArticleTypes";

interface ArticleNumberedListProps {
  section: ListeNumeroteeSection;
  number?: number;
}

export default function ArticleNumberedList({
  section,
  number = 3,
}: ArticleNumberedListProps) {
  if (!section.elements?.length) {
    return null;
  }

  return (
    <section className="bg-[#FDFBF7] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="flex items-start gap-6">
            <span className="font-serif text-6xl font-normal leading-none text-[#094734]/30 md:text-7xl lg:text-8xl">
              {String(number).padStart(2, "0")}
            </span>

            <div>
              {section.titre && (
                <h2 className="font-serif text-3xl font-bold leading-tight text-[#094734] md:text-4xl lg:text-5xl">
                  {section.titre}
                </h2>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6 md:pl-8">
            <div className="hidden h-16 w-[1px] bg-[#094734]/20 md:block" />

            <p className="max-w-[200px] text-xs leading-relaxed text-[#094734]/70 md:text-sm">
              Un projet solide s'appuie sur des informations fiables.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 divide-y divide-[#094734]/15 md:grid-cols-2 md:divide-x md:divide-y-0">
          <div className="flex flex-col divide-y divide-[#094734]/15 md:pr-10 lg:pr-16">
            {section.elements
              .filter((_, idx) => idx % 2 === 0)
              .map((element, idx) => {
                const itemIndex = idx * 2 + 1;

                return (
                  <div
                    key={element.id ?? `item-${itemIndex}`}
                    className="flex items-start gap-6 py-8 first:pt-0 last:pb-0"
                  >
                    <span className="font-serif text-5xl font-semibold leading-none text-[#C4A484] md:text-6xl">
                      {String(
                        element.numero ?? itemIndex
                      ).padStart(2, "0")}
                    </span>

                    <div className="space-y-2">
                      {element.titre && (
                        <h3 className="font-serif text-lg font-bold text-[#094734] md:text-xl">
                          {element.titre}
                        </h3>
                      )}

                      {element.description && (
                        <p className="text-xs leading-relaxed text-[#094734]/75 md:text-sm">
                          {element.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="flex flex-col divide-y divide-[#094734]/15 pt-8 md:pl-10 md:pt-0 lg:pl-16">
            {section.elements
              .filter((_, idx) => idx % 2 === 1)
              .map((element, idx) => {
                const itemIndex = idx * 2 + 2;

                return (
                  <div
                    key={element.id ?? `item-${itemIndex}`}
                    className="flex items-start gap-6 py-8 first:pt-0 last:pb-0"
                  >
                    <span className="font-serif text-5xl font-semibold leading-none text-[#C4A484] md:text-6xl">
                      {String(
                        element.numero ?? itemIndex
                      ).padStart(2, "0")}
                    </span>

                    <div className="space-y-2">
                      {element.titre && (
                        <h3 className="font-serif text-lg font-bold text-[#094734] md:text-xl">
                          {element.titre}
                        </h3>
                      )}

                      {element.description && (
                        <p className="text-xs leading-relaxed text-[#094734]/75 md:text-sm">
                          {element.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
