"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const measurementId = "G-YDZ0VF1HWT";
const consentKey = "datapillars-analytics-consent";

type ConsentChoice = "accepted" | "declined" | null;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function initialiseAnalytics() {
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => window.dataLayer.push(args);
    window.gtag("js", new Date());
    window.gtag("config", measurementId, { send_page_view: false });
  }

  if (!document.querySelector(`script[data-ga-id="${measurementId}"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.dataset.gaId = measurementId;
    document.head.appendChild(script);
  }
}

function track(eventName: string, parameters: Record<string, string> = {}) {
  window.gtag?.("event", eventName, parameters);
}

export default function Analytics() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<ConsentChoice>(null);
  const [choiceLoaded, setChoiceLoaded] = useState(false);

  useEffect(() => {
    const savedChoice = window.localStorage.getItem(consentKey);
    queueMicrotask(() => {
      setConsent(savedChoice === "accepted" || savedChoice === "declined" ? savedChoice : null);
      setChoiceLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (consent !== "accepted") return;

    initialiseAnalytics();
    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: pathname,
    });
  }, [consent, pathname]);

  useEffect(() => {
    if (consent !== "accepted") return;

    function handleClick(event: MouseEvent) {
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const href = link.getAttribute("href") || "";
      const label = link.textContent?.trim().replace(/\s+/g, " ").slice(0, 100) || "link";

      if (href.startsWith("mailto:")) {
        track("email_click", { link_text: label });
      } else if (href.includes("linkedin.com")) {
        track("linkedin_click", { link_text: label, link_url: href });
      } else if (href === "/contact" || href.startsWith("/contact?")) {
        track("contact_click", { link_text: label, source_page: pathname });
      } else if (href === "/assessment" || href.startsWith("/assessment?")) {
        track("assessment_click", { link_text: label, source_page: pathname });
      }
    }

    function handleSubmit(event: SubmitEvent) {
      if ((event.target as HTMLElement).classList.contains("assessment-form")) {
        track("contact_form_attempt", { source_page: pathname });
      }
    }

    function handleContactSubmitted() {
      track("contact_form_submitted", { source_page: pathname });
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("submit", handleSubmit);
    window.addEventListener("datapillars:contact-submitted", handleContactSubmitted);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("submit", handleSubmit);
      window.removeEventListener("datapillars:contact-submitted", handleContactSubmitted);
    };
  }, [consent, pathname]);

  function saveChoice(choice: Exclude<ConsentChoice, null>) {
    window.localStorage.setItem(consentKey, choice);
    setConsent(choice);
  }

  if (!choiceLoaded || consent !== null) return null;

  return (
    <aside className="analytics-consent" aria-label="Analytics preferences">
      <div>
        <p className="analytics-consent-title">Help us improve DataPillars</p>
        <p>
          We use optional Google Analytics to understand visits and improve the
          website. It stays off unless you accept.
        </p>
      </div>
      <div className="analytics-consent-actions">
        <button type="button" className="button button-secondary" onClick={() => saveChoice("declined")}>
          Essential only
        </button>
        <button type="button" className="button button-coral" onClick={() => saveChoice("accepted")}>
          Accept analytics
        </button>
      </div>
    </aside>
  );
}
