import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  HeroSection,
  ProofSection,
  PillarsSection,
  AudiencesSection,
  ArchitectureSection,
  FlowSection,
  QuickstartSection,
  SdksSection,
} from "@/components/home";

const FORBIDDEN = [
  /fully post-quantum/i,
  /post-quantum forward secrecy/i,
  /quantum-proof/i,
  /every message, a fresh key/i,
  /production-ready/i,
];

function expectNoForbiddenClaims(text: string) {
  for (const re of FORBIDDEN) expect(text).not.toMatch(re);
}

const REMOVED = [/\bMLS\b/, /0x004F/, /link record/i, /exact-intent grant/i, /\bA2A\b/, /120 seconds/, /registration file/i, /ace peer allow/];

function expectNoRemovedConcepts(text: string) {
  for (const re of REMOVED) expect(text).not.toMatch(re);
}

describe("home sections", () => {
  it("hero carries the brand label, the first-screen headline, subhead and both CTAs", () => {
    const { container } = render(<HeroSection />);
    expect(screen.getByText("AGENT COMMERCE ENGINE")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 }).textContent?.replace(/\s+/g, " ").trim()).toBe(
      "Let your agent talk to any other agent. Privately. Post-quantum.",
    );
    const text = container.textContent?.replace(/\s+/g, " ") ?? "";
    expect(text).toMatch(/relays anyone can run/);
    expect(text).toMatch(/Your agent decides whom to talk to and whether to pay; ACE never does/);
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(expect.arrayContaining(["/docs/quickstart", "/join", "/llms.txt"]));
    expect(screen.getByText(/Send your first message/)).toBeInTheDocument();
    expect(screen.getByText(/Invite an agent/)).toBeInTheDocument();
    expectNoForbiddenClaims(text);
    expectNoRemovedConcepts(text);
  });

  it("proof strip states the three checkable claims and links to the evidence", () => {
    const { container } = render(<ProofSection />);
    const text = container.textContent ?? "";
    expect(text).toMatch(/ML-DSA \(FIPS 204\)/);
    expect(text).toMatch(/X-Wing hybrid KEM/);
    expect(text).toMatch(/Apache-2\.0, shared test vectors/);
    expect(text).toMatch(/Three SDKs/);
    expect(text).toMatch(/Relays see only ciphertext/);
    expect(text).toMatch(/signed receipt/);
    expect(screen.getAllByRole("link").map((a) => a.getAttribute("href"))).toEqual(["/security", "/docs/interop", "/docs/relay"]);
    expectNoForbiddenClaims(text);
    expectNoRemovedConcepts(text);
  });

  it("pillars describe KEL identity, prekey packets and the commerce vocabulary", () => {
    const { container } = render(<PillarsSection />);
    const text = container.textContent ?? "";
    expect(text).toMatch(/ACE ID is the SHA-256 of its key event log's inception event/);
    expect(text).toMatch(/signed X-Wing prekey/);
    expect(text).toMatch(/only its signed receipt confirms delivery/);
    expect(text).toMatch(/A message never authorizes a payment/);
    expect(text).not.toMatch(/Ed25519|secp256k1/);
    expectNoForbiddenClaims(text);
    expectNoRemovedConcepts(text);
  });

  it("architecture names relays and hosted MCP gateways as replaceable services and keeps payments in applications", () => {
    const { container } = render(<ArchitectureSection />);
    const text = container.textContent ?? "";
    expect(text).toMatch(/relays and hosted MCP gateways are replaceable services/);
    expect(screen.getByText("Official profiles").closest("li")?.textContent).toMatch(/optional/);
    expect(screen.getByText("Applications").closest("li")?.textContent).toMatch(/not part of ACE/);
    expectNoRemovedConcepts(text);
  });

  it("audience cards link to the three entry paths", () => {
    render(<AudiencesSection />);
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(["/docs/hosted-mcp", "/docs/quickstart-claude-code", "/docs/agent-commerce"]);
    expect(screen.getByText("npx skills add aceprotocol/ace-skill")).toBeInTheDocument();
    expect(screen.getByText(/custodial/)).toBeInTheDocument();
  });

  it("flow shows a commerce thread with stablecoin settlement and stays honest about payment", () => {
    const { container } = render(<FlowSection />);
    const text = container.textContent ?? "";
    for (const step of ["rfq", "offer", "accept", "invoice", "payment", "deliver", "confirm"]) expect(text).toContain(step);
    expect(text).not.toMatch(/ace:commerce:receipt|\bttl\b/);
    for (const field of ["offerId", "amount", "currency", "settlement", "stablecoin", "asset", "recipient"]) expect(text).toContain(`"${field}"`);
    expect(text).toMatch(/never authorizes a payment/);
    expect(text).toMatch(/verify on chain/);
    expectNoForbiddenClaims(text);
    expectNoRemovedConcepts(text);
  });

  it("quickstart and SDKs use the current CLI commands", () => {
    const qs = render(<QuickstartSection />);
    const text = qs.container.textContent ?? "";
    expect(text).toContain("npm install -g @ace-protocol/cli");
    expect(text).toContain("ace network publish");
    expect(text).toContain("ace network accept <bobAceId>");
    expect(text).toContain("ace network connect @alice@relay.aceprotocol.org --profile ace:text:1");
    expect(text).toMatch(/--note "hi" --wait 60/);
    expect(text).toContain("ace outbox");
    expectNoRemovedConcepts(text);
    qs.unmount();
    render(<SdksSection />);
    expect(screen.getByText("Agent onboarding skill")).toBeInTheDocument();
    expect(screen.getByText("https://mcp.aceprotocol.org/mcp")).toBeInTheDocument();
  });
});
