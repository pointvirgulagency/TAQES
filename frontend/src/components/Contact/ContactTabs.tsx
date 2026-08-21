interface ContactTabsProps {
  locale: "fr" | "ar";
  active: "contact" | "reclamation" | "opportunites" | "recrutement";
}

const tabs = [
  {
    key: "contact",
    label: "Nous contacter",
    icon: "💬",
    href: "",
  },
  {
    key: "reclamation",
    label: "E-Réclamation",
    icon: "📋",
    href: "/e-reclamation",
  },
  {
    key: "opportunites",
    label: "Opportunités & Partenariats",
    icon: "🤝",
    href: "/opportunites-et-partenariats",
  },
  {
    key: "recrutement",
    label: "Recrutement",
    icon: "💼",
    href: "/recrutement",
  },
] as const;

export default function ContactTabs({ locale, active }: ContactTabsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 rounded-2xl border border-[#094734]/10 bg-white p-3 sm:grid-cols-4">
      {tabs.map((tab) => {
        const isActive = tab.key === active;

        return (
          <a
            key={tab.key}
            href={`/${locale}/contact${tab.href}`}
            className={`flex flex-col items-center gap-2 rounded-xl px-4 py-5 text-center text-sm font-medium transition ${
              isActive
                ? "bg-[#094734] text-white"
                : "text-[#094734]/70 hover:bg-[#EBE2DC]/40"
            }`}
          >
            <span className="text-xl" aria-hidden>
              {tab.icon}
            </span>
            <span>{tab.label}</span>
          </a>
        );
      })}
    </div>
  );
}