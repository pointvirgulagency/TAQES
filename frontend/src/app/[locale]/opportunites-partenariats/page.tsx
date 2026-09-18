import type { Metadata } from "next";
import Image from "next/image";
import OpportunitesSection from "@/components/Opportunites/OpportunitesSection";
import { getContactPage } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Opportunités & Partenariats | TAQÈS",
};

export default async function OpportunitesPartenariatsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: "fr" | "ar" }>;
  searchParams: Promise<{ parcours?: string }>;
}) {
  const { locale } = await params;

  const strapiLocale: "fr" | "ar" =
    locale === "ar" ? "ar" : "fr";

  const contactPage = await getContactPage(strapiLocale);
  const { parcours } = await searchParams;

  const initialType =
    parcours === "foncier" || parcours === "partenariat"
      ? parcours
      : "foncier";

  const isArabic = locale === "ar";
  const lastSection = contactPage?.data?.last_section;

  return (
    <main className="min-h-screen bg-[#F5F2EC]">
      <section className="relative overflow-hidden bg-[#094734] py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] opacity-10 [background-size:16px_16px]" />

        <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-10 px-6 pt-12 md:flex-row md:items-center md:px-10 lg:px-16">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-white/40" />

              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80">
                {isArabic
                  ? "تعاونوا معنا بأسلوب مختلف"
                  : "COLLABORONS AUTREMENT"}
              </p>
            </div>

            <h1 className="mt-6 whitespace-pre-line font-serif text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
              {isArabic
                ? "فرص وشراكات"
                : "Opportunités &\nPartenariats"}
            </h1>

            <p className="mt-6 text-sm leading-relaxed text-white/75">
              {isArabic
                ? "هل تمتلكون أرضًا، أو حددتم فرصة استثمارية، أو ترغبون في بناء شراكة مع TAQÈS؟ اختر المسار الذي يناسب جهودكم."
                : "Vous détenez un foncier, identifiez une opportunité ou souhaitez construire un partenariat avec TAQÈS ? Choisissez le parcours qui correspond à votre démarche."}
            </p>

            <div className="mt-8 flex gap-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D9B77C]">
              <span>TERRAINS</span>
              <span>•</span>
              <span>PROJETS</span>
              <span>•</span>
              <span>TERRITOIRES DE DEMAIN</span>
            </div>
          </div>

          <div className="hidden flex-col items-end justify-between self-stretch text-right md:flex">
            <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-white/20">
              <div className="h-24 w-24 rounded-bl-full border-b-2 border-l-2 border-white/40" />
            </div>

            <div className="text-[10px] tracking-widest text-white/40">
              33.5731° N
              <br />
              7.5898° W
            </div>
          </div>
        </div>
      </section>

      <OpportunitesSection
        locale={locale}
        initialType={initialType}
      />

      {lastSection && (
        <section className="bg-[#F5F2EC] px-6 py-16 md:px-12 lg:px-20">
          <div className="mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-md shrink-0">
              {lastSection.description && (
                <div className="flex items-center gap-3">
                  <span className="h-[2px] w-8 bg-[#094734]" />

                  <p className="text-xs font-semibold uppercase tracking-widest text-[#094734]/80">
                    {lastSection.description}
                  </p>
                </div>
              )}

              {lastSection.title && (
                <h2 className="mt-6 font-serif text-3xl leading-snug text-[#094734] sm:text-4xl lg:text-5xl">
                  {lastSection.title}
                </h2>
              )}
            </div>

            {Array.isArray(lastSection.pillars) &&
              lastSection.pillars.length > 0 && (
                <div className="grid flex-1 gap-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-[#094734]/15">
                  {lastSection.pillars.map(
                    (pillar: any, index: number) => (
                      <div
                        key={pillar.id ?? index}
                        className="flex flex-col items-start sm:px-8 first:sm:pl-0 last:sm:pr-0"
                      >
                        {pillar.icon?.url && (
                          <div className="relative mb-6 h-10 w-10">
                            <Image
                              src={
                                pillar.icon.url.startsWith("http")
                                  ? pillar.icon.url
                                  : `${process.env.NEXT_PUBLIC_STRAPI_URL}${pillar.icon.url}`
                              }
                              alt={
                                pillar.icon.alternativeText || ""
                              }
                              fill
                              sizes="40px"
                              className="object-contain"
                            />
                          </div>
                        )}

                        {pillar.valeur && (
                          <h3 className="font-sans text-base font-bold text-[#094734]">
                            {pillar.valeur}
                          </h3>
                        )}

                        {pillar.libelle && (
                          <p className="mt-2 text-xs leading-relaxed text-[#094734]/70">
                            {pillar.libelle}
                          </p>
                        )}
                      </div>
                    )
                  )}
                </div>
              )}
          </div>
        </section>
      )}
    </main>
  );
}