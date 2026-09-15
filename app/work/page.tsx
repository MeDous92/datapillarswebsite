import type { Metadata } from "next";
import { CallToAction, PageHero, SectionHeading } from "../components";
import { workSamples } from "../data";

export const metadata: Metadata = {
  title: "Representative Work",
  description:
    "Representative delivery artifacts across analytics, management reporting, monitoring and data foundations.",
};

const upcoming = [
  {
    title: "Governed AI & agents",
    text: "Controlled AI and data-agent prototypes with approved tools, validation and human oversight.",
  },
  {
    title: "Process redesign",
    text: "Current-state maps, redesigned workflows, preventive controls and digitised handoffs.",
  },
  {
    title: "Assessment readouts",
    text: "Maturity heatmaps, root-cause patterns, opportunity backlogs and value-led roadmaps.",
  },
  {
    title: "Governance & quality",
    text: "Ownership models, glossaries, quality rules, control catalogues, scorecards and issue workflows.",
  },
];

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Representative work"
        title="Practical artifacts, built around real operating needs."
        description="These examples illustrate the kinds of analytical, reporting and data-foundation capabilities we deliver. Public presentation is controlled to protect client confidentiality."
        aside="Representative and anonymised where required."
      />

      <section className="section work-gallery-section">
        <div className="container work-gallery">
          {workSamples.map((sample, index) => (
            <article className="work-card" key={sample.title}>
              <div className="work-card-image">
                <img src={sample.image} alt={sample.alt} loading={index > 1 ? "lazy" : "eager"} />
              </div>
              <div className="work-card-content">
                <p className="eyebrow">{sample.category}</p>
                <h2>{sample.title}</h2>
                <p>{sample.description}</p>
                <div className="focus-list">
                  {sample.focus.map((focus) => <span key={focus}>{focus}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section library-section">
        <div className="container">
          <SectionHeading
            eyebrow="A growing capability library"
            title="Structured to expand as more work is approved for publication."
            description="The portfolio is built from a simple content catalogue, making it straightforward to add new imagery, categories and delivery notes without redesigning the page."
          />
          <div className="upcoming-grid">
            {upcoming.map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <small>Examples in preparation</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CallToAction
        eyebrow="See the relevant proof"
        title="Tell us the business problem—not the technology you think you need."
        text="We can share the most relevant approved artifacts in the context of a focused conversation."
      />
    </>
  );
}
