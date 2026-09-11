import type { Metadata } from "next";

import Hero from "@/components/Accueil/Hero";
import CTAFinal from "@/components/Accueil/CTAFinal";

import FonciereAlia from "@/components/Groupe/FonciereAlia";
import Chronologie from "@/components/Groupe/Chronologie";
import Transition from "@/components/Groupe/Transition";
import Mission from "@/components/Groupe/Mission";
import ChiffresCles from "@/components/Groupe/ChiffresCles";
import Gouvernance from "@/components/Groupe/Gouvernance";

import { getGroupe } from "@/lib/strapi";
import { generateSeoMetadata } from "@/lib/seo";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;

type Locale = "fr" | "ar";

interface GroupePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

interface StrapiBlock {
  type?: string;
  children?: Array<{
    type?: string;
    text?: string;
  }>;
}

function extractText(value: unknown): string {
  if (!value) return "";

  if (typeof value === "string") {
    return value;
  }

  if (!Array.isArray(value)) {
    return "";
  }

  return value
    .map((block: StrapiBlock) => {
      if (!block?.children) return "";

      return block.children
        .map((child) => child?.text ?? "")
        .join("");
    })
    .filter(Boolean)
    .join("\n\n")
    .trim();
}

function normalizeRichText<T extends Record<string, any>>(
  data: T | null | undefined
): T | null | undefined {
  if (!data) return data;

  const normalized = { ...data } as T & {
    description?: unknown;
  };

  if ("description" in normalized) {
    normalized.description = extractText(
      normalized.description
    );
  }

  return normalized;
}


export async function generateMetadata({
  params,
}: GroupePageProps): Promise<Metadata> {
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
}: GroupePageProps) {
  const { locale } = await params;

  const groupe = await getGroupe(locale);
  const data = groupe.data;

  const hero = normalizeRichText(data.Hero);
  const foncierealia = normalizeRichText(data.foncierealia);

  const vision = normalizeRichText(data.vision);
  const mission = normalizeRichText(data.mission);

  const valeurs = data.valeurs ?? [];

  const chrono = data.chrono?.map((item: any) => ({
    ...item,
    description: extractText(item.description),
  }));

  return (
    <main>
      {/* HERO */}
      {hero && (
        <Hero
          data={hero}
          strapiUrl={STRAPI_URL}
        />
      )}

      {/* FONCIÈRE ALIA */}
      {foncierealia && (
        <FonciereAlia
          data={foncierealia}
          strapiUrl={STRAPI_URL}
        />
      )}

      {/* CHRONOLOGIE */}
      {chrono && chrono.length > 0 && (
        <Chronologie
          data={chrono}
          strapiUrl={STRAPI_URL}
        />
      )}

      {/* TRANSITION */}
      {data.transition && (
        <Transition
          data={data.transition}
          strapiUrl={STRAPI_URL}
        />
      )}

      {/* VISION + MISSION + VALEURS */}
      {(vision || mission || valeurs.length > 0) && (
        <Mission
          vision={vision}
          mission={mission}
          valeurs={valeurs}
        />
      )}

      {/* CHIFFRES CLÉS */}
      {data.chiffrescles && (
        <ChiffresCles
          data={data.chiffrescles}
        />
      )}

      {/* GOUVERNANCE */}
      {data.gouvernance && (
        <Gouvernance
          data={data.gouvernance}
          strapiUrl={STRAPI_URL}
        />
      )}

      {/* CTA */}
      {data.CTAFinal && (
        <CTAFinal
          data={data.CTAFinal}
        />
      )}
    </main>
  );
}