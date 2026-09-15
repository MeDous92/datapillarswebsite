import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "../components";
import { founders } from "../data";
import AssessmentForm from "./assessment-form";

export const metadata: Metadata = {
  title: "Start a Conversation",
  description:
    "Prepare a focused brief for a complimentary Data Maturity & Opportunity Assessment with DataPillars.",
  alternates: { canonical: "/contact" },
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
              Send a concise brief directly to the DataPillars founders. We use
              it only to respond to your enquiry; do not include confidential
              records, credentials or sensitive personal data.
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
                  <Image src={founder.image} alt="" loading="lazy" width={58} height={58} sizes="58px" />
                  <span>
                    <strong>{founder.name}</strong>
                    <small>{founder.role} · LinkedIn ↗</small>
                  </span>
                </a>
              ))}
            </div>
            <div className="direct-contact-actions">
              <a className="button button-coral" href="https://wa.me/971542185806?text=Hello%20DataPillars%2C%20I%27d%20like%20to%20discuss%20an%20opportunity." target="_blank" rel="noreferrer">
                WhatsApp us
              </a>
              <a className="button button-dark-outline" href="tel:+971542185806">
                Call +971 54 218 5806
              </a>
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
