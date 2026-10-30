"use client";

import Image from "next/image";
import { useState } from "react";

type OpportunityType = "foncier" | "partenariat";

export interface OpportunityFormState {
  nom_complet: string;
  telephone: string;
  email: string;
  preference_contact: string;
  ville: string;
  message: string;
  consentement: boolean;

  profil: string;
  statut: string;
  nom_raison_sociale: string;
  fonction: string;

  localisation: string;
  superficie: string;
  nature_proposition: string;
  situation_juridique: string;
  reference_fonciere: string;
  description_opportunite: string;
  document_foncier: File | null;

  organisation: string;
  type_demande: string;
  secteur_activite: string;
  domaine_intervention: string;
  type_partenariat_recherche: string;
  zone_geographique: string;
  budget_investissement: string;
  documents_presentation: File | null;
  message_detail: string;
}

const emptyForm: OpportunityFormState = {
  nom_complet: "",
  telephone: "",
  email: "",
  preference_contact: "",
  ville: "",
  message: "",
  consentement: false,

  profil: "",
  statut: "",
  nom_raison_sociale: "",
  fonction: "",

  localisation: "",
  superficie: "",
  nature_proposition: "",
  situation_juridique: "",
  reference_fonciere: "",
  description_opportunite: "",
  document_foncier: null,

  organisation: "",
  type_demande: "",
  secteur_activite: "",
  domaine_intervention: "",
  type_partenariat_recherche: "",
  zone_geographique: "",
  budget_investissement: "",
  documents_presentation: null,
  message_detail: "",
};

interface Props {
  locale: "fr" | "ar";
  initialType?: OpportunityType | null;
}

const translations = {
  fr: {
    selectOption: "Sélectionnez une option",
    fileDescription: "Plaquette, note de présentation, références, etc.",
    chooseFiles: "Choisir des fichiers",
    dragDrop: "ou glisser-déposer ici",
    acceptedFormats: "Formats acceptés : PDF, JPG, PNG, DOCX. 10 MB max. par fichier.",

    choosePath: "CHOISISSEZ VOTRE PARCOURS",
    twoVisions: "Deux visions, un même territoire",

    landowners: "Propriétaires fonciers & Apporteurs d’affaires",
    landDescription: "Proposer un terrain ou transmettre une opportunité foncière.",
    proposeOpportunity: "PROPOSER UNE OPPORTUNITÉ",

    investors: "Investisseurs & Partenaires",
    investorDescription:
      "Présenter une proposition d’investissement, de partenariat ou de collaboration.",
    presentProposal: "PRÉSENTER UNE PROPOSITION",

    stepProfile: "VOTRE PROFIL",
    stepOpportunity: "L'OPPORTUNITÉ",
    stepProposal: "VOTRE PROPOSITION",
    stepContact: "VOS COORDONNÉES",

    switchToInvestors: "Passer au parcours Investisseurs & Partenaires",
    switchToLandowners: "Passer au parcours Propriétaires fonciers",

    landTitle: "Parlez-nous de votre opportunité foncière",
    partnershipTitle: "Parlez-nous de votre proposition",
    introduction: "Quelques informations pour mieux comprendre votre démarche.",
    requiredNotice: "Tous les champs marqués d’un * sont obligatoires.",

    youAre: "Vous êtes",
    landowner: "Propriétaire foncier",
    businessIntroducer: "Apporteur d’affaires",
    representative: "Mandataire",
    investor: "Investisseur",
    company: "Entreprise",
    institution: "Institution",
    partner: "Partenaire",

    individualOrCompany: "Particulier ou société",
    individual: "Particulier",
    society: "Société",
    nameOrCompany: "Nom ou raison sociale",
    namePlaceholder: "Votre nom / raison sociale",
    function: "Fonction",
    functionPlaceholder: "Votre fonction",
    sector: "Secteur d’activité",
    sectorPlaceholder: "Votre secteur d’activité",

    landLocation: "Localisation du terrain",
    locationPlaceholder: "Région, ville ou commune",
    area: "Superficie approximative",
    areaPlaceholder: "Ex : 5 000 m²",
    landNature: "Nature du bien ou du terrain",
    landNaturePlaceholder: "Nature du bien ou du terrain",
    legalStatus: "Situation juridique",
    legalStatusPlaceholder: "Situation juridique",
    landReference: "Référence foncière",
    optional: "Facultatif",
    opportunityType: "Type d’opportunité",
    sale: "Vente",
    partnership: "Partenariat",
    landContribution: "Apport foncier",
    other: "Autre",
    opportunityDescription: "Description de l’opportunité",
    opportunityDescriptionPlaceholder: "Présentez les détails de l’opportunité...",
    landDocuments: "Photos, plans ou documents",

    proposalNature: "Nature de la proposition",
    investment: "Investissement",
    collaboration: "Collaboration",
    intervention: "Domaine d’intervention",
    interventionPlaceholder: "Domaine d’intervention",
    partnershipType: "Type de partenariat recherché",
    partnershipTypePlaceholder: "Type de partenariat",
    geographicArea: "Zone géographique concernée",
    geographicAreaPlaceholder: "Ville, région ou zone",
    budget: "Budget ou niveau d’investissement",
    budgetPlaceholder: "Facultatif",
    detailedProposal: "Présentation détaillée de la proposition",
    detailedProposalPlaceholder: "Présentez votre proposition...",
    presentationDocuments: "Présentation, note ou documents",

    contactName: "Nom du contact",
    fullNamePlaceholder: "Nom et prénom",
    phone: "Téléphone",
    phonePlaceholder: "Votre numéro",
    email: "E-mail",
    emailPlaceholder: "votre@email.com",
    city: "Ville",
    cityPlaceholder: "Votre ville",
    contactPreference: "Préférence de contact",
    consent:
      "J'accepte que mes informations soient traitées dans le cadre de l'étude de cette opportunité par TAQÈS. *",

    previous: "PRÉCÉDENT",
    continue: "CONTINUER",
    send: "ENVOYER LA PROPOSITION",
  },

  ar: {
    selectOption: "يرجى اختيار أحد الخيارات",
    fileDescription: "ملف تعريفي، مذكرة تقديمية، مراجع، وغيرها.",
    chooseFiles: "اختيار الملفات",
    dragDrop: "أو اسحب الملفات وأفلتها هنا",
    acceptedFormats:
      "الصيغ المقبولة: PDF وJPG وPNG وDOCX. الحد الأقصى 10 ميغابايت لكل ملف.",

    choosePath: "اختروا مساركم",
    twoVisions: "رؤيتان، وإقليم واحد",

    landowners: "مُلّاك الأراضي ومقدّمو الفرص",
    landDescription: "اقتراح أرض أو تقديم فرصة عقارية.",
    proposeOpportunity: "اقتراح فرصة عقارية",

    investors: "المستثمرون والشركاء",
    investorDescription: "تقديم مقترح استثماري أو شراكة أو تعاون.",
    presentProposal: "تقديم مقترح",

    stepProfile: "ملفكم الشخصي",
    stepOpportunity: "الفرصة العقارية",
    stepProposal: "مقترحكم",
    stepContact: "بيانات الاتصال",

    switchToInvestors: "الانتقال إلى مسار المستثمرين والشركاء",
    switchToLandowners: "الانتقال إلى مسار مُلّاك الأراضي",

    landTitle: "أخبرونا عن فرصتكم العقارية",
    partnershipTitle: "أخبرونا عن مقترحكم",
    introduction: "نحتاج إلى بعض المعلومات لفهم طلبكم بشكل أفضل.",
    requiredNotice: "جميع الحقول المميزة بعلامة * إلزامية.",

    youAre: "أنتم",
    landowner: "مالك أرض",
    businessIntroducer: "مقدّم فرصة",
    representative: "وكيل",
    investor: "مستثمر",
    company: "شركة",
    institution: "مؤسسة",
    partner: "شريك",

    individualOrCompany: "فرد أم شركة",
    individual: "فرد",
    society: "شركة",
    nameOrCompany: "الاسم أو اسم الشركة",
    namePlaceholder: "الاسم أو اسم الشركة",
    function: "الوظيفة",
    functionPlaceholder: "وظيفتكم",
    sector: "قطاع النشاط",
    sectorPlaceholder: "قطاع نشاطكم",

    landLocation: "موقع الأرض",
    locationPlaceholder: "الجهة أو المدينة أو الجماعة",
    area: "المساحة التقريبية",
    areaPlaceholder: "مثال: 5,000 متر مربع",
    landNature: "طبيعة العقار أو الأرض",
    landNaturePlaceholder: "طبيعة العقار أو الأرض",
    legalStatus: "الوضعية القانونية",
    legalStatusPlaceholder: "الوضعية القانونية",
    landReference: "المرجع العقاري",
    optional: "اختياري",
    opportunityType: "نوع الفرصة",
    sale: "بيع",
    partnership: "شراكة",
    landContribution: "مساهمة عقارية",
    other: "أخرى",
    opportunityDescription: "وصف الفرصة",
    opportunityDescriptionPlaceholder: "يرجى تقديم تفاصيل الفرصة...",
    landDocuments: "الصور والمخططات والوثائق",

    proposalNature: "طبيعة المقترح",
    investment: "استثمار",
    collaboration: "تعاون",
    intervention: "مجال التدخل",
    interventionPlaceholder: "مجال التدخل",
    partnershipType: "نوع الشراكة المطلوبة",
    partnershipTypePlaceholder: "نوع الشراكة",
    geographicArea: "النطاق الجغرافي المعني",
    geographicAreaPlaceholder: "المدينة أو الجهة أو المنطقة",
    budget: "الميزانية أو مستوى الاستثمار",
    budgetPlaceholder: "اختياري",
    detailedProposal: "عرض مفصل للمقترح",
    detailedProposalPlaceholder: "يرجى تقديم تفاصيل مقترحكم...",
    presentationDocuments: "العرض أو المذكرة أو الوثائق",

    contactName: "اسم جهة الاتصال",
    fullNamePlaceholder: "الاسم الكامل",
    phone: "الهاتف",
    phonePlaceholder: "رقم هاتفكم",
    email: "البريد الإلكتروني",
    emailPlaceholder: "votre@email.com",
    city: "المدينة",
    cityPlaceholder: "مدينتكم",
    contactPreference: "طريقة التواصل المفضلة",
    consent:
      "أوافق على معالجة معلوماتي في إطار دراسة هذه الفرصة من طرف TAQÈS. *",

    previous: "السابق",
    continue: "متابعة",
    send: "إرسال المقترح",
  },
};

const inputClass =
  "mt-2 w-full rounded border border-gray-200 bg-white px-4 py-3.5 text-start text-sm text-gray-800 outline-none transition focus:border-[#054434] focus:ring-1 focus:ring-[#054434] placeholder:text-gray-400";

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-start text-xs font-semibold text-gray-800">
        {label}
        {required ? " *" : ""}
      </label>

      <input
        type={type}
        dir={type === "email" || type === "tel" ? "ltr" : "auto"}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
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
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  locale: "fr" | "ar";
  required?: boolean;
}) {
  const t = translations[locale];

  return (
    <div>
      <label className="block text-start text-xs font-semibold text-gray-800">
        {label}
        {required ? " *" : ""}
      </label>

      <select
        dir={locale === "ar" ? "rtl" : "ltr"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      >
        <option value="">{t.selectOption}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  locale,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  locale: "fr" | "ar";
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-start text-xs font-semibold text-gray-800">
        {label}
        {required ? " *" : ""}
      </label>

      <textarea
        dir={locale === "ar" ? "rtl" : "ltr"}
        rows={6}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      />
    </div>
  );
}

function FileField({
  label,
  file,
  onChange,
  locale,
}: {
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
  locale: "fr" | "ar";
}) {
  const t = translations[locale];

  return (
    <div className="rounded border border-gray-200 bg-[#F5F2EC] p-6">
      <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded border border-gray-200 bg-white text-gray-500">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>

          <div className="text-start">
            <p className="text-sm font-semibold text-gray-800">{label}</p>

            <p dir="auto" className="text-xs text-gray-500">
              {file ? file.name : t.fileDescription}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="cursor-pointer rounded border border-gray-300 bg-white px-4 py-2.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            {t.chooseFiles}

            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={(event) =>
                onChange(event.target.files?.[0] || null)
              }
            />
          </label>

          <span className="text-xs text-gray-500">{t.dragDrop}</span>
        </div>
      </div>

      <p className="mt-3 text-start text-xs text-gray-500">
        {t.acceptedFormats}
      </p>
    </div>
  );
}

export default function OpportunitesSection({
  locale,
  initialType = "foncier",
}: Props) {
  const [activeType, setActiveType] = useState<OpportunityType>(
    initialType || "foncier"
  );

  const [currentStep, setCurrentStep] = useState(1);

  const [foncierForm, setFoncierForm] =
    useState<OpportunityFormState>(emptyForm);

  const [partenariatForm, setPartenariatForm] =
    useState<OpportunityFormState>(emptyForm);

  const isArabic = locale === "ar";
  const isFoncier = activeType === "foncier";
  const t = translations[locale];

  const form = isFoncier ? foncierForm : partenariatForm;

  const updateField = <K extends keyof OpportunityFormState>(
    field: K,
    value: OpportunityFormState[K]
  ) => {
    if (isFoncier) {
      setFoncierForm((current) => ({
        ...current,
        [field]: value,
      }));
    } else {
      setPartenariatForm((current) => ({
        ...current,
        [field]: value,
      }));
    }
  };

  const selectType = (type: OpportunityType) => {
    setActiveType(type);
    setCurrentStep(1);
  };

  const goToStep = (step: number) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  const nextStep = () =>
    setCurrentStep((step) => Math.min(step + 1, 3));

  const previousStep = () =>
    setCurrentStep((step) => Math.max(step - 1, 1));

  const stepTwoLabel = isFoncier
    ? t.stepOpportunity
    : t.stepProposal;

  const profileOptions = isFoncier
    ? [
        { value: "proprietaire_foncier", label: t.landowner },
        { value: "apporteur_affaires", label: t.businessIntroducer },
        { value: "mandataire", label: t.representative },
      ]
    : [
        { value: "investisseur", label: t.investor },
        { value: "entreprise", label: t.company },
        { value: "institution", label: t.institution },
        { value: "partenaire", label: t.partner },
      ];

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      lang={locale}
      className="w-full font-sans text-gray-800"
    >
      {/* PARCOURS */}
      <section className="w-full bg-[#F5F2EC] px-6 py-16 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between gap-4 border-b border-gray-300/60 pb-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#054434]" />

              <p className="text-xs font-bold uppercase tracking-widest text-[#054434]">
                {t.choosePath}
              </p>
            </div>

            <p className="text-xs italic text-gray-500">
              {t.twoVisions}
            </p>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {/* PARCOURS FONCIER */}
            <div
              role="button"
              tabIndex={0}
              aria-pressed={isFoncier}
              onClick={() => selectType("foncier")}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  selectType("foncier");
                }
              }}
              className={`group relative cursor-pointer rounded-lg bg-[#F5F2EC] p-8 transition-all hover:bg-white hover:shadow-md ${
                isFoncier
                  ? "border-2 border-[#054434] bg-white shadow-sm"
                  : "border border-gray-300/70"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center text-[#054434]">
                    <Image
                      src="/01-proprietaire-foncier.svg"
                      alt=""
                      width={56}
                      height={56}
                      className="h-12 w-12 object-contain"
                    />
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#054434]">
                      {t.landowners}
                    </h3>

                    <p className="mt-2 text-sm text-gray-600">
                      {t.landDescription}
                    </p>
                  </div>
                </div>

                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-sm text-gray-400 transition group-hover:border-[#054434] group-hover:text-[#054434]"
                >
                  {isArabic ? "←" : "→"}
                </span>
              </div>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  selectType("foncier");
                }}
                className={`mt-8 w-full rounded py-3.5 text-xs font-bold uppercase tracking-wider transition ${
                  isFoncier
                    ? "bg-[#054434] text-white"
                    : "border border-[#054434] bg-white text-[#054434] hover:bg-[#054434] hover:text-white"
                }`}
              >
                {t.proposeOpportunity}
              </button>
            </div>

            {/* PARCOURS PARTENARIAT */}
            <div
              role="button"
              tabIndex={0}
              aria-pressed={!isFoncier}
              onClick={() => selectType("partenariat")}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  selectType("partenariat");
                }
              }}
              className={`group relative cursor-pointer rounded-lg bg-[#F5F2EC] p-8 transition-all hover:bg-white hover:shadow-md ${
                !isFoncier
                  ? "border-2 border-[#054434] bg-white shadow-sm"
                  : "border border-gray-300/70"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center text-[#054434]">
                    <Image
                      src="/02-investisseurs-partenaires.svg"
                      alt=""
                      width={56}
                      height={56}
                      className="h-12 w-12 object-contain"
                    />
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#054434]">
                      {t.investors}
                    </h3>

                    <p className="mt-2 text-sm text-gray-600">
                      {t.investorDescription}
                    </p>
                  </div>
                </div>

                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-sm text-gray-400 transition group-hover:border-[#054434] group-hover:text-[#054434]"
                >
                  {isArabic ? "←" : "→"}
                </span>
              </div>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  selectType("partenariat");
                }}
                className={`mt-8 w-full rounded py-3.5 text-xs font-bold uppercase tracking-wider transition ${
                  !isFoncier
                    ? "bg-[#054434] text-white"
                    : "border border-[#054434] bg-white text-[#054434] hover:bg-[#054434] hover:text-white"
                }`}
              >
                {t.presentProposal}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULAIRE */}
      <section className="w-full bg-white px-6 py-16 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              {/* ÉTAPES */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-bold tracking-wider">
                {[
                  { number: "01", label: t.stepProfile },
                  { number: "02", label: stepTwoLabel },
                  { number: "03", label: t.stepContact },
                ].map((step, index) => {
                  const isActive = currentStep === index + 1;
                  const isPassed = currentStep > index + 1;

                  return (
                    <button
                      key={step.number}
                      type="button"
                      onClick={() => goToStep(index + 1)}
                      aria-current={isActive ? "step" : undefined}
                      className={`relative flex items-center gap-2.5 pb-3 transition ${
                        isActive || isPassed
                          ? "text-[#054434]"
                          : "text-gray-400"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isActive || isPassed
                            ? "bg-[#054434]"
                            : "bg-transparent"
                        }`}
                      />

                      <span className="text-xs">
                        {step.number} — {step.label}
                      </span>

                      {isActive && (
                        <span className="absolute bottom-0 start-0 h-[2px] w-full bg-[#054434]" />
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() =>
                  selectType(isFoncier ? "partenariat" : "foncier")
                }
                className="flex items-center gap-1.5 text-start text-xs font-medium text-[#054434] hover:underline"
              >
                <span>
                  {isFoncier
                    ? t.switchToInvestors
                    : t.switchToLandowners}
                </span>

                <span aria-hidden="true">
                  {isArabic ? "←" : "→"}
                </span>
              </button>
            </div>

            <div className="mt-10">
              <h2 className="text-start font-serif text-3xl font-medium text-gray-900 md:text-4xl">
                {isFoncier ? t.landTitle : t.partnershipTitle}
              </h2>

              <p className="mt-3 text-start text-sm leading-relaxed text-gray-600">
                {t.introduction}
                <br />
                {t.requiredNotice}
              </p>

              <form
                onSubmit={(event) => event.preventDefault()}
                className="mt-10 space-y-8"
              >
                {/* ÉTAPE 1 : PROFIL */}
                {currentStep === 1 && (
                  <div className="grid gap-8 md:grid-cols-2">
                    <SelectField
                      locale={locale}
                      label={t.youAre}
                      value={form.profil}
                      onChange={(value) => updateField("profil", value)}
                      required
                      options={profileOptions}
                    />

                    {isFoncier && (
                      <SelectField
                        locale={locale}
                        label={t.individualOrCompany}
                        value={form.statut}
                        onChange={(value) => updateField("statut", value)}
                        required
                        options={[
                          { value: "particulier", label: t.individual },
                          { value: "societe", label: t.society },
                        ]}
                      />
                    )}

                    <Field
                      label={t.nameOrCompany}
                      value={
                        isFoncier
                          ? form.nom_raison_sociale
                          : form.organisation
                      }
                      onChange={(value) =>
                        updateField(
                          isFoncier ? "nom_raison_sociale" : "organisation",
                          value
                        )
                      }
                      placeholder={t.namePlaceholder}
                      required
                    />

                    <Field
                      label={t.function}
                      value={form.fonction}
                      onChange={(value) => updateField("fonction", value)}
                      placeholder={t.functionPlaceholder}
                    />

                    {!isFoncier && (
                      <Field
                        label={t.sector}
                        value={form.secteur_activite}
                        onChange={(value) =>
                          updateField("secteur_activite", value)
                        }
                        placeholder={t.sectorPlaceholder}
                      />
                    )}
                  </div>
                )}

                {/* ÉTAPE 2 : OPPORTUNITÉ FONCIÈRE */}
                {currentStep === 2 && isFoncier && (
                  <div className="space-y-8">
                    <div className="grid gap-8 md:grid-cols-2">
                      <Field
                        label={t.landLocation}
                        value={form.localisation}
                        onChange={(value) =>
                          updateField("localisation", value)
                        }
                        placeholder={t.locationPlaceholder}
                        required
                      />

                      <Field
                        label={t.area}
                        value={form.superficie}
                        onChange={(value) =>
                          updateField("superficie", value)
                        }
                        placeholder={t.areaPlaceholder}
                        required
                      />

                      <Field
                        label={t.landNature}
                        value={form.nature_proposition}
                        onChange={(value) =>
                          updateField("nature_proposition", value)
                        }
                        placeholder={t.landNaturePlaceholder}
                        required
                      />

                      <Field
                        label={t.legalStatus}
                        value={form.situation_juridique}
                        onChange={(value) =>
                          updateField("situation_juridique", value)
                        }
                        placeholder={t.legalStatusPlaceholder}
                        required
                      />

                      <Field
                        label={t.landReference}
                        value={form.reference_fonciere}
                        onChange={(value) =>
                          updateField("reference_fonciere", value)
                        }
                        placeholder={t.optional}
                      />

                      <SelectField
                        locale={locale}
                        label={t.opportunityType}
                        value={form.nature_proposition}
                        onChange={(value) =>
                          updateField("nature_proposition", value)
                        }
                        required
                        options={[
                          { value: "vente", label: t.sale },
                          { value: "partenariat", label: t.partnership },
                          { value: "apport_foncier", label: t.landContribution },
                          { value: "autre", label: t.other },
                        ]}
                      />
                    </div>

                    <TextareaField
                      locale={locale}
                      label={t.opportunityDescription}
                      value={form.description_opportunite}
                      onChange={(value) =>
                        updateField("description_opportunite", value)
                      }
                      placeholder={t.opportunityDescriptionPlaceholder}
                      required
                    />

                    <FileField
                      locale={locale}
                      label={t.landDocuments}
                      file={form.document_foncier}
                      onChange={(file) =>
                        updateField("document_foncier", file)
                      }
                    />
                  </div>
                )}

                {/* ÉTAPE 2 : PARTENARIAT */}
                {currentStep === 2 && !isFoncier && (
                  <div className="space-y-8">
                    <div className="grid gap-8 md:grid-cols-2">
                      <SelectField
                        locale={locale}
                        label={t.proposalNature}
                        value={form.type_demande}
                        onChange={(value) =>
                          updateField("type_demande", value)
                        }
                        required
                        options={[
                          { value: "investissement", label: t.investment },
                          { value: "partenariat", label: t.partnership },
                          { value: "collaboration", label: t.collaboration },
                          { value: "autre", label: t.other },
                        ]}
                      />

                      <Field
                        label={t.intervention}
                        value={form.domaine_intervention}
                        onChange={(value) =>
                          updateField("domaine_intervention", value)
                        }
                        placeholder={t.interventionPlaceholder}
                        required
                      />

                      <Field
                        label={t.partnershipType}
                        value={form.type_partenariat_recherche}
                        onChange={(value) =>
                          updateField("type_partenariat_recherche", value)
                        }
                        placeholder={t.partnershipTypePlaceholder}
                        required
                      />

                      <Field
                        label={t.geographicArea}
                        value={form.zone_geographique}
                        onChange={(value) =>
                          updateField("zone_geographique", value)
                        }
                        placeholder={t.geographicAreaPlaceholder}
                        required
                      />

                      <Field
                        label={t.budget}
                        value={form.budget_investissement}
                        onChange={(value) =>
                          updateField("budget_investissement", value)
                        }
                        placeholder={t.budgetPlaceholder}
                      />
                    </div>

                    <TextareaField
                      locale={locale}
                      label={t.detailedProposal}
                      value={form.message_detail}
                      onChange={(value) =>
                        updateField("message_detail", value)
                      }
                      placeholder={t.detailedProposalPlaceholder}
                      required
                    />

                    <FileField
                      locale={locale}
                      label={t.presentationDocuments}
                      file={form.documents_presentation}
                      onChange={(file) =>
                        updateField("documents_presentation", file)
                      }
                    />
                  </div>
                )}

                {/* ÉTAPE 3 : COORDONNÉES */}
                {currentStep === 3 && (
                  <div className="space-y-8">
                    <div className="grid gap-8 md:grid-cols-2">
                      <Field
                        label={t.contactName}
                        value={form.nom_complet}
                        onChange={(value) =>
                          updateField("nom_complet", value)
                        }
                        placeholder={t.fullNamePlaceholder}
                        required
                      />

                      <Field
                        label={t.phone}
                        value={form.telephone}
                        onChange={(value) =>
                          updateField("telephone", value)
                        }
                        placeholder={t.phonePlaceholder}
                        type="tel"
                        required
                      />

                      <Field
                        label={t.email}
                        value={form.email}
                        onChange={(value) => updateField("email", value)}
                        placeholder={t.emailPlaceholder}
                        type="email"
                        required
                      />

                      <Field
                        label={t.city}
                        value={form.ville}
                        onChange={(value) => updateField("ville", value)}
                        placeholder={t.cityPlaceholder}
                        required
                      />

                      <SelectField
                        locale={locale}
                        label={t.contactPreference}
                        value={form.preference_contact}
                        onChange={(value) =>
                          updateField("preference_contact", value)
                        }
                        options={[
                          { value: "telephone", label: t.phone },
                          { value: "email", label: t.email },
                        ]}
                      />
                    </div>

                    <label className="flex items-start gap-3 text-start text-xs text-gray-700">
                      <input
                        type="checkbox"
                        checked={form.consentement}
                        onChange={(event) =>
                          updateField("consentement", event.target.checked)
                        }
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-[#054434] focus:ring-[#054434]"
                      />

                      <span>{t.consent}</span>
                    </label>
                  </div>
                )}

                {/* NAVIGATION */}
                <div className="flex items-center justify-between gap-4 border-t border-gray-200 pt-8">
                  <button
                    type="button"
                    onClick={previousStep}
                    disabled={currentStep === 1}
                    className="rounded border border-gray-300 bg-white px-6 py-2.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-30"
                  >
                    {t.previous}
                  </button>

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="inline-flex items-center gap-2 rounded bg-[#054434] px-7 py-3 text-xs font-bold text-white transition hover:bg-[#032e23]"
                    >
                      <span>{t.continue}</span>
                      <span aria-hidden="true">
                        {isArabic ? "←" : "→"}
                      </span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {}}
                      className="inline-flex items-center gap-2 rounded bg-[#054434] px-7 py-3 text-xs font-bold text-white transition hover:bg-[#032e23]"
                    >
                      <span>{t.send}</span>
                      <span aria-hidden="true">
                        {isArabic ? "←" : "→"}
                      </span>
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
