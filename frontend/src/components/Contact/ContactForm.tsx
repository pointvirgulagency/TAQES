"use client";

import { useState } from "react";
import { submitDemande } from "@/lib/strapi";

interface ContactFormProps {
  locale: "fr" | "ar";
}

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm({ locale }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    nomComplet: "",
    email: "",
    telephone: "",
    sujet: "",
    message: "",
  });

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("submitting");

    try {
      await submitDemande({
        ...form,
        type: "Nous contacter",
        locale,
      });

      setStatus("success");
      setForm({
        nomComplet: "",
        email: "",
        telephone: "",
        sujet: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#094734]">
        Envoyez-nous un message
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
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
          label="Sujet"
          value={form.sujet}
          onChange={(value) => updateField("sujet", value)}
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#094734]/60">
          Votre message
        </label>

        <textarea
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          required
          rows={5}
          className="w-full rounded-lg border-0 bg-[#EBE2DC]/40 px-4 py-3 text-sm text-[#094734] outline-none ring-1 ring-[#094734]/5 focus:ring-2 focus:ring-[#00674F]/30"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-3 rounded-full bg-[#094734] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#00674F] disabled:opacity-60"
      >
        {status === "submitting" ? "Envoi en cours..." : "Envoyer le message"}
        <span>→</span>
      </button>

      {status === "success" && (
        <p className="text-sm font-medium text-[#00674F]">
          Votre message a bien été envoyé. Nous vous répondrons rapidement.
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