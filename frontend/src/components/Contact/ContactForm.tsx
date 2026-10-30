
"use client";

import { useState } from "react";
import {
  submitDemande,
  uploadFile,
  uploadFiles,
} from "@/lib/strapi";
import {
  TYPE_CONFIG,
  type DemandeType,
} from "./ContactTabs";

interface ContactFormProps {
  locale: "fr" | "ar";
  type: DemandeType;
  projects: { id: number; title: string }[];
}

type Status = "idle" | "submitting" | "success" | "error";

const emptyForm = () => ({
  nomComplet: "",
  telephone: "",
  email: "",
  preference_contact: "",
  ville: "",
  message: "",
  consentement: false,

  project: "",
  zone_recherchee: "",
  type_bien: "",
  surface_recherchee: "",
  horizon_acquisition: "",
  budget_indicatif: "",

  localisation: "",
  superficie: "",
  nature_proposition: "",
  document_foncier: null as File | null,

  organisation: "",
  fonction: "",
  type_demande: "",
  message_detail: "",

  reference_dossier: "",
  objet: "",
  piece_jointe: [] as File[],

  cv: null as File | null,

  media_organisation: "",
  nature_demande: "",
  sujet_demande: "",
  date_echeance: "",
  presse_piece_jointe: null as File | null,
});

type FormState = ReturnType<typeof emptyForm>;

const translations = {
  fr: {
    search: "Recherche de bien",
    press: "Presse & Médias",
    request: "Votre demande",
    projectTitle: "Parlez-nous de votre projet immobilier",
    pressTitle: "Votre demande presse",
    requestTitle: "Envoyez-nous votre demande",
    projectDescription:
      "Indiquez-nous vos critères afin que notre équipe puisse vous orienter vers le projet ou le bien qui correspond à votre recherche.",
    pressDescription:
      "Vous êtes journaliste, média ou professionnel de la communication ? Adressez votre demande à notre équipe.",
    requestDescription:
      "Complétez le formulaire ci-dessous afin que notre équipe puisse traiter votre demande dans les meilleures conditions.",

    contactDetails: "Vos coordonnées",
    fullName: "Nom complet",
    fullNamePlaceholder: "Votre nom complet",
    professionalEmail: "E-mail professionnel",
    email: "Email",
    emailPlaceholder: "votreemail@example.com",
    phone: "Téléphone",
    phonePlaceholder: "06 12 34 56 78",
    city: "Ville",
    cityPlaceholder: "Votre ville",
    contactPreference: "Préférence de contact",
    select: "Sélectionner",
    emailOption: "Email",
    phoneOption: "Téléphone",
    detailedMessage: "Message détaillé",
    yourMessage: "Votre message",
    pressMessagePlaceholder: "Décrivez votre demande en détail...",
    messagePlaceholder: "Décrivez votre demande en quelques lignes...",
    consent:
      "J'accepte que mes données soient utilisées afin de traiter ma demande.",
    submitting: "Envoi en cours...",
    contactAgain: "Être recontacté",
    sendPress: "Envoyer la demande presse",
    send: "Envoyer la demande",
    success:
      "Votre demande a bien été envoyée. Nous vous répondrons rapidement.",
    error:
      "Une erreur est survenue. Merci de réessayer.",

    searchDetails: "Votre recherche",
    pressDetails: "Votre demande presse",
    landDetails: "Votre demande foncière",
    partnershipDetails: "Votre demande de partenariat",
    complaintDetails: "Votre réclamation",
    recruitmentDetails: "Votre candidature",

    concernedProject: "Projet concerné",
    dontKnow: "Je ne sais pas encore",
    noProject: "Aucun projet en particulier",
    searchArea: "Ville ou zone recherchée",
    searchAreaPlaceholder: "Ville, quartier ou zone",
    propertyType: "Type de bien",
    apartment: "Appartement",
    villa: "Villa",
    land: "Lot de terrain",
    commercial: "Local commercial",
    other: "Autre",
    surface: "Surface recherchée",
    surfacePlaceholder: "Ex. 80 à 120 m²",
    acquisition: "Horizon d'acquisition",
    immediately: "Immédiatement",
    lessThan3: "Moins de 3 mois",
    threeToSix: "3 à 6 mois",
    sixToTwelve: "6 à 12 mois",
    information: "Simple prise d'information",
    budget: "Budget indicatif",
    budgetPlaceholder: "Ex. 1 500 000 DH",

    media: "Média ou organisation",
    mediaPlaceholder: "Nom du média ou de l'organisation",
    position: "Fonction",
    positionPlaceholder: "Votre fonction",
    requestNature: "Nature de la demande",
    interview: "Demande d'interview",
    institutional: "Informations institutionnelles",
    pressRelease: "Communiqué ou dossier de presse",
    visuals: "Visuels et éléments de marque",
    filming: "Reportage ou tournage",
    event: "Invitation ou événement",
    subject: "Sujet de la demande",
    subjectPlaceholder: "Sujet de votre demande",
    deadline: "Date ou échéance souhaitée",
    attachment: "Pièce jointe",
    attachments: "Pièces jointes",

    location: "Localisation",
    area: "Superficie",
    proposal: "Nature de la proposition",
    landDocument: "Document foncier",

    organization: "Organisation",
    requestType: "Type de demande",

    project: "Projet",
    reference: "Référence dossier",
    object: "Objet",

    cv: "CV",
  },

  ar: {
    search: "البحث عن عقار",
    press: "الصحافة والإعلام",
    request: "طلبكم",
    projectTitle: "أخبرونا عن مشروعكم العقاري",
    pressTitle: "طلبكم الصحفي",
    requestTitle: "أرسلوا لنا طلبكم",
    projectDescription:
      "يرجى تحديد معايير البحث الخاصة بكم حتى يتمكن فريقنا من توجيهكم نحو المشروع أو العقار المناسب لاحتياجاتكم.",
    pressDescription:
      "هل أنتم صحفيون أو ممثلو وسائل إعلام أو متخصصون في التواصل؟ يمكنكم إرسال طلبكم إلى فريقنا.",
    requestDescription:
      "يرجى ملء النموذج أدناه حتى يتمكن فريقنا من معالجة طلبكم في أفضل الظروف.",

    contactDetails: "معلومات الاتصال",
    fullName: "الاسم الكامل",
    fullNamePlaceholder: "أدخلوا اسمكم الكامل",
    professionalEmail: "البريد الإلكتروني المهني",
    email: "البريد الإلكتروني",
    emailPlaceholder: "example@email.com",
    phone: "رقم الهاتف",
    phonePlaceholder: "06 12 34 56 78",
    city: "المدينة",
    cityPlaceholder: "أدخلوا مدينتكم",
    contactPreference: "طريقة التواصل المفضلة",
    select: "اختاروا",
    emailOption: "البريد الإلكتروني",
    phoneOption: "الهاتف",
    detailedMessage: "رسالة مفصلة",
    yourMessage: "رسالتكم",
    pressMessagePlaceholder: "يرجى وصف طلبكم بالتفصيل...",
    messagePlaceholder: "يرجى وصف طلبكم في بضعة أسطر...",
    consent:
      "أوافق على استخدام بياناتي الشخصية من أجل معالجة طلبي.",
    submitting: "جارٍ الإرسال...",
    contactAgain: "اتصلوا بي",
    sendPress: "إرسال الطلب الصحفي",
    send: "إرسال الطلب",
    success:
      "تم إرسال طلبكم بنجاح. سنقوم بالرد عليكم في أقرب وقت.",
    error:
      "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.",

    searchDetails: "تفاصيل البحث",
    pressDetails: "طلبكم الصحفي",
    landDetails: "طلبكم العقاري",
    partnershipDetails: "طلب الشراكة",
    complaintDetails: "الشكاية الخاصة بكم",
    recruitmentDetails: "طلب الترشيح",

    concernedProject: "المشروع المعني",
    dontKnow: "لم أحدد المشروع بعد",
    noProject: "لا يوجد مشروع محدد",
    searchArea: "المدينة أو المنطقة المطلوبة",
    searchAreaPlaceholder: "المدينة أو الحي أو المنطقة",
    propertyType: "نوع العقار",
    apartment: "شقة",
    villa: "فيلا",
    land: "قطعة أرضية",
    commercial: "محل تجاري",
    other: "أخرى",
    surface: "المساحة المطلوبة",
    surfacePlaceholder: "مثال: من 80 إلى 120 متر مربع",
    acquisition: "موعد الاقتناء المتوقع",
    immediately: "فوراً",
    lessThan3: "أقل من 3 أشهر",
    threeToSix: "من 3 إلى 6 أشهر",
    sixToTwelve: "من 6 إلى 12 شهراً",
    information: "مجرد طلب معلومات",
    budget: "الميزانية التقديرية",
    budgetPlaceholder: "مثال: 1 500 000 درهم",

    media: "وسيلة الإعلام أو المؤسسة",
    mediaPlaceholder: "اسم المؤسسة أو وسيلة الإعلام",
    position: "الصفة المهنية",
    positionPlaceholder: "أدخلوا صفتكم المهنية",
    requestNature: "طبيعة الطلب",
    interview: "طلب إجراء مقابلة",
    institutional: "معلومات مؤسساتية",
    pressRelease: "بلاغ أو ملف صحفي",
    visuals: "صور وعناصر الهوية البصرية",
    filming: "تغطية صحفية أو تصوير",
    event: "دعوة أو فعالية",
    subject: "موضوع الطلب",
    subjectPlaceholder: "موضوع طلبكم",
    deadline: "التاريخ أو الموعد المطلوب",
    attachment: "المرفق",
    attachments: "المرفقات",

    location: "الموقع",
    area: "المساحة",
    proposal: "طبيعة العرض",
    landDocument: "الوثيقة العقارية",

    organization: "المؤسسة",
    requestType: "نوع الطلب",

    project: "المشروع",
    reference: "مرجع الملف",
    object: "الموضوع",

    cv: "السيرة الذاتية",
  },
} as const;

type TranslationKey = keyof typeof translations.fr;

interface DetailProps {
  form: FormState;
  updateField: <K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) => void;
  t: (key: TranslationKey) => string;
  locale: "fr" | "ar";
}

export default function ContactForm({
  locale,
  type,
  projects,
}: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState<FormState>(emptyForm());

  const block = TYPE_CONFIG[type].block;
  const isArabic = locale === "ar";
  const t = (key: TranslationKey) => translations[locale][key];

  function updateField<K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setStatus("submitting");

    try {
      let demandeDetail:
        | Parameters<typeof submitDemande>[0]["demande_detail"]
        | undefined;

      if (block === "projet") {
        demandeDetail = {
          __component: "shared.demande-projet",
          project:
            form.project &&
            form.project !== "je-ne-sais-pas" &&
            form.project !== "aucun-projet"
              ? Number(form.project)
              : undefined,
          zone_recherchee:
            form.zone_recherchee.trim() || undefined,
          type_bien: form.type_bien || undefined,
          surface_recherchee:
            form.surface_recherchee.trim() || undefined,
          horizon_acquisition:
            form.horizon_acquisition || undefined,
          budget_indicatif:
            form.budget_indicatif.trim() || undefined,
        };
      }

      if (block === "partenariat") {
        demandeDetail = {
          __component: "shared.demande-partenariat",
          organisation: form.organisation.trim() || undefined,
          fonction: form.fonction.trim() || undefined,
          type_demande: form.type_demande.trim() || undefined,
          message_detail:
            form.message_detail.trim() || undefined,
        };
      }

      if (block === "foncier") {
        const pressePieceJointe = form.presse_piece_jointe
          ? await uploadFile(form.presse_piece_jointe)
          : undefined;

        demandeDetail = {
          __component: "shared.demande-presse",
          media_organisation:
            form.media_organisation.trim() || undefined,
          fonction: form.fonction.trim() || undefined,
          nature_demande: form.nature_demande || undefined,
          sujet_demande:
            form.sujet_demande.trim() || undefined,
          date_echeance: form.date_echeance || undefined,
          piece_jointe: pressePieceJointe,
        } as Parameters<
          typeof submitDemande
        >[0]["demande_detail"];
      }

      if (block === "reclamation") {
        const pieceJointe = form.piece_jointe.length
          ? await uploadFiles(form.piece_jointe)
          : undefined;

        demandeDetail = {
          __component: "shared.demande-reclamation",
          project: form.project
            ? Number(form.project)
            : undefined,
          reference_dossier:
            form.reference_dossier.trim() || undefined,
          objet: form.objet.trim() || undefined,
          piece_jointe: pieceJointe,
        };
      }

      if (block === "recrutement") {
        const cv = form.cv
          ? await uploadFile(form.cv)
          : undefined;

        demandeDetail = {
          __component: "shared.demande-recrutement",
          cv,
        } as Parameters<
          typeof submitDemande
        >[0]["demande_detail"];
      }

      await submitDemande({
        nom_complet: form.nomComplet.trim(),
        telephone: form.telephone.trim() || undefined,
        email: form.email.trim(),
        preference_contact:
          form.preference_contact || undefined,
        langue: locale,
        ville: form.ville.trim() || undefined,
        message: form.message.trim(),
        consentement: form.consentement,
        locale,
        demande_detail: demandeDetail,
      });

      setStatus("success");
      setForm(emptyForm());
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  const isRechercheBien = block === "projet";
  const isPresse = block === "foncier";

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      lang={locale}
      className={`w-full rounded-2xl border border-[#094734]/10 bg-white p-6 sm:p-8 lg:p-10 ${
        isArabic ? "text-right" : "text-left"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-9"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <div className="border-b border-[#094734]/10 pb-7">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#094734]/50">
            {isRechercheBien
              ? t("search")
              : isPresse
                ? t("press")
                : t("request")}
          </span>

          <h2 className="mt-3 font-serif text-3xl leading-tight text-[#094734] md:text-4xl">
            {isRechercheBien
              ? t("projectTitle")
              : isPresse
                ? t("pressTitle")
                : t("requestTitle")}
          </h2>

          <span className="mt-4 block h-[3px] w-10 bg-[#dc9a4d]" />

          <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#094734]/60">
            {isRechercheBien
              ? t("projectDescription")
              : isPresse
                ? t("pressDescription")
                : t("requestDescription")}
          </p>
        </div>

        {block !== "none" && (
          <div className="border-b border-[#094734]/10 pb-9">
            {block === "projet" && (
              <DemandeProjet
                form={form}
                updateField={updateField}
                projects={projects}
                t={t}
                locale={locale}
              />
            )}

            {block === "foncier" && (
              <DemandePresse
                form={form}
                updateField={updateField}
                t={t}
                locale={locale}
              />
            )}

            {block === "partenariat" && (
              <DemandePartenariat
                form={form}
                updateField={updateField}
                t={t}
                locale={locale}
              />
            )}

            {block === "reclamation" && (
              <DemandeReclamation
                form={form}
                updateField={updateField}
                projects={projects}
                t={t}
                locale={locale}
              />
            )}

            {block === "recrutement" && (
              <DemandeRecrutement
                form={form}
                updateField={updateField}
                t={t}
                locale={locale}
              />
            )}
          </div>
        )}

        <div className="space-y-6">
          <SectionEyebrow>{t("contactDetails")}</SectionEyebrow>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label={t("fullName")}
              value={form.nomComplet}
              onChange={(value) => updateField("nomComplet", value)}
              placeholder={t("fullNamePlaceholder")}
              required
              locale={locale}
            />

            <Field
              label={isPresse ? t("professionalEmail") : t("email")}
              type="email"
              value={form.email}
              onChange={(value) => updateField("email", value)}
              placeholder={t("emailPlaceholder")}
              required
              locale={locale}
              ltr
            />

            <Field
              label={t("phone")}
              value={form.telephone}
              onChange={(value) => updateField("telephone", value)}
              placeholder={t("phonePlaceholder")}
              locale={locale}
              ltr
            />

            <Field
              label={t("city")}
              value={form.ville}
              onChange={(value) => updateField("ville", value)}
              placeholder={t("cityPlaceholder")}
              locale={locale}
            />

            <SelectField
              label={t("contactPreference")}
              value={form.preference_contact}
              onChange={(value) =>
                updateField("preference_contact", value)
              }
              options={[
                { value: "email", label: t("emailOption") },
                { value: "telephone", label: t("phoneOption") },
              ]}
              locale={locale}
            />
          </div>

          <div>
            <label className={labelClass}>
              {isPresse ? t("detailedMessage") : t("yourMessage")}
            </label>

            <textarea
              dir={isArabic ? "rtl" : "ltr"}
              value={form.message}
              onChange={(event) =>
                updateField("message", event.target.value)
              }
              required
              rows={5}
              placeholder={
                isPresse
                  ? t("pressMessagePlaceholder")
                  : t("messagePlaceholder")
              }
              className={`${fieldClass} resize-y`}
            />
          </div>
        </div>

        <div className="border-t border-[#094734]/10 pt-6">
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#094734]/70">
            <input
              type="checkbox"
              checked={form.consentement}
              onChange={(event) =>
                updateField("consentement", event.target.checked)
              }
              required
              className="mt-1 h-4 w-4 shrink-0 rounded border-[#094734]/30 text-[#094734] focus:ring-[#00674F]/40"
            />

            <span>{t("consent")}</span>
          </label>
        </div>

        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center gap-3 rounded-full bg-[#094734] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#00674F] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting"
              ? t("submitting")
              : isRechercheBien
                ? t("contactAgain")
                : isPresse
                  ? t("sendPress")
                  : t("send")}

            <span aria-hidden="true">
              {isArabic ? "←" : "→"}
            </span>
          </button>

          {status === "success" && (
            <p
              role="status"
              className="text-sm font-medium leading-5 text-[#00674F]"
            >
              {t("success")}
            </p>
          )}

          {status === "error" && (
            <p
              role="alert"
              className="text-sm font-medium leading-5 text-red-600"
            >
              {t("error")}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

// --------------------------------------------------
// PROJECT REQUEST
// --------------------------------------------------

function DemandeProjet({
  form,
  updateField,
  projects,
  t,
  locale,
}: DetailProps & {
  projects: { id: number; title: string }[];
}) {
  return (
    <div className="space-y-6">
      <SectionEyebrow>{t("searchDetails")}</SectionEyebrow>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          label={t("concernedProject")}
          value={form.project}
          onChange={(value) => updateField("project", value)}
          options={[
            { value: "je-ne-sais-pas", label: t("dontKnow") },
            { value: "aucun-projet", label: t("noProject") },
            ...projects.map((project) => ({
              value: String(project.id),
              label: project.title,
            })),
          ]}
          locale={locale}
        />

        <Field
          label={t("searchArea")}
          value={form.zone_recherchee}
          onChange={(value) =>
            updateField("zone_recherchee", value)
          }
          placeholder={t("searchAreaPlaceholder")}
          locale={locale}
        />

        <SelectField
          label={t("propertyType")}
          value={form.type_bien}
          onChange={(value) => updateField("type_bien", value)}
          options={[
            { value: "Appartement", label: t("apartment") },
            { value: "Villa", label: t("villa") },
            { value: "Lot de terrain", label: t("land") },
            { value: "Local commercial", label: t("commercial") },
            { value: "Autre", label: t("other") },
          ]}
          locale={locale}
        />

        <Field
          label={t("surface")}
          value={form.surface_recherchee}
          onChange={(value) =>
            updateField("surface_recherchee", value)
          }
          placeholder={t("surfacePlaceholder")}
          locale={locale}
        />

        <SelectField
          label={t("acquisition")}
          value={form.horizon_acquisition}
          onChange={(value) =>
            updateField("horizon_acquisition", value)
          }
          options={[
            { value: "Immédiatement", label: t("immediately") },
            { value: "Moins de 3 mois", label: t("lessThan3") },
            { value: "3 à 6 mois", label: t("threeToSix") },
            { value: "6 à 12 mois", label: t("sixToTwelve") },
            {
              value: "Simple prise d’information",
              label: t("information"),
            },
          ]}
          locale={locale}
        />

        <Field
          label={t("budget")}
          value={form.budget_indicatif}
          onChange={(value) =>
            updateField("budget_indicatif", value)
          }
          placeholder={t("budgetPlaceholder")}
          locale={locale}
        />
      </div>
    </div>
  );
}

// --------------------------------------------------
// PRESS REQUEST
// --------------------------------------------------

function DemandePresse({
  form,
  updateField,
  t,
  locale,
}: DetailProps) {
  return (
    <div className="space-y-6">
      <SectionEyebrow>{t("pressDetails")}</SectionEyebrow>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={t("media")}
          value={form.media_organisation}
          onChange={(value) =>
            updateField("media_organisation", value)
          }
          placeholder={t("mediaPlaceholder")}
          locale={locale}
        />

        <Field
          label={t("position")}
          value={form.fonction}
          onChange={(value) => updateField("fonction", value)}
          placeholder={t("positionPlaceholder")}
          locale={locale}
        />

        <SelectField
          label={t("requestNature")}
          value={form.nature_demande}
          onChange={(value) =>
            updateField("nature_demande", value)
          }
          options={[
            {
              value: "Demande d’interview",
              label: t("interview"),
            },
            {
              value: "Informations institutionnelles",
              label: t("institutional"),
            },
            {
              value: "Communiqué ou dossier de presse",
              label: t("pressRelease"),
            },
            {
              value: "Visuels et éléments de marque",
              label: t("visuals"),
            },
            {
              value: "Reportage ou tournage",
              label: t("filming"),
            },
            {
              value: "Invitation ou événement",
              label: t("event"),
            },
            { value: "Autre", label: t("other") },
          ]}
          locale={locale}
        />

        <Field
          label={t("subject")}
          value={form.sujet_demande}
          onChange={(value) =>
            updateField("sujet_demande", value)
          }
          placeholder={t("subjectPlaceholder")}
          locale={locale}
        />

        <Field
          label={t("deadline")}
          type="date"
          value={form.date_echeance}
          onChange={(value) =>
            updateField("date_echeance", value)
          }
          locale={locale}
          ltr
        />

        <FileField
          label={t("attachment")}
          onChange={(file) =>
            updateField("presse_piece_jointe", file)
          }
          locale={locale}
        />
      </div>
    </div>
  );
}

// --------------------------------------------------
// LAND REQUEST
// --------------------------------------------------

function DemandeFoncier({
  form,
  updateField,
  t,
  locale,
}: DetailProps) {
  return (
    <div className="space-y-6">
      <SectionEyebrow>{t("landDetails")}</SectionEyebrow>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={t("location")}
          value={form.localisation}
          onChange={(value) => updateField("localisation", value)}
          locale={locale}
        />

        <Field
          label={t("area")}
          value={form.superficie}
          onChange={(value) => updateField("superficie", value)}
          locale={locale}
        />

        <Field
          label={t("proposal")}
          value={form.nature_proposition}
          onChange={(value) =>
            updateField("nature_proposition", value)
          }
          locale={locale}
        />

        <FileField
          label={t("landDocument")}
          onChange={(file) =>
            updateField("document_foncier", file)
          }
          locale={locale}
        />
      </div>
    </div>
  );
}

// --------------------------------------------------
// PARTNERSHIP REQUEST
// --------------------------------------------------

function DemandePartenariat({
  form,
  updateField,
  t,
  locale,
}: DetailProps) {
  return (
    <div className="space-y-6">
      <SectionEyebrow>
        {t("partnershipDetails")}
      </SectionEyebrow>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={t("organization")}
          value={form.organisation}
          onChange={(value) =>
            updateField("organisation", value)
          }
          locale={locale}
        />

        <Field
          label={t("position")}
          value={form.fonction}
          onChange={(value) => updateField("fonction", value)}
          locale={locale}
        />

        <Field
          label={t("requestType")}
          value={form.type_demande}
          onChange={(value) =>
            updateField("type_demande", value)
          }
          locale={locale}
        />
      </div>

      <div>
        <label className={labelClass}>
          {t("detailedMessage")}
        </label>

        <textarea
          dir={locale === "ar" ? "rtl" : "ltr"}
          value={form.message_detail}
          onChange={(event) =>
            updateField("message_detail", event.target.value)
          }
          rows={5}
          className={`${fieldClass} resize-y`}
        />
      </div>
    </div>
  );
}

// --------------------------------------------------
// COMPLAINT REQUEST
// --------------------------------------------------

function DemandeReclamation({
  form,
  updateField,
  projects,
  t,
  locale,
}: DetailProps & {
  projects: { id: number; title: string }[];
}) {
  return (
    <div className="space-y-6">
      <SectionEyebrow>
        {t("complaintDetails")}
      </SectionEyebrow>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          label={t("project")}
          value={form.project}
          onChange={(value) => updateField("project", value)}
          options={projects.map((project) => ({
            value: String(project.id),
            label: project.title,
          }))}
          locale={locale}
        />

        <Field
          label={t("reference")}
          value={form.reference_dossier}
          onChange={(value) =>
            updateField("reference_dossier", value)
          }
          locale={locale}
        />

        <Field
          label={t("object")}
          value={form.objet}
          onChange={(value) => updateField("objet", value)}
          locale={locale}
        />

        <FileFieldMultiple
          label={t("attachments")}
          onChange={(files) =>
            updateField("piece_jointe", files)
          }
          locale={locale}
        />
      </div>
    </div>
  );
}

// --------------------------------------------------
// RECRUITMENT REQUEST
// --------------------------------------------------

function DemandeRecrutement({
  form,
  updateField,
  t,
  locale,
}: DetailProps) {
  return (
    <div className="space-y-6">
      <SectionEyebrow>
        {t("recruitmentDetails")}
      </SectionEyebrow>

      <FileField
        label={t("cv")}
        onChange={(file) => updateField("cv", file)}
        locale={locale}
      />
    </div>
  );
}

// --------------------------------------------------
// SHARED FORM COMPONENTS
// --------------------------------------------------

const fieldClass =
  "w-full rounded-xl border border-[#094734]/10 bg-[#F5F2EC]/60 px-4 py-3 text-[15px] text-[#094734] outline-none transition-all placeholder:text-[#094734]/35 focus:border-[#00674F]/30 focus:bg-white focus:ring-2 focus:ring-[#00674F]/10";

const labelClass =
  "mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#094734]/55";

function SectionEyebrow({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-[#094734]">
        {children}
      </h3>

      <span className="mt-2 block h-[3px] w-9 bg-[#dc9a4d]" />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
  locale,
  ltr = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  locale: "fr" | "ar";
  ltr?: boolean;
}) {
  return (
    <div>
      <label className={labelClass}>
        {label}
      </label>

      <input
        type={type}
        dir={ltr ? "ltr" : locale === "ar" ? "rtl" : "ltr"}
        lang={locale}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        placeholder={placeholder}
        className={fieldClass}
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  locale,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: {
    value: string;
    label: string;
  }[];
  locale: "fr" | "ar";
}) {
  return (
    <div>
      <label className={labelClass}>
        {label}
      </label>

      <select
        dir={locale === "ar" ? "rtl" : "ltr"}
        lang={locale}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={fieldClass}
      >
        <option value="">
          {translations[locale].select}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function FileField({
  label,
  onChange,
  locale,
}: {
  label: string;
  onChange: (file: File | null) => void;
  locale: "fr" | "ar";
}) {
  return (
    <div>
      <label className={labelClass}>
        {label}
      </label>

      <input
        type="file"
        dir={locale === "ar" ? "rtl" : "ltr"}
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        onChange={(event) =>
          onChange(event.target.files?.[0] ?? null)
        }
        className="block w-full rounded-xl border border-dashed border-[#094734]/20 bg-[#F5F2EC]/50 px-4 py-3 text-sm text-[#094734] file:me-4 file:rounded-full file:border-0 file:bg-[#094734] file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-wide file:text-white"
      />
    </div>
  );
}

function FileFieldMultiple({
  label,
  onChange,
  locale,
}: {
  label: string;
  onChange: (files: File[]) => void;
  locale: "fr" | "ar";
}) {
  return (
    <div>
      <label className={labelClass}>
        {label}
      </label>

      <input
        type="file"
        dir={locale === "ar" ? "rtl" : "ltr"}
        multiple
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        onChange={(event) =>
          onChange(Array.from(event.target.files ?? []))
        }
        className="block w-full rounded-xl border border-dashed border-[#094734]/20 bg-[#F5F2EC]/50 px-4 py-3 text-sm text-[#094734] file:me-4 file:rounded-full file:border-0 file:bg-[#094734] file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-wide file:text-white"
      />
    </div>
  );
}
