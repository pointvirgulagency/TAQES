"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { X } from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
} from "react-leaflet";
import type {
  CSSProperties,
  ComponentType,
  ReactNode,
} from "react";
import type {
  LatLngExpression,
  MapOptions,
  MarkerOptions,
  TileLayerOptions,
} from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Territoire {
  id?: number;
  documentId?: string;
  nom?: string;
  slug?: string;
  latitude?: number;
  longitude?: number;
  image?: {
    url: string;
    formats?: {
      thumbnail?: {
        url: string;
      };
    };
  };
  projects?: unknown[];
}

interface TerritoiresMapProps {
  territoires: Territoire[];
  selectedTerritoire: Territoire | null;
  onSelectTerritoire?: (territoire: Territoire | null) => void;
}

interface TypedMapContainerProps extends MapOptions {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

interface TypedTileLayerProps extends TileLayerOptions {
  url: string;
  attribution?: string;
}

interface TypedMarkerProps extends MarkerOptions {
  position: LatLngExpression;
  eventHandlers?: {
    click?: () => void;
  };
}

const TypedMapContainer =
  MapContainer as unknown as ComponentType<TypedMapContainerProps>;

const TypedTileLayer =
  TileLayer as unknown as ComponentType<TypedTileLayerProps>;

const TypedMarker =
  Marker as unknown as ComponentType<TypedMarkerProps>;

const MAP_CENTER: [number, number] = [33.85, -6.9];

const REGION_BOUNDS: L.LatLngBoundsExpression = [
  [33.2, -7.6],
  [34.5, -6.2],
];

const FIXED_ZOOM = 9.5;

function toCoord(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function haversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildMarkerIcon(
  nom: string | undefined,
  selected: boolean
) {
  const size = selected ? 16 : 11;
  const safeNom = nom ? escapeHtml(nom) : "";

  const dot = selected
    ? "background:#00674F;border:3px solid #F4F0E8;box-shadow:0 0 0 5px rgba(0,103,79,0.16),0 3px 10px rgba(0,70,55,0.32);"
    : "background:#F4F0E8;border:2px solid #00674F;box-shadow:0 2px 6px rgba(0,70,55,0.18);";

  const label = safeNom
    ? `<span style="background:${selected ? "#094734" : "#F8F5EF"};color:${selected ? "#F4F0E8" : "#094734"};border:1px solid ${selected ? "#094734" : "#E6E0D6"};border-radius:9999px;padding:3px 10px;font-size:11px;font-weight:600;white-space:nowrap;box-shadow:0 2px 6px rgba(30,50,40,0.10);">${safeNom}</span>`
    : "";

  return L.divIcon({
    className: "interactive-marker-icon",
    html: `<div style="display:flex;align-items:center;gap:6px;cursor:pointer;"><div style="width:${size}px;height:${size}px;border-radius:50%;flex-shrink:0;${dot}"></div>${label}</div>`,
    iconSize: [180, 24],
    iconAnchor: [8, 12],
  });
}

function MapController({
  selectedTerritoire,
}: {
  selectedTerritoire: Territoire | null;
}) {
  const map = useMap();

  useEffect(() => {
    const lat = toCoord(selectedTerritoire?.latitude);
    const lng = toCoord(selectedTerritoire?.longitude);

    if (lat === null || lng === null) return;

    map.panTo([lat, lng], {
      animate: true,
      duration: 0.8,
    });
  }, [selectedTerritoire, map]);

  return null;
}

export default function TerritoiresMap({
  territoires,
  selectedTerritoire,
  onSelectTerritoire,
}: TerritoiresMapProps) {
  const [mapReady, setMapReady] = useState(false);
  const params = useParams<{ locale?: string }>();

  const locale = params.locale === "ar" ? "ar" : "fr";
  const isArabic = locale === "ar";

  const strapiUrl = (
    process.env.NEXT_PUBLIC_STRAPI_URL ?? ""
  ).replace(/\/$/, "");

  useEffect(() => {
    setMapReady(true);
  }, []);

  const validTerritoires = territoires
    .map((territoire) => {
      const latitude = toCoord(territoire.latitude);
      const longitude = toCoord(territoire.longitude);

      if (latitude === null || longitude === null) {
        return null;
      }

      return {
        ...territoire,
        latitude,
        longitude,
      };
    })
    .filter(
      (
        territoire
      ): territoire is Territoire & {
        latitude: number;
        longitude: number;
      } => territoire !== null
    );

  const selectedProjectCount = Array.isArray(
    selectedTerritoire?.projects
  )
    ? selectedTerritoire.projects.length
    : null;

  const selectedLat = toCoord(selectedTerritoire?.latitude);
  const selectedLng = toCoord(selectedTerritoire?.longitude);

  const selectedDistanceKm =
    selectedLat !== null && selectedLng !== null
      ? Math.round(
          haversineDistanceKm(
            MAP_CENTER[0],
            MAP_CENTER[1],
            selectedLat,
            selectedLng
          )
        )
      : null;

  const imagePath =
    selectedTerritoire?.image?.formats?.thumbnail?.url ??
    selectedTerritoire?.image?.url;

  const imageUrl = imagePath
    ? imagePath.startsWith("http")
      ? imagePath
      : `${strapiUrl}${imagePath}`
    : null;

  const selectedCityUrl = selectedTerritoire?.nom
    ? `/${locale}/projects?city=${encodeURIComponent(
        selectedTerritoire.nom
      )}`
    : `/${locale}/projects`;

  const labels = {
    territory: isArabic ? "المنطقة" : "TERRITOIRE",
    projects: isArabic
      ? "مشروع مرتبط"
      : "projet associé",
    projectsPlural: isArabic
      ? "مشاريع مرتبطة"
      : "projets associés",
    discover: isArabic
      ? "اكتشف المشاريع"
      : "DÉCOUVRIR LES PROJETS",
    close: isArabic ? "إغلاق" : "Fermer",
    description: isArabic
      ? "اكتشف هذه المنطقة والمشاريع المرتبطة بها."
      : "Découvrez ce territoire et les projets associés.",
  };

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="territoires-map relative z-0 isolate h-[600px] w-full overflow-hidden rounded-[2rem] bg-[#E2DCD0]"
    >
      <style jsx global>{`
        .territoires-map .leaflet-control-attribution {
          background: rgba(248, 245, 239, 0.82) !important;
          color: #71817b !important;
          font-size: 7px !important;
          line-height: 12px !important;
          padding: 0 4px !important;
          border-radius: 4px 0 0 0;
        }

        .territoires-map .leaflet-control-attribution a {
          color: #5d746b !important;
        }

        .territoires-map .leaflet-tile {
          filter: saturate(0.72) contrast(0.94);
        }

        .territoires-map .interactive-marker-icon {
          transition: transform 0.2s ease;
        }

        .territoires-map .interactive-marker-icon:hover {
          transform: scale(1.06);
        }

        .territoires-map .leaflet-container {
          background: #e2dcd0;
          font-family: inherit;
        }
      `}</style>

      {mapReady && (
        <TypedMapContainer
          center={MAP_CENTER}
          zoom={FIXED_ZOOM}
          minZoom={8}
          maxZoom={12}
          maxBounds={REGION_BOUNDS}
          maxBoundsViscosity={0.8}
          scrollWheelZoom
          doubleClickZoom
          touchZoom
          zoomControl={false}
          attributionControl
          style={{ height: "100%", width: "100%" }}
          className="absolute inset-0 z-0 h-full w-full"
        >
          <TypedTileLayer
            url={`https://maps.geoapify.com/v1/tile/osm-bright-smooth/{z}/{x}/{y}.png?apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`}
            maxZoom={20}
            attribution="&copy; OpenStreetMap contributors &copy; Geoapify"
          />

          <MapController
            selectedTerritoire={selectedTerritoire}
          />

          {validTerritoires.map((territoire) => (
            <TypedMarker
              key={
                territoire.id ??
                territoire.documentId ??
                territoire.slug ??
                territoire.nom
              }
              position={[
                territoire.latitude,
                territoire.longitude,
              ]}
              icon={buildMarkerIcon(
                territoire.nom,
                selectedTerritoire?.id === territoire.id &&
                  selectedTerritoire?.documentId ===
                    territoire.documentId
              )}
              eventHandlers={{
                click: () =>
                  onSelectTerritoire?.(territoire),
              }}
            />
          ))}
        </TypedMapContainer>
      )}

      {selectedTerritoire && (
        <div className="absolute start-6 top-1/2 z-[500] w-[285px] -translate-y-1/2 animate-in fade-in slide-in-from-left-4 duration-300">
          <div className="relative overflow-hidden rounded-xl border border-white/80 bg-[#F8F5EF] shadow-[0_8px_30px_rgba(38,65,56,0.14)]">
            <button
              type="button"
              onClick={() => onSelectTerritoire?.(null)}
              className="absolute end-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[#E6E0D6]/60 text-[#094734] transition hover:bg-[#E6E0D6]"
              aria-label={labels.close}
            >
              <X className="h-3 w-3" />
            </button>

            <div className="flex gap-3 p-3">
              <div className="h-[72px] w-[92px] shrink-0 overflow-hidden rounded-lg bg-[#D8D1C5]">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={selectedTerritoire.nom ?? ""}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />
                )}
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded-full bg-[#E5EEE9] px-2 py-0.5 text-[7px] font-semibold uppercase tracking-[0.08em] text-[#00674F]">
                    {selectedDistanceKm !== null
                      ? isArabic
                        ? `${selectedDistanceKm} كم`
                        : `À ${selectedDistanceKm} KM`
                      : labels.territory}
                  </span>
                </div>

                <h3 className="truncate text-[13px] font-semibold leading-tight text-[#094734]">
                  {selectedTerritoire.nom}
                </h3>

                <p className="mt-1 line-clamp-2 text-[9px] leading-[1.4] text-[#78847F]">
                  {selectedProjectCount !== null
                    ? isArabic
                      ? `${selectedProjectCount} ${labels.projects}`
                      : `${selectedProjectCount} ${
                          selectedProjectCount > 1
                            ? labels.projectsPlural
                            : labels.projects
                        }`
                    : labels.description}
                </p>

                <Link
                  href={selectedCityUrl}
                  className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-[#00674F] underline decoration-[#00674F]/30 underline-offset-4 transition hover:text-[#094734] hover:decoration-[#094734]/40"
                >
                  {labels.discover}
                  <span aria-hidden="true">
                    {isArabic ? "←" : "→"}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}