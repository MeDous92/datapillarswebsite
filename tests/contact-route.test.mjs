import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { POST } from "../app/api/contact/route.ts";

const originalFetch = globalThis.fetch;
const keys = ["CONTACT_TO_EMAIL", "CONTACT_FROM_EMAIL", "RESEND_API_KEY"];
const originalEnvironment = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
let providerCalls;
let requestNumber = 0;

beforeEach(() => {
  process.env.CONTACT_TO_EMAIL = "mike.spence@datapillars.ae, mohamed.abdo@datapillars.ae, ";
  process.env.CONTACT_FROM_EMAIL = "DataPillars Website <website@datapillars.ae>";
  process.env.RESEND_API_KEY = "test-key-never-sent";
  providerCalls = [];
  globalThis.fetch = async (url, options) => {
    providerCalls.push({ url, options, body: JSON.parse(options.body) });
    return Response.json({ id: "test-email" });
  };
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  for (const key of keys) {
    if (originalEnvironment[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnvironment[key];
  }
});

function enquiryRequest() {
  return new Request("https://datapillars.ae/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "cf-connecting-ip": `test-${++requestNumber}` },
    body: JSON.stringify({
      name: "Website test",
      email: "visitor@example.com",
      organisation: "Example organisation",
      businessArea: "Finance",
      pain: "Manual reporting",
      outcome: "Faster reporting",
      consent: true,
    }),
  });
}

test("sends one enquiry to both configured founders and keeps replies directed to the visitor", async () => {
  const response = await POST(enquiryRequest());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(providerCalls.length, 1);
  assert.equal(providerCalls[0].url, "https://api.resend.com/emails");
  assert.deepEqual(providerCalls[0].body.to, [
    "mike.spence@datapillars.ae",
    "mohamed.abdo@datapillars.ae",
  ]);
  assert.equal(providerCalls[0].body.from, process.env.CONTACT_FROM_EMAIL);
  assert.equal(providerCalls[0].body.reply_to, "visitor@example.com");
});

test("preserves delivery to an existing single recipient", async () => {
  process.env.CONTACT_TO_EMAIL = "existing@example.com";
  assert.equal((await POST(enquiryRequest())).status, 200);
  assert.deepEqual(providerCalls[0].body.to, ["existing@example.com"]);
});

test("rejects missing or malformed recipient configuration without sending", async () => {
  for (const recipients of ["", " , ", "mike.spence@datapillars.ae,invalid-address"]) {
    process.env.CONTACT_TO_EMAIL = recipients;
    assert.equal((await POST(enquiryRequest())).status, 503);
  }
  assert.equal(providerCalls.length, 0);
});

test("does not report success when the provider rejects delivery", async () => {
  globalThis.fetch = async () => Response.json({ message: "Unverified sender" }, { status: 403 });
  const response = await POST(enquiryRequest());
  assert.equal(response.status, 502);
  assert.equal((await response.json()).ok, false);
});
