import { describe, expect, it } from "vitest";
import {
  aboutHero,
  valuePills,
  aboutIntro,
  aboutStats,
  missionVision,
  milestones,
  values,
  team,
} from "@/content/about";
import { contactHero, serviceOptions, budgetOptions, contactFaq } from "@/content/contact";
import {
  homeHero,
  clientLogos,
  homeStats,
  caseStudies,
  whyChoose,
  processSteps,
  testimonials,
  homeFaq,
} from "@/content/home";
import { site, nav, footerCompany, socials } from "@/content/site";

describe("about content", () => {
  it("aboutHero has required fields", () => {
    expect(aboutHero.eyebrow).toBeTruthy();
    expect(aboutHero.title).toBeTruthy();
    expect(aboutHero.subtitle).toBeTruthy();
  });

  it("valuePills is non-empty", () => {
    expect(valuePills.length).toBeGreaterThan(0);
  });

  it("aboutIntro is a string", () => {
    expect(typeof aboutIntro).toBe("string");
    expect(aboutIntro.length).toBeGreaterThan(0);
  });

  it("aboutStats have value/suffix/label", () => {
    expect(aboutStats.length).toBeGreaterThan(0);
    for (const s of aboutStats) {
      expect(typeof s.value).toBe("number");
    }
  });

  it("missionVision is non-empty", () => {
    expect(missionVision.length).toBeGreaterThan(0);
  });

  it("milestones is non-empty", () => {
    expect(milestones.length).toBeGreaterThan(0);
  });

  it("values is non-empty", () => {
    expect(values.length).toBeGreaterThan(0);
  });

  it("team is an array", () => {
    expect(Array.isArray(team)).toBe(true);
  });
});

describe("contact content", () => {
  it("contactHero has required fields", () => {
    expect(contactHero.eyebrow).toBeTruthy();
    expect(contactHero.title).toBeTruthy();
  });

  it("serviceOptions and budgetOptions are non-empty", () => {
    expect(serviceOptions.length).toBeGreaterThan(0);
    expect(budgetOptions.length).toBeGreaterThan(0);
  });

  it("contactFaq has q and a fields", () => {
    expect(contactFaq.length).toBeGreaterThan(0);
    expect(contactFaq[0].q).toBeTruthy();
    expect(contactFaq[0].a).toBeTruthy();
  });
});

describe("home content", () => {
  it("homeHero has required fields", () => {
    expect(homeHero.eyebrow).toBeTruthy();
    expect(homeHero.title).toBeTruthy();
  });

  it("clientLogos is non-empty", () => {
    expect(clientLogos.length).toBeGreaterThan(0);
  });

  it("homeStats have value, suffix, label", () => {
    expect(homeStats.length).toBeGreaterThan(0);
    for (const s of homeStats) {
      expect(typeof s.value).toBe("number");
      expect(typeof s.suffix).toBe("string");
      expect(s.label).toBeTruthy();
    }
  });

  it("caseStudies is non-empty", () => {
    expect(caseStudies.length).toBeGreaterThan(0);
  });

  it("whyChoose is non-empty", () => {
    expect(whyChoose.length).toBeGreaterThan(0);
  });

  it("processSteps is non-empty", () => {
    expect(processSteps.length).toBeGreaterThan(0);
  });

  it("testimonials is non-empty", () => {
    expect(testimonials.length).toBeGreaterThan(0);
  });

  it("homeFaq is non-empty", () => {
    expect(homeFaq.length).toBeGreaterThan(0);
  });
});

describe("site content", () => {
  it("site has required fields", () => {
    expect(site.name).toBeTruthy();
    expect(site.email).toBeTruthy();
    expect(site.url).toBeTruthy();
  });

  it("nav, footerCompany, socials are non-empty", () => {
    expect(nav.length).toBeGreaterThan(0);
    expect(footerCompany.length).toBeGreaterThan(0);
    expect(socials.length).toBeGreaterThan(0);
  });
});
