# DataPillars Website

The public website for DataPillars, a specialist data solutions company serving enterprise and growth organisations across the UAE and GCC.

## Site structure

- `/` — positioning, problems, delivery journey, services and proof
- `/services` — Data Foundation, Insight, Digitisation and AI Solutions
- `/assessment` — complimentary Data Maturity & Opportunity Assessment
- `/work` — representative, confidentiality-safe delivery artifacts
- `/about` — company positioning and co-founder profiles
- `/contact` — assessment brief planner and founder contact links

## Content maintenance

Shared services, delivery steps, founder details and portfolio items live in `app/data.ts`. Add approved work samples to `public/work/`, then add one matching entry to the `workSamples` array.

Never publish client names, confidential figures, credentials or identifying architecture details without explicit approval.

## Local development

Requires Node.js 22.13 or later.

```bash
npm ci
npm run dev
```

Production validation:

```bash
npm test
```

The project uses vinext and produces a Cloudflare Worker-compatible ESM build for OpenAI Sites hosting.
