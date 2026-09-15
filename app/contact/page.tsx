import type { Metadata } from "next";
import { PageHero } from "../components";
import { founders } from "../data";
import AssessmentForm from "./assessment-form";

export const metadata: Metadata = {
  title: "Start a Conversation",
  description:
    "Prepare a focused brief for a complimentary Data Maturity & Opportunity Assessment with DataPillars.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Start a conversation"
        title="Find the first high-value opportunity."
        description="Select one business area and tell us where trust, manual effort, decision quality or AI readiness is getting in the way. We will use that context to shape a focused first conversation."
        aside="No need to diagnose the technology first. Start with the business symptom."
      />

      <section className="section contact-section">
        <div className="container contact-grid">
          <div>
            <p className="eyebrow">Prepare your brief</p>
            <h2>A better first conversation begins with a clear problem.</h2>
            <p className="contact-intro">
              This short planner turns your inputs into a structured brief you
              can copy or open in your email application. Do not include
              confidential records, credentials or personal data.
            </p>
            <AssessmentForm />
          </div>
          <aside className="contact-aside">
            <p className="eyebrow eyebrow-light">Connect directly</p>
            <h2>Speak with a co-founder.</h2>
            <p>
              DataPillars engagements begin with senior practitioner attention
              from the first conversation.
            </p>
            <div className="contact-founder-list">
              {founders.map((founder) => (
                <a
                  key={founder.name}
                  href={founder.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={founder.image} alt="" />
                  <span>
                    <strong>{founder.name}</strong>
                    <small>{founder.role} · LinkedIn ↗</small>
                  </span>
                </a>
              ))}
            </div>
            <div className="contact-aside-note">
              <strong>Complimentary assessment</strong>
              <p>
                One business area. Evidence-led. Focused on risks,
                opportunities and the first credible value case.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
