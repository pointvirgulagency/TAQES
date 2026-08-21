import RichText from "@/components/RichText";

interface RichTextBlock {
  type: string;
  children: {
    type: string;
    text: string;
  }[];
}

interface Membre {
  id: number;
  ordre: number;
  nom: string;
  fonction: string;
  biographie?: string | RichTextBlock[];
  photo?: {
    url: string;
  };
}

interface GouvernanceProps {
  data: {
    titre: string;
    membres: Membre[];
  };
  strapiUrl: string;
}

export default function Gouvernance({
  data,
  strapiUrl,
}: GouvernanceProps) {
  const membres = [...data.membres].sort(
    (a, b) => a.ordre - b.ordre
  );

  return (
    <section className="bg-white px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        <h2 className="mb-12 text-3xl font-semibold text-[#094734] md:text-4xl">
          {data.titre}
        </h2>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">

          {membres.map((membre) => (
            <article
              key={membre.id}
              className="rounded-2xl border border-[#094734]/10 bg-[#EBE2DC]/40 p-6"
            >

              {membre.photo && (
                <img
                  src={`${strapiUrl}${membre.photo.url}`}
                  alt={membre.nom}
                  className="mb-6 h-72 w-full rounded-xl object-cover"
                />
              )}

              <h3 className="text-2xl font-semibold text-[#00674F]">
                {membre.nom}
              </h3>

              <h4 className="mt-2 text-sm uppercase tracking-[0.2em] text-[#449383]">
                {membre.fonction}
              </h4>

              <div className="mt-6 text-[#094734]/80">
                <RichText
                  content={membre.biographie}
                  className="leading-7"
                />
              </div>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
}