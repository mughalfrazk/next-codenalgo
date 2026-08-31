import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
  default: ({ href, children, onClick, ...rest }: { href: string; children: React.ReactNode; onClick?: () => void; [k: string]: unknown }) => (
    <a href={href} onClick={onClick} {...rest}>{children}</a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

import { Faq } from "@/components/Faq";
import { Navbar } from "@/components/Navbar";
import { ProcessAccordion } from "@/components/ProcessAccordion";
import type { ProcessGroup } from "@/content/home";

const faqItems = [
  { q: "Question one?", a: "Answer one." },
  { q: "Question two?", a: "Answer two." },
];

describe("Faq", () => {
  it("renders all questions", () => {
    render(<Faq items={faqItems} />);
    expect(screen.getByText("Question one?")).toBeDefined();
    expect(screen.getByText("Question two?")).toBeDefined();
  });

  it("first item is open by default", () => {
    render(<Faq items={faqItems} />);
    expect(screen.getByText("Answer one.")).toBeDefined();
  });

  it("closes the open item when clicked again", () => {
    render(<Faq items={faqItems} />);
    const btn = screen.getByRole("button", { name: /question one/i });
    fireEvent.click(btn);
    expect(screen.queryByText("Answer one.")).toBeNull();
  });

  it("opens a different item on click", () => {
    render(<Faq items={faqItems} />);
    const btn = screen.getByRole("button", { name: /question two/i });
    fireEvent.click(btn);
    expect(screen.getByText("Answer two.")).toBeDefined();
  });
});

describe("Navbar", () => {
  it("renders the site name", () => {
    render(<Navbar />);
    expect(screen.getAllByText("Code & Algo").length).toBeGreaterThan(0);
  });

  it("renders desktop nav links", () => {
    render(<Navbar />);
    expect(screen.getAllByRole("link", { name: "Home" }).length).toBeGreaterThan(0);
  });

  it("opens the mobile drawer on toggle button click", () => {
    render(<Navbar />);
    const btn = screen.getByRole("button", { name: /toggle menu/i });
    expect(btn.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(btn);
    expect(btn.getAttribute("aria-expanded")).toBe("true");
  });

  it("closes the mobile drawer on second toggle click", () => {
    render(<Navbar />);
    const btn = screen.getByRole("button", { name: /toggle menu/i });
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(btn.getAttribute("aria-expanded")).toBe("false");
  });

  it("closes the mobile drawer when a mobile nav link is clicked", () => {
    render(<Navbar />);
    const toggle = screen.getByRole("button", { name: /toggle menu/i });
    fireEvent.click(toggle);
    const mobileLinks = screen.getAllByRole("link", { name: "Home" });
    fireEvent.click(mobileLinks[mobileLinks.length - 1]);
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
  });

  it("closes the mobile drawer when the consultation CTA link is clicked", () => {
    render(<Navbar />);
    const toggle = screen.getByRole("button", { name: /toggle menu/i });
    fireEvent.click(toggle);
    const ctaLinks = screen.getAllByRole("link", { name: /get a free consultation/i });
    // The last one is in the mobile drawer
    fireEvent.click(ctaLinks[ctaLinks.length - 1]);
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
  });
});

const processGroups: ProcessGroup[] = [
  {
    title: "Discovery",
    items: [
      { t: "Step A", d: "Desc A" },
      { t: "Step B", d: "Desc B" },
    ],
  },
  {
    title: "Delivery",
    items: [{ t: "Step C", d: "Desc C" }],
  },
];

describe("ProcessAccordion", () => {
  it("renders all group titles", () => {
    render(<ProcessAccordion groups={processGroups} />);
    expect(screen.getByText("Discovery")).toBeDefined();
    expect(screen.getByText("Delivery")).toBeDefined();
  });

  it("first group is open by default", () => {
    render(<ProcessAccordion groups={processGroups} />);
    expect(screen.getByText("Step A")).toBeDefined();
  });

  it("closes the open group when clicked again", () => {
    render(<ProcessAccordion groups={processGroups} />);
    const btn = screen.getByRole("button", { name: /discovery/i });
    fireEvent.click(btn);
    expect(screen.queryByText("Step A")).toBeNull();
  });

  it("opens another group on click", () => {
    render(<ProcessAccordion groups={processGroups} />);
    const btn = screen.getByRole("button", { name: /delivery/i });
    fireEvent.click(btn);
    expect(screen.getByText("Step C")).toBeDefined();
  });
});
