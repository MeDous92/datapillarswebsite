import type { Metadata } from "next";
import { headers } from "next/headers";
import Analytics from "./analytics";
import { SiteFooter, SiteHeader } from "./components";
import "./globals.css";

const siteDescription =
  "DataPillars helps organisations turn fragmented data, manual processes and disconnected reporting into trusted data foundations, digital products, automation and AI-ready operations.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.includes("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", base).toString();

  return {
    metadataBase: base,
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
    ],
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
          url: socialImage,
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
      images: [socialImage],
    },
  };
}

const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "DataPillars",
  slogan: "Turning Data Into Opportunity",
  description: siteDescription,
  areaServed: ["United Arab Emirates", "Gulf Cooperation Council"],
  founder: [
    { "@type": "Person", name: "Mike Spence" },
    { "@type": "Person", name: "Mohamed Abdo" },
  ],
  knowsAbout: [
    "Data strategy",
    "Data governance",
    "Data quality",
    "Business intelligence",
    "Process digitisation",
    "AI readiness",
  ],
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
        <SiteFooter />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
      </body>
    </html>
  );
}
