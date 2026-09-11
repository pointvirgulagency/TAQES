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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(locale, slug);

  if (!project) {
    return {
      title: locale === "ar" ? "المشروع غير موجود" : "Projet introuvable",
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
            {isArabic ? "المشروع غير موجود" : "Projet introuvable"}
          </h1>

          <Link
            href={`/${locale}/projects`}
            className="mt-8 inline-flex rounded-md bg-[#00674F] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#00674F]/90"
          >
            {isArabic ? "العودة إلى المشاريع" : "Retour aux projets"}
          </Link>
        </div>
      </main>
    );
  }

  const image = project.FeaturedImage;
  const gallery = (project.gallery ?? []) as StrapiMedia[];
  const brochure = project.brochure as StrapiMedia | undefined;

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="bg-[#F5F2EC] text-[#094734] selection:bg-[#00674F] selection:text-white"
    >
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] w-full overflow-hidden bg-[#094734] pt-40 md:pt-48">
        {image?.url && (
          <img
            src={`${STRAPI_URL}${image.url}`}
            alt={image.alternativeText || project.title}
            className="absolute inset-0 h-full w-full object-cover opacity-60"
            loading="eager"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-[#094734]/95 via-[#094734]/70 to-transparent" />
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

            {project.localisation && (
              <div className="mt-4 flex items-center gap-2 text-[#EBE2DC]/90">
                <MapPin className="h-4 w-4 text-[#00674F]" />

                <span className="text-sm font-medium tracking-wide">
                  {project.localisation}{" "}
                  {project.ville
                    ? `- ${project.ville.ville}`
                    : ""}
                </span>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              {[
                project.typologie,
                project.public_cible,
                project.statut,
              ]
                .filter(Boolean)
                .map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-[#EBE2DC] backdrop-blur-md"
                  >
                    {tag}
                  </span>
                ))}
            </div>

            {project.description_courte && (
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#EBE2DC]/85 md:text-lg">
                {project.description_courte}
              </p>
            )}

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

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-md border border-[#EBE2DC]/40 bg-white/5 px-6 py-3.5 text-sm font-semibold text-[#EBE2DC] backdrop-blur-md transition hover:bg-white/10"
              >
                <span>
                  {isArabic ? "اتصل بنا" : "ÊTRE RAPPELÉ"}
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPECIFICATIONS GRID BAR */}
      <section className="relative z-20 mx-auto -mt-8 max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-[#094734]/10 bg-white p-6 shadow-xl md:grid-cols-3 lg:grid-cols-6">
          <SpecItem
            icon={Building2}
            label={isArabic ? "التصنيف" : "TYPOLOGIE"}
            value={project.typologie}
          />

          <SpecItem
            icon={Maximize2}
            label={isArabic ? "مساحة الأرض" : "SURFACE TERRAIN"}
            value={project.surface_terrain}
          />

          <SpecItem
            icon={Layers}
            label={isArabic ? "المساحة المطورة" : "SURFACE DÉVELOPPÉE"}
            value={project.surface_develope}
          />

          <SpecItem
            icon={FileBox}
            label={isArabic ? "عدد الوحدات" : "NOMBRE DE LOTS"}
            value={project.nombre_lots}
          />

          <SpecItem
            icon={Activity}
            label={isArabic ? "الحالة" : "STATUT"}
            value={project.statut}
          />

          <SpecItem
            icon={Calendar}
            label={isArabic ? "السنة" : "ANNÉE"}
            value={project.annee}
          />
        </div>
      </section>

      {/* 3. GALLERY SLIDER / PREVIEW */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {gallery.slice(0, 4).map((item, idx) => (
              <div
                key={idx}
                className="relative aspect-[4/3] overflow-hidden rounded-xl bg-stone-200 shadow-md"
              >
                <img
                  src={`${STRAPI_URL}${item.url}`}
                  alt={
                    item.alternativeText ||
                    `Gallery image ${idx + 1}`
                  }
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. PLANS & DOCUMENTS / LOCALISATION SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#094734]/10 bg-white p-8 shadow-sm">
            <h3 className="mb-6 text-xl font-semibold tracking-tight text-[#094734]">
              {isArabic
                ? "الخطط والمستندات"
                : "PLANS & DOCUMENTS"}
            </h3>

            <div className="divide-y divide-[#094734]/10">
              {brochure?.url ? (
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
                        ? "كتيب المشروع الكامل"
                        : "Cahier des charges / Brochure"}
                    </span>
                  </div>

                  <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </a>
              ) : (
                <p className="py-4 text-sm text-[#094734]/60">
                  {isArabic
                    ? "لا توجد مستندات متاحة حاليا."
                    : "Aucun document disponible pour le moment."}
                </p>
              )}
            </div>

            {brochure?.url && (
              <div className="mt-8">
                <a
                  href={`${STRAPI_URL}${brochure.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-md bg-[#094734] py-4 text-center text-sm font-semibold text-white shadow-md transition hover:bg-[#094734]/90"
                >
                  {isArabic
                    ? "تحميل الملف الكامل"
                    : "TÉLÉCHARGER LE DOSSIER COMPLET"}
                </a>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-[#094734]/10 bg-white p-8 shadow-sm">
            <div>
              <h3 className="mb-4 text-xl font-semibold tracking-tight text-[#094734]">
                {isArabic
                  ? "الموقع الجغرافي"
                  : "LOCALISATION"}
              </h3>

              {project.localisation && (
                <p className="mb-6 text-sm leading-relaxed text-[#094734]/80">
                  {project.localisation}{" "}
                  {project.ville
                    ? `- ${project.ville.ville}`
                    : ""}
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
                <MapPin className="mx-auto mb-2 h-8 w-8 animate-bounce text-[#00674F]" />

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

      {/* 5. FULL DESCRIPTION SECTION */}
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

              <div className="space-y-4 text-base leading-relaxed text-[#EBE2DC]/90">
                <RichText content={project.description_complete} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. ACTION CARDS */}
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
                ? "احصل على تفاصيل المشروع كاملة بريدك الإلكتروني."
                : "Recevez la documentation complète du projet."
            }
            linkText={isArabic ? "اطلب الآن" : "Demander"}
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
                ? "حدد موعداً مع مستشارينا لمناقشة مشروعك."
                : "Planifiez un rendez-vous avec nos conseillers."
            }
            linkText={isArabic ? "حجز موعد" : "Prendre RDV"}
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
                ? "اترك لنا رقمك وسنقوم بالاتصال بك في أقرب وقت."
                : "Laissez-nous vos coordonnées, nous vous rappelons."
            }
            linkText={isArabic ? "اتصل بي" : "Être rappelé"}
            locale={locale}
            isArabic={isArabic}
          />
        </div>
      </section>

      {/* 7. BACK LINK */}
      <section className="border-t border-[#094734]/10 px-6 py-12 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-3 text-sm font-semibold text-[#00674F] transition hover:opacity-80"
          >
            <span
              className={`${isArabic ? "rotate-180" : ""}`}
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