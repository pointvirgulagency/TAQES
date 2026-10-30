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
  const { parcours } = await searchParams;

  const strapiLocale: "fr" | "ar" =
    locale === "ar" ? "ar" : "fr";

  const isArabic = locale === "ar";

  const contactPage = await getContactPage(strapiLocale);
  const lastSection = contactPage?.data?.last_section;

  const initialType =
    parcours === "foncier" || parcours === "partenariat"
      ? parcours
      : "foncier";

  const content = {
    fr: {
      eyebrow: "COLLABORONS AUTREMENT",
      title: "Opportunités &\nPartenariats",
      description:
        "Vous détenez un foncier, identifiez une opportunité ou souhaitez construire un partenariat avec TAQÈS ? Choisissez le parcours qui correspond à votre démarche.",
      categories: [
        "TERRAINS",
        "PROJETS",
        "TERRITOIRES DE DEMAIN",
      ],
    },
    ar: {
      eyebrow: "لنتعاون بأسلوب مختلف",
      title: "الفرص\nوالشراكات",
      description:
        "هل تمتلكون أرضًا، أو حددتم فرصة استثمارية، أو ترغبون في بناء شراكة مع TAQÈS؟ اختاروا المسار الذي يناسب مبادرتكم.",
      categories: [
        "الأراضي",
        "المشاريع",
        "مناطق المستقبل",
      ],
    },
  } as const;

  const t = content[locale];

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      lang={locale}
      className="min-h-screen bg-[#F5F2EC]"
    >
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-24 text-white">
        <Image
          src="/img_1.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-[#094734]/50" />

        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] opacity-10 [background-size:16px_16px]" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-between gap-10 px-6 pt-12 md:flex-row md:items-center md:px-10 lg:px-16">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-white/40" />

              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80">
                {t.eyebrow}
              </p>
            </div>

            <h1 className="mt-6 whitespace-pre-line font-serif text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
              {t.title}
            </h1>

            <p className="mt-6 text-sm leading-relaxed text-white/75">
              {t.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D9B77C]">
              {t.categories.map((category, index) => (
                <span
                  key={category}
                  className="inline-flex items-center gap-3"
                >
                  {category}

                  {index !== t.categories.length - 1 && (
                    <span aria-hidden="true">•</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OPPORTUNITIES SECTION */}
      <OpportunitesSection
        locale={locale}
        initialType={initialType}
      />

      {/* LAST SECTION */}
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
                <div className="grid flex-1 gap-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-[#094734]/15 sm:rtl:divide-x-reverse">
                  {lastSection.pillars.map(
                    (pillar: any, index: number) => (
                      <div
                        key={pillar.id ?? index}
                        className="flex flex-col items-start sm:px-8 first:sm:ps-0 last:sm:pe-0"
                      >
                        {pillar.icon?.url && (
                          <div className="relative mb-6 h-10 w-10">
                            <Image
                              src={
                                pillar.icon.url.startsWith("http")
                                  ? pillar.icon.url
                                  : `${strapiUrl}${pillar.icon.url}`
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
