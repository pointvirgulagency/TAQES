"use client";

import { useEffect, useState } from "react";
import type { Article, Locale } from "./ArticleTypes";

interface ArticleAuthorProps {
  article: Article & {
    auteur_logo?: {
      url?: string;
      alternativeText?: string | null
    } | null;
    auteur_subtitle?: string | null;
  };
  locale: Locale;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

function getImageUrl(url?: string | null): string | null {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${STRAPI_URL}${url}`;
}

export default function ArticleAuthor({ article, locale }: ArticleAuthorProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  // Populate window.location AFTER initial hydration completes
  useEffect(() => {
    setShareUrl(encodeURIComponent(window.location.href));
  }, []);

  if (!article.auteur) {
    return null;
  }

  const logoUrl = getImageUrl(article.auteur_logo?.url);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="border-t border-[#094734]/10 bg-[#FBF9F5]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-10 lg:px-14">
        {/* Left Side: Logo + Author Details */}
        <div className="flex items-center gap-4">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={article.auteur_logo?.alternativeText || article.auteur}
              className="h-12 w-12 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EBE2DC] text-base font-bold text-[#094734]">
              {article.auteur.charAt(0)}
            </div>
          )}

          <div>
            <p className="text-sm font-bold text-[#094734]">
              {locale === "ar" ? `نُشر بواسطة ${article.auteur}` : `Publié par ${article.auteur}`}
            </p>

            {article.auteur_subtitle && (
              <p className="mt-0.5 text-xs text-[#094734]/60">
                {article.auteur_subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="hidden h-8 w-px bg-[#094734]/15 md:block" />

        {/* Right Side: Social Shares */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-[#094734]/60">
            {locale === "ar" ? "مشاركة هذا المقال" : "Partager cet article"}
          </span>

          <div className="flex items-center gap-2">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EBE2DC] text-[#094734] transition hover:bg-[#094734] hover:text-white"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>

            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EBE2DC] text-[#094734] transition hover:bg-[#094734] hover:text-white"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
              </svg>
            </a>

            <button
              type="button"
              onClick={handleCopyLink}
              aria-label="Copy link"
              className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#EBE2DC] text-[#094734] transition hover:bg-[#094734] hover:text-white"
            >
              <svg
                className="h-4 w-4 stroke-current fill-none stroke-2"
                viewBox="0 0 24 24"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>

              {copied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-[#094734] px-2 py-1 text-[10px] text-white">
                  {locale === "ar" ? "تم النسخ" : "Copié!"}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}