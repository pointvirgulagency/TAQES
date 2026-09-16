interface ProjectMediaProps {
  project: any;
  strapiUrl: string;
}

export default function ProjectMedia({
  project,
  strapiUrl,
}: ProjectMediaProps) {
  const baseUrl = strapiUrl.replace(/\/$/, "");

  const gallery = Array.isArray(project?.gallery) ? project.gallery : [];

  if (!gallery.length) return null;

  const getImageUrl = (image: any) => {
    if (!image?.url) return "";

    return image.url.startsWith("http")
      ? image.url
      : `${baseUrl}${image.url}`;
  };

  const images = gallery
    .map((image: any) => ({
      ...image,
      src: getImageUrl(image),
    }))
    .filter((image: any) => image.src);

  if (!images.length) return null;

  return (
    <section className="bg-[#E5E1D8] px-6 py-14 md:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#449383]">
            Le projet
          </p>

          <h2 className="mt-3 font-serif text-3xl uppercase tracking-wide text-[#094734] md:text-4xl">
            Galerie
          </h2>

          <div className="mt-4 h-[2px] w-12 bg-[#094734]/40" />
        </div>

        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Column 1: Single Large Hero Image */}
          <div className="relative min-h-[300px] w-full overflow-hidden bg-gray-200 md:min-h-full">
            {images[0] && (
              <img
                src={images[0].src}
                alt={
                  images[0].alternativeText ||
                  project?.title ||
                  "Image principale du projet"
                }
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
          </div>

          {/* Column 2: 3 Images Grid (2 top, 1 wide bottom) */}
          <div className="grid grid-cols-2 gap-4">
            {/* Top Left Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200">
              {images[1] && (
                <img
                  src={images[1].src}
                  alt={
                    images[1].alternativeText ||
                    project?.title ||
                    "Image du projet 2"
                  }
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            {/* Top Right Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200">
              {images[2] && (
                <img
                  src={images[2].src}
                  alt={
                    images[2].alternativeText ||
                    project?.title ||
                    "Image du projet 3"
                  }
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            {/* Bottom Full-Width Image Spanning 2 Columns */}
            <div className="col-span-2 relative aspect-[21/9] w-full overflow-hidden bg-gray-200">
              {images[3] && (
                <img
                  src={images[3].src}
                  alt={
                    images[3].alternativeText ||
                    project?.title ||
                    "Image du projet 4"
                  }
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}