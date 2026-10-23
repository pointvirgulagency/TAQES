"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Pilier {
  id: number;
  eyebrow?: string;
  titre: string;
  description: string;
  boutton?: string;
  lien?: string;
  Icon?: {
    url: string;
  };
}

interface NotreApprocheProps {
  eyebrow?: string;
  titre?: string;
  soustitre?: string;
  data: Pilier[];
  strapiUrl: string;
  locale: string;
}

export default function NotreApproche({
  eyebrow = "VOTRE PARCOURS",
  titre = "Comment pouvons-nous\nvous accompagner ?",
  soustitre = "Acheter, investir, ou vendre : avançons ensemble.",
  data,
  strapiUrl,
  locale,
}: NotreApprocheProps) {
  const [activeTab, setActiveTab] = useState<string>("Particuliers");

  const baseUrl = strapiUrl?.replace(/\/$/, "") ?? "";

  return (
    <section className="bg-[#052E23] px-6 py-14 md:px-10 lg:px-14 lg:py-16">
      <div className="mx-auto grid max-w-[1550px] grid-cols-1 items-stretch gap-8 lg:grid-cols-12">

        {/* Left Column */}
        <div className="flex flex-col justify-between py-2 lg:col-span-4">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ffdc96]">
              <span className="h-[1px] w-4 bg-[#ffdc96]" />
              {eyebrow.replace(/^—\s*/, "")}
            </p>

            {/* Title */}
            <h2 className="mt-5 font-serif text-3xl font-normal leading-[1.12] whitespace-pre-line text-white md:text-[40px]">
              {titre}
            </h2>

            {/* Subtitle */}
            <p className="mt-5 max-w-[290px] text-[20px] leading-relaxed text-[#A3B8B0]">
              {soustitre}
            </p>
          </div>


        </div>

        {/* Right Column: Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-8">
          {data?.slice(0, 3).map((pilier, index) => {
            const itemNumber = String(index + 1).padStart(2, "0");

            const getImageUrl = (url?: string) => {
              if (!url) return "";
              return url.startsWith("http") ? url : `${baseUrl}${url}`;
            };

            const imageUrl = pilier.Icon?.url ? getImageUrl(pilier.Icon.url) : "";

            const cardContent = (
              <>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={pilier.titre}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#0A3D30]" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#021711] via-[#021711]/40 to-black/20" />

                {/* Potent Gold Number Badge */}
                <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#E2B04E]/50 bg-black/30 font-serif text-[11px] font-semibold text-[#E2B04E] backdrop-blur-md">
                  {itemNumber}
                </div>

                {/* Bottom Card Content */}
                <div className="relative z-10 flex flex-col">
                  {pilier.eyebrow && (
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ffdc96]">
                      {pilier.eyebrow}
                    </span>
                  )}

                  <h3 className="mt-1 font-serif text-[22px] font-normal leading-tight text-white md:text-[24px]">
                    {pilier.titre}
                  </h3>

                  <p className="mt-2 text-[14px] leading-relaxed text-white/70 line-clamp-2">
                    {pilier.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#ffdc96] transition-colors group-hover:text-white">
                    <span>{pilier.boutton || "EN SAVOIR PLUS"}</span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>
              </>
            );

            const className =
              "group relative flex h-[520px] flex-col justify-between overflow-hidden rounded-[26px] p-6 text-white transition-all duration-300 border border-transparent hover:border-[#E2B04E]/40";

            const href = pilier.lien
              ? `/${locale}${pilier.lien.startsWith("/") ? pilier.lien : `/${pilier.lien}`}`
              : undefined;

            return href ? (
              <Link key={pilier.id} href={href} className={className}>
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