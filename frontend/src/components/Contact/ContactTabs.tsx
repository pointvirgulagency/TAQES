"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";

export type DemandeType =
  | "contact"
  | "reclamation"
  | "partenariat"
  | "recrutement"
  | "projet"
  | "foncier";

export type DemandeBlock =
  | "none"
  | "projet"
  | "foncier"
  | "partenariat"
  | "reclamation";

interface TypeConfigEntry {
  label: string;
  strapiType: string;
  icon: string;
  block: DemandeBlock;
}

export const TYPE_CONFIG: Record<DemandeType, TypeConfigEntry> = {
  contact: {
    label: "Nous contacter",
    strapiType: "Nous contacter",
    icon: "/demande_generale.png",
    block: "none",
  },
  reclamation: {
    label: "E-Réclamation",
    strapiType: "Réclamation",
    icon: "/taqes-e-reclamation.png",
    block: "reclamation",
  },
  partenariat: {
    label: "Opportunités & Partenariats",
    strapiType: "Partenariat",
    icon: "/taqes-partenariats.png",
    block: "partenariat",
  },
  recrutement: {
    label: "Recrutement",
    strapiType: "Recrutement",
    icon: "/taqes-recrutement.png",
    block: "none",
  },
  projet: {
    label: "Demande de projet",
    strapiType: "Projet",
    icon: "/taqes-projet-immobilier.png",
    block: "projet",
  },
  foncier: {
    label: "Demande foncière",
    strapiType: "Foncier",
    icon: "/taqes-proposer-foncier.png",
    block: "foncier",
  },
};

const VISIBLE_TABS: DemandeType[] = [
  "contact",
  "reclamation",
  "partenariat",
  "recrutement",
  "projet",
  "foncier",
];

interface ContactTabsProps {
  active: DemandeType;
  onChange: (type: DemandeType) => void;
}

export default function ContactTabs({
  active,
  onChange,
}: ContactTabsProps) {
  return (
    <div className="grid w-full grid-cols-2 overflow-hidden rounded-2xl border border-[#094734]/10 bg-white lg:block">
      {VISIBLE_TABS.map((key, index) => {
        const tab = TYPE_CONFIG[key];
        const isActive = key === active;

        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={[
              "group flex min-h-[110px] w-full items-center gap-3 px-4 py-5 text-left transition-colors lg:min-h-0 lg:px-5 lg:py-4",
              isActive
                ? "bg-[#094734] text-white"
                : "bg-white text-[#094734] hover:bg-[#EBE2DC]/40",
              index % 2 === 1
                ? "border-l border-[#094734]/10 lg:border-l-0"
                : "",
              index >= 2
                ? "border-t border-[#094734]/10 lg:border-t-0"
                : "",
              index !== 0
                ? "lg:border-t lg:border-[#094734]/10"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span className="relative h-8 w-8 shrink-0">
              <Image
                src={tab.icon}
                alt=""
                fill
                sizes="32px"
                className="object-contain"
              />
            </span>

            <span className="min-w-0 flex-1 text-[14px] font-medium leading-5 lg:text-[15px]">
              {tab.label}
            </span>

            <ChevronRight
              className={[
                "h-4 w-4 shrink-0 transition-colors",
                isActive
                  ? "text-white"
                  : "text-[#094734]/40 group-hover:text-[#094734]/70",
              ].join(" ")}
            />
          </button>
        );
      })}
    </div>
  );
}