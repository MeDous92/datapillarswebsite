import type { Metadata } from "next";
import Analytics from "./analytics";
import { ContactDock, SiteFooter, SiteHeader } from "./components";
import ExperienceEnhancements from "./experience";
import "./globals.css";

const siteDescription =
  "DataPillars helps organisations turn fragmented data, manual processes and disconnected reporting into trusted data foundations, digital products, automation and AI-ready operations.";

export const metadata: Metadata = {
    metadataBase: new URL("https://datapillars.ae"),
    title: {
      default: "DataPillars | Turning Data Into Opportunity",
      template: "%s | DataPillars",
    },
    description: siteDescription,
    keywords: [
      "data strategy",
      "data governance",
      "data quality",
      "business intelligence",
      "process digitisation",
      "AI readiness",
      "UAE data consultancy",
      "Dubai data consultancy",
      "data and AI consulting UAE",
      "data governance consulting GCC",
      "business intelligence consulting UAE",
      "AI agents for business",
    ],
    alternates: { canonical: "/" },
    authors: [{ name: "DataPillars", url: "https://datapillars.ae" }],
    creator: "DataPillars",
    publisher: "DataPillars",
    category: "Data and AI Consulting",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: "/brand/logo-symbol.svg",
      shortcut: "/brand/logo-symbol.svg",
    },
    openGraph: {
      type: "website",
      siteName: "DataPillars",
      title: "DataPillars | Turning Data Into Opportunity",
      description: siteDescription,
      url: "/",
      images: [
        {
          url: "/og.png",
          width: 1740,
          height: 909,
          alt: "DataPillars — trusted data, better decisions, smarter processes and AI-ready operations",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "DataPillars | Turning Data Into Opportunity",
      description: siteDescription,
      images: ["/og.png"],
    },
};

const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://datapillars.ae/#organisation",
  name: "DataPillars",
  url: "https://datapillars.ae",
  logo: "https://datapillars.ae/brand/logo-symbol.svg",
  slogan: "Turning Data Into Opportunity",
  description: siteDescription,
  telephone: "+971542185806",
  areaServed: ["United Arab Emirates", "Gulf Cooperation Council"],
  founder: [
    {
      "@type": "Person",
      name: "Mike Spence",
      sameAs: "https://ae.linkedin.com/in/mike-spence-55196911",
    },
    {
      "@type": "Person",
      name: "Mohamed Abdo",
      sameAs: "https://www.linkedin.com/in/mohamedabdoahmed/",
    },
  ],
  sameAs: ["https://www.linkedin.com/company/104334551/"],
  knowsAbout: [
    "Data strategy",
    "Data governance",
    "Data quality",
    "Business intelligence",
    "Process digitisation",
    "AI readiness",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://datapillars.ae/#website",
  url: "https://datapillars.ae",
  name: "DataPillars",
  description: siteDescription,
  publisher: { "@id": "https://datapillars.ae/#organisation" },
  inLanguage: "en-AE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <ContactDock />
        <SiteFooter />
        <Analytics />
        <ExperienceEnhancements />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organisationSchema, websiteSchema]),
          }}
        />
      </body>
    </html>
  );
}
