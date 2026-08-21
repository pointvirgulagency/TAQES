interface Chiffre {
  id: number;
  valeur: string;
  libelle: string;
}

interface ChiffresClesProps {
  data: Chiffre[];
}

export default function ChiffresCles({
  data,
}: ChiffresClesProps) {
  return (
    <section className="border-y border-[#094734]/10 bg-[#EBE2DC]/30 px-6 py-16 md:px-10 md:py-20 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {data.map((chiffre, index) => (
            <article
              key={chiffre.id}
              className={`
                flex flex-col items-center justify-center px-6 py-6 text-center
                ${
                  index !== 0
                    ? "border-l border-[#094734]/10"
                    : ""
                }
              `}
            >
              <strong className="font-serif text-4xl font-normal leading-none text-[#00674F] md:text-5xl">
                {chiffre.valeur}
              </strong>

              <span className="mt-3 max-w-[130px] text-[10px] uppercase leading-4 tracking-[0.12em] text-[#094734]/60">
                {chiffre.libelle}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}