import Link from "next/link";
import { servicePillars } from "./data";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/assessment", label: "Assessment" },
  { href: "/work", label: "Our work" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand-link" aria-label="DataPillars home">
          <img
            className="brand-logo"
            src="/brand/logo-horizontal.svg"
            alt="DataPillars — Turning Data Into Opportunity"
          />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="button button-small header-cta">
          Start a conversation
        </Link>
        <details className="mobile-menu">
          <summary aria-label="Open navigation">Menu</summary>
          <nav aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/contact">Start a conversation</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img
            src="/brand/logo-dark.svg"
            alt="DataPillars — Turning Data Into Opportunity"
          />
          <p>
            Trusted data foundations, better decisions, smarter processes and
            AI-ready operations.
          </p>
        </div>
        <div>
          <p className="footer-label">Explore</p>
          <div className="footer-links">
            <Link href="/services">Services</Link>
            <Link href="/assessment">Assessment</Link>
            <Link href="/work">Our work</Link>
            <Link href="/about">About</Link>
          </div>
        </div>
        <div>
          <p className="footer-label">Start with clarity</p>
          <p className="footer-copy">
            Begin with one business area, an evidence-led assessment and a
            practical first opportunity.
          </p>
          <Link href="/contact" className="text-link text-link-light">
            Prepare an assessment brief <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} DataPillars. All rights reserved.</p>
        <p>UAE & GCC · Vendor-neutral · Value-led</p>
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  aside,
}: {
  eyebrow: string;
  title: string;
  description: string;
  aside?: string;
}) {
  return (
    <section className="page-hero">
      <div className="container page-hero-grid">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
        </div>
        <div className="page-hero-copy">
          <p>{description}</p>
          {aside ? <p className="aside-note">{aside}</p> : null}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`section-heading section-heading-${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

export function ServiceCards({ limit }: { limit?: number }) {
  return (
    <div className="service-card-grid">
      {servicePillars.slice(0, limit).map((service) => (
        <article className="service-card" key={service.id}>
          <div className="service-card-topline">
            <span>{service.number}</span>
            <span>{service.outcome}</span>
          </div>
          <h3>{service.title}</h3>
          <p>{service.summary}</p>
          <Link href={`/services#${service.id}`} className="text-link">
            Explore capabilities <span aria-hidden="true">→</span>
          </Link>
        </article>
      ))}
    </div>
  );
}

export function CallToAction({
  eyebrow = "Start with clarity",
  title = "Find the first high-value opportunity.",
  text = "Begin with a complimentary Data Maturity & Opportunity Assessment for one selected business area.",
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
}) {
  return (
    <section className="cta-band">
      <div className="container cta-band-inner">
        <div>
          <p className="eyebrow eyebrow-light">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <Link href="/contact" className="button button-coral">
          Start the conversation
        </Link>
      </div>
    </section>
  );
}
