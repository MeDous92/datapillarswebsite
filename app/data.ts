export type ServicePillar = {
  id: string;
  number: string;
  title: string;
  summary: string;
  outcome: string;
  capabilities: string[];
};

export const servicePillars: ServicePillar[] = [
  {
    id: "foundation",
    number: "01",
    title: "Data Foundation",
    summary:
      "Create the ownership, architecture, quality and trusted data layers that make every downstream decision more dependable.",
    outcome: "Trusted, governed and reusable data",
    capabilities: [
      "Data strategy and pragmatic roadmaps",
      "Data architecture and modelling",
      "Governance, ownership and stewardship",
      "Data quality management and monitoring",
      "Metadata, business glossary and lineage",
      "Master and reference data",
      "Data integration and automated pipelines",
      "Trusted data layers and single sources of truth",
    ],
  },
  {
    id: "insight",
    number: "02",
    title: "Insight",
    summary:
      "Turn governed information into consistent KPIs, clear management narratives and repeatable decisions.",
    outcome: "Faster, more confident decisions",
    capabilities: [
      "Business intelligence and analytics",
      "KPI definitions and data insights",
      "Executive and management reporting",
      "Report rationalisation",
      "Decision-support solutions",
      "Trusted self-service analytics",
      "Semantic models and reusable measures",
    ],
  },
  {
    id: "digitisation",
    number: "03",
    title: "Digitisation",
    summary:
      "Replace spreadsheet-and-email processes with focused applications, controlled workflows and automated handoffs.",
    outcome: "Smarter processes with less manual effort",
    capabilities: [
      "Custom data products",
      "Focused business applications",
      "Process digitisation",
      "Workflow automation",
      "Reporting automation",
      "Data quality by design",
      "Operational monitoring tools",
    ],
  },
  {
    id: "ai",
    number: "04",
    title: "AI Solutions",
    summary:
      "Ground AI in trusted data, meaningful context, approved tools and controls so it can operate usefully and safely.",
    outcome: "Governed, scalable AI adoption",
    capabilities: [
      "AI readiness assessments",
      "AI-ready architectures and applications",
      "Trusted data layers for AI",
      "Semantic models and context engineering",
      "Governed AI solutions",
      "Agentic workflows",
      "AI-assisted decision support",
      "AI adoption enablement",
    ],
  },
];

export const journey = [
  {
    number: "01",
    title: "Assess",
    text: "Understand the evidence, current maturity and business pain.",
  },
  {
    number: "02",
    title: "Prioritise",
    text: "Rank opportunities by impact, urgency, effort and return.",
  },
  {
    number: "03",
    title: "Strengthen",
    text: "Build the ownership, quality and architecture needed to last.",
  },
  {
    number: "04",
    title: "Automate",
    text: "Deliver the focused product, workflow or analytical capability.",
  },
  {
    number: "05",
    title: "Scale",
    text: "Measure the result, standardise the practice and expand what works.",
  },
];

export type WorkSample = {
  title: string;
  category: string;
  description: string;
  image: string;
  alt: string;
  focus: string[];
  privacyNote?: string;
};

// Add approved public examples here; the Work page and home-page preview are
// generated from this catalogue. Keep client names and confidential figures
// out of descriptions and source imagery unless publication is approved.
export const workSamples: WorkSample[] = [
  {
    title: "Interactive sales performance",
    category: "Insight",
    description:
      "A governed analytical experience connecting headline performance with category and time-based drivers.",
    image: "/work/sales-analytics.webp",
    alt: "Interactive sales and profit dashboard",
    focus: ["KPI design", "Drill paths", "Decision support"],
  },
  {
    title: "Executive financial reporting",
    category: "Management reporting",
    description:
      "A concise management view that brings financial position, comparison and trend signals into one narrative.",
    image: "/work/executive-reporting.webp",
    alt: "Anonymised executive financial dashboard with numerical values removed",
    focus: ["Management narrative", "Exception focus", "Measure governance"],
    privacyNote: "Illustrative view — numerical values intentionally removed.",
  },
  {
    title: "Portfolio performance monitoring",
    category: "Operational monitoring",
    description:
      "A multilingual monitoring interface designed to reveal status, target variance and areas requiring action.",
    image: "/work/performance-monitoring.webp",
    alt: "Arabic portfolio performance monitoring dashboard",
    focus: ["Target tracking", "Multilingual reporting", "Action visibility"],
  },
  {
    title: "Purpose-built data model",
    category: "Data foundation",
    description:
      "A structured application model connecting project, ownership, budget, client and control information.",
    image: "/work/data-model.webp",
    alt: "Relational data model for a project controls application",
    focus: ["Data modelling", "Reusable definitions", "Application foundation"],
  },
  {
    title: "Operational analytics",
    category: "Business intelligence",
    description:
      "An executive-ready operational view of activity, exceptions, volume and performance trends using illustrative data.",
    image: "/work/airline-analytics.webp",
    alt: "Operational performance dashboard using illustrative sample data",
    focus: ["Executive KPIs", "Trend analysis", "Operational exceptions"],
  },
];

export const portfolioPipeline = [
  {
    title: "Data products & applications",
    text: "Purpose-built portals, internal applications and workflow products that turn trusted data into day-to-day action.",
  },
  {
    title: "Data quality tools & reports",
    text: "Rule management, scorecards, exception reporting, issue workflows and remediation views for critical data.",
  },
  {
    title: "Governance artefacts",
    text: "Operating models, policies, standards, control catalogues, glossaries and decision forums designed for use.",
  },
  {
    title: "Ownership & stewardship",
    text: "RACI matrices, data-owner and steward structures, accountability maps and practical role descriptions.",
  },
  {
    title: "Governed AI & agents",
    text: "Controlled AI and data-agent prototypes with approved tools, validation and human oversight.",
  },
  {
    title: "Process redesign & automation",
    text: "Current-state maps, redesigned workflows, preventive controls, digitised handoffs and targeted automation.",
  },
];

export const problems = [
  {
    title: "Low trust",
    text: "Conflicting reports, unclear definitions and recurring reconciliation slow down decisions.",
  },
  {
    title: "Manual effort",
    text: "Teams repeatedly extract, clean, validate, email and re-key the same information.",
  },
  {
    title: "Weak ownership",
    text: "Issues persist because decision rights, stewardship and accountability are unclear.",
  },
  {
    title: "AI without foundation",
    text: "Pilots struggle when quality, metadata, context, architecture and controls are weak.",
  },
];

export const founders = [
  {
    name: "Mike Spence",
    role: "Co-Founder",
    image: "/team/mike-spence.jpg",
    alt: "Mike Spence, Co-Founder of DataPillars",
    bio: "A data management and governance leader with more than 20 years of experience leading strategic data initiatives, building ownership models and embedding sustainable practices.",
    details: [
      "BSc, Computer Engineering — University of Stirling",
      "Diploma in Legal Practice — University of Edinburgh",
      "Data management, governance and strategic delivery",
    ],
    linkedin: "https://ae.linkedin.com/in/mike-spence-55196911",
  },
  {
    name: "Mohamed Abdo",
    role: "Co-Founder",
    image: "/team/mohamed-abdo-v2.webp",
    alt: "Mohamed Abdo, Co-Founder of DataPillars",
    bio: "A data enablement leader with more than 12 years of experience across data management, governance, business intelligence and AI enablement in diversified organisations.",
    details: [
      "MSc, Engineering — Mansoura University",
      "MBA — GSW, USA",
      "CDMP, Data Engineering and AI Engineering credentials",
    ],
    linkedin: "https://ae.linkedin.com/in/mohamed-abdo-21a3b5144",
  },
];
