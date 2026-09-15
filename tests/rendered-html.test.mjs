import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the branded home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /DataPillars/);
  assert.match(html, /From fragmented data to/);
  assert.match(html, /Start with clarity/);
  assert.match(html, /Data Foundation/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("server-renders the core public routes", async () => {
  for (const pathname of ["/services", "/assessment", "/work", "/about", "/contact"]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, /DataPillars/, pathname);
  }
});

test("serves portfolio and founder images directly without an image proxy", async () => {
  const workResponse = await render("/work");
  const workHtml = await workResponse.text();
  assert.match(workHtml, /src="\/work\/airline-analytics\.webp"/);
  assert.doesNotMatch(workHtml, /\/_vinext\/image|\/_next\/image/);

  const aboutResponse = await render("/about");
  const aboutHtml = await aboutResponse.text();
  assert.match(aboutHtml, /src="\/team\/mohamed-abdo-v2\.webp"/);
  assert.doesNotMatch(aboutHtml, /\/_vinext\/image|\/_next\/image/);
});

test("renders recognised direct-contact icons instead of the WA abbreviation", async () => {
  const response = await render();
  const html = await response.text();
  assert.match(html, /aria-label="Message DataPillars on WhatsApp"/);
  assert.doesNotMatch(html, />WA<\/span>/);
});

test("renders the sanitised, extensible portfolio in the intended order", async () => {
  const response = await render("/work");
  const html = await response.text();
  assert.doesNotMatch(html, /Operational airline analytics/);
  assert.match(html, /Illustrative view — numerical values intentionally removed\./);
  assert.match(html, /Data products &amp; applications/);
  assert.match(html, /Data quality tools &amp; reports/);
  assert.ok(
    html.indexOf("Executive financial reporting") < html.indexOf("Operational analytics"),
    "Operational analytics should be the final published sample",
  );
});

test("renders the company LinkedIn link with its recognised icon", async () => {
  const response = await render();
  const html = await response.text();
  assert.match(html, /class="social-link"[^>]*href="https:\/\/www\.linkedin\.com\/company\/104334551\/"/);
  assert.match(html, /Company LinkedIn/);
});
