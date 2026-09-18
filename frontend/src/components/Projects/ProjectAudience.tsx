import React from "react";

interface ProjectAudienceProps {
  project?: any;
  locale?: string;
}

export default function ProjectAudience({
  locale = "fr",
}: ProjectAudienceProps) {
  const contactHref = `/${locale}/contact`;
  const opporHref = `/${locale}/opportunites-partenariats`;

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col items-start justify-between bg-[#043325] px-8 py-10 md:px-14 md:py-12 lg:px-20 lg:py-16">
          <div className="flex flex-col items-start">
            <div className="mb-6">
              <svg
                width="56"
                height="42"
                viewBox="0 0 56 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-90"
              >
                <path
                  d="M18.6667 21C22.8088 21 26.1667 17.6421 26.1667 13.5C26.1667 9.35786 22.8088 6 18.6667 6C14.5245 6 11.1667 9.35786 11.1667 13.5C11.1667 17.6421 14.5245 21 18.6667 21Z"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 36C7 29.6487 12.2233 24.5 18.6667 24.5C25.11 24.5 30.3333 29.6487 30.3333 36"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M37.3333 18.6667C40.7851 18.6667 43.5833 15.8685 43.5833 12.4167C43.5833 8.96489 40.7851 6.16666 37.3333 6.16666"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M49 36C49 30.5 44 26 37.3333 26"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h2 className="font-serif text-2xl font-normal tracking-wide text-white uppercase md:text-3xl">
              Vous êtes particulier ?
            </h2>

            <p className="mt-4 text-xs font-light leading-relaxed text-emerald-100/80 md:text-sm">
              Recevez les prochaines informations
              <br />
              liées au lancement du projet.
            </p>
          </div>

          <a
            href={contactHref}
            className="mt-8 inline-flex items-center gap-2 bg-white px-6 py-2.5 text-[11px] font-bold tracking-[0.15em] text-[#043325] transition-colors hover:bg-gray-100"
          >
            ÊTRE INFORMÉ <span className="text-xs">→</span>
          </a>
        </div>

        <div className="flex flex-col items-start justify-between bg-[#EFECE6] px-8 py-10 md:px-14 md:py-12 lg:px-20 lg:py-16">
          <div className="flex flex-col items-start">
            <div className="mb-6">
              <svg
                width="56"
                height="42"
                viewBox="0 0 56 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 22L24 30L34 20M34 20L28 14L22 20M34 20L42 28"
                  stroke="#A38D6D"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.5 17.5L20 9L26 15L17.5 23.5L11.5 17.5Z"
                  stroke="#A38D6D"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M44.5 17.5L36 9L30 15L38.5 23.5L44.5 17.5Z"
                  stroke="#A38D6D"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h2 className="font-serif text-2xl font-normal tracking-wide text-[#043325] uppercase md:text-3xl">
              Vous êtes professionnel
              <br />
              ou partenaire ?
            </h2>

            <p className="mt-4 text-xs font-light leading-relaxed text-gray-600 md:text-sm">
              Échangeons autour des opportunités
              <br />
              liées au projet et au territoire.
            </p>
          </div>

          <a
            href={opporHref}
            className="mt-8 inline-flex items-center gap-2 bg-white px-6 py-2.5 text-[11px] font-bold tracking-[0.15em] text-[#043325] transition-colors hover:bg-gray-50"
          >
            OPPORTUNITÉS & PARTENARIATS <span className="text-xs">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
