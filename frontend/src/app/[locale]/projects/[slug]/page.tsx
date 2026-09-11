import type { Metadata } from "next";
import RichText from "@/components/RichText";
import Link from "next/link";
import {
  MapPin,
  Building2,
  Maximize2,
  Layers,
  Activity,
  Calendar,
  Download,
  FileText,
  ArrowRight,
  PhoneCall,
  CalendarDays,
  FileBox,
  Construction,
  Users,
} from "lucide-react";

import { getProjectBySlug } from "@/lib/strapi";
import { generateSeoMetadata } from "@/lib/seo";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;

type Locale = "fr" | "ar";

interface StrapiMedia {
  url: string;
  alternativeText?: string;
  name?: string;
}

interface ProjectType {
  id?: number;
  titre?: string;
  client?: string;
  image?: StrapiMedia;
  description?: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(locale, slug);

  if (!project) {
    return {
      title:
        locale === "ar"
          ? "المشروع غير موجود"
          : "Projet introuvable",
    };
  }

  return generateSeoMetadata(
    project.seo ?? null,
    locale,
    `/projects/${slug}`
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(locale, slug);
  const isArabic = locale === "ar";

  if (!project) {
    return (
      <main
        dir={isArabic ? "rtl" : "ltr"}
        className="min-h-screen bg-[#F5F2EC] px-6 py-32"
      >
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-semibold text-[#094734]">
            {isArabic
              ? "المشروع غير موجود"
              : "Projet introuvable"}
          </h1>

          <Link
            href={`/${locale}/projects`}
            className="mt-8 inline-flex rounded-md bg-[#00674F] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#00674F]/90"
          >
            {isArabic
              ? "العودة إلى المشاريع"
              : "Retour aux projets"}
          </Link>
        </div>
      </main>
    );
  }

  const image = project.FeaturedImage;

  const gallery = (project.gallery ?? []) as StrapiMedia[];

  const brochure = project.brochure as
    | StrapiMedia
    | undefined;

  const types = (project.type ?? []) as ProjectType[];

  const typologies = types
    .map((item) => item.titre)
    .filter(Boolean);

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="bg-[#F5F2EC] text-[#094734] selection:bg-[#00674F] selection:text-white"
    >
      {/* =====================================================
          1. HERO
      ===================================================== */}

      <section className="relative min-h-[85vh] w-full overflow-hidden bg-[#094734] pt-40 md:pt-48">
        {image?.url && (
          <img
            src={`${STRAPI_URL}${image.url}`}
            alt={
              image.alternativeText ||
              project.title
            }
            className="absolute inset-0 h-full w-full object-cover opacity-60"
            loading="eager"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#094734] via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-between px-6 pb-12 pt-6 md:px-10 lg:px-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#EBE2DC]/80">
            <Link
              href={`/${locale}/projects`}
              className="hover:underline"
            >
              {isArabic ? "المشاريع" : "Projets"}
            </Link>

            <span>/</span>

            <span className="text-[#EBE2DC]">
              {project.title}
            </span>
          </div>

          <div className="max-w-4xl py-12">
            <h1 className="text-5xl font-semibold tracking-tight text-[#EBE2DC] md:text-7xl lg:text-8xl">
              {project.title}
            </h1>

            {(project.localisation ||
              project.ville?.ville) && (
              <div className="mt-4 flex items-center gap-2 text-[#EBE2DC]/90">
                <MapPin className="h-4 w-4 text-[#00674F]" />

                <span className="text-sm font-medium tracking-wide">
                  {project.localisation}

                  {project.localisation &&
                    project.ville?.ville &&
                    " - "}

                  {project.ville?.ville}
                </span>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              {project.type_operation && (
                <ProjectTag>
                  {project.type_operation}
                </ProjectTag>
              )}

              {project.zonage && (
                <ProjectTag>
                  {project.zonage}
                </ProjectTag>
              )}

              {project.statut && (
                <ProjectTag>
                  {project.statut}
                </ProjectTag>
              )}

              {project.phase && (
                <ProjectTag>
                  {project.phase}
                </ProjectTag>
              )}
            </div>

            {project.description_courte && (
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#EBE2DC]/85 md:text-lg">
                {project.description_courte}
              </p>
            )}

            {(project.cta_b2c ||
              project.cta_b2b ||
              brochure?.url) && (
              <div className="mt-8 flex flex-wrap gap-4">
                {brochure?.url && (
                  <a
                    href={`${STRAPI_URL}${brochure.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-[#00674F] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#00674F]/90"
                  >
                    <Download className="h-4 w-4" />

                    <span>
                      {isArabic
                        ? "تحميل الكتيب"
                        : "DEMANDER LA BROCHURE"}
                    </span>
                  </a>
                )}

                {(project.cta_b2c ||
                  project.cta_b2b) && (
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-md border border-[#EBE2DC]/40 bg-white/5 px-6 py-3.5 text-sm font-semibold text-[#EBE2DC] backdrop-blur-md transition hover:bg-white/10"
                  >
                    <span>
                      {project.cta_b2c ||
                        project.cta_b2b}
                    </span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          2. PROJECT INFORMATION
      ===================================================== */}

      <section className="relative z-20 mx-auto -mt-8 max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-[#094734]/10 bg-white p-6 shadow-xl md:grid-cols-3 lg:grid-cols-6">
          {typologies.length > 0 && (
            <SpecItem
              icon={Building2}
              label={
                isArabic
                  ? "التصنيف"
                  : "TYPOLOGIE"
              }
              value={typologies.join(" / ")}
            />
          )}

          {project.zonage && (
            <SpecItem
              icon={Construction}
              label={
                isArabic
                  ? "التقسيم"
                  : "ZONAGE"
              }
              value={project.zonage}
            />
          )}

          {project.surface_terrain && (
            <SpecItem
              icon={Maximize2}
              label={
                isArabic
                  ? "مساحة الأرض"
                  : "SURFACE TERRAIN"
              }
              value={project.surface_terrain}
            />
          )}

          {project.surface_develope && (
            <SpecItem
              icon={Layers}
              label={
                isArabic
                  ? "المساحة المطورة"
                  : "SURFACE DÉVELOPPÉE"
              }
              value={project.surface_develope}
            />
          )}

          {project.nombre_lots && (
            <SpecItem
              icon={FileBox}
              label={
                isArabic
                  ? "عدد الوحدات"
                  : "NOMBRE DE LOTS"
              }
              value={project.nombre_lots}
            />
          )}

          {project.statut && (
            <SpecItem
              icon={Activity}
              label={
                isArabic
                  ? "الحالة"
                  : "STATUT"
              }
              value={project.statut}
            />
          )}

          {project.annee && (
            <SpecItem
              icon={Calendar}
              label={
                isArabic
                  ? "السنة"
                  : "ANNÉE"
              }
              value={project.annee}
            />
          )}

          {project.public_cible && (
            <SpecItem
              icon={Users}
              label={
                isArabic
                  ? "الجمهور"
                  : "PUBLIC"
              }
              value={project.public_cible}
            />
          )}
        </div>
      </section>

      {/* =====================================================
          3. GALLERY
      ===================================================== */}

      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {gallery.slice(0, 4).map(
              (item, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl bg-stone-200 shadow-md"
                >
                  <img
                    src={`${STRAPI_URL}${item.url}`}
                    alt={
                      item.alternativeText ||
                      `${project.title} - ${
                        idx + 1
                      }`
                    }
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* =====================================================
          4. DETAILS / DOCUMENTS / LOCATION
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#094734]/10 bg-white p-8 shadow-sm">
            <h3 className="mb-6 text-xl font-semibold tracking-tight text-[#094734]">
              {isArabic
                ? "معلومات المشروع"
                : "INFORMATIONS DU PROJET"}
            </h3>

            <div className="divide-y divide-[#094734]/10">
              {project.type_operation && (
                <DetailRow
                  label={
                    isArabic
                      ? "نوع العملية"
                      : "TYPE D'OPÉRATION"
                  }
                  value={
                    project.type_operation
                  }
                />
              )}

              {project.zonage && (
                <DetailRow
                  label={
                    isArabic
                      ? "التقسيم"
                      : "ZONAGE"
                  }
                  value={project.zonage}
                />
              )}

              {project.phase && (
                <DetailRow
                  label={
                    isArabic
                      ? "المرحلة"
                      : "PHASE"
                  }
                  value={project.phase}
                />
              )}

              {project.disponibilite && (
                <DetailRow
                  label={
                    isArabic
                      ? "التوفر"
                      : "DISPONIBILITÉ"
                  }
                  value={
                    project.disponibilite
                  }
                />
              )}

              {project.public_cible && (
                <DetailRow
                  label={
                    isArabic
                      ? "الجمهور المستهدف"
                      : "PUBLIC CIBLE"
                  }
                  value={
                    project.public_cible
                  }
                />
              )}

              {project.annee && (
                <DetailRow
                  label={
                    isArabic
                      ? "الفترة"
                      : "PÉRIODE"
                  }
                  value={project.annee}
                />
              )}

              {brochure?.url && (
                <a
                  href={`${STRAPI_URL}${brochure.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-4 transition hover:text-[#00674F]"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-[#00674F]" />

                    <span className="text-sm font-medium">
                      {isArabic
                        ? "كتيب المشروع"
                        : "Brochure du projet"}
                    </span>
                  </div>

                  <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-[#094734]/10 bg-white p-8 shadow-sm">
            <div>
              <h3 className="mb-4 text-xl font-semibold tracking-tight text-[#094734]">
                {isArabic
                  ? "الموقع الجغرافي"
                  : "LOCALISATION"}
              </h3>

              {(project.localisation ||
                project.ville?.ville) && (
                <p className="mb-6 text-sm leading-relaxed text-[#094734]/80">
                  {project.localisation}

                  {project.localisation &&
                    project.ville?.ville &&
                    " - "}

                  {project.ville?.ville}
                </p>
              )}

              {project.coordonees && (
                <p className="mb-6 rounded-md bg-[#00674F]/5 p-3 font-mono text-xs text-[#00674F]">
                  {isArabic
                    ? "الإحداثيات: "
                    : "Coordonnées GPS: "}{" "}
                  {project.coordonees}
                </p>
              )}
            </div>

            <div className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-xl border border-[#094734]/10 bg-[#EFE9E2]">
              <div className="p-4 text-center">
                <MapPin className="mx-auto mb-2 h-8 w-8 text-[#00674F]" />

                <span className="text-xs font-semibold text-[#094734]">
                  {project.ville?.ville ||
                    project.localisation ||
                    (isArabic
                      ? "الموقع على الخريطة"
                      : "Voir sur la carte")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          5. DESCRIPTION
      ===================================================== */}

      {project.description_complete && (
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">
          <div className="relative overflow-hidden rounded-3xl bg-[#094734] p-8 text-[#EBE2DC] shadow-xl md:p-14">
            <div className="max-w-3xl">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#00674F]">
                {isArabic
                  ? "التفاصيل الكاملة"
                  : "À PROPOS DU PROJET"}
              </span>

              <h2 className="mb-6 mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {project.title}
              </h2>

            <div className="space-y-4 text-base leading-relaxed !text-white">
                <RichText
                  content={
                    project.description_complete
                  }
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          6. NOTICE
      ===================================================== */}

      {project.mention && (
        <section className="mx-auto max-w-7xl px-6 pb-8 md:px-10 lg:px-16">
          <div className="rounded-xl border border-[#094734]/10 bg-[#EFE9E2] p-5 text-sm leading-relaxed text-[#094734]/70">
            {project.mention}
          </div>
        </section>
      )}

      {/* =====================================================
          7. ACTION CARDS
      ===================================================== */}

      <section
        id="contact"
        className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16"
      >
        <div className="grid gap-6 md:grid-cols-3">
          <ActionCard
            icon={FileText}
            title={
              isArabic
                ? "طلب الكتيب"
                : "DEMANDER LA BROCHURE"
            }
            description={
              isArabic
                ? "احصل على تفاصيل المشروع كاملة."
                : "Recevez la documentation complète du projet."
            }
            linkText={
              project.cta_b2c ||
              (isArabic
                ? "اطلب الآن"
                : "Demander")
            }
            locale={locale}
            isArabic={isArabic}
          />

          <ActionCard
            icon={CalendarDays}
            title={
              isArabic
                ? "حدد موعداً"
                : "PRENDRE RENDEZ-VOUS"
            }
            description={
              isArabic
                ? "حدد موعداً مع مستشارينا."
                : "Planifiez un rendez-vous avec nos conseillers."
            }
            linkText={
              isArabic
                ? "حجز موعد"
                : "Prendre RDV"
            }
            locale={locale}
            isArabic={isArabic}
          />

          <ActionCard
            icon={PhoneCall}
            title={
              isArabic
                ? "اتصل بنا"
                : "ÊTRE RAPPELÉ"
            }
            description={
              isArabic
                ? "اترك لنا بياناتك وسنتواصل معك."
                : "Laissez-nous vos coordonnées, nous vous rappelons."
            }
            linkText={
              project.cta_b2b ||
              (isArabic
                ? "اتصل بي"
                : "Être rappelé")
            }
            locale={locale}
            isArabic={isArabic}
          />
        </div>
      </section>

      {/* =====================================================
          8. BACK
      ===================================================== */}

      <section className="border-t border-[#094734]/10 px-6 py-12 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-3 text-sm font-semibold text-[#00674F] transition hover:opacity-80"
          >
            <span
              className={
                isArabic ? "rotate-180" : ""
              }
            >
              ←
            </span>

            <span>
              {isArabic
                ? "العودة إلى المشاريع"
                : "RETOURNER AUX PROJETS"}
            </span>
          </Link>

          <Link
            href={`/${locale}/projects`}
            className="text-xs font-semibold uppercase tracking-wider text-[#094734]/60 hover:text-[#094734]"
          >
            {isArabic
              ? "جميع المشاريع"
              : "VOIR TOUS LES PROJETS"}
          </Link>
        </div>
      </section>
    </main>
  );
}

function ProjectTag({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-[#EBE2DC] backdrop-blur-md">
      {children}
    </span>
  );
}

function SpecItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value?: string | number;
}) {
  if (!value) return null;

  return (
    <div className="flex flex-col items-center border-r border-[#094734]/10 p-4 text-center last:border-r-0">
      <Icon
        className="mb-2 h-5 w-5 text-[#00674F]"
        strokeWidth={1.5}
      />

      <span className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#094734]/50">
        {label}
      </span>

      <span className="text-sm font-semibold text-[#094734]">
        {value}
      </span>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) {
  if (!value) return null;

  return (
    <div className="flex items-center justify-between gap-6 py-4">
      <span className="text-xs font-semibold uppercase tracking-wider text-[#094734]/50">
        {label}
      </span>

      <span className="text-right text-sm font-medium text-[#094734]">
        {value}
      </span>
    </div>
  );
}

function ActionCard({
  icon: Icon,
  title,
  description,
  linkText,
  locale,
  isArabic,
}: {
  icon: any;
  title: string;
  description: string;
  linkText: string;
  locale: Locale;
  isArabic: boolean;
}) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-[#094734]/10 bg-white p-8 shadow-sm">
      <div>
        <Icon className="mb-4 h-8 w-8 text-[#00674F]" />

        <h4 className="mb-2 text-lg font-semibold text-[#094734]">
          {title}
        </h4>

        <p className="mb-6 text-sm text-[#094734]/70">
          {description}
        </p>
      </div>

      <a
        href={`/${locale}/contact`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#00674F] transition-all hover:gap-3"
      >
        <span>{linkText}</span>

        <ArrowRight
          className={`h-4 w-4 ${
            isArabic ? "rotate-180" : ""
          }`}
        />
      </a>
    </div>
  );
}