"use client";

import { MapPin, ArrowRight } from "lucide-react";

interface Projet {
  id: number;
  title: string;
}

interface Territoire {
  id: number;
  titre: string; // short tagline shown under the place name, e.g. "Un pôle urbain en plein essor..."
  nom: string; // place name, e.g. "Salé Al Jadida"
  projects?: Projet[];
  // Optional — add latitude/longitude Number fields to the Strapi component if
  // you want pins placed by real geographic position instead of the preset layout.
  latitude?: number;
  longitude?: number;
}

interface TerritoiresProps {
  titreTerritoires: string;
  descriptionTerritoires?: string;
  lienTerritoire?: string;
  data: Territoire[];
}

// Fallback layout used when a territoire has no lat/lng.
// Cycles through 4 preset slots so up to 4 cards land roughly where the
// screenshot shows them; a 5th+ item wraps back to the first slot.
const SLOTS = [
  { card: { top: "4%", left: "22%" }, pin: { top: "26%", left: "50%" } },
  { card: { top: "4%", left: "78%" }, pin: { top: "26%", left: "60%" } },
  { card: { top: "78%", left: "22%" }, pin: { top: "62%", left: "42%" } },
  { card: { top: "78%", left: "78%" }, pin: { top: "56%", left: "54%" } },
];

// Rough bounding box for the Grand Rabat / Skhirat / Bouznika coastline area.
// Used only to convert lat/lng into an x/y position on the decorative map —
// it's a simple linear scale, not a real projection, so treat placement as
// directionally correct rather than pixel-accurate.
const BOUNDS = {
  latMin: 33.75,
  latMax: 34.15,
  lngMin: -6.95,
  lngMax: -6.7,
};

function latLngToPosition(lat: number, lng: number) {
  const left = ((lng - BOUNDS.lngMin) / (BOUNDS.lngMax - BOUNDS.lngMin)) * 100;
  const top = (1 - (lat - BOUNDS.latMin) / (BOUNDS.latMax - BOUNDS.latMin)) * 100;
  return { top: `${top}%`, left: `${left}%` };
}

export default function Territoires({
  titreTerritoires,
  descriptionTerritoires,
  lienTerritoire,
  data,
}: TerritoiresProps) {
  return (
    <section className="bg-[#F7F3EF] px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[340px_1fr] lg:items-start">
          {/* Intro column */}
          <div>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[#094734] md:text-4xl">
              {titreTerritoires}
            </h2>

            {descriptionTerritoires && (
              <p className="mt-6 text-sm leading-relaxed text-[#094734]/70">
                {descriptionTerritoires}
              </p>
            )}

            {lienTerritoire && (
              <a
                href={lienTerritoire}
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#00674F] transition hover:text-[#449383]"
              >
                Découvrir tous nos projets
                <ArrowRight className="h-4 w-4" />
              </a>
            )}
          </div>

          {/* Map panel */}
          <div className="relative min-h-[520px] overflow-hidden rounded-3xl border border-[#094734]/10 bg-[#EFE8E1]">
            {/* Decorative dot grid */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(9,71,52,0.18) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />
            {/* Decorative coastline blob */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 800 520"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M420 0 C 380 90, 470 140, 440 220 C 410 300, 500 340, 470 420 C 450 470, 500 500, 470 520 L 800 520 L 800 0 Z"
                fill="#094734"
                opacity="0.06"
              />
            </svg>

            {/* Connector lines from each card to its pin */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {data?.map((territoire, i) => {
                const hasCoords =
                  territoire.latitude != null && territoire.longitude != null;
                const pin = hasCoords
                  ? latLngToPosition(territoire.latitude!, territoire.longitude!)
                  : SLOTS[i % SLOTS.length].pin;
                const card = hasCoords ? pin : SLOTS[i % SLOTS.length].card;

                return (
                  <line
                    key={territoire.id}
                    x1={parseFloat(card.left)}
                    y1={parseFloat(card.top)}
                    x2={parseFloat(pin.left)}
                    y2={parseFloat(pin.top)}
                    stroke="#094734"
                    strokeOpacity={0.25}
                    strokeWidth={0.15}
                    strokeDasharray="1.2 1"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}
            </svg>

            {data?.map((territoire, i) => {
              const hasCoords =
                territoire.latitude != null && territoire.longitude != null;
              const position = hasCoords
                ? latLngToPosition(territoire.latitude!, territoire.longitude!)
                : SLOTS[i % SLOTS.length].pin;
              const cardPosition = hasCoords ? position : SLOTS[i % SLOTS.length].card;

              return (
                <div key={territoire.id}>
                  {/* Pin */}
                  <div
                    className="absolute z-10 -translate-x-1/2 -translate-y-full"
                    style={{ top: position.top, left: position.left }}
                  >
                    <MapPin
                      className="h-6 w-6 fill-[#00674F] text-[#00674F] drop-shadow"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className="absolute z-10 w-56 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#094734]/10 bg-white/90 p-4 shadow-sm backdrop-blur-sm"
                    style={{ top: cardPosition.top, left: cardPosition.left }}
                  >
                    <h3 className="text-sm font-semibold text-[#094734]">
                      {territoire.nom}
                    </h3>

                    {territoire.titre && (
                      <p className="mt-1.5 text-xs leading-relaxed text-[#094734]/65">
                        {territoire.titre}
                      </p>
                    )}

                    <a
                      href={`/projets?territoire=${encodeURIComponent(territoire.nom)}`}
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#00674F] transition hover:text-[#449383]"
                    >
                      Voir les projets
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}