import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CallToAction, PageHero, SectionHeading } from "../components";
import { founders } from "../data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet DataPillars and its co-founders, Mike Spence and Mohamed Abdo.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Business value first",
    text: "Priorities are set against measurable outcomes, not a preferred platform or technology trend.",
  },
  {
    title: "Governance that operates",
    text: "Ownership, standards and controls are embedded into day-to-day work rather than left in policy documents.",
  },
  {
    title: "Quality by design",
    text: "We prevent poor data at source and in process, then monitor and manage the exceptions that remain.",
  },
  {
    title: "AI grounded in reality",
    text: "Useful AI needs trusted data, semantic context, approved tools, validation and appropriate human oversight.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About DataPillars"
        title="Practitioners bridging strategy and technical delivery."
        description="DataPillars is a specialist data solutions company founded to make data improvement implementable, measurable and sustainable—from ownership and architecture to analytics, automation and AI."
        aside="Close to the business. Above core infrastructure. Focused on how data becomes action."
      />

      <section className="section positioning-section">
        <div className="container positioning-grid">
          <SectionHeading
            eyebrow="Our position"
            title="Between traditional consulting and pure technology implementation."
            description="We diagnose the problem, shape the operating and technical solution, and help build the capability. A recommendation should be implementable. A technology solution should solve a measurable business problem."
          />
          <div className="positioning-statement">
            <span>Our central promise</span>
            <p>From trusted data to better decisions, smarter processes and scalable AI.</p>
          </div>
        </div>
      </section>

      <section className="section founders-section">
        <div className="container">
          <SectionHeading
            eyebrow="Co-founders"
            title="Consultants WHO Implement"
            description="Mike Spence and Mohamed Abdo bring senior experience across data management, governance, engineering, analytics, operating models and AI enablement."
          />
          <div className="founder-grid">
            {founders.map((founder) => (
              <article key={founder.name} className="founder-card">
                <div className="founder-photo">
                  <Image
                    src={founder.image}
                    alt={founder.alt}
                    loading="lazy"
                    width={400}
                    height={400}
                    sizes="(max-width: 560px) 148px, 196px"
                  />
                </div>
                <div className="founder-content">
                  <p className="eyebrow">{founder.role}</p>
                  <h2>{founder.name}</h2>
                  <p className="founder-bio">{founder.bio}</p>
                  <ul>
                    {founder.details.map((detail) => <li key={detail}>{detail}</li>)}
                  </ul>
                  <a
                    href={founder.linkedin}
                    className="text-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View LinkedIn profile <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section principles-section">
        <div className="container">
          <SectionHeading
            eyebrow="Our practical philosophy"
            title="What makes the work useful after the project ends."
          />
          <div className="principles-grid">
            {principles.map((principle, index) => (
              <article key={principle.title}>
                <span>0{index + 1}</span>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section gcc-section">
        <div className="container gcc-grid">
          <div>
            <p className="eyebrow eyebrow-light">UAE & GCC orientation</p>
            <h2>Enterprise modernisation with a pragmatic implementation lens.</h2>
          </div>
          <div>
            <p>
              We are shaped for organisations balancing ambitious data and AI
              agendas with existing platforms, operating processes and real
              adoption constraints.
            </p>
            <Link href="/services" className="text-link text-link-light">
              Explore our capabilities <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
