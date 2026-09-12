"use client";

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
    icon: "📋",
    block: "reclamation",
  },
  partenariat: {
    label: "Opportunités & Partenariats",
    strapiType: "Partenariat",
    icon: "🤝",
    block: "partenariat",
  },
  recrutement: {
    label: "Recrutement",
    strapiType: "Recrutement",
    icon: "💼",
    block: "none",
  },
  projet: {
    label: "Demande de projet",
    strapiType: "Projet",
    icon: "🏗️",
    block: "projet",
  },
  foncier: {
    label: "Demande foncière",
    strapiType: "Foncier",
    icon: "🗺️",
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

export default function ContactTabs({ active, onChange }: ContactTabsProps) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#094734]/10 bg-white">
      {VISIBLE_TABS.map((key, index) => {
        const tab = TYPE_CONFIG[key];
        const isActive = key === active;

        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={[
              "flex w-full items-center gap-3 px-5 py-4 text-left text-[15px] font-medium transition-colors",
              isActive
                ? "bg-[#094734] text-white"
                : "bg-white text-[#094734]/80 hover:bg-[#EBE2DC]/40",
              !isActive && index !== 0 ? "border-t border-[#094734]/10" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span className="relative h-5 w-5 shrink-0">
              <img
                src={tab.icon}
                alt=""
                className={[
                  "h-full w-full object-contain",
                  isActive ? "brightness-0 invert" : "",
                ].join(" ")}
              />
            </span>
            <span className="flex-1 truncate">{tab.label}</span>
            <ChevronRight
              className={[
                "h-4 w-4 shrink-0",
                isActive ? "text-white" : "text-[#094734]/40",
              ].join(" ")}
            />
          </button>
        );
      })}
    </div>
  );
}