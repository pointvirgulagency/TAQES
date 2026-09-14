import type {
  MediaLargeSection,
} from "./ArticleTypes";

import { getImageUrl } from "./article-utils";

interface ArticleLargeMediaProps {
  section: MediaLargeSection;
}

export default function ArticleLargeMedia({
  section,
}: ArticleLargeMediaProps) {
  const imageUrl = getImageUrl(section.image);

  if (!imageUrl) {
    return null;
  }

  const panoramic =
    section.format === "panoramique";

  return (
    <section className="bg-white">
      <figure>
        <div
          className={
            panoramic
              ? "w-full"
              : "mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28 lg:px-14"
          }
        >
          <img
            src={imageUrl}
            alt={
              section.alt ||
              section.image?.alternativeText ||
              ""
            }
            className={`w-full object-cover ${
              panoramic
                ? "max-h-[850px]"
                : "max-h-[700px]"
            }`}
          />
        </div>

        {section.legende && (
          <figcaption
            className={`mx-auto px-6 pb-8 text-xs text-[#094734]/50 ${
              panoramic
                ? "max-w-7xl"
                : "max-w-7xl"
            }`}
          >
            {section.legende}
          </figcaption>
        )}
      </figure>
    </section>
  );
}