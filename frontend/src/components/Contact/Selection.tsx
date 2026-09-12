"use client";

interface SelectionProps {
  data?: {
    eyebrow?: string | null;
    title?: string | null;
    adresse?: string | null;
  } | null;
}

export default function Selection({ data }: SelectionProps) {
  if (!data) return null;

  const address = data.adresse?.trim();

  if (!data.title && !data.eyebrow && !address) return null;

  const mapUrl = address
    ? `https://www.google.com/maps?q=${encodeURIComponent(
        address
      )}&output=embed`
    : null;

  return (
    <section className="px-4 py-10 md:px-8 lg:px-12 lg:py-14">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[24px] bg-[#E8E8E5]">
        <div className="grid min-h-[380px] lg:grid-cols-[40%_60%]">
          <div className="flex flex-col justify-center px-8 py-10 md:px-12 lg:px-14 xl:px-16">
            {data.eyebrow && (
              <div className="mb-4">
                <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#449383]">
                  {data.eyebrow}
                </p>

                <div className="mt-3 h-[2px] w-10 bg-[#D9B77C]" />
              </div>
            )}

            {data.title && (
              <h2 className="max-w-[560px] font-serif text-[34px] leading-[1.08] tracking-[-0.025em] text-[#094734] md:text-[40px] lg:text-[46px]">
                {data.title}
              </h2>
            )}

            {address && (
              <p className="mt-6 max-w-[500px] whitespace-pre-line text-[15px] leading-[1.6] text-[#094734]/75 md:text-[16px]">
                {address}
              </p>
            )}
          </div>

          <div className="relative min-h-[300px] lg:min-h-[380px]">
            {mapUrl && (
              <iframe
                src={mapUrl}
                title={data.title || "Notre localisation"}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}