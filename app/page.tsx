import type { Metadata } from "next";
import Link from "next/link";
import {
  CallToAction,
  SectionHeading,
  ServiceCards,
} from "./components";
import { founders, journey, problems, workSamples } from "./data";

export const metadata: Metadata = {
  title: "Trusted Data. Measurable Value.",
  description:
    "Advisory, engineering and implementation for trusted data foundations, better decisions, smarter processes and governed AI.",
};

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Strategy · Foundations · Adoption</p>
            <h1>
              From fragmented data to <span>trusted, scalable value.</span>
            </h1>
            <p className="hero-lead">
              We combine advisory, engineering and implementation to turn
              unreliable data, manual work and disconnected reporting into
              dependable foundations, digital products, automation and
              AI-ready operations.
            </p>
            <div className="button-row">
              <Link href="/contact" className="button button-coral">
                Start with clarity
              </Link>
              <Link href="/services" className="button button-secondary">
                Explore our capabilities
              </Link>
            </div>
          </div>
          <div className="hero-visual" aria-label="DataPillars value pathway">
            <div className="hero-visual-heading">
              <span>One connected path</span>
              <strong>Evidence to outcome</strong>
            </div>
            <div className="pillar-graphic" aria-hidden="true">
              <div className="data-nodes">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="pillar pillar-one" />
              <div className="pillar pillar-two" />
              <div className="pillar pillar-three" />
            </div>
            <div className="hero-outcomes">
              <span>Trust</span>
              <span>Decide</span>
              <span>Digitise</span>
              <span>Automate</span>
              <span>Enable AI</span>
            </div>
          </div>
        </div>
        <div className="container capability-strip" aria-label="Delivery model">
          <div><span>01</span><strong>Advisory</strong><small>Define the right move</small></div>
          <div><span>02</span><strong>Engineering</strong><small>Build trusted foundations</small></div>
          <div><span>03</span><strong>Implementation</strong><small>Embed measurable change</small></div>
        </div>
      </section>

      <section className="section problems-section">
        <div className="container">
          <SectionHeading
            eyebrow="The business symptoms"
            title="Data problems rarely arrive with a data label."
            description="They show up as slow decisions, repeated reconciliation, manual effort and AI pilots that cannot move beyond a demo."
          />
          <div className="problem-grid">
            {problems.map((problem, index) => (
              <article key={problem.title} className="problem-card">
                <span>0{index + 1}</span>
                <h3>{problem.title}</h3>
                <p>{problem.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section journey-section">
        <div className="container">
          <SectionHeading
            eyebrow="How we work"
            title="Start small. Prove value. Scale what works."
            description="Each step creates the evidence and foundation required for the next—without committing the organisation to an abstract transformation programme."
          />
          <div className="journey-track">
            {journey.map((step) => (
              <article key={step.title} className="journey-step">
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
          <div className="measure-band">
            <strong>Success is measured against an agreed baseline</strong>
            <span>Time saved</span>
            <span>Errors reduced</span>
            <span>Cycle time</span>
            <span>Control effectiveness</span>
            <span>Adoption</span>
          </div>
        </div>
      </section>

      <section className="section services-section">
        <div className="container">
          <SectionHeading
            eyebrow="Connected capabilities"
            title="One partner across the data-to-value journey."
            description="We organise the work around business outcomes—not a preferred platform or a disconnected catalogue of technologies."
          />
          <ServiceCards />
        </div>
      </section>

      <section className="section approach-section">
        <div className="container approach-grid">
          <div className="approach-intro">
            <p className="eyebrow eyebrow-light">Built to last</p>
            <h2>Every engagement addresses people, process and technology.</h2>
            <p>
              Sustainable improvement needs accountability, a better way of
              working and the right technical foundation—designed together.
            </p>
            <Link href="/about" className="text-link text-link-light">
              Our practical philosophy <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="approach-items">
            <article>
              <span>People</span>
              <h3>Build accountability and adoption.</h3>
              <p>Ownership, stewardship, role clarity, literacy and change.</p>
            </article>
            <article>
              <span>Process</span>
              <h3>Make the workflow data-driven by design.</h3>
              <p>Data touchpoints, preventive controls and measurable outcomes.</p>
            </article>
            <article>
              <span>Technology</span>
              <h3>Make the improvement sustainable.</h3>
              <p>Pipelines, monitoring, analytics, products, automation and AI.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section proof-section">
        <div className="container">
          <div className="proof-heading-row">
            <SectionHeading
              eyebrow="Representative delivery artifacts"
              title="Evidence of practical capability."
              description="Selected, anonymised examples across analytics, reporting and data foundations."
            />
            <Link href="/work" className="button button-secondary">
              View our work
            </Link>
          </div>
          <div className="proof-grid">
            {workSamples.slice(0, 3).map((sample) => (
              <article key={sample.title} className="proof-card">
                <div className="proof-image-wrap">
                  <img src={sample.image} alt={sample.alt} loading="lazy" />
                </div>
                <p className="proof-category">{sample.category}</p>
                <h3>{sample.title}</h3>
                <p>{sample.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section founders-preview">
        <div className="container founders-preview-grid">
          <div>
            <p className="eyebrow">Who we are</p>
            <h2>Senior practitioners combining strategy with delivery.</h2>
            <p>
              DataPillars was founded to close the space between advice and
              implementation—so recommendations can be built and technology
              solves a measurable business problem.
            </p>
            <Link href="/about" className="text-link">
              Meet the founders <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="founder-mini-grid">
            {founders.map((founder) => (
              <article key={founder.name} className="founder-mini">
                <img src={founder.image} alt={founder.alt} loading="lazy" />
                <div>
                  <h3>{founder.name}</h3>
                  <p>{founder.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
