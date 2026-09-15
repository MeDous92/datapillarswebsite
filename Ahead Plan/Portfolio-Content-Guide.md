# DataPillars Portfolio Content Guide

The website's work library is intentionally catalogue-driven. A new approved example requires one optimised image and one content entry; the page layout, responsive behaviour and home-page previews do not need to be redesigned.

## Planned content families

- Data products: portals, internal applications and workflow tools.
- Data quality: rules, profiling, monitoring, issue workflows, scorecards and reports.
- Governance: operating models, policies, standards, glossaries and control catalogues.
- Accountability: RACI matrices, ownership maps, data-owner roles and steward structures.
- Assessments: maturity heatmaps, findings, opportunity backlogs and roadmaps.
- Analytics: executive reporting, operational monitoring and decision-support products.
- AI and automation: governed agents, approved use cases and human-control patterns.

## What to collect for each example

1. **Public title** — describe the capability, not the client's identity.
2. **Category** — use one stable category from the list above.
3. **Business description** — one or two sentences describing the decision or process improved.
4. **Image** — a sanitised screenshot with no client name, credentials, personal data or recoverable confidential figures.
5. **Alternative text** — describe what the image communicates for accessibility and search engines.
6. **Three focus tags** — for example, `Exception monitoring`, `Ownership workflow`, `Executive KPIs`.
7. **Publication approval** — named approver and date retained in the internal project record.
8. **Optional privacy note** — state when values or identifiers were intentionally removed.

## Image preparation standard

- Use PNG for detailed interface captures while editing; publish a compact WebP copy where possible.
- Target approximately 1,200 pixels wide for website display.
- Preserve the original aspect ratio.
- Remove or irreversibly obscure names, email addresses, IDs, credentials and sensitive values in the source asset itself.
- Do not rely on CSS blur: visitors can still download the original file.
- Check the final public asset at full size before approval.
- Use a clear lowercase filename such as `data-quality-scorecard.webp`.

## Adding an approved item

1. Place the sanitised image in `public/work/`.
2. Open `app/data.ts`.
3. Add one object to the `workSamples` array with `title`, `category`, `description`, `image`, `alt` and three `focus` items.
4. Add `privacyNote` when values or identities were removed.
5. Remove the corresponding placeholder from `portfolioPipeline` when the real example is published.
6. Build and inspect the Work page on desktop and mobile.
7. Publish the validated release.

## Example catalogue entry

```ts
{
  title: "Data quality exception management",
  category: "Data quality",
  description:
    "A controlled workflow connecting critical data rules, exceptions, ownership and remediation progress.",
  image: "/work/data-quality-exceptions.webp",
  alt: "Data quality exception dashboard showing rules, status and accountable owners",
  focus: ["Quality rules", "Issue workflow", "Accountability"],
  privacyNote: "Illustrative view — identifiers and values intentionally removed.",
}
```

## Publication gate

Before a client-derived artefact goes live, confirm:

- contractual permission permits publication;
- the client cannot be inferred from logos, colours, labels or unusual structures;
- numerical and personal data are not recoverable;
- the screenshot contains no hidden browser tabs, URLs, tokens or metadata;
- the description makes no unsupported performance claim;
- at least one founder has reviewed the final public page.

