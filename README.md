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

## Enquiry delivery

The contact form sends enquiries through Resend. Production values are managed in the Sites environment settings, separately from source control:

- `CONTACT_TO_EMAIL`: comma-separated recipient addresses. The intended recipients are `mike.spence@datapillars.ae,mohamed.abdo@datapillars.ae`.
- `CONTACT_FROM_EMAIL`: a sender on a domain verified in Resend, for example `DataPillars Website <website@datapillars.ae>`.
- `RESEND_API_KEY`: the private Resend API key.

Creating Microsoft 365 mailboxes does not verify a sending domain in Resend. Verify the domain using Resend's DNS records before changing the live sender and recipients together, then publish to apply the runtime configuration. The default `onboarding@resend.dev` test sender can only deliver to the Resend account owner's address. Replies to enquiries go to the visitor's email address.

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
