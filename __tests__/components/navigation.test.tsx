import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Navigation } from "@/components/ui/navigation";

describe("Navigation", () => {
  it("renders the IA: Why ACE, Quickstart, Compare, Spec, Ecosystem, GitHub and a highlighted Join", () => {
    render(<Navigation />);
    const links = screen.getAllByRole("link").map((a) => [a.textContent, a.getAttribute("href")]);
    expect(links).toEqual([
      ["ACE ProtocolACE", "/"],
      ["Why ACE", "/"],
      ["Quickstart", "/docs/quickstart"],
      ["Compare", "/compare"],
      ["Spec", "/spec"],
      ["Ecosystem", "/ecosystem"],
      ["GitHub", "https://github.com/aceprotocol"],
      ["Join", "/join"],
    ]);
    expect(screen.getByText("Join").className).toMatch(/border-ace-cyan/);
  });

  it("renders logo with title", () => {
    render(<Navigation />);
    expect(screen.getByTitle("ACE Protocol")).toBeInTheDocument();
  });

  it("renders GitHub link with external target", () => {
    render(<Navigation />);
    const ghLink = screen.getByText("GitHub");
    expect(ghLink).toHaveAttribute("target", "_blank");
    expect(ghLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
