const MAX_BODY_SIZE = 24_000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  organisation?: unknown;
  businessArea?: unknown;
  pain?: unknown;
  systems?: unknown;
  outcome?: unknown;
  consent?: unknown;
  website?: unknown;
};

const attempts = new Map<string, { count: number; resetAt: number }>();

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > MAX_ATTEMPTS;
}

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > MAX_BODY_SIZE) {
    return Response.json({ ok: false, message: "The enquiry is too large." }, { status: 413 });
  }

  const clientKey = request.headers.get("cf-connecting-ip") || "anonymous";
  if (isRateLimited(clientKey)) {
    return Response.json(
      { ok: false, message: "Too many attempts. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let raw: ContactPayload;
  try {
    raw = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  // A filled honeypot is treated as success so automated senders receive no signal.
  if (clean(raw.website, 200)) return Response.json({ ok: true });

  const enquiry = {
    name: clean(raw.name, 120),
    email: clean(raw.email, 180).toLowerCase(),
    phone: clean(raw.phone, 60),
    organisation: clean(raw.organisation, 180),
    businessArea: clean(raw.businessArea, 100),
    pain: clean(raw.pain, 3000),
    systems: clean(raw.systems, 1000),
    outcome: clean(raw.outcome, 1500),
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
    !enquiry.name ||
    !emailPattern.test(enquiry.email) ||
    !enquiry.organisation ||
    !enquiry.businessArea ||
    !enquiry.pain ||
    !enquiry.outcome ||
    raw.consent !== true
  ) {
    return Response.json(
      { ok: false, message: "Please complete all required fields." },
      { status: 400 },
    );
  }

  const recipient = process.env.CONTACT_TO_EMAIL;
  if (!recipient) {
    return Response.json(
      { ok: false, message: "Enquiries are temporarily unavailable. Please call or use WhatsApp." },
      { status: 503 },
    );
  }

  const subject = `New DataPillars enquiry — ${enquiry.organisation}`;
  const rows = [
    ["Name", enquiry.name],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone || "Not provided"],
    ["Organisation", enquiry.organisation],
    ["Business area", enquiry.businessArea],
    ["Current pain or opportunity", enquiry.pain],
    ["Relevant systems or reports", enquiry.systems || "Not provided"],
    ["Desired outcome", enquiry.outcome],
  ];

  try {
    if (process.env.RESEND_API_KEY) {
      const html = `
        <div style="font-family:Arial,sans-serif;color:#0b1f33;max-width:720px">
          <h1 style="font-size:24px">New DataPillars website enquiry</h1>
          ${rows
            .map(
              ([label, value]) =>
                `<p><strong>${escapeHtml(label)}</strong><br>${escapeHtml(value).replaceAll("\n", "<br>")}</p>`,
            )
            .join("")}
        </div>`;

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || "DataPillars Website <onboarding@resend.dev>",
          to: [recipient],
          reply_to: enquiry.email,
          subject,
          html,
        }),
      });

      if (!response.ok) throw new Error("Email provider rejected the request.");
    } else {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Origin: "https://datapillars.ae",
          Referer: "https://datapillars.ae/contact",
        },
        body: JSON.stringify({
          _subject: subject,
          _template: "table",
          _captcha: "false",
          _replyto: enquiry.email,
          ...Object.fromEntries(rows),
        }),
      });

      if (!response.ok) throw new Error("Email provider rejected the request.");
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      {
        ok: false,
        message: "We could not send the enquiry right now. Please call or use WhatsApp.",
      },
      { status: 502 },
    );
  }
}
