"use client";

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
    icon: "💬",
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
    <div className="flex flex-col gap-2 rounded-2xl border border-[#094734]/10 bg-white p-3 w-full shadow-sm">
      {VISIBLE_TABS.map((key) => {
        const tab = TYPE_CONFIG[key];
        const isActive = key === active;

        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={
              isActive
                ? "flex items-center gap-3 w-full rounded-xl px-4 py-4 text-left text-sm font-medium transition bg-[#094734] text-white shadow-sm"
                : "flex items-center gap-3 w-full rounded-xl px-4 py-4 text-left text-sm font-medium transition text-[#094734]/70 hover:bg-[#EBE2DC]/40"
            }
          >
            <span className="text-xl shrink-0" aria-hidden>
              {tab.icon}
            </span>
            <span className="truncate">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}