"use client";

import { useState } from "react";
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
    <div
      className="grid w-full gap-8"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      }}
    >
      {/* LEFT COLUMN */}
      <aside className="w-full">
        <div className="flex w-full flex-col gap-6">
          <ContactTabs active={activeType} onChange={setActiveType} />

          <div className="w-full rounded-3xl border border-[#094734]/10 bg-[#EBE2DC]/20 p-6">
            <h3 className="text-base font-semibold text-[#094734]">
              Informations directes
            </h3>

            <div className="mt-5 space-y-4 text-sm text-[#094734]/80">
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#094734]/50">
                  Téléphone
                </span>
                <a
                  href={`tel:${safeCoords.telephone}`}
                  className="break-words hover:underline"
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
                  className="break-words hover:underline"
                >
                  {safeCoords.email}
                </a>
              </div>

              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#094734]/50">
                  Adresse
                </span>
                <p className="break-words leading-6">{safeCoords.adresse}</p>
              </div>

              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#094734]/50">
                  Horaires
                </span>
                <p className="leading-6">{safeCoords.horaires}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* RIGHT COLUMN */}
      <section className="w-full" style={{ gridColumn: "span 2 / span 2" }}>
        <div className="w-full rounded-3xl border border-[#094734]/10 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <ContactForm
            locale={locale}
            type={activeType}
            projects={projects}
          />
        </div>
      </section>
    </div>
  );
}