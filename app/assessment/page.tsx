import type { Metadata } from "next";
import Link from "next/link";
import { CallToAction, PageHero, SectionHeading } from "../components";

export const metadata: Metadata = {
  title: "Complimentary Assessment",
  description:
    "A focused Data Maturity & Opportunity Assessment to identify risks, quick wins and the first credible business case.",
  alternates: { canonical: "/assessment" },
};

const inputs = [
  "Sponsor and stakeholder interviews",
  "Critical reports and KPI definitions",
  "Key systems and data flows",
  "Policies, ownership and controls",
  "Known pain points and manual work",
  "Representative quality or process evidence",
];

const outputs = [
  "Maturity heatmap across key capabilities",
  "Prioritised opportunity backlog",
  "Root-cause patterns and business impact",
  "Quick-win candidates",
  "Indicative ROI and value case",
  "Executive readout and actionable roadmap",
];

export default function AssessmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Complimentary assessment"
        title="Start with clarity before committing to delivery."
        description="We assess one selected business area, translate the evidence into business risks and opportunities, and define the first initiative with a credible value case."
        aside="Focused scope. No commitment required. Practical next step."
      />

      <section className="section assessment-overview">
        <div className="container assessment-grid">
          <div>
            <SectionHeading
              eyebrow="The assessment lens"
              title="Evidence-led, business-facing and action-oriented."
              description="Industry-aligned principles provide the frame. Your operational evidence determines the findings. The output is written in business language—not as a theoretical governance exercise."
            />
            <div className="assessment-principles">
              <span>One business area</span>
              <span>1–5 maturity scale</span>
              <span>Value and feasibility</span>
              <span>Defined quick win</span>
            </div>
          </div>
          <aside className="assessment-callout">
            <p>Conversion objective</p>
            <h3>Agree the first high-value initiative.</h3>
            <p>
              Align the sponsor, baseline, success measures and implementation
              scope before delivery begins.
            </p>
          </aside>
        </div>
      </section>

      <section className="section assessment-io-section">
        <div className="container assessment-io-grid">
          <article>
            <p className="eyebrow">What we review</p>
            <h2>Focused inputs</h2>
            <div className="line-list">
              {inputs.map((input, index) => (
                <div key={input}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{input}</p>
                </div>
              ))}
            </div>
          </article>
          <article>
            <p className="eyebrow">What you receive</p>
            <h2>Decision-ready outputs</h2>
            <div className="line-list">
              {outputs.map((output, index) => (
                <div key={output}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{output}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section maturity-section">
        <div className="container maturity-grid">
          <div>
            <p className="eyebrow eyebrow-light">Reading the result</p>
            <h2>A practical maturity baseline, not a score for its own sake.</h2>
            <p>
              Each score is evidenced and tied to a consequence, priority and
              action. The goal is to reveal what needs attention and where
              improvement will create the greatest value.
            </p>
          </div>
          <div className="maturity-scale">
            <article>
              <strong>4–5</strong>
              <div><h3>Managed / optimised</h3><p>Operating effectively and ready to scale.</p></div>
            </article>
            <article>
              <strong>3</strong>
              <div><h3>Developing</h3><p>Structured improvement is needed.</p></div>
            </article>
            <article>
              <strong>1–2</strong>
              <div><h3>At risk</h3><p>Higher-priority remediation is required.</p></div>
            </article>
          </div>
        </div>
      </section>

      <section className="section roi-section">
        <div className="container roi-grid">
          <SectionHeading
            eyebrow="Value before build"
            title="A quick win still needs a rigorous business case."
            description="We baseline the current effort and cost, quantify repetition and volume, identify quality and control benefits, estimate delivery effort, and define success measures before recommending a build."
          />
          <div className="roi-decision">
            <span>Impact</span>
            <span>Effort</span>
            <span>Dependency</span>
            <span>Return</span>
            <strong>Decision</strong>
          </div>
        </div>
        <div className="container inline-action">
          <p>Ready to define the first business area?</p>
          <Link href="/contact" className="text-link">
            Prepare your brief <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
