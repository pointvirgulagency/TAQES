import type { Metadata } from "next";

import { getContactPage, getProjects } from "@/lib/strapi";
import { generateSeoMetadata } from "@/lib/seo";
import RichText from "@/components/RichText";
import ContactSection from "@/components/Contact/ContactSection";

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
    title: p.title ?? p.Title ?? p.nom ?? `Projet #${p.id}`,
  }));

  const coordonnees = {
    telephone: "06 61 442 442",
    email: "contact@taqes.ma",
    adresse:
      "Immeuble Yamna, 5ᵉ étage, Bd Moulay Ismail, Salé 11000 – Maroc",
    horaires: "Lundi – Vendredi : 9h00 – 18h00",
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[380px] overflow-hidden">
        {hero?.imagedesktop && (
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
        )}

        <div className="absolute inset-0 bg-[#094734]/50" />

        <div className="relative z-10 mx-auto flex min-h-[380px] max-w-7xl items-end px-6 py-16 md:px-10 lg:px-16 lg:py-20">
          <div className="max-w-2xl text-white">
            {hero?.surtitre && (
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#EBE2DC]">
                {hero.surtitre}
              </p>
            )}

            <h1 className="text-5xl font-semibold leading-tight md:text-6xl">
              {hero?.titre || "Contactez-nous"}
            </h1>

            {hero?.description && (
              <div className="mt-4 max-w-xl text-lg leading-8 text-white/85">
                <RichText content={hero.description} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Grid Section */}
      <section className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-16">
        <ContactSection
          locale={locale}
          projects={projects}
          coordonnees={coordonnees}
        />
      </section>
    </main>
  );
}