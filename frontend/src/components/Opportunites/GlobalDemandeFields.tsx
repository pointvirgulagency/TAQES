"use client";

import type { OpportunityFormState } from "./OpportunitesSection";

interface GlobalDemandeFieldsProps {
  locale: "fr" | "ar";
  form: OpportunityFormState;
  updateField: <K extends keyof OpportunityFormState>(
    field: K,
    value: OpportunityFormState[K]
  ) => void;
}

export default function GlobalDemandeFields({
  locale,
  form,
  updateField,
}: GlobalDemandeFieldsProps) {
  const isArabic = locale === "ar";

  return (
    <div className="mt-8 border-t border-[#094734]/10 pt-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#449383]">
          {isArabic ? "الخطوة 3" : "Étape 3"}
        </p>

        <h4 className="mt-3 font-serif text-2xl text-[#094734] md:text-3xl">
          {isArabic ? "بيانات الاتصال" : "Vos coordonnées"}
        </h4>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#094734]/65">
          {isArabic
            ? "أدخلوا بياناتكم حتى نتمكن من التواصل معكم."
            : "Indiquez vos coordonnées afin que nous puissions revenir vers vous."}
        </p>
      </div>

      <div className="mt-8 space-y-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label={isArabic ? "اسم جهة الاتصال" : "Nom du contact"}
            value={form.nom_complet}
            onChange={(value) =>
              updateField("nom_complet", value)
            }
            placeholder={
              isArabic
                ? "اسمكم الكامل"
                : "Votre nom complet"
            }
            required
          />

          <Field
            label={isArabic ? "الهاتف" : "Téléphone"}
            value={form.telephone}
            onChange={(value) =>
              updateField("telephone", value)
            }
            placeholder="06 12 34 56 78"
            required
          />

          <Field
            label={isArabic ? "البريد الإلكتروني" : "E-mail"}
            type="email"
            value={form.email}
            onChange={(value) =>
              updateField("email", value)
            }
            placeholder="votreemail@example.com"
            required
          />

          <Field
            label={isArabic ? "المدينة" : "Ville"}
            value={form.ville}
            onChange={(value) =>
              updateField("ville", value)
            }
            placeholder={
              isArabic
                ? "مدينتكم"
                : "Votre ville"
            }
          />

          <SelectField
            label={
              isArabic
                ? "طريقة التواصل المفضلة"
                : "Préférence de contact"
            }
            value={form.preference_contact}
            onChange={(value) =>
              updateField(
                "preference_contact",
                value
              )
            }
            options={[
              {
                value: "email",
                label: "Email",
              },
              {
                value: "telephone",
                label: isArabic
                  ? "الهاتف"
                  : "Téléphone",
              },
            ]}
          />
        </div>

        <div className="border-t border-[#094734]/10 pt-6">
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#094734]/70">
            <input
              type="checkbox"
              checked={form.consentement}
              onChange={(event) =>
                updateField(
                  "consentement",
                  event.target.checked
                )
              }
              required
              className="mt-1 h-4 w-4 shrink-0 rounded border-[#094734]/30 text-[#094734] focus:ring-[#00674F]/40"
            />

            <span>
              {isArabic
                ? "أوافق على استخدام بياناتي لمعالجة طلبي."
                : "J'accepte que mes données soient utilisées afin de traiter ma demande."}
            </span>
          </label>
        </div>
      </div>
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className={labelClass}>
        {label}
        {required && (
          <span className="ml-1 text-[#449383]">*</span>
        )}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
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

const fieldClass =
  "w-full rounded-xl border border-[#094734]/10 bg-[#F5F2EC]/60 px-4 py-3 text-[15px] text-[#094734] outline-none transition-all placeholder:text-[#094734]/35 focus:border-[#00674F]/30 focus:bg-white focus:ring-2 focus:ring-[#00674F]/10";

const labelClass =
  "mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#094734]/55";