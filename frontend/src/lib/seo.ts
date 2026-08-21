import { Metadata } from "next";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  canonical?: string;
  robots?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphImage?: {
    url: string;
  };
}

export function generateSeoMetadata(
  seo: SEO | null,
  locale: "fr" | "ar",
  path: string
): Metadata {
  const image = seo?.openGraphImage?.url
    ? `${STRAPI_URL}${seo.openGraphImage.url}`
    : undefined;

  return {
    title: seo?.metaTitle || "TAQÈS",

    description:
      seo?.metaDescription ||
      "TAQÈS - Développement territorial et projets immobiliers.",

    keywords: seo?.keywords
      ? seo.keywords.split(",").map((keyword) => keyword.trim())
      : undefined,

    robots: seo?.robots || "index,follow",

    alternates: {
      canonical:
        seo?.canonical ||
        `${SITE_URL}/${locale}${path}`,

      languages: {
        fr: `${SITE_URL}/fr${path}`,
        ar: `${SITE_URL}/ar${path}`,
      },
    },

    openGraph: {
      title:
        seo?.openGraphTitle ||
        seo?.metaTitle ||
        "TAQÈS",

      description:
        seo?.openGraphDescription ||
        seo?.metaDescription ||
        "TAQÈS - Développement territorial et projets immobiliers.",

      url: `${SITE_URL}/${locale}${path}`,

      siteName: "TAQÈS",

      locale: locale === "fr" ? "fr_FR" : "ar_MA",

      type: "website",

      images: image
        ? [
            {
              url: image,
            },
          ]
        : [],
    },
  };
}