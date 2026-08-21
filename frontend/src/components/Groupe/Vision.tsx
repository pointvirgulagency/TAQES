import RichText from "@/components/RichText";

interface VisionProps {
  data: {
    titre: string;
    description: any;
    image?: {
      url: string;
    };
  };
  strapiUrl: string;
}

export default function Vision({
  data,
  strapiUrl,
}: VisionProps) {
  return (
    <section className="bg-[#EBE2DC]/40 px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {data.image && (
            <div className="lg:-translate-x-4">
              <img
                src={`${strapiUrl}${data.image.url}`}
                alt={data.titre}
                className="h-[450px] w-full rounded-2xl object-cover"
              />
            </div>
          )}

          <div>
            <h2 className="mb-6 text-3xl font-semibold text-[#094734] md:text-4xl">
              {data.titre}
            </h2>

            <div className="text-lg leading-8 text-[#094734]/80">
              <RichText
                content={data.description}
                className="leading-8"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}