"use client";

import { FormEvent, useState } from "react";

type BriefFields = {
  name: string;
  email: string;
  phone: string;
  organisation: string;
  businessArea: string;
  pain: string;
  systems: string;
  outcome: string;
  website: string;
  consent: boolean;
};

const initialFields: BriefFields = {
  name: "",
  email: "",
  phone: "",
  organisation: "",
  businessArea: "",
  pain: "",
  systems: "",
  outcome: "",
  website: "",
  consent: false,
};

type SubmitState = "idle" | "sending" | "sent" | "error";

export default function AssessmentForm() {
  const [fields, setFields] = useState(initialFields);
  const [status, setStatus] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  function updateField<K extends keyof BriefFields>(key: K, value: BriefFields[K]) {
    setStatus("idle");
    setMessage("");
    setFields((current) => ({ ...current, [key]: value }));
  }

  async function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const result = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "We could not send the enquiry.");
      }

      setStatus("sent");
      setMessage("Thank you. Your enquiry has been sent to the DataPillars founders.");
      setFields(initialFields);
      window.dispatchEvent(new CustomEvent("datapillars:contact-submitted"));
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We could not send the enquiry. Please call or use WhatsApp.");
    }
  }

  return (
    <div className="assessment-form-shell">
      <form className="assessment-form" onSubmit={submitEnquiry}>
        <div className="form-row">
          <label>
            Your name
            <input name="name" value={fields.name} onChange={(event) => updateField("name", event.target.value)} autoComplete="name" maxLength={120} required />
          </label>
          <label>
            Work email
            <input type="email" name="email" value={fields.email} onChange={(event) => updateField("email", event.target.value)} autoComplete="email" inputMode="email" maxLength={180} required />
          </label>
        </div>
        <div className="form-row">
          <label>
            Organisation
            <input name="organisation" value={fields.organisation} onChange={(event) => updateField("organisation", event.target.value)} autoComplete="organization" maxLength={180} required />
          </label>
          <label>
            Phone <span className="optional-label">Optional</span>
            <input type="tel" name="phone" value={fields.phone} onChange={(event) => updateField("phone", event.target.value)} autoComplete="tel" inputMode="tel" maxLength={60} />
          </label>
        </div>
        <label>
          Business area
          <select name="businessArea" value={fields.businessArea} onChange={(event) => updateField("businessArea", event.target.value)} required>
            <option value="" disabled>Select the initial focus</option>
            <option>Finance</option>
            <option>Operations</option>
            <option>Human Resources</option>
            <option>Procurement</option>
            <option>Commercial</option>
            <option>Strategy / Executive</option>
            <option>Enterprise-wide</option>
            <option>Other</option>
          </select>
        </label>
        <label>
          What is the current pain or opportunity?
          <textarea name="pain" value={fields.pain} onChange={(event) => updateField("pain", event.target.value)} placeholder="For example: conflicting KPI results, manual consolidation, recurring quality issues or an AI use case that needs a trusted foundation." rows={5} maxLength={3000} required />
        </label>
        <div className="form-row">
          <label>
            Relevant systems or reports <span className="optional-label">Optional</span>
            <input name="systems" value={fields.systems} onChange={(event) => updateField("systems", event.target.value)} placeholder="High-level names only" maxLength={1000} />
          </label>
          <label>
            Desired outcome
            <input name="outcome" value={fields.outcome} onChange={(event) => updateField("outcome", event.target.value)} placeholder="What should become better?" maxLength={1500} required />
          </label>
        </div>
        <label className="honeypot-field" aria-hidden="true">
          Website
          <input name="website" value={fields.website} onChange={(event) => updateField("website", event.target.value)} tabIndex={-1} autoComplete="off" />
        </label>
        <label className="consent-field">
          <input type="checkbox" checked={fields.consent} onChange={(event) => updateField("consent", event.target.checked)} required />
          <span>I consent to DataPillars using these details to respond to this enquiry.</span>
        </label>
        <button type="submit" className="button button-coral" disabled={status === "sending"}>
          {status === "sending" ? "Sending enquiry…" : "Send my enquiry"}
        </button>
        <p className="form-privacy">
          Your enquiry is sent privately to DataPillars. We do not display the
          receiving address or use your information for unrelated marketing.
        </p>
        {message ? (
          <p className={`form-status form-status-${status}`} role={status === "error" ? "alert" : "status"}>
            {message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
