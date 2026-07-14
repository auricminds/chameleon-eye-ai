"use client";

import { useState } from "react";

const DOCUMENT_OPTIONS = [
  "DPA",
  "SOC 2 Type II Report",
  "ISO/IEC 27001 Certificate",
  "Penetration Test Summary",
  "Security Questionnaire",
  "Vendor Risk Pack",
  "Compliance Evidence Summary",
];

type FormState = {
  fullName: string;
  companyName: string;
  workEmail: string;
  requestedDocument: string;
  reason: string;
  ndaRequired: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

export function TrustPackForm() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    companyName: "",
    workEmail: "",
    requestedDocument: "",
    reason: "",
    ndaRequired: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!form.companyName.trim()) e.companyName = "Company name is required.";
    if (!form.workEmail.trim()) {
      e.workEmail = "Work email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workEmail)) {
      e.workEmail = "Enter a valid email address.";
    }
    if (!form.requestedDocument)
      e.requestedDocument = "Please select a document.";
    if (!form.reason.trim() || form.reason.trim().length < 10)
      e.reason = "Reason must be at least 10 characters.";
    if (!form.ndaRequired) e.ndaRequired = "Please select an option.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    setServerError("");
    try {
      const res = await fetch("/api/v1/trust/document-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          companyName: form.companyName,
          workEmail: form.workEmail,
          requestedDocument: form.requestedDocument,
          reason: form.reason,
          ndaRequired: form.ndaRequired === "yes",
        }),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setServerError(
          data?.error || "Submission failed. Please try again."
        );
      }
    } catch {
      setServerError("Submission failed. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-emerald/30 bg-emerald/5 p-8">
        <p className="text-base font-semibold text-emerald mb-3">
          Request Received
        </p>
        <p className="text-sm leading-7 text-muted">
          Your trust document request has been submitted. Chairmans Holding will
          review and respond within 2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {serverError && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
          <p className="text-sm text-red-400">{serverError}</p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Full name <span className="text-gold">*</span>
          </label>
          <input
            type="text"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-panel px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-emerald/40 focus:outline-none"
            placeholder="Full name"
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Company name <span className="text-gold">*</span>
          </label>
          <input
            type="text"
            value={form.companyName}
            onChange={(e) =>
              setForm({ ...form, companyName: e.target.value })
            }
            className="w-full rounded-xl border border-white/10 bg-panel px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-emerald/40 focus:outline-none"
            placeholder="Company name"
          />
          {errors.companyName && (
            <p className="mt-1 text-xs text-red-400">{errors.companyName}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Work email <span className="text-gold">*</span>
        </label>
        <input
          type="email"
          value={form.workEmail}
          onChange={(e) => setForm({ ...form, workEmail: e.target.value })}
          className="w-full rounded-xl border border-white/10 bg-panel px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-emerald/40 focus:outline-none"
          placeholder="you@company.com"
        />
        {errors.workEmail && (
          <p className="mt-1 text-xs text-red-400">{errors.workEmail}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Requested document <span className="text-gold">*</span>
        </label>
        <select
          value={form.requestedDocument}
          onChange={(e) =>
            setForm({ ...form, requestedDocument: e.target.value })
          }
          className="w-full rounded-xl border border-white/10 bg-panel px-4 py-3 text-sm text-foreground focus:border-emerald/40 focus:outline-none"
        >
          <option value="">Select a document</option>
          {DOCUMENT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.requestedDocument && (
          <p className="mt-1 text-xs text-red-400">
            {errors.requestedDocument}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Reason for request <span className="text-gold">*</span>
        </label>
        <textarea
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
          rows={4}
          className="w-full rounded-xl border border-white/10 bg-panel px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-emerald/40 focus:outline-none resize-none"
          placeholder="Please describe why you are requesting this document and how it will be used."
        />
        {errors.reason && (
          <p className="mt-1 text-xs text-red-400">{errors.reason}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          NDA required? <span className="text-gold">*</span>
        </label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="ndaRequired"
              value="yes"
              checked={form.ndaRequired === "yes"}
              onChange={() => setForm({ ...form, ndaRequired: "yes" })}
              className="accent-emerald"
            />
            <span className="text-sm text-foreground">Yes</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="ndaRequired"
              value="no"
              checked={form.ndaRequired === "no"}
              onChange={() => setForm({ ...form, ndaRequired: "no" })}
              className="accent-emerald"
            />
            <span className="text-sm text-foreground">No</span>
          </label>
        </div>
        {errors.ndaRequired && (
          <p className="mt-1 text-xs text-red-400">{errors.ndaRequired}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-xl bg-emerald px-6 py-3 text-sm font-semibold text-background hover:bg-emerald/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {submitting ? "Submitting..." : "Submit Request"}
      </button>

      <p className="text-xs leading-6 text-muted">
        Confidential documents are not sent automatically. All requests require
        admin approval.
      </p>
    </form>
  );
}
