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
      if (!data?.length || !sectionRef.current) {
        return;
      }

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

        onEnter: () => {
          setActiveIndex(0);
        },

        onLeaveBack: () => {
          setActiveIndex(0);
        },

        onLeave: () => {
          setActiveIndex(steps - 1);
        },
      });

      return () => {
        trigger.kill();
      };
    },
    {
      scope: sectionRef,
      dependencies: [data],
      revertOnUpdate: true,
    }
  );

  if (!data?.length) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: `${data.length * 100}vh`,
        background: "#123D33",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          boxSizing: "border-box",
          fontFamily: "'Georgia', 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            overflow: "hidden",
          }}
        >
          {data.map((etape, idx) => {
            const image = Array.isArray(etape.image)
              ? etape.image[0]
              : etape.image;

            if (!image?.url) {
              return null;
            }

            const imageUrl = `${strapiUrl.replace(
              /\/$/,
              ""
            )}${image.url}`;

            const active = activeIndex === idx;

            return (
              <div
                key={etape.id ?? idx}
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url("${imageUrl}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
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

        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: "45vw",
            maxWidth: "780px",
            height: "78vh",
            zIndex: 4,
          }}
        >
          {data.map((etape, idx) => {
            const active = activeIndex === idx;

            return (
              <div
                key={etape.id ?? idx}
                style={{
                  position: "absolute",
                  inset: 0,
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
                  style={{
                    width: "100%",
                    height: "100%",
                    boxSizing: "border-box",
                    padding: "45px 60px 65px 55px",
                    background: "rgba(245,242,234,0.88)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                    borderTop:
                      "1px solid rgba(168,117,67,0.25)",
                    borderLeft:
                      "1px solid rgba(168,117,67,0.25)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    boxShadow:
                      "-25px -10px 70px rgba(18,61,51,0.12)",
                  }}
                >
                  <div
                    style={{
                      marginBottom: "14px",
                      fontFamily:
                        "Arial, Helvetica, sans-serif",
                      fontSize: "9px",
                      fontWeight: 600,
                      letterSpacing: "0.19em",
                      textTransform: "uppercase",
                      color: "#53645D",
                    }}
                  >
                    Chronologie
                  </div>

                  <div
                    style={{
                      marginBottom: "12px",
                      fontFamily:
                        "'Georgia', 'Times New Roman', serif",
                      fontSize: "15px",
                      letterSpacing: "0.08em",
                      color: "#A87543",
                    }}
                  >
                    {etape.annee}
                  </div>

                  <h3
                    style={{
                      margin: "0 0 24px",
                      maxWidth: "600px",
                      fontFamily:
                        "'Georgia', 'Times New Roman', serif",
                      fontSize: "clamp(32px, 3.2vw, 35px)",
                      lineHeight: 1.03,
                      fontWeight: 500,
                      letterSpacing: "-0.035em",
                      color: "#163F35",
                    }}
                  >
                    {etape.titre || etape.annee}
                  </h3>

                  <div
                    style={{
                      width: "45px",
                      height: "1px",
                      marginBottom: "24px",
                      background: "#A87543",
                    }}
                  />

                  {etape.description && (
                    <p
                      style={{
                        maxWidth: "550px",
                        margin: 0,
                        fontFamily:
                          "Arial, Helvetica, sans-serif",
                        fontSize: "14px",
                        lineHeight: 1.75,
                        color: "#53645D",
                      }}
                    >
                      {etape.description}
                    </p>
                  )}

                  {etape.projects &&
                    etape.projects.length > 0 && (
                      <div
                        style={{
                          marginTop: "30px",
                          paddingTop: "18px",
                          borderTop:
                            "1px solid rgba(168,117,67,0.28)",
                        }}
                      >
                        {etape.projects.map((project) => (
                          <p
                            key={project.id}
                            style={{
                              margin: "6px 0",
                              fontFamily:
                                "Arial, Helvetica, sans-serif",
                              fontSize: "11px",
                              lineHeight: 1.5,
                              color: "#69736E",
                            }}
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

        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
            background:
              "linear-gradient(to bottom, transparent 0%, transparent 75%, #123D33 95%, #123D33 100%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "7vw",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 6,
            display: "flex",
            flexDirection: "column",
            gap: "25px",
            minWidth: "115px",
            paddingLeft: "27px",
            borderLeft:
              "1px solid rgba(232,227,216,0.65)",
          }}
        >
          {data.map((etape, idx) => {
            const active = activeIndex === idx;

            return (
              <div
                key={etape.id ?? idx}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  minHeight: active ? "34px" : "24px",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: "-32px",
                    width: active ? "9px" : "7px",
                    height: active ? "9px" : "7px",
                    borderRadius: "50%",
                    background: active
                      ? "#A87543"
                      : "rgba(18,61,51,0.12)",
                    border: active
                      ? "1px solid #A87543"
                      : "1px solid rgba(232,227,216,0.9)",
                    boxShadow: active
                      ? "0 0 0 3px rgba(168,117,67,0.18)"
                      : "none",
                    transition: "all 0.45s ease",
                  }}
                />

                <span
                  style={{
                    display: "block",
                    fontFamily:
                      "'Georgia', 'Times New Roman', serif",
                    fontSize: active ? "25px" : "15px",
                    lineHeight: 1,
                    fontWeight: active ? 500 : 400,
                    color: active
                      ? "#A87543"
                      : "rgba(232,227,216,0.78)",
                    transition:
                      "font-size 0.45s ease, color 0.45s ease, font-weight 0.45s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {etape.annee}
                </span>
              </div>
            );
          })}
        </div>

        <div
          style={{
            position: "absolute",
            right: "7vw",
            bottom: "30px",
            width: "130px",
            zIndex: 7,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
              fontFamily:
                "Arial, Helvetica, sans-serif",
              fontSize: "9px",
              letterSpacing: "0.12em",
              color: "#E8E3D8",
            }}
          >
            <span>0%</span>
            <span>100%</span>
          </div>

          <div
            style={{
              position: "relative",
              width: "100%",
              height: "1px",
              background:
                "rgba(232,227,216,0.35)",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: `${
                  data.length <= 1
                    ? 100
                    : (activeIndex /
                        (data.length - 1)) *
                      100
                }%`,
                height: "2px",
                background: "#A87543",
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}