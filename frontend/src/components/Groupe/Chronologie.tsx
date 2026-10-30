
"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ChronologieProject {
  id: number | string;
  title?: string;
}

interface ChronologieImage {
  url?: string;
}

interface ChronologieEtape {
  id?: number | string;
  annee?: string | number;
  titre?: string;
  description?: string;
  image?: ChronologieImage | ChronologieImage[] | null;
  projects?: ChronologieProject[];
}

interface ChronologieProps {
  data: ChronologieEtape[];
  strapiUrl: string;
}

export default function Chronologie({
  data,
  strapiUrl,
}: ChronologieProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      if (!data?.length || !sectionRef.current) return;

      const steps = data.length;

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,

        onUpdate: (self) => {
          if (steps <= 1) {
            setActiveIndex(0);
            return;
          }

          const index = Math.min(
            steps - 1,
            Math.floor(self.progress * steps)
          );

          setActiveIndex((current) =>
            current === index ? current : index
          );
        },

        onEnter: () => setActiveIndex(0),
        onLeaveBack: () => setActiveIndex(0),
        onLeave: () => setActiveIndex(steps - 1),
      });

      return () => trigger.kill();
    },
    {
      scope: sectionRef,
      dependencies: [data],
      revertOnUpdate: true,
    }
  );

  if (!data?.length) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#123D33]"
      style={{
        height: `${data.length * 100}vh`,
        minHeight: `${data.length * 100}svh`,
      }}
    >
      <div
        className="sticky top-0 h-screen h-[100svh] w-full overflow-hidden"
        style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
        }}
      >
        {/* Background images */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {data.map((etape, idx) => {
            const image = Array.isArray(etape.image)
              ? etape.image[0]
              : etape.image;

            if (!image?.url) return null;

            const imageUrl = `${strapiUrl.replace(
              /\/$/,
              ""
            )}${image.url}`;

            const active = activeIndex === idx;

            return (
              <div
                key={etape.id ?? idx}
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url("${imageUrl}")`,
                  opacity: active ? 1 : 0,
                  transform: active
                    ? "scale(1)"
                    : "scale(1.05)",
                  transition:
                    "opacity 0.9s ease, transform 1.2s ease",
                  pointerEvents: "none",
                }}
              />
            );
          })}
        </div>

        {/* Information cards */}
        <div
          className="
            absolute z-4
            right-0 bottom-0
            w-full
            h-[65%]
            sm:h-[60%]
            md:right-0 md:bottom-0
            md:w-[65%] md:h-[75%]
            lg:w-[45vw] lg:max-w-[780px] lg:h-[78vh]
          "
        >
          {data.map((etape, idx) => {
            const active = activeIndex === idx;

            return (
              <div
                key={etape.id ?? idx}
                className="absolute inset-0"
                style={{
                  opacity: active ? 1 : 0,
                  transform: active
                    ? "translateX(0)"
                    : "translateX(35px)",
                  pointerEvents: active ? "auto" : "none",
                  transition:
                    "opacity 0.7s ease, transform 0.8s ease",
                }}
              >
                <div
                  className="
                    flex h-full w-full flex-col
                    overflow-y-auto
                    border-t border-l
                    border-[#A87543]/25
                    bg-[#F5F2EA]/90
                    p-5
                    backdrop-blur-[18px]
                    sm:p-7
                    md:p-9
                    lg:p-[45px_60px_65px_55px]
                  "
                  style={{
                    boxShadow:
                      "-25px -10px 70px rgba(18,61,51,0.12)",
                  }}
                >
                  <div className="mb-3 font-sans text-[9px] font-semibold uppercase tracking-[0.19em] text-[#53645D] sm:mb-4">
                    Chronologie
                  </div>

                  <div className="mb-2 font-serif text-sm tracking-[0.08em] text-[#A87543] sm:text-base">
                    {etape.annee}
                  </div>

                  <h3
                    className="
                      mb-5 max-w-[600px]
                      font-serif font-medium
                      text-[clamp(25px,5vw,35px)]
                      leading-[1.08]
                      tracking-[-0.035em]
                      text-[#163F35]
                      sm:mb-6
                    "
                  >
                    {etape.titre || etape.annee}
                  </h3>

                  <div className="mb-5 h-px w-[45px] shrink-0 bg-[#A87543] sm:mb-6" />

                  {etape.description && (
                    <p className="max-w-[550px] font-sans text-[13px] leading-[1.7] text-[#53645D] sm:text-sm sm:leading-[1.75]">
                      {etape.description}
                    </p>
                  )}

                  {etape.projects &&
                    etape.projects.length > 0 && (
                      <div className="mt-6 border-t border-[#A87543]/30 pt-4 sm:mt-[30px] sm:pt-[18px]">
                        {etape.projects.map((project) => (
                          <p
                            key={project.id}
                            className="my-1.5 font-sans text-[11px] leading-relaxed text-[#69736E]"
                          >
                            {project.title}
                          </p>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom gradient */}
        <div
          className="
            pointer-events-none absolute inset-0 z-[5]
            bg-gradient-to-b
            from-transparent via-transparent
            to-[#123D33]
            opacity-80
          "
        />

        {/* Desktop vertical timeline */}
        <div
          className="
            absolute left-[7vw] top-1/2 z-[6]
            hidden -translate-y-1/2
            flex-col gap-[25px]
            border-l border-[#E8E3D8]/65
            pl-[27px]
            md:flex
          "
        >
          {data.map((etape, idx) => {
            const active = activeIndex === idx;

            return (
              <div
                key={etape.id ?? idx}
                className="relative flex min-h-6 items-center"
              >
                <span
                  className="absolute -left-[32px] rounded-full transition-all duration-500"
                  style={{
                    width: active ? "9px" : "7px",
                    height: active ? "9px" : "7px",
                    background: active
                      ? "#A87543"
                      : "rgba(18,61,51,0.12)",
                    border: active
                      ? "1px solid #A87543"
                      : "1px solid rgba(232,227,216,0.9)",
                    boxShadow: active
                      ? "0 0 0 3px rgba(168,117,67,0.18)"
                      : "none",
                  }}
                />

                <span
                  className="whitespace-nowrap font-serif leading-none transition-all duration-500"
                  style={{
                    fontSize: active ? "25px" : "15px",
                    fontWeight: active ? 500 : 400,
                    color: active
                      ? "#A87543"
                      : "rgba(232,227,216,0.78)",
                  }}
                >
                  {etape.annee}
                </span>
              </div>
            );
          })}
        </div>

        {/* Mobile horizontal timeline */}
        <div className="absolute left-0 right-0 top-5 z-[7] px-5 md:hidden">
          <div className="flex items-center justify-center gap-3 overflow-x-auto pb-3">
            {data.map((etape, idx) => {
              const active = activeIndex === idx;

              return (
                <div
                  key={etape.id ?? idx}
                  className="flex shrink-0 items-center gap-1.5"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full transition-all duration-300"
                    style={{
                      background: active
                        ? "#A87543"
                        : "rgba(232,227,216,0.6)",
                      boxShadow: active
                        ? "0 0 0 3px rgba(168,117,67,0.2)"
                        : "none",
                    }}
                  />

                  <span
                    className="font-serif text-sm transition-all duration-300"
                    style={{
                      color: active
                        ? "#D5A77C"
                        : "rgba(232,227,216,0.8)",
                      fontWeight: active ? 600 : 400,
                    }}
                  >
                    {etape.annee}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress bar */}
        <div
          className="
            absolute bottom-5 right-5 z-[8]
            w-[100px]
            sm:right-8 sm:bottom-7
            md:right-[7vw] md:bottom-[30px]
            md:w-[130px]
          "
        >
          <div className="mb-2 flex justify-between font-sans text-[9px] tracking-[0.12em] text-[#E8E3D8]">
            <span>0%</span>
            <span>100%</span>
          </div>

          <div className="relative h-px w-full bg-[#E8E3D8]/35">
            <div
              className="absolute left-0 top-0 h-0.5 bg-[#A87543] transition-all duration-300"
              style={{
                width: `${
                  data.length <= 1
                    ? 100
                    : (activeIndex / (data.length - 1)) * 100
                }%`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
