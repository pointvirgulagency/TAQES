import type { Metadata } from "next";

import Hero from "@/components/Accueil/Hero";
import NouvelleIdentite from "@/components/Accueil/NouvelleIdentite";
import ProjetsMisEnAvant from "@/components/Accueil/ProjetsMisEnAvant";
import Territoires from "@/components/Accueil/Territoires";
import NotreApproche from "@/components/Accueil/NotreApproche";
import Actualites from "@/components/Accueil/Actualites";
import CTAFinal from "@/components/Accueil/CTAFinal";
import TypologiesSection from "@/components/TypologiesSection";

import { getAccueil, getProjects } from "@/lib/strapi";
import { generateSeoMetadata } from "@/lib/seo";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;

function normalizeLocale(locale: string): "fr" | "ar" {
  if (locale === "ar" || locale.startsWith("ar-")) {
    return "ar";
  }

  return "fr";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);

  const accueil = await getAccueil(locale);

  return generateSeoMetadata(
    accueil.data?.SEO ?? null,
    locale,
    ""
  );
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);

  const [accueil, projects] = await Promise.all([
    getAccueil(locale),
    getProjects(locale),
  ]);

  const TYPOLOGIES = [
    "Foncier",
    "Appartements",
    "Villas",
    "Lots R+3",
    "Lots R+4",
    "Lots Villas",
    "Biens immobiliers",
    "Investissement",
  ];

  const TYPOLOGY_IMAGES: Record<string, string> = {
    Foncier: "/images/typologies/foncier.jpg",
    Appartements: "/images/typologies/appartements.jpg",
    Villas: "/images/typologies/villas.jpg",
    "Lots R+3": "/images/typologies/lots-r3.jpg",
    "Lots R+4": "/images/typologies/lots-r4.jpg",
    "Lots Villas": "/images/typologies/lots-villas.jpg",
    "Biens immobiliers": "/images/typologies/biens-immobiliers.jpg",
    Investissement: "/images/typologies/investissement.jpg",
  };

  const typologies = TYPOLOGIES.map((name) => ({
    name,
    image: TYPOLOGY_IMAGES[name] ?? undefined,
  }));

  const hero = accueil.data?.Hero;
  const nouvelleIdentite = accueil.data?.Nouvelle_Identite;
  const projets = accueil.data?.Projets_Mis_En_Avant;
  const territoires = accueil.data?.territoires;
  const approche = accueil.data?.NotreApproche;
  const actualites = accueil.data?.Actualites;
  const ctaFinal = accueil.data?.CTAFinal;

  const titreTerritoires = accueil.data?.titreTerritoires;
  const descriptionTerritoires =
    accueil.data?.descriptionTerritoires;

  const titreApproche = accueil.data?.titreApproche;
  const titreActualites = accueil.data?.titreActualites;

  return (
    <main>
      {hero && (
        <Hero
          data={hero}
          strapiUrl={STRAPI_URL}
        />
      )}

      <TypologiesSection
        typologies={accueil.data.typologie ?? []}
        locale={locale}
      />

      {projets && (
        <ProjetsMisEnAvant
          data={projets}
          strapiUrl={STRAPI_URL}
        />
      )}

      {nouvelleIdentite && (
        <NouvelleIdentite
          data={nouvelleIdentite}
          strapiUrl={STRAPI_URL}
        />
      )}

      {territoires && (
        <Territoires
          titre={titreTerritoires}
          descriptionTerritoires={descriptionTerritoires}
          data={territoires}
        />
      )}

      {approche && (
        <NotreApproche
          titre={titreApproche}
          data={approche}
          strapiUrl={STRAPI_URL}
          locale={locale}
        />
      )}

      {actualites && (
        <Actualites
          titre={titreActualites}
          strapiUrl={STRAPI_URL}
        />
      )}

      {ctaFinal && (
        <CTAFinal
          data={ctaFinal}
        />
      )}
    </main>
  );
}