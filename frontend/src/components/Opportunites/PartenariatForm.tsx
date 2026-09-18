"use client";

import type { OpportunityFormState } from "./OpportunitesSection";

interface PartenariatFormProps {
  locale: "fr" | "ar";
  form: OpportunityFormState;
  updateField: <K extends keyof OpportunityFormState>(
    field: K,
    value: OpportunityFormState[K]
  ) => void;
}

export default function PartenariatForm({
  locale,
  form,
  updateField,
}: PartenariatFormProps) {
  const isArabic = locale === "ar";

  return (
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
          label={isArabic ? "أنتم" : "Vous êtes"}
          value={form.profil}
          onChange={(value) => updateField("profil", value)}
          options={[
            {
              value: "investisseur",
              label: isArabic ? "مستثمر" : "Investisseur",
            },
            {
              value: "entreprise",
              label: isArabic ? "شركة" : "Entreprise",
            },
            {
              value: "institution",
              label: isArabic ? "مؤسسة" : "Institution",
            },
            {
              value: "partenaire",
              label: isArabic ? "شريك" : "Partenaire",
            },
          ]}
        />

        <Field
          label={
            isArabic
              ? "الاسم أو اسم الشركة"
              : "Nom ou raison sociale"
          }
          value={form.organisation}
          onChange={(value) =>
            updateField("organisation", value)
          }
        />

        <Field
          label={isArabic ? "الوظيفة" : "Fonction"}
          value={form.fonction}
          onChange={(value) => updateField("fonction", value)}
        />

        <Field
          label={
            isArabic
              ? "قطاع النشاط"
              : "Secteur d’activité"
          }
          value={form.secteur_activite}
          onChange={(value) =>
            updateField("secteur_activite", value)
          }
        />
      </div>

      <div className="border-t border-[#094734]/10 pt-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#449383]">
          {isArabic ? "الخطوة 2" : "Étape 2"}
        </p>

        <h4 className="mt-3 font-serif text-2xl text-[#094734] md:text-3xl">
          {isArabic ? "مقترحكم" : "Votre proposition"}
        </h4>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          label={
            isArabic
              ? "طبيعة المقترح"
              : "Nature de la proposition"
          }
          value={form.type_demande}
          onChange={(value) =>
            updateField("type_demande", value)
          }
          options={[
            {
              value: "investissement",
              label: isArabic
                ? "استثمار"
                : "Investissement",
            },
            {
              value: "partenariat",
              label: isArabic
                ? "شراكة"
                : "Partenariat",
            },
            {
              value: "collaboration",
              label: isArabic
                ? "تعاون"
                : "Collaboration",
            },
            {
              value: "autre",
              label: isArabic ? "أخرى" : "Autre",
            },
          ]}
        />

        <Field
          label={
            isArabic
              ? "مجال التدخل"
              : "Domaine d’intervention"
          }
          value={form.domaine_intervention}
          onChange={(value) =>
            updateField("domaine_intervention", value)
          }
        />

        <Field
          label={
            isArabic
              ? "نوع الشراكة المطلوبة"
              : "Type de partenariat recherché"
          }
          value={form.type_partenariat_recherche}
          onChange={(value) =>
            updateField(
              "type_partenariat_recherche",
              value
            )
          }
        />

        <Field
          label={
            isArabic
              ? "المنطقة الجغرافية المعنية"
              : "Zone géographique concernée"
          }
          value={form.zone_geographique}
          onChange={(value) =>
            updateField("zone_geographique", value)
          }
        />

        <Field
          label={
            isArabic
              ? "الميزانية أو مستوى الاستثمار"
              : "Budget ou niveau d’investissement"
          }
          value={form.budget_investissement}
          onChange={(value) =>
            updateField("budget_investissement", value)
          }
          placeholder={
            isArabic
              ? "اختياري"
              : "Facultatif"
          }
        />
      </div>

      <div>
        <label className={labelClass}>
          {isArabic
            ? "العرض المفصل"
            : "Présentation détaillée de la proposition"}
        </label>

        <textarea
          value={form.message_detail}
          onChange={(event) =>
            updateField(
              "message_detail",
              event.target.value
            )
          }
          rows={6}
          placeholder={
            isArabic
              ? "قدموا تفاصيل مقترحكم..."
              : "Présentez les détails de votre proposition..."
          }
          className={`${fieldClass} resize-y`}
        />
      </div>

      <FileField
        label={
          isArabic
            ? "العرض أو المذكرة أو الوثائق"
            : "Présentation, note ou documents"
        }
        onChange={(file) =>
          updateField("documents_presentation", file)
        }
      />
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
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: {
    value: string;
    label: string;
  }[];
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className={fieldClass}
      >
        <option value="">Sélectionner</option>

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
}: {
  label: string;
  onChange: (file: File | null) => void;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>

      <input
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        onChange={(event) =>
          onChange(event.target.files?.[0] ?? null)
        }
        className="block w-full rounded-xl border border-dashed border-[#094734]/20 bg-[#F5F2EC]/50 px-4 py-3 text-sm text-[#094734] file:mr-4 file:rounded-full file:border-0 file:bg-[#094734] file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-wide file:text-white"
      />
    </div>
  );
}

const fieldClass =
  "w-full rounded-xl border border-[#094734]/10 bg-[#F5F2EC]/60 px-4 py-3 text-[15px] text-[#094734] outline-none transition-all placeholder:text-[#094734]/35 focus:border-[#00674F]/30 focus:bg-white focus:ring-2 focus:ring-[#00674F]/10";

const labelClass =
  "mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#094734]/55";