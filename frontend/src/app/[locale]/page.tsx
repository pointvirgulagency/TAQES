import type { Metadata } from "next";

import Hero from "@/components/Accueil/Hero";
import NouvelleIdentite from "@/components/Accueil/NouvelleIdentite";
import ProjetsMisEnAvant from "@/components/Accueil/ProjetsMisEnAvant";
import Territoires from "@/components/Accueil/Territoires";
import NotreApproche from "@/components/Accueil/NotreApproche";
import Actualites from "@/components/Accueil/Actualites";
import CTAFinal from "@/components/Accueil/CTAFinal";

import { getAccueil } from "@/lib/strapi";
import { generateSeoMetadata } from "@/lib/seo";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fr" | "ar" }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const accueil = await getAccueil(locale);

  return generateSeoMetadata(
    accueil.data.SEO,
    locale,
    ""
  );
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: "fr" | "ar" }>;
}) {
  const { locale } = await params;

  const accueil = await getAccueil(locale);

  const hero = accueil.data.Hero;
  const nouvelleIdentite = accueil.data.Nouvelle_Identite;
  const projets = accueil.data.Projets_Mis_En_Avant;
  const territoires = accueil.data.Territoires;
  const approche = accueil.data.NotreApproche;
  const actualites = accueil.data.Actualites;
  const ctaFinal = accueil.data.CTAFinal;

  const titreTerritoires = accueil.data.titreTerritoires;
  const titreApproche = accueil.data.titreApproche;
  const titreActualites = accueil.data.titreActualites;

  return (
    <main>
      {hero && (
        <Hero
          data={hero}
          strapiUrl={STRAPI_URL}
        />
      )}

      {nouvelleIdentite && (
        <NouvelleIdentite
          data={nouvelleIdentite}
          strapiUrl={STRAPI_URL}
        />
      )}

      {projets && (
        <ProjetsMisEnAvant
          data={projets}
          strapiUrl={STRAPI_URL}
        />
      )}

      {territoires && (
        <Territoires
          titre={titreTerritoires}
          data={territoires}
        />
      )}

      {approche && (
        <NotreApproche
          titre={titreApproche}
          data={approche}
          strapiUrl={STRAPI_URL}
        />
      )}

      {actualites && (
        <Actualites
          titre={titreActualites}
          data={actualites}
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