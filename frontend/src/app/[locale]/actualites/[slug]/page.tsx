import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/strapi";
import RichText from "@/components/RichText";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;

type Locale = "fr" | "ar";

interface StrapiImage {
  url: string;
  alternativeText?: string | null;
}

interface RichTextChild {
  type?: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
}

interface RichTextBlock {
  type?: string;
  level?: number;
  format?: string;
  children?: RichTextChild[];
}

interface Projet {
  id: number;
  documentId?: string;
  nom?: string;
  titre?: string;
  slug?: string;
}

interface Article {
  id: number;
  documentId?: string;
  titre: string;
  h1?: string;
  slug: string;
  categorie?: string;
  Date?: string;
  contenu?: string | RichTextBlock[] | null;
  extrait?: string | null;
  meta_description?: string | null;
  mot_cle_principal?: string | null;
  mots_cles?: string | null;
  featured?: boolean;
  image?: StrapiImage | null;
  cta_label?: string | null;
  cta_url?: string | null;
  cta_secondaire_label?: string | null;
  cta_secondaire_url?: string | null;
  projets_lies?: Projet[] | null;
  mention_editoriale?: string | null;
}

function getImageUrl(image?: StrapiImage | null) {
  if (!image?.url) return undefined;
  if (image.url.startsWith("http")) return image.url;
  return `${STRAPI_URL}${image.url}`;
}

function formatDate(date: string | undefined, locale: Locale) {
  if (!date) return "";
  try {
    return new Intl.DateTimeFormat(locale === "ar" ? "ar-MA" : "fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  } catch {
    return date;
  }
}

function getArticleDescription(article: Article) {
  if (article.meta_description) return article.meta_description;
  if (article.extrait) return article.extrait;
  if (!article.contenu) return "";

  if (typeof article.contenu === "string") {
    return article.contenu.slice(0, 160);
  }

  if (!Array.isArray(article.contenu)) return "";

  const text = article.contenu
    .flatMap((block) => (block?.children ?? []).map((child) => child?.text ?? ""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  return text.slice(0, 160);
}

function getLocalizedUrl(url: string | null | undefined, locale: Locale) {
  if (!url) return undefined;

  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("#")) {
    return url;
  }

  if (url.startsWith(`/${locale}/`)) return url;
  if (url.startsWith("/")) return `/${locale}${url}`;

  return `/${locale}/${url}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = (await getArticleBySlug(locale, slug)) as Article | null;

  if (!article) {
    return {
      title: "Actualité",
    };
  }

  const description = getArticleDescription(article);
  const imageUrl = getImageUrl(article.image);
  const canonicalUrl = `/${locale}/actualites/${article.slug}`;

  return {
    title: article.titre,
    description,
    keywords: article.mots_cles
      ? article.mots_cles.split(",").map((keyword) => keyword.trim()).filter(Boolean)
      : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.titre,
      description,
      type: "article",
      publishedTime: article.Date,
      url: canonicalUrl,
      locale,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: article.image?.alternativeText || article.h1 || article.titre,
            },
          ]
        : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = (await getArticleBySlug(locale, slug)) as Article | null;

  if (!article) notFound();

  const direction = locale === "ar" ? "rtl" : "ltr";
  const imageUrl = getImageUrl(article.image);
  const primaryCtaUrl = getLocalizedUrl(article.cta_url, locale);
  const secondaryCtaUrl = getLocalizedUrl(article.cta_secondaire_url, locale);
  const formattedDate = formatDate(article.Date, locale);
  const backArrow = direction === "rtl" ? "→" : "←";
  const forwardArrow = direction === "rtl" ? "←" : "→";
  const hoverTranslate = direction === "rtl" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1";
  const backHoverTranslate = direction === "rtl" ? "group-hover:translate-x-1" : "group-hover:-translate-x-1";

  return (
    <main dir={direction} className="min-h-screen bg-[#F4EFE9]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#094734]/15">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-[#00674F]/[0.06] blur-3xl md:h-96 md:w-96"
        />
        <div className="mx-auto max-w-[1400px] px-6 pt-20 pb-12 md:px-10 md:pt-24 md:pb-16 lg:px-14 lg:pt-28 lg:pb-20">
          <Link
            href={`/${locale}/actualites`}
            className="group mb-10 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-[#094734]/55 transition-colors hover:text-[#00674F]"
          >
            <span className={`inline-block transition-transform duration-300 ${backHoverTranslate}`}>
              {backArrow}
            </span>
            {locale === "ar" ? "العودة إلى الأخبار" : "Retour aux actualités"}
          </Link>

          <div className="flex flex-col gap-6">
            {article.categorie && (
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#00674F]/30 bg-[#00674F]/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#00674F]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00674F]" />
                {article.categorie}
              </span>
            )}

            <h1 className="max-w-5xl font-serif text-4xl leading-[1.1] tracking-tight text-[#094734] md:text-5xl lg:text-[3.75rem]">
              {article.h1 || article.titre}
            </h1>

            {formattedDate && (
              <time
                dateTime={article.Date}
                className="flex items-center gap-2 text-xs font-medium tracking-wide text-[#094734]/45"
              >
                {formattedDate}
              </time>
            )}
          </div>
        </div>
      </section>

      {/* Featured image */}
      {imageUrl && (
        <section>
          <div className="mx-auto max-w-[1400px] px-6 pt-8 md:px-10 md:pt-10 lg:px-14">
            <div className="group overflow-hidden rounded-md shadow-[0_20px_60px_-25px_rgba(9,71,52,0.35)]">
              <img
                src={imageUrl}
                alt={article.image?.alternativeText || article.h1 || article.titre}
                className="h-auto max-h-[700px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </section>
      )}

      {/* Body */}
      <article className="mx-auto max-w-[1400px] px-6 py-14 md:px-10 md:py-16 lg:px-14 lg:py-20">
        <div className="max-w-6xl">
          {article.extrait && (
            <p className="mb-12 max-w-4xl border-l-2 border-[#00674F] pl-6 font-serif text-xl italic leading-relaxed text-[#094734] md:text-2xl">
              {article.extrait}
            </p>
          )}

          {article.contenu && (
            <div className="md:columns-2 md:gap-14 lg:gap-20">
              <RichText
                content={article.contenu}
                className="leading-relaxed text-[#094734]/85 [&>h1]:break-inside-avoid [&>h2]:break-inside-avoid [&>h3]:break-inside-avoid [&>h4]:break-inside-avoid [&>h5]:break-inside-avoid [&>h6]:break-inside-avoid [&>p]:break-inside-avoid [&>p]:mb-5"
              />
            </div>
          )}

          {(article.mention_editoriale ||
            article.cta_label ||
            article.cta_secondaire_label ||
            (article.projets_lies && article.projets_lies.length > 0)) && (
            <aside className="mt-16 border-t border-[#094734]/15 pt-10">
              {article.mention_editoriale && (
                <p className="mb-8 max-w-3xl text-sm leading-relaxed text-[#094734]/55">
                  {article.mention_editoriale}
                </p>
              )}

              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                {article.cta_label && primaryCtaUrl && (
                  <Link
                    href={primaryCtaUrl}
                    className="group inline-flex items-center justify-center gap-3 rounded-sm bg-[#094734] px-7 py-4 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-[#00674F] hover:shadow-md"
                  >
                    {article.cta_label}
                    <span className={`inline-block transition-transform duration-300 ${hoverTranslate}`}>
                      {forwardArrow}
                    </span>
                  </Link>
                )}

                {article.cta_secondaire_label && secondaryCtaUrl && (
                  <Link
                    href={secondaryCtaUrl}
                    className="group inline-flex items-center justify-center gap-3 rounded-sm border border-[#094734]/30 px-7 py-4 text-sm font-medium text-[#094734] transition-all duration-300 hover:border-[#094734] hover:bg-[#094734] hover:text-white"
                  >
                    {article.cta_secondaire_label}
                    <span className={`inline-block transition-transform duration-300 ${hoverTranslate}`}>
                      {forwardArrow}
                    </span>
                  </Link>
                )}
              </div>

              {article.projets_lies && article.projets_lies.length > 0 && (
                <section className="mt-16">
                  <h2 className="mb-7 flex items-center gap-3 font-serif text-2xl text-[#094734] md:text-3xl">
                    Projets associés
                    <span className="h-px flex-1 bg-[#094734]/15" />
                  </h2>

                  <div className="grid max-w-3xl gap-3 sm:grid-cols-2">
                    {article.projets_lies.map((projet) => {
                      const projectSlug = projet.slug;
                      const projectName = projet.nom || projet.titre || "Projet";

                      if (!projectSlug) {
                        return (
                          <div
                            key={projet.id}
                            className="rounded-sm border border-[#094734]/15 bg-white/40 p-5"
                          >
                            <span className="text-sm font-medium text-[#094734]">{projectName}</span>
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={projet.id}
                          href={`/${locale}/projets/${projectSlug}`}
                          className="group flex items-center justify-between rounded-sm border border-[#094734]/15 bg-white/40 p-5 transition-all duration-300 hover:border-[#094734] hover:bg-[#094734] hover:text-white hover:shadow-md"
                        >
                          <span className="text-sm font-medium">{projectName}</span>
                          <span className={`inline-block transition-transform duration-300 ${hoverTranslate}`}>
                            {forwardArrow}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              )}
            </aside>
          )}
        </div>
      </article>

      {/* Footer nav */}
      <section className="border-t border-[#094734]/15">
        <div className="mx-auto max-w-[1400px] px-6 py-8 md:px-10 lg:px-14">
          <Link
            href={`/${locale}/actualites`}
            className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-[#094734] transition-colors hover:text-[#00674F]"
          >
            <span className={`inline-block transition-transform duration-300 ${backHoverTranslate}`}>
              {backArrow}
            </span>
            {locale === "ar" ? "جميع الأخبار" : "Toutes les actualités"}
          </Link>
        </div>
      </section>
    </main>
  );
}