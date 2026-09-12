import type { Metadata } from "next";

import Hero from "@/components/Accueil/Hero";
import CTAFinal from "@/components/Accueil/CTAFinal";
import FonciereAlia from "@/components/Groupe/FonciereAlia";
import Chronologie from "@/components/Groupe/Chronologie";
import Mission from "@/components/Groupe/Mission";
import ChiffresCles from "@/components/Groupe/ChiffresCles";
import Territoire from "@/components/Groupe/territoire";
import BeforeFooter from "@/components/Groupe/BeforeFooter";

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



  console.log("TERRITOIRE BACKGROUND:", data.territoire_background);

  const hero = normalizeRichText(data.Hero);
  const foncierealia = normalizeRichText(data.foncierealia);

  const vision = normalizeRichText(data.vision);
  const mission = normalizeRichText(data.mission);

  const transition = normalizeRichText(data.transition);

  const valeurs = data.valeurs ?? [];

  const chrono = data.chrono?.map((item: any) => ({
    ...item,
    description: extractText(item.description),
  }));

  return (
    <main>
      {/* HERO */}
      {hero && (
        <div className="[&>section>picture>img]:scale-[1.055]">
          <Hero
            data={hero}
            strapiUrl={STRAPI_URL}
            showOverlay={false}
          />
        </div>
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

      <Mission
        vision={vision}
        mission={mission}
        transition={transition}
        valeurs={valeurs}
        strapiUrl={STRAPI_URL}
      />

      {/* CHIFFRES CLÉS */}
      {data.chiffrescles && (
        <ChiffresCles
          data={data.chiffrescles}
          chiffreeyebrow={data.chiffreeyebrow}
          chiffetitre={data.chiffetitre}
          chiffre_soustitre={data.chiffre_soustitre}
          chiffresimage={data.chiffresimage}
          strapiUrl={STRAPI_URL}
        />
      )}

      {/* TERRITOIRES */}
      {data.territoire && data.territoire.length > 0 && (
        <Territoire
          data={data}
          territoire_background={data.territoire_background}
          strapiUrl={STRAPI_URL}
        />
      )}

    </main>
  );
}