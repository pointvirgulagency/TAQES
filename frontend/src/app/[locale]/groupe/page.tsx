import type { Metadata } from "next";

import Hero from "@/components/Accueil/Hero";
import CTAFinal from "@/components/Accueil/CTAFinal";

import FonciereAlia from "@/components/Groupe/FonciereAlia";
import Chronologie from "@/components/Groupe/Chronologie";
import Transition from "@/components/Groupe/Transition";
import Vision from "@/components/Groupe/Vision";
import Mission from "@/components/Groupe/Mission";
import ChiffresCles from "@/components/Groupe/ChiffresCles";
import Gouvernance from "@/components/Groupe/Gouvernance";

import { getGroupe } from "@/lib/strapi";
import { generateSeoMetadata } from "@/lib/seo";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "fr" | "ar" }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const groupe = await getGroupe(locale);

  return generateSeoMetadata(
    groupe.data.SEO,
    locale,
    "/groupe"
  );
}

export default async function GroupePage({
  params,
}: {
  params: Promise<{ locale: "fr" | "ar" }>;
}) {
  const { locale } = await params;

  const groupe = await getGroupe(locale);

  const data = groupe.data;

  return (
    <main>
      {data.Hero && (
        <Hero
          data={data.Hero}
          strapiUrl={STRAPI_URL}
        />
      )}

      {data.foncierealia && (
        <FonciereAlia
          data={data.foncierealia}
          strapiUrl={STRAPI_URL}
        />
      )}

      {data.chrono && (
        <Chronologie
          data={data.chrono}
          strapiUrl={STRAPI_URL}
        />
      )}

      {data.transition && (
        <Transition
          data={data.transition}
          strapiUrl={STRAPI_URL}
        />
      )}

      {data.vision && (
        <Vision
          data={data.vision}
          strapiUrl={STRAPI_URL}
        />
      )}

      {data.mission && (
        <Mission
          data={data.mission}
          strapiUrl={STRAPI_URL}
        />
      )}

      {data.chiffrescles && (
        <ChiffresCles
          data={data.chiffrescles}
        />
      )}

      {data.gouvernance && (
        <Gouvernance
          data={data.gouvernance}
          strapiUrl={STRAPI_URL}
        />
      )}

      {data.CTAFinal && (
        <CTAFinal
          data={data.CTAFinal}
        />
      )}
    </main>
  );
}