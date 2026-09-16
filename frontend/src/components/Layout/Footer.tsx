"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const copy = {
  fr: {
    tagline: "BÂTIR DES\nTERRITOIRES\nD'AVENIR",
    navigation: "NAVIGATION",
    projets: "PROJETS",
    liensUtiles: "LIENS UTILES",
    nousContacter: "NOUS CONTACTER",
    navigationLinks: [
      { id: "accueil", label: "Accueil", href: "" },
      { id: "groupe", label: "Le Groupe", href: "/groupe" },
      { id: "actualites", label: "Actualités", href: "/actualites" },
      { id: "contact", label: "Nous contacter", href: "/contact" },
    ],
    projetsLinks: [
      { id: "tous", label: "Tous les projets", href: "/projects" },
      { id: "fonciers", label: "Projets fonciers", href: "/projects?type=foncier" },
      { id: "promotion", label: "Promotion immobilière", href: "/projects?type=promotion" },
      { id: "commercialisation", label: "En commercialisation", href: "/projects?type=commercialisation" },
    ],
    liensUtilesLinks: [
      { id: "opportunites", label: "Opportunités & Partenariats", href: "/contact" },
      { id: "reclamation", label: "E-Réclamation", href: "/contact" },
      { id: "recrutement", label: "Recrutement", href: "/contact" },
    ],
    addressLine1: "Avenue Mellouza, Villa N°41",
    addressLine2: "Nahda 2, Rabat — Maroc",
    phone: "+212 6 61 70 43 78",
    email: "contact@taqes.ma",
    rights: "Tous droits réservés",
    credits: "Site conçu et développé par Point Virgul ↗",
  },
  ar: {
    tagline: "بناء أقاليم\nالمستقبل",
    navigation: "التصفح",
    projets: "المشاريع",
    liensUtiles: "روابط مفيدة",
    nousContacter: "اتصل بنا",
    navigationLinks: [
      { id: "accueil", label: "الرئيسية", href: "" },
      { id: "groupe", label: "المجموعة", href: "/groupe" },
      { id: "actualites", label: "الأخبار", href: "/actualites" },
      { id: "contact", label: "اتصل بنا", href: "/contact" },
    ],
    projetsLinks: [
      { id: "tous", label: "جميع المشاريع", href: "/projects" },
      { id: "fonciers", label: "مشاريع عقارية", href: "/projects?type=foncier" },
      { id: "promotion", label: "التطوير العقاري", href: "/projects?type=promotion" },
      { id: "commercialisation", label: "قيد التسويق", href: "/projects?type=commercialisation" },
    ],
    liensUtilesLinks: [
      { id: "opportunites", label: "فرص وشراكات", href: "/opportunites" },
      { id: "reclamation", label: "الشكايات الإلكترونية", href: "/e-reclam" },
      { id: "recrutement", label: "التوظيف", href: "/recrutement" },
      { id: "mentions", label: "الإشعار القانوني", href: "/mentions-legales" },
      { id: "politique", label: "سياسة الخصوصية", href: "/politique-confidentialite" },
    ],
    addressLine1: "شارع ملوية، فيلا رقم 41",
    addressLine2: "النهضة 2، الرباط — المغرب",
    phone: "٧٨ ٤٣ ٧٠ ٦١ ٦ ٢١٢+",
    email: "contact@taqes.ma",
    rights: "جميع الحقوق محفوظة",
    credits: "تم تصميم وتطوير الموقع بواسطة Point Virgul ↗",
  },
} as const;

function ChevronUpIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 12L10 7L15 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FooterColumn({
  title,
  items,
  locale,
}: {
  title: string;
  items: readonly { id: string; label: string; href: string }[];
  locale: string;
}) {
  return (
    <div>
      <h3 className="text-s font-semibold uppercase tracking-wider text-[#EBE2DC]">
        {title}
      </h3>
      <div className="mb-3 mt-2 h-[2px] w-5 bg-[#C4A484]/80" />
      <nav className="flex flex-col gap-1.5">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/${locale}${item.href}`}
            className="text-s font-light text-[#EBE2DC]/70 transition-colors hover:text-[#EBE2DC]"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default function Footer() {
  const params = useParams();
  const locale = params.locale === "ar" ? "ar" : "fr";
  const c = copy[locale];
  const year = new Date().getFullYear();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[#004233] text-[#EBE2DC]"
    >
      <svg
        className="pointer-events-none absolute left-0 top-0 w-full"
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-100 20 C 300 120, 700 -20, 1100 80 C 1300 130, 1500 50, 1600 30"
          stroke="#C4A484"
          strokeWidth="1.5"
          strokeOpacity="0.6"
          fill="none"
        />
      </svg>

      <div className="relative mx-auto max-w-[1600px] px-6 pb-4 pt-12 md:px-10 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-10">
          <div className="flex flex-col justify-between">
            <div>
              <Link href={`/${locale}`} className="inline-block">
                <img
                  src="/taqesheading.png"
                  alt="TAQÈS"
                  className="h-8 w-auto"
                />
              </Link>

              <p className="mt-3 whitespace-pre-line text-[13px] font-medium uppercase leading-relaxed tracking-wider text-[#EBE2DC]/75">
                {c.tagline}
              </p>
            </div>

            <div className="mt-5 flex gap-2.5">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded border border-[#EBE2DC]/30 transition-colors hover:border-[#EBE2DC] hover:text-white"
              >
                <LinkedInIcon className="h-3.5 w-3.5" />
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded border border-[#EBE2DC]/30 transition-colors hover:border-[#EBE2DC] hover:text-white"
              >
                <InstagramIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <FooterColumn
            title={c.navigation}
            items={c.navigationLinks}
            locale={locale}
          />

          <FooterColumn
            title={c.projets}
            items={c.projetsLinks}
            locale={locale}
          />

          <FooterColumn
            title={c.liensUtiles}
            items={c.liensUtilesLinks}
            locale={locale}
          />

          <div>
            <h3 className="text-s font-semibold uppercase tracking-wider text-[#EBE2DC]">
              {c.nousContacter}
            </h3>

            <div className="mb-3 mt-2 h-[2px] w-5 bg-[#C4A484]/80" />

            <div className="flex flex-col gap-1.5 text-s font-light text-[#EBE2DC]/70">
              <p>{c.addressLine1}</p>
              <p>{c.addressLine2}</p>
              <p
                dir="ltr"
                className={`mt-1 ${locale === "ar" ? "text-right" : ""}`}
              >
                {c.phone}
              </p>
              <p>{c.email}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#EBE2DC]/15 pt-4 text-[11px] text-[#EBE2DC]/60 sm:flex-row">
          <p>
            © {year} TAQÈS — {c.rights}
          </p>

          <div className="flex items-center gap-5">
            <a
              href="https://pointvirgul.ma"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-[#EBE2DC]"
            >
              {c.credits}
            </a>

            <div className="h-3 w-[1px] bg-[#EBE2DC]/20" />

            <div className="flex items-center gap-1 font-medium">
              <Link
                href="/fr"
                className={
                  locale === "fr"
                    ? "text-[#EBE2DC]"
                    : "opacity-50 hover:opacity-100"
                }
              >
                FR
              </Link>

              <span>/</span>

              <Link
                href="/ar"
                className={
                  locale === "ar"
                    ? "text-[#EBE2DC]"
                    : "opacity-50 hover:opacity-100"
                }
              >
                AR
              </Link>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label={
                locale === "ar" ? "العودة إلى الأعلى" : "Revenir en haut"
              }
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#EBE2DC]/40 text-[#EBE2DC] transition-colors hover:border-[#EBE2DC] hover:bg-white/10"
            >
              <ChevronUpIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}