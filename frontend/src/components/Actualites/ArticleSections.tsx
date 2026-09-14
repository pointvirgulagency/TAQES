import Link from "next/link";

interface StrapiImage {
  url?: string | null;
  alternativeText?: string | null;
  width?: number | null;
  height?: number | null;
}

interface RichTextChild {
  type?: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

interface RichTextBlock {
  type?: string;
  level?: number;
  format?: string;
  children?: RichTextChild[];
}

interface InformationCle {
  id?: number;
  label?: string | null;
  valeur?: string | null;
  description?: string | null;
}

interface ElementListe {
  id?: number;
  numero?: number | null;
  titre?: string | null;
  description?: string | null;
}

interface SectionEditoriale {
  __component: "sections.section-editoriale";
  id?: number;
  surtitre?: string | null;
  titre?: string | null;
  contenu?: RichTextBlock[] | null;
  image?: StrapiImage | null;
  legende?: string | null;
  position?: "gauche" | "droite" | null;
  fond?: "blanc" | "nude" | "sage" | null;
  format?: "standard" | "large" | null;
}

interface InformationsClesSection {
  __component: "sections.informations-cles";
  id?: number;
  titre?: string | null;
  informations?: InformationCle[] | null;
}

interface ListeNumeroteeSection {
  __component: "sections.liste-numerotee";
  id?: number;
  titre?: string | null;
  element?: ElementListe[] | null;
}

interface CitationSection {
  __component: "sections.citation";
  id?: number;
  citation?: string | null;
  auteur?: string | null;
  fond?: "sage" | "vert" | null;
}

interface MediaLargeSection {
  __component: "sections.media-large";
  id?: number;
  image?: StrapiImage | null;
  alt?: string | null;
  legende?: string | null;
  format?: "panoramique" | "contenu" | null;
}

interface CTASectionData {
  __component: "sections.cta";
  id?: number;
  surtitre?: string | null;
  titre?: string | null;
  description?: string | null;
  libelle_boutton?: string | null;
  lien?: string | null;
  fond?: "blanc" | "nude" | "sage" | "vert" | null;
}

type ArticleSection =
  | SectionEditoriale
  | InformationsClesSection
  | ListeNumeroteeSection
  | CitationSection
  | MediaLargeSection
  | CTASectionData;

interface ArticleSectionsProps {
  sections?: ArticleSection[] | null;
  locale: string;
}

function getImageUrl(image?: StrapiImage | null) {
  if (!image?.url) return "";

  if (image.url.startsWith("http")) {
    return image.url;
  }

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "";

  return `${baseUrl}${image.url}`;
}

function getLocalizedUrl(url: string, locale: string) {
  if (!url) return "#";

  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("#") ||
    url.startsWith("mailto:")
  ) {
    return url;
  }

  if (url.startsWith(`/${locale}/`)) {
    return url;
  }

  if (url === `/${locale}` || url.startsWith(`/${locale}?`)) {
    return url;
  }

  if (url.startsWith("/")) {
    return `/${locale}${url}`;
  }

  return `/${locale}/${url}`;
}

function RichText({
  content,
  large = false,
}: {
  content?: RichTextBlock[] | null;
  large?: boolean;
}) {
  if (!content?.length) return null;

  return (
    <div
      className={
        large
          ? "space-y-6 text-[18px] leading-[1.9] text-[#094734]/85 md:text-[19px]"
          : "space-y-5 text-[16px] leading-[1.85] text-[#094734]/80 md:text-[17px]"
      }
    >
      {content.map((block, index) => {
        const children = block.children ?? [];

        if (block.type === "paragraph") {
          return (
            <p key={`paragraph-${index}`}>
              {children.map((child, childIndex) => {
                const text = child.text ?? "";

                if (child.bold) {
                  return (
                    <strong
                      key={`bold-${index}-${childIndex}`}
                      className="font-semibold text-[#094734]"
                    >
                      {text}
                    </strong>
                  );
                }

                if (child.italic) {
                  return (
                    <em key={`italic-${index}-${childIndex}`}>
                      {text}
                    </em>
                  );
                }

                if (child.underline) {
                  return (
                    <u key={`underline-${index}-${childIndex}`}>
                      {text}
                    </u>
                  );
                }

                if (child.strikethrough) {
                  return (
                    <s key={`strike-${index}-${childIndex}`}>
                      {text}
                    </s>
                  );
                }

                if (child.code) {
                  return (
                    <code
                      key={`code-${index}-${childIndex}`}
                      className="rounded bg-[#094734]/5 px-1.5 py-0.5 text-[0.9em]"
                    >
                      {text}
                    </code>
                  );
                }

                return (
                  <span key={`text-${index}-${childIndex}`}>
                    {text}
                  </span>
                );
              })}
            </p>
          );
        }

        if (block.type === "heading") {
          const heading = children
            .map((child) => child.text ?? "")
            .join("");

          if (block.level === 3) {
            return (
              <h3
                key={`heading-${index}`}
                className="pt-6 text-2xl font-medium leading-tight text-[#094734] md:text-[28px]"
              >
                {heading}
              </h3>
            );
          }

          return (
            <h2
              key={`heading-${index}`}
              className="pt-8 text-3xl font-medium leading-tight text-[#094734] md:text-[38px]"
            >
              {heading}
            </h2>
          );
        }

        if (block.type === "list") {
          const items = children
            .map((child) => child.text ?? "")
            .filter(Boolean);

          if (block.format === "ordered") {
            return (
              <ol
                key={`ordered-list-${index}`}
                className="space-y-4 pl-6 marker:text-[#00674F]"
              >
                {items.map((item, itemIndex) => (
                  <li key={`ordered-${index}-${itemIndex}`}>
                    {item}
                  </li>
                ))}
              </ol>
            );
          }

          return (
            <ul
              key={`unordered-list-${index}`}
              className="space-y-4 pl-6 marker:text-[#449383]"
            >
              {items.map((item, itemIndex) => (
                <li key={`unordered-${index}-${itemIndex}`}>
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={`block-${index}`}>
            {children.map((child) => child.text ?? "").join("")}
          </p>
        );
      })}
    </div>
  );
}

function EditorialSection({
  section,
  number,
}: {
  section: SectionEditoriale;
  number: number;
}) {
  const imageUrl = getImageUrl(section.image);
  const isRight = section.position === "droite";
  const isLarge = section.format === "large";

  const numberLabel = String(number).padStart(2, "0");

  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="w-full">
        <div
          className={`grid w-full ${
            imageUrl
              ? "lg:grid-cols-2"
              : "grid-cols-1"
          }`}
        >
          <div
            className={`flex items-center ${
              isRight && imageUrl ? "lg:order-2" : ""
            }`}
          >
            <div
              className={`w-full px-6 py-8 md:px-12 lg:px-20 xl:px-28 ${
                imageUrl
                  ? "max-w-[760px]"
                  : "mx-auto max-w-5xl"
              }`}
            >
              <div className="mb-8 flex items-center gap-5">
                <span className="text-[12px] font-medium tracking-[0.2em] text-[#00674F]">
                  {numberLabel}
                </span>

                <span className="h-px w-12 bg-[#00674F]/30" />

                {section.surtitre && (
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#449383]">
                    {section.surtitre}
                  </span>
                )}
              </div>

              {section.titre && (
                <h2
                  className={`font-medium leading-[1.04] tracking-[-0.035em] text-[#094734] ${
                    isLarge
                      ? "text-[42px] md:text-[55px] lg:text-[64px]"
                      : "text-[34px] md:text-[46px]"
                  }`}
                >
                  {section.titre}
                </h2>
              )}

              <div className="mt-8">
                <RichText
                  content={section.contenu}
                  large={isLarge}
                />
              </div>
            </div>
          </div>

          {imageUrl && (
            <figure
              className={`w-full ${
                isRight ? "lg:order-1" : ""
              }`}
            >
              <img
                src={imageUrl}
                alt={
                  section.image?.alternativeText ||
                  section.legende ||
                  section.titre ||
                  ""
                }
                className="block h-full min-h-[420px] w-full object-cover md:min-h-[600px] lg:min-h-[720px]"
              />

              {section.legende && (
                <figcaption className="px-6 py-3 text-[11px] uppercase tracking-[0.12em] text-[#094734]/50 md:px-10">
                  {section.legende}
                </figcaption>
              )}
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}

function InformationsClesSection({
  section,
}: {
  section: InformationsClesSection;
}) {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-16">
        <div className="mb-12">
          <span className="text-[12px] font-medium tracking-[0.2em] text-[#00674F]">
            03
          </span>

          {section.titre && (
            <h2 className="mt-5 max-w-4xl text-[38px] font-medium leading-[1.05] tracking-[-0.035em] text-[#094734] md:text-[54px]">
              {section.titre}
            </h2>
          )}
        </div>

        <div className="grid border-t border-[#094734]/15 md:grid-cols-2">
          {section.informations?.map((information, index) => (
            <article
              key={
                information.id ??
                `information-${index}`
              }
              className={`border-b border-[#094734]/15 py-10 ${
                index % 2 === 0
                  ? "md:border-r md:pr-12"
                  : "md:pl-12"
              }`}
            >
              <div className="flex gap-7">
                <span className="pt-1 text-[12px] font-medium tracking-[0.15em] text-[#449383]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  {information.label && (
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#449383]">
                      {information.label}
                    </p>
                  )}

                  {information.valeur && (
                    <p className="mt-3 text-[30px] font-medium leading-tight text-[#094734] md:text-[38px]">
                      {information.valeur}
                    </p>
                  )}

                  {information.description && (
                    <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#094734]/70">
                      {information.description}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ListeNumeroteeSection({
  section,
}: {
  section: ListeNumeroteeSection;
}) {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-20">
          <div>
            <span className="text-[12px] font-medium tracking-[0.2em] text-[#00674F]">
              04
            </span>

            {section.titre && (
              <h2 className="mt-5 text-[38px] font-medium leading-[1.05] tracking-[-0.035em] text-[#094734] md:text-[50px]">
                {section.titre}
              </h2>
            )}
          </div>

          <div className="lg:col-span-3">
            <div className="grid border-t border-[#094734]/15 md:grid-cols-2">
              {section.elements?.map((element, index) => (
                <article
                  key={
                    element.id ??
                    `${element.numero ?? "item"}-${index}`
                  }
                  className={`border-b border-[#094734]/15 py-9 ${
                    index % 2 === 0
                      ? "md:border-r md:pr-10"
                      : "md:pl-10"
                  }`}
                >
                  <div className="flex gap-6">
                    <span className="text-[28px] font-medium leading-none tracking-[-0.04em] text-[#00674F]">
                      {String(
                        element.numero ?? index + 1
                      ).padStart(2, "0")}
                    </span>

                    <div>
                      {element.titre && (
                        <h3 className="text-[20px] font-medium leading-tight text-[#094734]">
                          {element.titre}
                        </h3>
                      )}

                      {element.description && (
                        <p className="mt-3 text-[15px] leading-7 text-[#094734]/70">
                          {element.description}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CitationSection({
  section,
}: {
  section: CitationSection;
}) {
  const isGreen = section.fond === "vert";

  return (
    <section
      className={`w-full py-24 md:py-32 ${
        isGreen
          ? "bg-[#00674F] text-white"
          : "bg-white text-[#094734]"
      }`}
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 text-center md:px-10">
        <div
          className={`mx-auto mb-8 h-px w-16 ${
            isGreen
              ? "bg-white/40"
              : "bg-[#00674F]/30"
          }`}
        />

        {section.citation && (
          <blockquote className="text-[34px] font-medium leading-[1.18] tracking-[-0.03em] md:text-[50px] lg:text-[60px]">
            “{section.citation}”
          </blockquote>
        )}

        {section.auteur && (
          <p
            className={`mt-8 text-[11px] font-medium uppercase tracking-[0.2em] ${
              isGreen
                ? "text-white/65"
                : "text-[#094734]/50"
            }`}
          >
            — {section.auteur}
          </p>
        )}
      </div>
    </section>
  );
}

function MediaLargeSection({
  section,
}: {
  section: MediaLargeSection;
}) {
  const imageUrl = getImageUrl(section.image);

  if (!imageUrl) return null;

  const panoramic = section.format === "panoramique";

  return (
    <section className="w-full bg-white py-10 md:py-16">
      <figure className="w-full">
        <img
          src={imageUrl}
          alt={
            section.alt ||
            section.image?.alternativeText ||
            ""
          }
          className={`block w-full object-cover ${
            panoramic
              ? "max-h-[780px]"
              : "mx-auto max-h-[700px] max-w-[1400px]"
          }`}
        />

        {section.legende && (
          <figcaption
            className={`mt-4 px-6 text-[11px] uppercase tracking-[0.12em] text-[#094734]/50 ${
              panoramic
                ? ""
                : "mx-auto max-w-[1400px] md:px-10 lg:px-16"
            }`}
          >
            {section.legende}
          </figcaption>
        )}
      </figure>
    </section>
  );
}

function CTASection({
  section,
  locale,
}: {
  section: CTASectionData;
  locale: string;
}) {
  const isGreen = section.fond === "vert";

  return (
    <section
      className={`w-full py-24 md:py-32 ${
        isGreen
          ? "bg-[#00674F] text-white"
          : "bg-white text-[#094734]"
      }`}
    >
      <div className="mx-auto w-full max-w-[1100px] px-6 text-center md:px-10">
        {section.surtitre && (
          <p
            className={`mb-5 text-[11px] font-medium uppercase tracking-[0.22em] ${
              isGreen
                ? "text-white/65"
                : "text-[#449383]"
            }`}
          >
            {section.surtitre}
          </p>
        )}

        {section.titre && (
          <h2 className="text-[40px] font-medium leading-[1.05] tracking-[-0.035em] md:text-[58px]">
            {section.titre}
          </h2>
        )}

        {section.description && (
          <p
            className={`mx-auto mt-7 max-w-2xl text-[17px] leading-8 ${
              isGreen
                ? "text-white/75"
                : "text-[#094734]/70"
            }`}
          >
            {section.description}
          </p>
        )}

        {section.libelle_bouton && section.lien && (
          <Link
            href={getLocalizedUrl(
              section.lien,
              locale
            )}
            className={`mt-9 inline-flex rounded-full px-8 py-4 text-[13px] font-medium transition-transform duration-300 hover:-translate-y-0.5 ${
              isGreen
                ? "bg-white text-[#00674F]"
                : "bg-[#00674F] text-white"
            }`}
          >
            {section.libelle_bouton}
          </Link>
        )}
      </div>
    </section>
  );
}

export default function ArticleSections({
  sections,
  locale,
}: ArticleSectionsProps) {
  if (!sections?.length) {
    return null;
  }

  let editorialNumber = 1;

  return (
    <div className="w-full bg-white">
      {sections.map((section, index) => {
        const key = `${section.__component}-${section.id ?? "section"}-${index}`;

        switch (section.__component) {
          case "sections.section-editoriale": {
            const number = editorialNumber;
            editorialNumber += 1;

            return (
              <EditorialSection
                key={key}
                section={section}
                number={number}
              />
            );
          }

          case "sections.informations-cles":
            return (
              <InformationsClesSection
                key={key}
                section={section}
              />
            );

          case "sections.liste-numerotee":
            return (
              <ListeNumeroteeSection
                key={key}
                section={section}
              />
            );

          case "sections.citation":
            return (
              <CitationSection
                key={key}
                section={section}
              />
            );

          case "sections.media-large":
            return (
              <MediaLargeSection
                key={key}
                section={section}
              />
            );

          case "sections.cta":
            return (
              <CTASection
                key={key}
                section={section}
                locale={locale}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
