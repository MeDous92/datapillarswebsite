"use client";

import { FormEvent, useMemo, useState } from "react";

type BriefFields = {
  name: string;
  organisation: string;
  businessArea: string;
  pain: string;
  systems: string;
  outcome: string;
};

const initialFields: BriefFields = {
  name: "",
  organisation: "",
  businessArea: "",
  pain: "",
  systems: "",
  outcome: "",
};

export default function AssessmentForm() {
  const [fields, setFields] = useState(initialFields);
  const [prepared, setPrepared] = useState(false);
  const [copied, setCopied] = useState(false);

  const brief = useMemo(
    () =>
      [
        "DataPillars — Assessment Conversation Brief",
        "",
        `Name: ${fields.name || "Not provided"}`,
        `Organisation: ${fields.organisation || "Not provided"}`,
        `Business area: ${fields.businessArea || "Not provided"}`,
        `Current pain or opportunity: ${fields.pain || "Not provided"}`,
        `Relevant systems or reports: ${fields.systems || "Not provided"}`,
        `Desired outcome: ${fields.outcome || "Not provided"}`,
      ].join("\n"),
    [fields],
  );

  function updateField(key: keyof BriefFields, value: string) {
    setPrepared(false);
    setCopied(false);
    setFields((current) => ({ ...current, [key]: value }));
  }

  function prepareBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPrepared(true);
    setCopied(false);
  }

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const emailHref = `mailto:?subject=${encodeURIComponent(
    "DataPillars assessment conversation",
  )}&body=${encodeURIComponent(brief)}`;

  return (
    <div className="assessment-form-shell">
      <form className="assessment-form" onSubmit={prepareBrief}>
        <div className="form-row">
          <label>
            Your name
            <input
              name="name"
              value={fields.name}
              onChange={(event) => updateField("name", event.target.value)}
              autoComplete="name"
              required
            />
          </label>
          <label>
            Organisation
            <input
              name="organisation"
              value={fields.organisation}
              onChange={(event) => updateField("organisation", event.target.value)}
              autoComplete="organization"
              required
            />
          </label>
        </div>
        <label>
          Business area
          <select
            name="businessArea"
            value={fields.businessArea}
            onChange={(event) => updateField("businessArea", event.target.value)}
            required
          >
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
          <textarea
            name="pain"
            value={fields.pain}
            onChange={(event) => updateField("pain", event.target.value)}
            placeholder="For example: conflicting KPI results, manual consolidation, recurring quality issues or an AI use case that needs a trusted foundation."
            rows={5}
            required
          />
        </label>
        <div className="form-row">
          <label>
            Relevant systems or reports
            <input
              name="systems"
              value={fields.systems}
              onChange={(event) => updateField("systems", event.target.value)}
              placeholder="High-level names only"
            />
          </label>
          <label>
            Desired outcome
            <input
              name="outcome"
              value={fields.outcome}
              onChange={(event) => updateField("outcome", event.target.value)}
              placeholder="What should become better?"
              required
            />
          </label>
        </div>
        <button type="submit" className="button button-coral">
          Prepare my brief
        </button>
        <p className="form-privacy">
          Your inputs are not transmitted or stored by this page. They are used
          only to prepare a concise brief in your browser.
        </p>
      </form>

      {prepared ? (
        <div className="prepared-brief" role="status">
          <p className="eyebrow">Your conversation brief</p>
          <pre>{brief}</pre>
          <div className="button-row">
            <button type="button" className="button button-secondary" onClick={copyBrief}>
              {copied ? "Brief copied" : "Copy brief"}
            </button>
            <a className="button" href={emailHref}>
              Open in email
            </a>
          </div>
          <p>
            Address the email to your DataPillars contact, or use the founder
            links alongside this form to start the conversation.
          </p>
        </div>
      ) : null}
    </div>
  );
}
