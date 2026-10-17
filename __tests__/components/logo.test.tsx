import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Logo } from "@/components/ui/logo";

describe("Logo", () => {
  it("renders SVG with title 'ACE Protocol'", () => {
    render(<Logo />);
    expect(screen.getByTitle("ACE Protocol")).toBeInTheDocument();
  });

  it("renders ACE wordmark when showWordmark is true", () => {
    render(<Logo showWordmark />);
    expect(screen.getByText("ACE")).toBeInTheDocument();
    expect(screen.getByText("PROTOCOL")).toBeInTheDocument();
  });

  it("does not render wordmark by default", () => {
    render(<Logo />);
    expect(screen.queryByText("ACE")).not.toBeInTheDocument();
  });
});
