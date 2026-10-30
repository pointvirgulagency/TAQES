"use client";

import type { OpportunityFormState } from "./OpportunitesSection";

interface FoncierFormProps {
  locale: "fr" | "ar";
  form: OpportunityFormState;
  updateField: <K extends keyof OpportunityFormState>(
    field: K,
    value: OpportunityFormState[K]
  ) => void;
  currentStep: 1 | 2;
}

export default function FoncierForm({
  locale,
  form,
  updateField,
  currentStep,
}: FoncierFormProps) {
  const isArabic = locale === "ar";

  return (
    <div dir={isArabic ? "rtl" : "ltr"} lang={locale}>
      {currentStep === 1 ? (
        <div className="space-y-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#449383]">
              {isArabic ? "الخطوة 1" : "Étape 1"}
            </p>

            <h4 className="mt-3 font-serif text-2xl text-[#094734] md:text-3xl">
              {isArabic ? "ملفكم" : "Votre profil"}
            </h4>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              locale={locale}
              label={isArabic ? "أنتم" : "Vous êtes"}
              value={form.profil}
              onChange={(value) => updateField("profil", value)}
              options={[
                {
                  value: "proprietaire_foncier",
                  label: isArabic
                    ? "مالك عقار"
                    : "Propriétaire foncier",
                },
                {
                  value: "apporteur_affaires",
                  label: isArabic ? "مقدم فرصة" : "Apporteur d’affaires",
                },
                {
                  value: "mandataire",
                  label: isArabic ? "وكيل" : "Mandataire",
                },
              ]}
            />

            <SelectField
              locale={locale}
              label={isArabic ? "الصفة" : "Particulier ou société"}
              value={form.statut}
              onChange={(value) => updateField("statut", value)}
              options={[
                {
                  value: "particulier",
                  label: isArabic ? "فرد" : "Particulier",
                },
                {
                  value: "societe",
                  label: isArabic ? "شركة" : "Société",
                },
              ]}
            />

            <Field
              label={
                isArabic ? "الاسم أو اسم الشركة" : "Nom ou raison sociale"
              }
              value={form.nom_raison_sociale}
              onChange={(value) =>
                updateField("nom_raison_sociale", value)
              }
            />

            <Field
              label={isArabic ? "الوظيفة" : "Fonction, si société"}
              value={form.fonction}
              onChange={(value) => updateField("fonction", value)}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#449383]">
              {isArabic ? "الخطوة 2" : "Étape 2"}
            </p>

            <h4 className="mt-3 font-serif text-2xl text-[#094734] md:text-3xl">
              {isArabic ? "الفرصة العقارية" : "L’opportunité foncière"}
            </h4>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label={isArabic ? "موقع الأرض" : "Localisation du terrain"}
              value={form.localisation}
              onChange={(value) => updateField("localisation", value)}
            />

            <Field
              label={
                isArabic ? "المساحة التقريبية" : "Superficie approximative"
              }
              value={form.superficie}
              onChange={(value) => updateField("superficie", value)}
            />

            <Field
              label={
                isArabic
                  ? "طبيعة العقار أو الأرض"
                  : "Nature du bien ou du terrain"
              }
              value={form.nature_proposition}
              onChange={(value) =>
                updateField("nature_proposition", value)
              }
            />

            <Field
              label={isArabic ? "الوضعية القانونية" : "Situation juridique"}
              value={form.situation_juridique}
              onChange={(value) =>
                updateField("situation_juridique", value)
              }
            />

            <Field
              label={isArabic ? "المرجع العقاري" : "Référence foncière"}
              value={form.reference_fonciere}
              onChange={(value) =>
                updateField("reference_fonciere", value)
              }
              placeholder={isArabic ? "اختياري" : "Facultatif"}
            />

            <SelectField
              locale={locale}
              label={isArabic ? "نوع الفرصة" : "Type d’opportunité"}
              value={form.nature_proposition}
              onChange={(value) =>
                updateField("nature_proposition", value)
              }
              options={[
                {
                  value: "vente",
                  label: isArabic ? "بيع" : "Vente",
                },
                {
                  value: "partenariat",
                  label: isArabic ? "شراكة" : "Partenariat",
                },
                {
                  value: "apport_foncier",
                  label: isArabic ? "مساهمة عقارية" : "Apport foncier",
                },
                {
                  value: "autre",
                  label: isArabic ? "أخرى" : "Autre",
                },
              ]}
            />
          </div>

          <div>
            <label className={labelClass}>
              {isArabic
                ? "وصف الفرصة"
                : "Description de l’opportunité"}
            </label>

            <textarea
              dir={isArabic ? "rtl" : "ltr"}
              value={form.description_opportunite}
              onChange={(event) =>
                updateField(
                  "description_opportunite",
                  event.target.value
                )
              }
              rows={6}
              placeholder={
                isArabic
                  ? "قدموا تفاصيل الفرصة..."
                  : "Présentez les détails de l’opportunité..."
              }
              className={`${fieldClass} resize-y`}
            />
          </div>

          <FileField
            locale={locale}
            label={
              isArabic
                ? "الصور والمخططات والوثائق"
                : "Photos, plans ou documents"
            }
            onChange={(file) =>
              updateField("document_foncier", file)
            }
          />
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>

      <input
        type="text"
        dir="auto"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={fieldClass}
      />
    </div>
  );
}

function SelectField({
  locale,
  label,
  value,
  onChange,
  options,
}: {
  locale: "fr" | "ar";
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: {
    value: string;
    label: string;
  }[];
}) {
  const isArabic = locale === "ar";

  return (
    <div>
      <label className={labelClass}>{label}</label>

      <select
        dir={isArabic ? "rtl" : "ltr"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={fieldClass}
      >
        <option value="">
          {isArabic ? "يرجى الاختيار" : "Sélectionner"}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function FileField({
  locale,
  label,
  onChange,
}: {
  locale: "fr" | "ar";
  label: string;
  onChange: (file: File | null) => void;
}) {
  const isArabic = locale === "ar";

  return (
    <div>
      <label className={labelClass}>{label}</label>

      <input
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        onChange={(event) =>
          onChange(event.target.files?.[0] ?? null)
        }
        className={`block w-full rounded-xl border border-dashed border-[#094734]/20 bg-[#F5F2EC]/50 px-4 py-3 text-sm text-[#094734] file:rounded-full file:border-0 file:bg-[#094734] file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-wide file:text-white ${
          isArabic ? "file:ms-4" : "file:me-4"
        }`}
      />
    </div>
  );
}

const fieldClass =
  "w-full rounded-xl border border-[#094734]/10 bg-[#F5F2EC]/60 px-4 py-3 text-start text-[15px] text-[#094734] outline-none transition-all placeholder:text-[#094734]/35 focus:border-[#00674F]/30 focus:bg-white focus:ring-2 focus:ring-[#00674F]/10";

const labelClass =
  "mb-2 block text-start text-xs font-semibold uppercase tracking-[0.12em] text-[#094734]/55";