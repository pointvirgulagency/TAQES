import Link from "next/link";

interface CTAFinalProps {
  data: {
    titre: string;
    texte?: string;

    libelleBoutonProjets: string;
    lienBoutonProjets?: string;

    libelleBoutonContact: string;
    lienBoutonContact?: string;
  };
}

export default function CTAFinal({
  data,
}: CTAFinalProps) {

  return (
    <section>

      <h2>
        {data.titre}
      </h2>

      {data.texte && (
        <p>
          {data.texte}
        </p>
      )}


      <div>

        <Link
          href={data.lienBoutonProjets ?? "#"}
        >
          {data.libelleBoutonProjets}
        </Link>


        <Link
          href={data.lienBoutonContact ?? "#"}
        >
          {data.libelleBoutonContact}
        </Link>

      </div>

    </section>
  );
}