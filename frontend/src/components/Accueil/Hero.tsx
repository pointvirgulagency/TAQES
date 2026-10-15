"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

type HeroProps = {
  data: {
    surtitre?: string;
    titre: string;
    description?:
      | string
      | {
          type: string;
          children: {
            type: string;
            text: string;
          }[];
        }[];
    Libellebouton1: string;
    lienbouton1?: string;
    libelleboutonprincipal: string;
    lienboutonprincipal?: string;
    imagedesktop?: {
      url: string;
      alternativeText?: string;
    };
    imagemobile?: {
      url: string;
    };
    video?: {
      url: string;
    };
    imageposter?: {
      url: string;
    };
    Territoires?: string;
  };
  strapiUrl: string;
  showOverlay?: boolean;
};

export default function Hero({
  data,
  strapiUrl,
  showOverlay = true,
}: HeroProps) {
  const params = useParams();
  const locale = (params?.locale as string) || "fr";

  const baseStrapiUrl = strapiUrl.replace(/\/$/, "");

  const localize = (href?: string) => {
    if (!href) return "#";

    if (
      /^(https?:)?\/\//.test(href) ||
      /^(mailto:|tel:)/.test(href)
    ) {
      return href;
    }

    const path = href.startsWith("/") ? href : `/${href}`;

    return `/${locale}${path}`;
  };

  const desktopImage = data.imagedesktop
    ? `${baseStrapiUrl}${data.imagedesktop.url}`
    : "";

  const mobileImage = data.imagemobile
    ? `${baseStrapiUrl}${data.imagemobile.url}`
    : desktopImage;

  const video = data.video
    ? `${baseStrapiUrl}${data.video.url}`
    : undefined;

  const videoPoster = data.imageposter
    ? `${baseStrapiUrl}${data.imageposter.url}`
    : undefined;

  return (
    <section className="relative isolate min-h-screen overflow-hidden">
      <picture className="absolute inset-0">
        <source media="(max-width:768px)" srcSet={mobileImage} />

        {desktopImage && (
          <img
            src={desktopImage}
            alt={data.imagedesktop?.alternativeText ?? "TAQÈS"}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        )}
      </picture>

      {video && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={videoPoster}
        >
          <source src={video} type="video/mp4" />
        </video>
      )}

      {showOverlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#094734]/40 via-[#094734]/60 to-[#094734]/90" />
      )}

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 md:px-10 lg:px-16">
        <div className="w-full max-w-3xl text-left rtl:ml-auto rtl:text-right">
          {data.surtitre && (
            <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#EBE2DC]/80">
              {data.surtitre}
            </p>
          )}

          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-[#EBE2DC] md:text-4xl lg:text-5xl">
            {data.titre}
          </h1>

          {data.description && (
            <div className="mt-8 max-w-2xl space-y-4 text-lg leading-8 text-[#EBE2DC]/80 md:text-xl">
              {typeof data.description === "string" ? (
                <p>{data.description}</p>
              ) : (
                data.description.map((block, index) => (
                  <p key={index}>
                    {block.children
                      .map((child) => child.text)
                      .join("")}
                  </p>
                ))
              )}
            </div>
          )}

          <div className="mt-12 flex w-full flex-wrap justify-start gap-5 rtl:justify-end">
            <Link
              href={localize(data.lienbouton1)}
              className="rounded-full bg-[#00674F] px-8 py-4 font-medium text-[#EBE2DC] transition hover:bg-[#449383]"
            >
              {data.Libellebouton1}
            </Link>

            <Link
              href={localize(data.lienboutonprincipal)}
              className="rounded-full border border-[#EBE2DC]/60 px-8 py-4 font-medium text-[#EBE2DC] transition hover:bg-[#EBE2DC] hover:text-[#094734]"
            >
              {data.libelleboutonprincipal}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 z-20 w-full px-6">
        <div className="mx-auto flex max-w-7xl items-end justify-between rtl:flex-row-reverse">
          <div className="flex flex-col items-center gap-3 text-[#EBE2DC]/80">
            <div className="flex h-10 w-6 justify-center rounded-full border border-[#EBE2DC]/60">
              <span className="mt-2 h-2 w-2 animate-bounce rounded-full bg-[#EBE2DC]" />
            </div>

            <span className="text-xs uppercase tracking-[0.3em]">
              Défiler
            </span>
          </div>

          {data.Territoires && (
            <p className="hidden text-xs uppercase tracking-[0.3em] text-[#EBE2DC]/60 lg:block">
              {data.Territoires}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}