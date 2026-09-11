"use client";

import { useState } from "react";
import { submitDemande, uploadFile, uploadFiles } from "@/lib/strapi";
import { TYPE_CONFIG, type DemandeType } from "./ContactTabs";

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
  zone: "",
  type_bien: "",
  surface_recherchee: "",
  delai_souhaite: "",

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
});

type FormState = ReturnType<typeof emptyForm>;

export default function ContactForm({
  locale,
  type,
  projects,
}: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState<FormState>(emptyForm());

  const block = TYPE_CONFIG[type].block;

  function updateField<K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    try {
      let demandeDetail:
        | Parameters<typeof submitDemande>[0]["demande_detail"]
        | undefined;

      if (block === "projet") {
        demandeDetail = {
          __component: "shared.demande-projet",
          project: form.project ? Number(form.project) : undefined,
          zone: form.zone.trim() || undefined,
          type_bien: form.type_bien.trim() || undefined,
          surface_recherchee: form.surface_recherchee.trim() || undefined,
          delai_souhaite: form.delai_souhaite.trim() || undefined,
        };
      }

      if (block === "partenariat") {
        demandeDetail = {
          __component: "shared.demande-partenariat",
          organisation: form.organisation.trim() || undefined,
          fonction: form.fonction.trim() || undefined,
          type_demande: form.type_demande.trim() || undefined,
          message_detail: form.message_detail.trim() || undefined,
        };
      }

      if (block === "foncier") {
        const documentFoncier = form.document_foncier
          ? await uploadFile(form.document_foncier)
          : undefined;

        demandeDetail = {
          __component: "shared.demande-foncier",
          localisation: form.localisation.trim() || undefined,
          superficie: form.superficie.trim() || undefined,
          nature_proposition: form.nature_proposition.trim() || undefined,
          document_foncier: documentFoncier,
        };
      }

      if (block === "reclamation") {
        const pieceJointe = form.piece_jointe.length
          ? await uploadFiles(form.piece_jointe)
          : undefined;

        demandeDetail = {
          __component: "shared.demande-reclamation",
          project: form.project ? Number(form.project) : undefined,
          reference_dossier: form.reference_dossier.trim() || undefined,
          objet: form.objet.trim() || undefined,
          piece_jointe: pieceJointe,
        };
      }

      await submitDemande({
        nom_complet: form.nomComplet.trim(),
        telephone: form.telephone.trim() || undefined,
        email: form.email.trim(),
        preference_contact: form.preference_contact || undefined,
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

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full">
      <div>
        <h2 className="text-2xl font-semibold text-[#094734]">
          Envoyez-nous votre demande
        </h2>

        <p className="mt-2 text-sm text-[#094734]/60">
          Complétez le formulaire ci-dessous.
        </p>
      </div>

      {/* Dynamic fields rendered FIRST */}
      {block !== "none" && (
        <div className="border-b border-[#094734]/10 pb-8">
          {block === "projet" && (
            <DemandeProjet
              form={form}
              updateField={updateField}
              projects={projects}
            />
          )}

          {block === "foncier" && (
            <DemandeFoncier
              form={form}
              updateField={updateField}
            />
          )}

          {block === "partenariat" && (
            <DemandePartenariat
              form={form}
              updateField={updateField}
            />
          )}

          {block === "reclamation" && (
            <DemandeReclamation
              form={form}
              updateField={updateField}
              projects={projects}
            />
          )}
        </div>
      )}

      {/* Static fields rendered SECOND */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-[#094734]">
          Vos coordonnées
        </h3>

        <div className="grid gap-4 xl:grid-cols-2">
          <Field
            label="Nom complet"
            value={form.nomComplet}
            onChange={(value) => updateField("nomComplet", value)}
            required
          />

          <Field
            label="Email"
            type="email"
            value={form.email}
            onChange={(value) => updateField("email", value)}
            required
          />

          <Field
            label="Téléphone"
            value={form.telephone}
            onChange={(value) => updateField("telephone", value)}
          />

          <Field
            label="Ville"
            value={form.ville}
            onChange={(value) => updateField("ville", value)}
          />

          <SelectField
            label="Préférence de contact"
            value={form.preference_contact}
            onChange={(value) =>
              updateField("preference_contact", value)
            }
            options={[
              { value: "email", label: "Email" },
              { value: "telephone", label: "Téléphone" },
            ]}
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#094734]/60">
            Votre message
          </label>

          <textarea
            value={form.message}
            onChange={(event) =>
              updateField("message", event.target.value)
            }
            required
            rows={5}
            className="w-full rounded-lg border-0 bg-[#EBE2DC]/40 px-4 py-3 text-sm text-[#094734] outline-none ring-1 ring-[#094734]/5 focus:ring-2 focus:ring-[#00674F]/30"
          />
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm text-[#094734]/70">
        <input
          type="checkbox"
          checked={form.consentement}
          onChange={(event) =>
            updateField("consentement", event.target.checked)
          }
          required
          className="mt-1"
        />

        <span>
          J&apos;accepte que mes données soient utilisées afin de traiter ma
          demande.
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-3 rounded-full bg-[#094734] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#00674F] disabled:opacity-60"
      >
        {status === "submitting"
          ? "Envoi en cours..."
          : "Envoyer la demande"}

        <span>→</span>
      </button>

      {status === "success" && (
        <p className="text-sm font-medium text-[#00674F]">
          Votre demande a bien été envoyée. Nous vous répondrons rapidement.
        </p>
      )}

      {status === "error" && (
        <p className="text-sm font-medium text-red-600">
          Une erreur est survenue. Merci de réessayer.
        </p>
      )}
    </form>
  );
}

interface DetailProps {
  form: FormState;
  updateField: <K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) => void;
}

function DemandeProjet({
  form,
  updateField,
  projects,
}: DetailProps & {
  projects: { id: number; title: string }[];
}) {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-[#094734]">
        Votre projet
      </h3>

      <div className="grid gap-4 xl:grid-cols-2">
        <SelectField
          label="Projet"
          value={form.project}
          onChange={(value) => updateField("project", value)}
          options={projects.map((project) => ({
            value: String(project.id),
            label: project.title,
          }))}
        />

        <Field
          label="Zone"
          value={form.zone}
          onChange={(value) => updateField("zone", value)}
        />

        <Field
          label="Type de bien"
          value={form.type_bien}
          onChange={(value) => updateField("type_bien", value)}
        />

        <Field
          label="Surface recherchée"
          value={form.surface_recherchee}
          onChange={(value) =>
            updateField("surface_recherchee", value)
          }
        />

        <Field
          label="Délai souhaité"
          value={form.delai_souhaite}
          onChange={(value) =>
            updateField("delai_souhaite", value)
          }
        />
      </div>
    </div>
  );
}

function DemandeFoncier({
  form,
  updateField,
}: DetailProps) {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-[#094734]">
        Votre demande foncière
      </h3>

      <div className="grid gap-4 xl:grid-cols-2">
        <Field
          label="Localisation"
          value={form.localisation}
          onChange={(value) =>
            updateField("localisation", value)
          }
        />

        <Field
          label="Superficie"
          value={form.superficie}
          onChange={(value) =>
            updateField("superficie", value)
          }
        />

        <Field
          label="Nature de la proposition"
          value={form.nature_proposition}
          onChange={(value) =>
            updateField("nature_proposition", value)
          }
        />

        <FileField
          label="Document foncier"
          onChange={(file) =>
            updateField("document_foncier", file)
          }
        />
      </div>
    </div>
  );
}

function DemandePartenariat({
  form,
  updateField,
}: DetailProps) {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-[#094734]">
        Votre demande de partenariat
      </h3>

      <div className="grid gap-4 xl:grid-cols-2">
        <Field
          label="Organisation"
          value={form.organisation}
          onChange={(value) =>
            updateField("organisation", value)
          }
        />

        <Field
          label="Fonction"
          value={form.fonction}
          onChange={(value) =>
            updateField("fonction", value)
          }
        />

        <Field
          label="Type de demande"
          value={form.type_demande}
          onChange={(value) =>
            updateField("type_demande", value)
          }
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#094734]/60">
          Message détaillé
        </label>

        <textarea
          value={form.message_detail}
          onChange={(event) =>
            updateField("message_detail", event.target.value)
          }
          rows={5}
          className="w-full rounded-lg border-0 bg-[#EBE2DC]/40 px-4 py-3 text-sm text-[#094734] outline-none ring-1 ring-[#094734]/5 focus:ring-2 focus:ring-[#00674F]/30"
        />
      </div>
    </div>
  );
}

function DemandeReclamation({
  form,
  updateField,
  projects,
}: DetailProps & {
  projects: { id: number; title: string }[];
}) {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-[#094734]">
        Votre réclamation
      </h3>

      <div className="grid gap-4 xl:grid-cols-2">
        <SelectField
          label="Projet"
          value={form.project}
          onChange={(value) => updateField("project", value)}
          options={projects.map((project) => ({
            value: String(project.id),
            label: project.title,
          }))}
        />

        <Field
          label="Référence dossier"
          value={form.reference_dossier}
          onChange={(value) =>
            updateField("reference_dossier", value)
          }
        />

        <Field
          label="Objet"
          value={form.objet}
          onChange={(value) =>
            updateField("objet", value)
          }
        />

        <FileFieldMultiple
          label="Pièces jointes"
          onChange={(files) =>
            updateField("piece_jointe", files)
          }
        />
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#094734]/60">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="w-full rounded-lg border-0 bg-[#EBE2DC]/40 px-4 py-3 text-sm text-[#094734] outline-none ring-1 ring-[#094734]/5 focus:ring-2 focus:ring-[#00674F]/30"
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
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#094734]/60">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border-0 bg-[#EBE2DC]/40 px-4 py-3 text-sm text-[#094734] outline-none ring-1 ring-[#094734]/5 focus:ring-2 focus:ring-[#00674F]/30"
      >
        <option value="">Sélectionner</option>

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
  label,
  onChange,
}: {
  label: string;
  onChange: (file: File | null) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#094734]/60">
        {label}
      </label>

      <input
        type="file"
        onChange={(event) =>
          onChange(event.target.files?.[0] ?? null)
        }
        className="block w-full text-sm text-[#094734]"
      />
    </div>
  );
}

function FileFieldMultiple({
  label,
  onChange,
}: {
  label: string;
  onChange: (files: File[]) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#094734]/60">
        {label}
      </label>

      <input
        type="file"
        multiple
        onChange={(event) =>
          onChange(Array.from(event.target.files ?? []))
        }
        className="block w-full text-sm text-[#094734]"
      />
    </div>
  );
}