"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import ContactTabs, { DemandeType } from "./ContactTabs";
import ContactForm from "./ContactForm";

interface ContactSectionProps {
  locale: "fr" | "ar";
  projects: { id: number; title: string }[];
  coordonnees: {
    telephone: string;
    email: string;
    adresse: string;
    horaires: string;
  };
}

export default function ContactSection({
  locale,
  projects,
  coordonnees,
}: ContactSectionProps) {
  const [activeType, setActiveType] = useState<DemandeType>("contact");

  const safeCoords = coordonnees ?? {
    telephone: "",
    email: "",
    adresse: "",
    horaires: "",
  };

  return (
    <div className="grid w-full items-stretch gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="flex w-full">
        <div className="flex w-full flex-col gap-6">
          <ContactTabs
            active={activeType}
            locale={locale}
            onChange={setActiveType}
          />

          <div className="flex-1 w-full rounded-2xl border border-[#094734]/10 bg-white p-6">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#094734]/60">
              Informations directes
            </h3>

            <span className="mt-2 block h-[3px] w-9 bg-[#dc9a4d]" />

            <div className="mt-6 space-y-5 text-sm text-[#094734]/80">
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#094734]/50">
                  Téléphone
                </span>
                <a
                  href={`tel:${safeCoords.telephone}`}
                  className="mt-1 block break-words text-[15px] text-[#094734] hover:underline"
                >
                  {safeCoords.telephone}
                </a>
              </div>

              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#094734]/50">
                  Email
                </span>
                <a
                  href={`mailto:${safeCoords.email}`}
                  className="mt-1 block break-words text-[15px] text-[#094734] hover:underline"
                >
                  {safeCoords.email}
                </a>
              </div>

              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#094734]/50">
                  Adresse
                </span>

                <p className="mt-1 break-words text-[15px] leading-6 text-[#094734]">
                  {safeCoords.adresse}
                </p>

                {safeCoords.adresse && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      safeCoords.adresse
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#094734] underline underline-offset-4"
                  >
                    Ouvrir l&apos;itinéraire
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>

              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#094734]/50">
                  Horaires
                </span>

                <p className="mt-1 text-[15px] leading-6 text-[#094734]">
                  {safeCoords.horaires}
                </p>
              </div>
            </div>

            <p className="mt-8 border-t border-[#094734]/10 pt-5 text-xs leading-5 text-[#094734]/50">
              Notre équipe vous répond généralement sous 1 à 2 jours ouvrés.
            </p>
          </div>
        </div>
      </aside>

      <section className="w-full min-w-0">
        <ContactForm
          locale={locale}
          type={activeType}
          projects={projects}
        />
      </section>
    </div>
  );
}