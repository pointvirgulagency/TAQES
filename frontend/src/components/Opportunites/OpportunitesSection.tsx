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

const inputClass =
  "mt-2 w-full rounded border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-800 outline-none transition focus:border-[#054434] focus:ring-1 focus:ring-[#054434] placeholder:text-gray-400";

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
      <label className="block text-xs font-semibold text-gray-800">
        {label}
        {required ? " *" : ""}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
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
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-800">
        {label}
        {required ? " *" : ""}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      >
        <option value="">Sélectionnez une option</option>

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
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-800">
        {label}
        {required ? " *" : ""}
      </label>

      <textarea
        rows={6}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </div>
  );
}

function FileField({
  label,
  file,
  onChange,
}: {
  label: string;
  file: File | null;
  onChange: (file: File | null) => void;
}) {
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
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-800">
              {label}
            </p>

            <p className="text-xs text-gray-500">
              {file
                ? file.name
                : "Plaquette, note de présentation, références, etc."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="cursor-pointer rounded border border-gray-300 bg-white px-4 py-2.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            Choisir des fichiers

            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={(e) =>
                onChange(e.target.files?.[0] || null)
              }
            />
          </label>

          <span className="text-xs text-gray-500">
            ou glisser-déposer ici
          </span>
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-500">
        Formats acceptés : PDF, JPG, PNG, DOCX. 10 MB max. par fichier.
      </p>
    </div>
  );
}

export default function OpportunitesSection({
  locale,
  initialType = "foncier",
}: Props) {
  const [activeType, setActiveType] =
    useState<OpportunityType>(
      initialType || "foncier"
    );

  const [currentStep, setCurrentStep] = useState(1);

  const [foncierForm, setFoncierForm] =
    useState<OpportunityFormState>(emptyForm);

  const [partenariatForm, setPartenariatForm] =
    useState<OpportunityFormState>(emptyForm);

  const isArabic = locale === "ar";
  const isFoncier = activeType === "foncier";
  const form = isFoncier
    ? foncierForm
    : partenariatForm;

  const updateField = <
    K extends keyof OpportunityFormState
  >(
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
    setCurrentStep((step) =>
      Math.min(step + 1, 3)
    );

  const previousStep = () =>
    setCurrentStep((step) =>
      Math.max(step - 1, 1)
    );

  const stepTwoLabel = isFoncier
    ? "L'OPPORTUNITÉ"
    : "VOTRE PROPOSITION";

  return (
    <div className="w-full font-sans text-gray-800">
      <section className="w-full bg-[#F5F2EC] px-6 py-16 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between border-b border-gray-300/60 pb-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#054434]" />

              <p className="text-xs font-bold uppercase tracking-widest text-[#054434]">
                {isArabic
                  ? "اختر مسارك"
                  : "CHOISISSEZ VOTRE PARCOURS"}
              </p>
            </div>

            <p className="text-xs italic text-gray-500">
              {isArabic
                ? "رؤيتان، نفس الإقليم"
                : "Deux visions, un même territoire"}
            </p>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div
              onClick={() => selectType("foncier")}
              className={`group relative cursor-pointer rounded-lg bg-[#F5F2EC] p-8 transition-all hover:bg-white hover:shadow-md ${
                isFoncier
                  ? "border-2 border-[#054434] bg-white shadow-sm"
                  : "border border-gray-300/70"
              }`}
            >
              <div className="flex items-start justify-between">
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
                      Propriétaires fonciers & Apporteurs d’affaires
                    </h3>

                    <p className="mt-2 text-sm text-gray-600">
                      Proposer un terrain ou transmettre une opportunité
                      foncière.
                    </p>
                  </div>
                </div>

                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-sm text-gray-400 transition group-hover:border-[#054434] group-hover:text-[#054434]">
                  →
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  selectType("foncier");
                }}
                className={`mt-8 w-full rounded py-3.5 text-xs font-bold uppercase tracking-wider transition ${
                  isFoncier
                    ? "bg-[#054434] text-white"
                    : "border border-[#054434] bg-white text-[#054434] hover:bg-[#054434] hover:text-white"
                }`}
              >
                PROPOSER UNE OPPORTUNITÉ
              </button>
            </div>

            <div
              onClick={() => selectType("partenariat")}
              className={`group relative cursor-pointer rounded-lg bg-[#F5F2EC] p-8 transition-all hover:bg-white hover:shadow-md ${
                !isFoncier
                  ? "border-2 border-[#054434] bg-white shadow-sm"
                  : "border border-gray-300/70"
              }`}
            >
              <div className="flex items-start justify-between">
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
                      Investisseurs & Partenaires
                    </h3>

                    <p className="mt-2 text-sm text-gray-600">
                      Présenter une proposition d’investissement, de partenariat
                      ou de collaboration.
                    </p>
                  </div>
                </div>

                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-sm text-gray-400 transition group-hover:border-[#054434] group-hover:text-[#054434]">
                  →
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  selectType("partenariat");
                }}
                className={`mt-8 w-full rounded py-3.5 text-xs font-bold uppercase tracking-wider transition ${
                  !isFoncier
                    ? "bg-[#054434] text-white"
                    : "border border-[#054434] bg-white text-[#054434] hover:bg-[#054434] hover:text-white"
                }`}
              >
                PRÉSENTER UNE PROPOSITION
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white px-6 py-16 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-8 text-xs font-bold tracking-wider">
                {[
                  { number: "01", label: "VOTRE PROFIL" },
                  { number: "02", label: stepTwoLabel },
                  { number: "03", label: "VOS COORDONNÉES" },
                ].map((step, index) => {
                  const isActive =
                    currentStep === index + 1;

                  const isPassed =
                    currentStep > index + 1;

                  return (
                    <button
                      key={step.number}
                      type="button"
                      onClick={() =>
                        goToStep(index + 1)
                      }
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
                        <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#054434]" />
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() =>
                  selectType(
                    isFoncier
                      ? "partenariat"
                      : "foncier"
                  )
                }
                className="flex items-center gap-1.5 text-xs font-medium text-[#054434] hover:underline"
              >
                <span>
                  {isFoncier
                    ? "Passer au parcours Investisseurs & Partenaires"
                    : "Passer au parcours Propriétaires fonciers"}
                </span>

                <span>→</span>
              </button>
            </div>

            <div className="mt-10">
              <h2 className="font-serif text-3xl font-medium text-gray-900 md:text-4xl">
                {isFoncier
                  ? "Parlez-nous de votre opportunité foncière"
                  : "Parlez-nous de votre proposition"}
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Quelques informations pour mieux comprendre votre démarche.
                <br />
                Tous les champs marqués d’un * sont obligatoires.
              </p>

              <form
                onSubmit={(e) =>
                  e.preventDefault()
                }
                className="mt-10 space-y-8"
              >
                {currentStep === 1 && (
                  <div className="grid gap-8 md:grid-cols-2">
                    <SelectField
                      label="Vous êtes"
                      value={form.profil}
                      onChange={(value) =>
                        updateField(
                          "profil",
                          value
                        )
                      }
                      required
                      options={
                        isFoncier
                          ? [
                              {
                                value:
                                  "proprietaire_foncier",
                                label:
                                  "Propriétaire foncier",
                              },
                              {
                                value:
                                  "apporteur_affaires",
                                label:
                                  "Apporteur d’affaires",
                              },
                              {
                                value:
                                  "mandataire",
                                label:
                                  "Mandataire",
                              },
                            ]
                          : [
                              {
                                value:
                                  "investisseur",
                                label:
                                  "Investisseur",
                              },
                              {
                                value:
                                  "entreprise",
                                label:
                                  "Entreprise",
                              },
                              {
                                value:
                                  "institution",
                                label:
                                  "Institution",
                              },
                              {
                                value:
                                  "partenaire",
                                label:
                                  "Partenaire",
                              },
                            ]
                      }
                    />

                    {isFoncier ? (
                      <SelectField
                        label="Particulier ou société"
                        value={form.statut}
                        onChange={(value) =>
                          updateField(
                            "statut",
                            value
                          )
                        }
                        required
                        options={[
                          {
                            value:
                              "particulier",
                            label:
                              "Particulier",
                          },
                          {
                            value: "societe",
                            label: "Société",
                          },
                        ]}
                      />
                    ) : null}

                    <Field
                      label="Nom ou raison sociale"
                      value={
                        isFoncier
                          ? form.nom_raison_sociale
                          : form.organisation
                      }
                      onChange={(value) =>
                        updateField(
                          isFoncier
                            ? "nom_raison_sociale"
                            : "organisation",
                          value
                        )
                      }
                      placeholder="Votre nom / raison sociale"
                      required
                    />

                    <Field
                      label="Fonction"
                      value={form.fonction}
                      onChange={(value) =>
                        updateField(
                          "fonction",
                          value
                        )
                      }
                      placeholder="Votre fonction"
                    />

                    {!isFoncier && (
                      <Field
                        label="Secteur d’activité"
                        value={
                          form.secteur_activite
                        }
                        onChange={(value) =>
                          updateField(
                            "secteur_activite",
                            value
                          )
                        }
                        placeholder="Votre secteur d’activité"
                      />
                    )}
                  </div>
                )}

                {currentStep === 2 &&
                  isFoncier && (
                    <div className="space-y-8">
                      <div className="grid gap-8 md:grid-cols-2">
                        <Field
                          label="Localisation du terrain"
                          value={
                            form.localisation
                          }
                          onChange={(value) =>
                            updateField(
                              "localisation",
                              value
                            )
                          }
                          placeholder="Région, ville ou commune"
                          required
                        />

                        <Field
                          label="Superficie approximative"
                          value={
                            form.superficie
                          }
                          onChange={(value) =>
                            updateField(
                              "superficie",
                              value
                            )
                          }
                          placeholder="Ex : 5 000 m²"
                          required
                        />

                        <Field
                          label="Nature du bien ou du terrain"
                          value={
                            form.nature_proposition
                          }
                          onChange={(value) =>
                            updateField(
                              "nature_proposition",
                              value
                            )
                          }
                          placeholder="Nature du bien ou du terrain"
                          required
                        />

                        <Field
                          label="Situation juridique"
                          value={
                            form.situation_juridique
                          }
                          onChange={(value) =>
                            updateField(
                              "situation_juridique",
                              value
                            )
                          }
                          placeholder="Situation juridique"
                          required
                        />

                        <Field
                          label="Référence foncière"
                          value={
                            form.reference_fonciere
                          }
                          onChange={(value) =>
                            updateField(
                              "reference_fonciere",
                              value
                            )
                          }
                          placeholder="Facultatif"
                        />

                        <SelectField
                          label="Type d’opportunité"
                          value={
                            form.nature_proposition
                          }
                          onChange={(value) =>
                            updateField(
                              "nature_proposition",
                              value
                            )
                          }
                          required
                          options={[
                            {
                              value: "vente",
                              label: "Vente",
                            },
                            {
                              value:
                                "partenariat",
                              label:
                                "Partenariat",
                            },
                            {
                              value:
                                "apport_foncier",
                              label:
                                "Apport foncier",
                            },
                            {
                              value: "autre",
                              label: "Autre",
                            },
                          ]}
                        />
                      </div>

                      <TextareaField
                        label="Description de l’opportunité"
                        value={
                          form.description_opportunite
                        }
                        onChange={(value) =>
                          updateField(
                            "description_opportunite",
                            value
                          )
                        }
                        placeholder="Présentez les détails de l’opportunité..."
                        required
                      />

                      <FileField
                        label="Photos, plans ou documents"
                        file={
                          form.document_foncier
                        }
                        onChange={(file) =>
                          updateField(
                            "document_foncier",
                            file
                          )
                        }
                      />
                    </div>
                  )}

                {currentStep === 2 &&
                  !isFoncier && (
                    <div className="space-y-8">
                      <div className="grid gap-8 md:grid-cols-2">
                        <SelectField
                          label="Nature de la proposition"
                          value={
                            form.type_demande
                          }
                          onChange={(value) =>
                            updateField(
                              "type_demande",
                              value
                            )
                          }
                          required
                          options={[
                            {
                              value:
                                "investissement",
                              label:
                                "Investissement",
                            },
                            {
                              value:
                                "partenariat",
                              label:
                                "Partenariat",
                            },
                            {
                              value:
                                "collaboration",
                              label:
                                "Collaboration",
                            },
                            {
                              value: "autre",
                              label: "Autre",
                            },
                          ]}
                        />

                        <Field
                          label="Domaine d’intervention"
                          value={
                            form.domaine_intervention
                          }
                          onChange={(value) =>
                            updateField(
                              "domaine_intervention",
                              value
                            )
                          }
                          placeholder="Domaine d’intervention"
                          required
                        />

                        <Field
                          label="Type de partenariat recherché"
                          value={
                            form.type_partenariat_recherche
                          }
                          onChange={(value) =>
                            updateField(
                              "type_partenariat_recherche",
                              value
                            )
                          }
                          placeholder="Type de partenariat"
                          required
                        />

                        <Field
                          label="Zone géographique concernée"
                          value={
                            form.zone_geographique
                          }
                          onChange={(value) =>
                            updateField(
                              "zone_geographique",
                              value
                            )
                          }
                          placeholder="Ville, région ou zone"
                          required
                        />

                        <Field
                          label="Budget ou niveau d’investissement"
                          value={
                            form.budget_investissement
                          }
                          onChange={(value) =>
                            updateField(
                              "budget_investissement",
                              value
                            )
                          }
                          placeholder="Facultatif"
                        />
                      </div>

                      <TextareaField
                        label="Présentation détaillée de la proposition"
                        value={
                          form.message_detail
                        }
                        onChange={(value) =>
                          updateField(
                            "message_detail",
                            value
                          )
                        }
                        placeholder="Présentez votre proposition..."
                        required
                      />

                      <FileField
                        label="Présentation, note ou documents"
                        file={
                          form.documents_presentation
                        }
                        onChange={(file) =>
                          updateField(
                            "documents_presentation",
                            file
                          )
                        }
                      />
                    </div>
                  )}

                {currentStep === 3 && (
                  <div className="space-y-8">
                    <div className="grid gap-8 md:grid-cols-2">
                      <Field
                        label="Nom du contact"
                        value={
                          form.nom_complet
                        }
                        onChange={(value) =>
                          updateField(
                            "nom_complet",
                            value
                          )
                        }
                        placeholder="Nom et prénom"
                        required
                      />

                      <Field
                        label="Téléphone"
                        value={
                          form.telephone
                        }
                        onChange={(value) =>
                          updateField(
                            "telephone",
                            value
                          )
                        }
                        placeholder="Votre numéro"
                        type="tel"
                        required
                      />

                      <Field
                        label="E-mail"
                        value={form.email}
                        onChange={(value) =>
                          updateField(
                            "email",
                            value
                          )
                        }
                        placeholder="votre@email.com"
                        type="email"
                        required
                      />

                      <Field
                        label="Ville"
                        value={form.ville}
                        onChange={(value) =>
                          updateField(
                            "ville",
                            value
                          )
                        }
                        placeholder="Votre ville"
                        required
                      />

                      <SelectField
                        label="Préférence de contact"
                        value={
                          form.preference_contact
                        }
                        onChange={(value) =>
                          updateField(
                            "preference_contact",
                            value
                          )
                        }
                        options={[
                          {
                            value:
                              "telephone",
                            label:
                              "Téléphone",
                          },
                          {
                            value: "email",
                            label: "E-mail",
                          },
                        ]}
                      />
                    </div>

                    <label className="flex items-start gap-3 text-xs text-gray-700">
                      <input
                        type="checkbox"
                        checked={
                          form.consentement
                        }
                        onChange={(e) =>
                          updateField(
                            "consentement",
                            e.target.checked
                          )
                        }
                        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#054434] focus:ring-[#054434]"
                      />

                      <span>
                        J&apos;accepte que mes informations soient
                        traitées dans le cadre de l&apos;étude de cette
                        opportunité par TAQÈS. *
                      </span>
                    </label>
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-gray-200 pt-8">
                  <button
                    type="button"
                    onClick={previousStep}
                    disabled={currentStep === 1}
                    className="rounded border border-gray-300 bg-white px-6 py-2.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-30"
                  >
                    PRÉCÉDENT
                  </button>

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="inline-flex items-center gap-2 rounded bg-[#054434] px-7 py-3 text-xs font-bold text-white transition hover:bg-[#032e23]"
                    >
                      <span>CONTINUER</span>
                      <span>→</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {}}
                      className="inline-flex items-center gap-2 rounded bg-[#054434] px-7 py-3 text-xs font-bold text-white transition hover:bg-[#032e23]"
                    >
                      <span>
                        ENVOYER LA PROPOSITION
                      </span>
                      <span>→</span>
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