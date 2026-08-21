import type { Metadata } from "next";

import { getContactPage } from "@/lib/strapi";
import { generateSeoMetadata } from "@/lib/seo";
import RichText from "@/components/RichText";
import ContactTabs from "@/components/Contact/ContactTabs";
import ContactForm from "@/components/Contact/ContactForm";

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

  const page = await getContactPage(locale);
  const hero = page.data?.Hero;

  // TODO: your Contact schema doesn't expose phone/email/address fields
  // directly (they may live inside the "Selection" component you have —
  // share its field list and I'll wire these up to Strapi instead of
  // hardcoding them from the mockup).
  const coordonnees = {
    telephone: "06 61 442 442",
    email: "contact@taqes.ma",
    adresse: "Immeuble Yamna, 5ᵉ étage, Bd Moulay Ismail, Salé 11000 – Maroc",
    horaires: "Lundi – Vendredi : 9h00 – 18h00",
  };

  return (
    <main>
      <section className="relative min-h-[380px] overflow-hidden">
        {hero?.imagedesktop && (
          <img
            src={`${STRAPI_URL}${hero.imagedesktop.url}`}
            alt={hero.imagedesktop.alternativeText || hero.titre}
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

      <section className="bg-white px-6 py-14 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <ContactTabs locale={locale} active="contact" />

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <h2 className="mb-6 text-2xl font-semibold text-[#094734]">
                Nos coordonnées
              </h2>

              <ul className="space-y-6">
                <li className="flex items-start gap-3">
                  <span aria-hidden>📞</span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-[#094734]/50">
                      Téléphone
                    </p>
                    <p className="text-sm text-[#094734]">
                      {coordonnees.telephone}
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span aria-hidden>✉️</span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-[#094734]/50">
                      Email
                    </p>
                    <p className="text-sm text-[#094734]">
                      {coordonnees.email}
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span aria-hidden>📍</span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-[#094734]/50">
                      Adresse
                    </p>
                    <p className="text-sm text-[#094734]">
                      {coordonnees.adresse}
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span aria-hidden>🕐</span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-[#094734]/50">
                      Horaires
                    </p>
                    <p className="text-sm text-[#094734]">
                      {coordonnees.horaires}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-[#EBE2DC]/40 p-6 md:p-8">
              <ContactForm locale={locale} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}