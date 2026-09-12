import type { Metadata } from "next";

import { getContactPage, getProjects } from "@/lib/strapi";
import { generateSeoMetadata } from "@/lib/seo";
import RichText from "@/components/RichText";
import ContactSection from "@/components/Contact/ContactSection";
import Selection from "@/components/Contact/Selection";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fr" | "ar" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const page = await getContactPage(locale);

  return generateSeoMetadata(
    page.data?.SEO ?? null,
    locale,
    "/contact"
  );
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: "fr" | "ar" }>;
}) {
  const { locale } = await params;

  const [page, projectsRes] = await Promise.all([
    getContactPage(locale),
    getProjects(locale),
  ]);

  const hero = page.data?.Hero;

  const projects = (projectsRes.data ?? []).map((p: any) => ({
    id: p.id,
    title:
      p.title ??
      p.Title ??
      p.nom ??
      "Projet #" + p.id,
  }));

  const coordonnees = {
    telephone: "06 61 442 442",
    email: "contact@taqes.ma",
    adresse:
      "Immeuble Yamna, 5ᵉ étage, Bd Moulay Ismail, Salé 11000 – Maroc",
    horaires: "Lundi – Vendredi : 9h00 – 18h00",
  };

  return (
    <main className="min-h-screen bg-[#F5F2EC]">
      <section className="relative isolate min-h-[440px] overflow-hidden bg-[#0d3d2c] pt-12">
        {hero?.imagedesktop && (
          <picture className="absolute inset-0 block h-full w-full">
            {hero.imagemobile && (
              <source
                media="(max-width: 767px)"
                srcSet={`${STRAPI_URL}${hero.imagemobile.url}`}
              />
            )}

            <img
              src={`${STRAPI_URL}${hero.imagedesktop.url}`}
              alt={
                hero.imagedesktop.alternativeText ||
                hero.titre ||
                "Contact"
              }
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />
          </picture>
        )}

        <div className="absolute inset-0 bg-[#5f8a76]/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[#0d3d2c]/25" />

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.15]"
          viewBox="0 0 1000 340"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <path
            d="M0 260 C 220 200, 320 320, 560 240 C 760 175, 860 260, 1000 190"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          />
          <path
            d="M0 300 C 220 240, 320 360, 560 280 C 760 215, 860 300, 1000 230"
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
        </svg>

        <div className="relative z-10 mx-auto flex min-h-[340px] max-w-7xl flex-col justify-end px-6 py-14 md:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-16 lg:py-16">
          <div className="max-w-xl text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#EBE2DC]">
              {hero?.surtitre}
            </p>

            <div className="mb-2 h-[2px] w-10 bg-[#c2825d]" />

            <h1 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
              {hero?.titre}
            </h1>

            {hero?.description ? (
              <div className="mt-4 max-w-md text-[15px] leading-7 text-white/85">
                <RichText content={hero.description} />
              </div>
            ) : (
              <p className="mt-4 max-w-md text-[15px] leading-7 text-white/85">
                Projet immobilier, opportunité foncière, partenariat ou
                réclamation : choisissez le bon interlocuteur et
                transmettez-nous votre demande.
              </p>
            )}
          </div>

          <div
            className="mt-10 hidden shrink-0 lg:mt-0 lg:flex lg:items-end lg:self-stretch lg:pb-2"
            aria-hidden="true"
          >
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60"
              style={{ writingMode: "vertical-rl" }}
            >
              Des territoires meilleurs demain
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-16">
        <ContactSection
          locale={locale}
          projects={projects}
          coordonnees={coordonnees}
        />
      </section>

      <Selection data={page.data?.Selection ?? null} />
    </main>
  );
}