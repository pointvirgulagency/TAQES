import type {
  Locale,
  RichTextBlock,
  StrapiImage,
} from "./ArticleTypes";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "";

export function getImageUrl(
  image?: StrapiImage | null
) {
  if (!image?.url) return "";

  if (image.url.startsWith("http")) {
    return image.url;
  }

  return `${STRAPI_URL}${image.url}`;
}

export function formatArticleDate(
  date: string | undefined,
  locale: Locale
) {
  if (!date) return "";

  try {
    return new Intl.DateTimeFormat(
      locale === "ar" ? "ar-MA" : "fr-FR",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    ).format(new Date(date));
  } catch {
    return date;
  }
}

export function getLocalizedUrl(
  url: string | null | undefined,
  locale: Locale
) {
  if (!url) return "#";

  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("#") ||
    url.startsWith("mailto:")
  ) {
    return url;
  }

  if (
    url === `/${locale}` ||
    url.startsWith(`/${locale}/`) ||
    url.startsWith(`/${locale}?`)
  ) {
    return url;
  }

  if (url.startsWith("/")) {
    return `/${locale}${url}`;
  }

  return `/${locale}/${url}`;
}

export function getRichTextPlainText(
  content?: RichTextBlock[] | null
) {
  if (!content?.length) return "";

  return content
    .map((block) =>
      (block.children || [])
        .map((child) => child.text || "")
        .join("")
    )
    .join(" ");
}