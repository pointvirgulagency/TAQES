import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getArticleBySlug } from "@/lib/strapi";

import ArticleHero from "@/components/Actualites/ArticleHero";
import ArticleNavigation from "@/components/Actualites/ArticleNavigation";
import ArticleIntroduction from "@/components/Actualites/ArticleIntroduction";
import ArticleEditorialSection from "@/components/Actualites/ArticleEditorialSection";
import ArticleKeyInformation from "@/components/Actualites/ArticleKeyInformation";
import ArticleNumberedList from "@/components/Actualites/ArticleNumberedList";
import ArticleQuote from "@/components/Actualites/ArticleQuote";
import ArticleLargeMedia from "@/components/Actualites/ArticleLargeMedia";
import ArticleCTA from "@/components/Actualites/ArticleCTA";
import ArticleAuthor from "@/components/Actualites/ArticleAuthor";
import ArticleRelated from "@/components/Actualites/ArticleRelated";
import ArticleNewsletter from "@/components/Actualites/ArticleNewsletter";

import type {
  Article,
  Locale,
} from "@/components/Actualites/ArticleTypes";

import {
  getImageUrl,
} from "@/components/Actualites/article-utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  const article = (await getArticleBySlug(
    locale,
    slug
  )) as Article | null;

  if (!article) {
    return {
      title: "Actualité",
    };
  }

  const title =
    article.SEO?.metaTitle ||
    article.titre;

  const description =
    article.SEO?.metaDescription ||
    article.introduction ||
    article.titre;

  const imageUrl = getImageUrl(article.image);

  const canonical =
    article.SEO?.canonical ||
    `/${locale}/actualites/${article.slug}`;

  const keywords = article.SEO?.keywords
    ? article.SEO.keywords
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean)
    : undefined;

  return {
    title,
    description,
    keywords,
    robots: article.SEO?.robots || undefined,

    alternates: {
      canonical,
    },

    openGraph: {
      title:
        article.SEO?.openGraphTitle ||
        title,

      description:
        article.SEO?.openGraphDescription ||
        description,

      type: "article",

      publishedTime: article.Date,

      url: canonical,

      locale,

      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt:
                article.image?.alternativeText ||
                article.titre,
            },
          ]
        : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}) {
  const { locale, slug } = await params;

  const article = (await getArticleBySlug(
    locale,
    slug
  )) as Article | null;

  if (!article) {
    notFound();
  }

  const sections = article.sections ?? [];

  return (
    <main
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-white"
    >
      <ArticleHero
        article={article}
        locale={locale}
      />

      <ArticleNavigation
        locale={locale}
      />

      <ArticleIntroduction
        article={article}
        locale={locale}
      />

      <div>
        {sections.map((section, index) => {
          const sectionKey =
            section.id != null
              ? `article-section-${section.__component}-${section.id}`
              : `article-section-${section.__component}-${index}`;

          switch (section.__component) {
            case "sections.section-editoriale":
              return (
                <ArticleEditorialSection
                  key={sectionKey}
                  section={section}
                  number={index + 1}
                />
              );

            case "sections.informations-cles":
              return (
                <ArticleKeyInformation
                  key={sectionKey}
                  section={section}
                />
              );

            case "sections.liste-numerotee":
              return (
                <ArticleNumberedList
                  key={sectionKey}
                  section={section}
                  number={index + 1}
                />
              );

            case "sections.citation":
              return (
                <ArticleQuote
                  key={sectionKey}
                  section={section}
                />
              );

            case "sections.media-large":
              return (
                <ArticleLargeMedia
                  key={sectionKey}
                  section={section}
                />
              );

            case "sections.cta":
              return (
                <ArticleCTA
                  key={sectionKey}
                  section={section}
                  locale={locale}
                />
              );

            default:
              return null;
          }
        })}
      </div>

      <ArticleAuthor
        article={article}
        locale={locale}
      />

      <ArticleRelated
        articles={article.articles_associes ?? []}
        projects={article.projects ?? []}
        locale={locale}
      />

    </main>
  );
}