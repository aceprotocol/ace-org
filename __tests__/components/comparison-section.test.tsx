import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ComparisonSection } from "@/components/home/comparison-section";

describe("ComparisonSection", () => {
  it("separates what ACE specifies from what agents and apps decide", () => {
    render(<ComparisonSection />);
    const headers = screen.getAllByRole("columnheader").map((th) => th.textContent);
    expect(headers).toEqual(["Area", "ACE specifies", "Agents and apps decide"]);
    const authority = screen.getByText("Authority").closest("tr")!.querySelectorAll("td");
    expect(authority[1].textContent).toMatch(/no message grants execution or payment rights/);
  });

  it("makes no hype or removed-concept claims", () => {
    const { container } = render(<ComparisonSection />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/fully post-quantum|quantum-proof|A2A|MLS|link record/i);
    expect(text).toMatch(/Stablecoin \(CAIP-19\)/);
  });
});
