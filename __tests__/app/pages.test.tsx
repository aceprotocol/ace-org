import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import JoinPage, { metadata as joinMeta } from "@/app/join/page";
import ComparePage, { metadata as compareMeta } from "@/app/compare/page";
import FaqPage, { metadata as faqMeta } from "@/app/faq/page";
import SecurityPage, { metadata as securityMeta } from "@/app/security/page";
import DocsIndexPage, { metadata as docsMeta } from "@/app/docs/page";
import { metadata as specMeta } from "@/app/spec/page";
import { metadata as ecosystemMeta } from "@/app/ecosystem/page";
import { metadata as homeMeta } from "@/app/page";
import { generateMetadata as docMetadata, generateStaticParams } from "@/app/docs/[slug]/page";
import RootLayout from "@/app/layout";
import sitemap from "@/app/sitemap";
import { siteMetadata } from "@/app/metadata";
import { FAQ } from "@/lib/faq-data";
import { COMPARE_COLUMNS, COMPARE_ROWS } from "@/lib/compare-data";
import { INVITE_PROMPT } from "@/lib/join-data";
import { getAllSlugs } from "@/lib/docs-data";
import { techArticle } from "@/lib/structured-data";

function expectPageMetadata(m: Metadata, path: string) {
  expect(m.title).toBeTruthy();
  expect(typeof m.description === "string" && m.description.length > 50).toBe(true);
  expect(m.alternates?.canonical).toBe(path);
  const og = m.openGraph as { url?: string; images?: unknown } | undefined;
  expect(og?.url).toBe(path);
  expect(og?.images).toBeTruthy();
  expect((m.twitter as { card?: string } | undefined)?.card).toBe("summary_large_image");
}

function jsonLd(container: HTMLElement) {
  return [...container.querySelectorAll('script[type="application/ld+json"]')].map((s) => JSON.parse(s.textContent ?? ""));
}

describe("page metadata", () => {
  it("every top-level page has a canonical URL and Open Graph / Twitter cards", () => {
    for (const [m, path] of [
      [homeMeta, "/"], [joinMeta, "/join"], [compareMeta, "/compare"], [faqMeta, "/faq"], [securityMeta, "/security"],
      [docsMeta, "/docs"], [specMeta, "/spec"], [ecosystemMeta, "/ecosystem"],
    ] as const) expectPageMetadata(m, path);
  });

  it("docs pages derive title, description and canonical from the page", async () => {
    expect(generateStaticParams().map((p) => p.slug)).toEqual(getAllSlugs());
    for (const slug of getAllSlugs()) {
      const m = await docMetadata({ params: Promise.resolve({ slug }) });
      expectPageMetadata(m, `/docs/${slug}`);
      expect(m.description, slug).not.toMatch(/\\[{}]|&lt;|\]\(/);
    }
    const qs = await docMetadata({ params: Promise.resolve({ slug: "quickstart" }) });
    expect(qs.title).toBe("Quick Start");
    expect(qs.description).toMatch(/first end-to-end encrypted message/);
  });

  it("the site metadata names agent intents and points at llms.txt", () => {
    expect(siteMetadata.keywords).toEqual(expect.arrayContaining(["agent to agent communication protocol", "MCP agent messaging"]));
    expect(siteMetadata.metadataBase?.toString()).toBe("https://aceprotocol.org/");
    expect(siteMetadata.alternates?.types).toEqual({ "text/plain": "/llms.txt" });
  });

  it("the sitemap lists the new pages and every docs page", () => {
    const urls = sitemap().map((e) => e.url);
    for (const p of ["/join", "/compare", "/faq", "/security", "/docs"]) expect(urls).toContain(`https://aceprotocol.org${p}`);
    for (const slug of getAllSlugs()) expect(urls).toContain(`https://aceprotocol.org/docs/${slug}`);
  });

  it("robots.txt explicitly allows AI crawlers and points at llms.txt", () => {
    const robots = readFileSync(join(process.cwd(), "public/robots.txt"), "utf8");
    for (const bot of ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"]) expect(robots).toMatch(new RegExp(`User-agent: ${bot}\\nAllow: /`));
    expect(robots).toContain("https://aceprotocol.org/llms.txt");
    expect(robots).toContain("Sitemap: https://aceprotocol.org/sitemap.xml");
  });
});

describe("structured data", () => {
  it("the layout carries Organization, WebSite and SoftwareApplication", () => {
    const { container } = render(<RootLayout><p>x</p></RootLayout>, { container: document.documentElement });
    const graph = jsonLd(container)[0]["@graph"] as { "@type": string }[];
    expect(graph.map((n) => n["@type"])).toEqual(["Organization", "WebSite", "SoftwareApplication"]);
  });

  it("/faq renders every question and a matching FAQPage", () => {
    const { container } = render(<FaqPage />);
    const [faq] = jsonLd(container);
    expect(faq["@type"]).toBe("FAQPage");
    expect(faq.mainEntity).toHaveLength(FAQ.length);
    for (const { question } of FAQ) expect(container.textContent).toContain(question);
    for (const q of ["How can my AI agent message another agent securely?", "Can I use ACE through MCP?"]) {
      expect(faq.mainEntity.map((e: { name: string }) => e.name)).toContain(q);
    }
  });

  it("/join carries a HowTo and the copy-paste invitation for other agents", () => {
    const { container } = render(<JoinPage />);
    const [howTo] = jsonLd(container);
    expect(howTo["@type"]).toBe("HowTo");
    const text = container.textContent ?? "";
    expect(text).toContain("npm install -g @ace-protocol/cli");
    expect(text).toContain("ace network import invitation.json");
    expect(text).toContain("https://aceprotocol.org/join");
    expect(text).toMatch(/your owner's call/);
    expect(INVITE_PROMPT).toMatch(/ace network connect @<handle>@relay\.aceprotocol\.org --profile ace:text:1/);
    expect(INVITE_PROMPT).not.toContain("`");
    expect(INVITE_PROMPT).toContain("https://mcp.aceprotocol.org/mcp");
  });

  it("docs pages are TechArticles of the website", () => {
    const a = techArticle({ title: "Quick Start", description: "d", path: "/docs/quickstart", section: "Getting Started" });
    expect(a["@type"]).toBe("TechArticle");
    expect(a.url).toBe("https://aceprotocol.org/docs/quickstart");
  });
});

describe("new pages", () => {
  it("/compare fills every cell and stays conservative about other projects", () => {
    const { container } = render(<ComparePage />);
    expect(COMPARE_COLUMNS).toEqual(["ACE", "A2A", "MCP", "Email (SMTP)", "XMTP", "Nostr", "Matrix"]);
    for (const row of COMPARE_ROWS) for (const c of COMPARE_COLUMNS) expect(row.cells[c], `${row.area}/${c}`).toBeTruthy();
    const text = container.textContent ?? "";
    expect(text).toMatch(/complementary/);
    expect(text).toMatch(/Varies/);
    expect(text).not.toMatch(/insecure|broken|obsolete|better than|best/i);
  });

  it("/security states what ACE does not protect and its review status", () => {
    const { container } = render(<SecurityPage />);
    const text = container.textContent ?? "";
    expect(text).toMatch(/no metadata anonymity/);
    expect(text).toMatch(/not an\s+independent cryptographic audit/);
    expect(text).toMatch(/ML-DSA-65 \(FIPS 204\)/);
  });

  it("/docs renders an index of every docs page", () => {
    const { container } = render(<DocsIndexPage />);
    const hrefs = [...container.querySelectorAll("a")].map((a) => a.getAttribute("href"));
    for (const slug of getAllSlugs()) expect(hrefs).toContain(`/docs/${slug}`);
  });
});
