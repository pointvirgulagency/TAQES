import RichText from "@/components/RichText";

interface RichTextBlock {
  type: string;
  children: {
    type: string;
    text: string;
  }[];
}

interface FonciereAliaProps {
  data: {
    titre: string;
    description?: string | RichTextBlock[];
    image?: {
      url: string;
    };
  };
  strapiUrl: string;
}

export default function FonciereAlia({
  data,
  strapiUrl,
}: FonciereAliaProps) {
  return (
    <section className="bg-[#EBE2DC] px-6 py-16 md:px-10 md:py-20 lg:px-16">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">

        {/* Visual */}
        <div className="relative min-h-[320px] overflow-hidden bg-[#094734] md:min-h-[400px]">
          {data.image && (
            <img
              src={`${strapiUrl}${data.image.url}`}
              alt={data.titre}
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-[#094734]/90 via-[#094734]/40 to-transparent" />

          <div className="relative flex h-full flex-col justify-center p-8 md:p-12">
            <span className="mb-4 text-[10px] uppercase tracking-[0.3em] text-[#EBE2DC]/60">
              Foncière
            </span>

            <h2 className="max-w-sm font-serif text-4xl font-normal leading-[1.05] text-[#EBE2DC] md:text-5xl">
              {data.titre}
            </h2>

            <div className="mt-8 h-px w-16 bg-[#EBE2DC]/40" />
          </div>

          <div className="absolute -bottom-10 -right-10 h-32 w-32 rotate-45 border border-[#EBE2DC]/20" />
          <div className="absolute -bottom-4 -right-4 h-20 w-20 rotate-45 border border-[#EBE2DC]/10" />
        </div>

        {/* Content */}
        <div className="flex items-center bg-[#F4F0EA] p-8 md:p-12 lg:p-16">
          <div className="max-w-lg">
            <span className="mb-5 block text-[10px] uppercase tracking-[0.2em] text-[#449383]">
              TAQÈS
            </span>

            <RichText
              content={data.description}
              className="text-sm leading-7 text-[#094734]/75 md:text-base md:leading-8"
            />

            <div className="mt-8 flex items-center gap-3">
              <span className="h-px w-10 bg-[#094734]/30" />
              <span className="h-2 w-2 rotate-45 border border-[#094734]/40" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}