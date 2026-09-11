"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MapPin, X } from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import type { CSSProperties, ComponentType, ReactNode } from "react";
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
  if (typeof value === "number" && !Number.isNaN(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);

    return Number.isNaN(parsed) ? null : parsed;
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
    ? `<span style="background:${
        selected ? "#094734" : "#F8F5EF"
      };color:${selected ? "#F4F0E8" : "#094734"};border:1px solid ${
        selected ? "#094734" : "#E6E0D6"
      };border-radius:9999px;padding:3px 10px;font-size:11px;font-weight:600;white-space:nowrap;box-shadow:0 2px 6px rgba(30,50,40,0.10);">${safeNom}</span>`
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

    if (lat === null || lng === null) {
      return;
    }

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

  useEffect(() => {
    setMapReady(true);
  }, []);

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

  const validTerritoires = territoires
    .map((territoire) => {
      const latitude = toCoord(territoire.latitude);
      const longitude = toCoord(territoire.longitude);

      return latitude !== null && longitude !== null
        ? {
            ...territoire,
            latitude,
            longitude,
          }
        : null;
    })
    .filter(
      (
        territoire
      ): territoire is Territoire & {
        latitude: number;
        longitude: number;
      } => territoire !== null
    );

  const sortedByLat = [...validTerritoires].sort(
    (a, b) => b.latitude - a.latitude
  );

  const routePositions: [number, number][] =
    sortedByLat.map((territoire) => [
      territoire.latitude,
      territoire.longitude,
    ]);

  const axisFrom = sortedByLat[0]?.nom;
  const axisTo = sortedByLat[sortedByLat.length - 1]?.nom;

  const selectedProjectCount = Array.isArray(
    selectedTerritoire?.projects
  )
    ? selectedTerritoire.projects.length
    : null;

  const selectedDistanceKm =
    selectedTerritoire &&
    typeof selectedTerritoire.latitude === "number" &&
    typeof selectedTerritoire.longitude === "number"
      ? Math.round(
          haversineDistanceKm(
            MAP_CENTER[0],
            MAP_CENTER[1],
            selectedTerritoire.latitude,
            selectedTerritoire.longitude
          )
        )
      : null;

  const imageUrl = selectedTerritoire?.image?.formats?.thumbnail?.url
    ? `${strapiUrl}${selectedTerritoire.image.formats.thumbnail.url}`
    : selectedTerritoire?.image?.url
      ? `${strapiUrl}${selectedTerritoire.image.url}`
      : null;

  return (
    <div className="territoires-map relative z-0 isolate h-[600px] w-full overflow-hidden rounded-[2rem] bg-[#E2DCD0]">
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

      {axisFrom && axisTo && axisFrom !== axisTo && (
        <div className="absolute left-4 top-4 z-[400] flex items-center gap-1.5 rounded-full bg-[#094734] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#F4F0E8] shadow-[0_4px_14px_rgba(9,71,52,0.28)]">
          <MapPin className="h-3 w-3 shrink-0" />

          <span className="truncate">
            Axe {axisFrom} – {axisTo}
          </span>
        </div>
      )}

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
          style={{
            height: "100%",
            width: "100%",
          }}
          className="absolute inset-0 z-0 h-full w-full"
        >
          <TypedTileLayer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
            maxZoom={20}
            attribution={`&copy; <a href="https://stadiamaps.com/attribution/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>`}
          />

          <MapController
            selectedTerritoire={selectedTerritoire}
          />

          {routePositions.length > 1 && (
            <Polyline
              positions={routePositions}
              pathOptions={{
                color: "#C08552",
                weight: 2,
                opacity: 0.65,
                dashArray: "4 8",
                lineCap: "round",
              }}
            />
          )}

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
                selectedTerritoire?.id === territoire.id
              )}
              eventHandlers={{
                click: () =>
                  onSelectTerritoire?.(territoire),
              }}
            />
          ))}
        </TypedMapContainer>
      )}

      <div className="pointer-events-none absolute bottom-3 left-4 z-[400] text-[8px] font-semibold uppercase tracking-[0.16em] text-[#5d746b]/70">
        S1 — Axe Atlantique
      </div>

      {selectedTerritoire && (
        <div className="absolute left-6 top-1/2 z-[500] w-[285px] -translate-y-1/2 animate-in fade-in slide-in-from-left-4 duration-300">
          <div className="relative overflow-hidden rounded-xl border border-white/80 bg-[#F8F5EF] shadow-[0_8px_30px_rgba(38,65,56,0.14)]">
            <button
              type="button"
              onClick={() =>
                onSelectTerritoire?.(null)
              }
              className="absolute right-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[#E6E0D6]/60 text-[#094734] transition hover:bg-[#E6E0D6]"
              aria-label="Fermer"
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

              <div className="min-w-0 pt-0.5">
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded-full bg-[#E5EEE9] px-2 py-0.5 text-[7px] font-semibold uppercase tracking-[0.08em] text-[#00674F]">
                    {selectedDistanceKm !== null
                      ? `À ${selectedDistanceKm} KM`
                      : "TERRITOIRE"}
                  </span>
                </div>

                <h3 className="truncate text-[13px] font-semibold leading-tight text-[#094734]">
                  {selectedTerritoire.nom}
                </h3>

                <p className="mt-1 line-clamp-2 text-[9px] leading-[1.4] text-[#78847F]">
                  {selectedProjectCount !== null
                    ? `${selectedProjectCount} projet${
                        selectedProjectCount > 1
                          ? "s"
                          : ""
                      } associé${
                        selectedProjectCount > 1
                          ? "s"
                          : ""
                      }`
                    : "Découvrez ce territoire et les projets associés."}
                </p>

                <Link
                  href={
                    selectedTerritoire.slug
                      ? `/territoires/${selectedTerritoire.slug}`
                      : "#"
                  }
                  className="mt-2 block text-[7px] font-semibold uppercase tracking-[0.08em] text-[#00674F] transition hover:text-[#094734]"
                >
                  DÉCOUVRIR LE PROJET →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

