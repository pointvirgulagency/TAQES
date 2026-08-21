interface Projet {
  id: number;
  title: string;
}

interface Etape {
  id: number;
  annee: string;
  titre: string;
  description: string;
  image?: {
    url: string;
  };
  projects?: Projet[];
}

interface ChronologieProps {
  data: Etape[];
  strapiUrl: string;
}

export default function Chronologie({
  data,
  strapiUrl,
}: ChronologieProps) {
  return (
    <section>

      {data.map((etape) => (
        <article key={etape.id}>

          <h3>{etape.annee}</h3>

          <h4>{etape.titre}</h4>

          <p>{etape.description}</p>

          {etape.image && (
            <img
              src={`${strapiUrl}${etape.image.url}`}
              alt={etape.titre}
            />
          )}

          {etape.projects?.map((project) => (
            <p key={project.id}>
              {project.title}
            </p>
          ))}

        </article>
      ))}

    </section>
  );
}