import RichText from "@/components/RichText";

interface Membre {
  id: number;
  nom?: string | null;
  job?: string | null;
  poste?: string | null;
  picture?: {
    url: string;
  } | null;
}

interface GouvernanceProps {
  data: {
    titre?: string | null;
    membres?: Membre[] | null;
  };
  strapiUrl: string;
}

export default function Gouvernance({
  data,
  strapiUrl,
}: GouvernanceProps) {
  const membres = data?.membres ?? [];

  if (!data) {
    return null;
  }

  return (
    <section className="bg-[#EEEAE1] px-6 py-16 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 flex items-start justify-between">
          <h2 className="font-serif text-3xl font-normal text-[#1B4C4A] md:text-4xl">
            {data.titre}
          </h2>

          <a
            href="#"
            className="hidden shrink-0 items-center gap-2 text-sm text-[#1B4C4A] md:flex"
          >
            Découvrir notre approche de gouvernance
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {membres.map((membre) => (
            <article
              key={membre.id}
              className="flex min-h-[260px]"
            >
              {membre.picture ? (
                <img
                  src={`${strapiUrl}${membre.picture.url}`}
                  alt={membre.nom ?? ""}
                  className="h-64 w-1/2 shrink-0 object-cover"
                />
              ) : (
                <div className="h-64 w-1/2 shrink-0 bg-[#D8D2C6]" />
              )}

              <div className="flex w-1/2 flex-col bg-[#EBE5DA] p-5">
                {membre.nom && (
                  <h3 className="font-serif text-lg font-semibold text-[#1B4C4A]">
                    {membre.nom}
                  </h3>
                )}

                {membre.job && (
                  <h4 className="mt-1 text-sm text-[#1B4C4A]">
                    {membre.job}
                  </h4>
                )}

                {membre.poste && (
                  <p className="mt-4 text-xs font-medium uppercase tracking-wide text-[#1B4C4A]/60">
                    {membre.poste}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}