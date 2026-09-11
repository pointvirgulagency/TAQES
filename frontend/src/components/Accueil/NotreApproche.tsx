import Link from "next/link";
import { ArrowUpRight, LayoutPanelTop, Gem, CalendarCheck } from "lucide-react";

interface Pilier {
  id: number;
  titre: string;
  description: string;
  boutton?: string;
  lien?: string;
  icon?: {
    url: string;
  };
}

interface NotreApprocheProps {
  eyebrow?: string;
  titre: string;
  soustitre?: string;
  data: Pilier[];
  strapiUrl: string;
}

const FALLBACK_ICONS = [LayoutPanelTop, Gem, CalendarCheck];

export default function NotreApproche({
  eyebrow = "Notre approche",
  titre,
  soustitre,
  data,
  strapiUrl,
}: NotreApprocheProps) {
  return (
    <section className="relative overflow-hidden bg-[#0B3A2D] px-6 py-14 md:px-10 md:py-16 lg:px-14">
      {/* Decorative outlined diamonds, bottom-left */}
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 rotate-45 border border-[#F3EEE7]/10" />
      <div className="pointer-events-none absolute -bottom-24 left-16 h-40 w-40 rotate-45 border border-[#F3EEE7]/10" />

      <div className="relative mx-auto grid max-w-[1500px] grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
        {/* Heading column */}
        <div className="flex flex-col justify-between lg:col-span-3">
          <div>
            <p className="flex items-center gap-2 text-[11px] tracking-wide text-[#F3EEE7]/50">
              <span className="h-px w-4 bg-[#F3EEE7]/40" />
              {eyebrow}
            </p>
            <h2 className="mt-5 font-serif text-[2.1rem] leading-[1.15] tracking-tight text-[#F3EEE7] md:text-[2.5rem]">
              {titre}
            </h2>
            <p className="mt-4 max-w-[230px] text-[13px] leading-relaxed text-[#F3EEE7]/55">
              {soustitre ??
                "Toute notre équipe mobilisée à chaque étape de votre démarche."}
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:col-span-9">
          {data?.map((pilier, index) => {
            const FallbackIcon = FALLBACK_ICONS[index % FALLBACK_ICONS.length];
            const cardContent = (
              <>
                {/* Background photo */}
                {pilier.icon ? (
                  <img
                    src={`${strapiUrl}${pilier.icon.url}`}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#12483A]" />
                )}

                {/* Tint overlay so text stays legible */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2019]/90 via-[#0B2019]/25 to-[#0B2019]/40" />

                {/* Icon badge (fallback lucide icon, since the CMS only exposes one asset per card) */}
                <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                  <FallbackIcon className="h-4 w-4 text-white" strokeWidth={1.5} />
                </div>

                {/* Bottom content */}
                <div className="relative z-10 flex flex-col gap-2">
                  <span className="font-serif text-[1.35rem] leading-tight text-white">
                    {pilier.titre}
                  </span>
                  <p className="text-[12px] leading-relaxed text-white/65">
                    {pilier.description}
                  </p>
                  {pilier.boutton && (
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] tracking-wide text-white/85 transition-colors duration-300 group-hover:text-white">
                      {pilier.boutton}
                      <ArrowUpRight
                        className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.5}
                      />
                    </span>
                  )}
                </div>
              </>
            );

            const className =
              "group relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-sm p-5 md:min-h-[380px]";

            return pilier.lien ? (
              <Link key={pilier.id} href={pilier.lien} className={className}>
                {cardContent}
              </Link>
            ) : (
              <div key={pilier.id} className={className}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}