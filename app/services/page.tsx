import type { Metadata } from "next";
import Link from "next/link";
import { CallToAction, PageHero, SectionHeading } from "../components";
import { servicePillars } from "../data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Connected capabilities across data foundations, insight, digitisation and governed AI solutions.",
  alternates: { canonical: "/services" },
};

const deliveryPatterns = [
  {
    title: "Advisory",
    text: "Assess the current state, define the target capability and create a value-led roadmap that can be implemented.",
  },
  {
    title: "Implementation",
    text: "Build the trusted data layer, analytical product, application, workflow or governed AI solution.",
  },
  {
    title: "End to end",
    text: "Connect diagnosis, design, delivery, adoption and measurable improvement through one accountable engagement.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Connected capabilities. Delivered around the highest-value priority."
        description="DataPillars combines advisory, engineering and implementation across four service pillars. We work with the client’s existing technology estate and choose the delivery pattern that fits the business problem."
        aside="Vendor-neutral by design. Business-value first."
      />

      <section className="section service-index-section">
        <div className="container service-index">
          <p className="eyebrow">Navigate the portfolio</p>
          <div>
            {servicePillars.map((service) => (
              <a key={service.id} href={`#${service.id}`}>
                <span>{service.number}</span>
                {service.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="service-details">
        {servicePillars.map((service) => (
          <article className="service-detail" id={service.id} key={service.id}>
            <div className="container service-detail-grid">
              <div className="service-detail-title">
                <span>{service.number}</span>
                <p>{service.outcome}</p>
                <h2>{service.title}</h2>
                <p className="service-summary">{service.summary}</p>
              </div>
              <div className="capability-list">
                {service.capabilities.map((capability, index) => (
                  <div key={capability}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{capability}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="section delivery-patterns-section">
        <div className="container">
          <SectionHeading
            eyebrow="Flexible delivery"
            title="Advice when you need direction. Delivery when you need change."
            description="Engagements can be advisory-only, implementation-led or connected end to end. The common thread is a defined business outcome and clear ownership."
          />
          <div className="delivery-patterns">
            {deliveryPatterns.map((pattern, index) => (
              <article key={pattern.title}>
                <span>0{index + 1}</span>
                <h3>{pattern.title}</h3>
                <p>{pattern.text}</p>
              </article>
            ))}
          </div>
          <div className="inline-action">
            <p>Unsure where the problem fits?</p>
            <Link href="/assessment" className="text-link">
              Start with the assessment <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
