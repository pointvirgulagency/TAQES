import Link from "next/link";

interface Pilier {
  id: number;
  titre: string;
  description: string;
  lien?: string;
  icone?: {
    url: string;
  };
}

interface NotreApprocheProps {
  titre: string;
  data: Pilier[];
  strapiUrl: string;
}

export default function NotreApproche({
  titre,
  data,
  strapiUrl,
}: NotreApprocheProps) {
  return (
    <section className="bg-[#EBE2DC] px-6 py-20 md:px-10 md:py-28 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <span className="mb-5 block text-sm font-medium uppercase tracking-[0.2em] text-[#449383]">
            Notre approche
          </span>

          <h2 className="text-3xl font-semibold tracking-tight text-[#094734] md:text-4xl lg:text-5xl">
            {titre}
          </h2>
        </div>

        {/* Pillars */}
        <div className="grid border-t border-[#094734]/20 md:grid-cols-3">
          {data?.map((pilier, index) => (
            <article
              key={pilier.id}
              className="group border-b border-[#094734]/20 py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0 lg:py-12"
            >
              {/* Number + icon */}
              <div className="mb-8 flex items-center justify-between">
                <span className="text-sm font-medium tracking-[0.15em] text-[#449383]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {pilier.icone && (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#094734]/20">
                    <img
                      src={`${strapiUrl}${pilier.icone.url}`}
                      alt=""
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="mb-5 text-2xl font-semibold tracking-tight text-[#094734] md:text-[1.7rem]">
                {pilier.titre}
              </h3>

              {/* Description */}
              <p className="mb-8 max-w-md leading-7 text-[#094734]/70">
                {pilier.description}
              </p>

              {/* Link */}
              {pilier.lien && (
                <Link
                  href={pilier.lien}
                  className="inline-flex items-center gap-3 text-sm font-semibold text-[#094734] transition-all duration-300 group-hover:gap-4"
                >
                  <span className="border-b border-[#094734] pb-1">
                    En savoir plus
                  </span>

                  <span aria-hidden="true">→</span>
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}