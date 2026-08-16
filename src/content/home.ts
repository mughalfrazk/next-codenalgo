import type { QA } from "./services";

export const homeHero = {
  eyebrow: "Crafting Digital Success",
  title: "Smart Software. Real Results.",
  subtitle:
    "Custom-built solutions that align with your vision, scale with your business, and deliver impact at every stage.",
};

export const clientLogos = [
  "Client One",
  "Client Two",
  "Client Three",
  "Client Four",
  "Client Five",
];

export type Stat = { value: number; suffix: string; label: string };

export const homeStats: Stat[] = [
  { value: 20, suffix: "+", label: "Years Experience" },
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 6, suffix: "", label: "Core Service Lines" },
];

export const caseStudies = [
  {
    tag: "Fintech / Logistics",
    title: "Logistics Platform Rebuild",
    result: "Cut order processing time by 62% with an event-driven rearchitecture.",
  },
  {
    tag: "Legal Tech",
    title: "AI Document Intelligence",
    result: "Automated review of 40,000+ contracts with a fine-tuned extraction pipeline.",
  },
  {
    tag: "SaaS",
    title: "Cloud Cost Overhaul",
    result: "Reduced monthly infrastructure spend by 41% with a zero-downtime migration.",
  },
];

export const whyChoose = [
  { code: "01", title: "Building Custom Software", desc: "Developing unique software solutions tailored to your specific challenges and opportunities." },
  { code: "02", title: "Infrastructure Management", desc: "Secured, trusted, and scalable infrastructure management services, leaving you to focus on innovation." },
  { code: "03", title: "Enterprise Systems Optimization", desc: "We build, integrate, customize, and support your mission-critical enterprise systems." },
  { code: "04", title: "Providing Talent On-Demand", desc: "Fast, flexible staff augmentation and support services to meet your team's needs." },
  { code: "05", title: "Harnessing the Power of AI & ML", desc: "Creating and deploying Artificial Intelligence and Machine Learning solutions to achieve new levels of efficiency and insight." },
];

export type ProcessGroup = {
  title: string;
  items: { t: string; d: string }[];
};

export const processSteps: ProcessGroup[] = [
  {
    title: "Discover & Define",
    items: [
      { t: "Understand the Vision", d: "We explore your business goals, struggles, and what users expect." },
      { t: "Set Project Limits", d: "We define the problem, the boundaries of the solution, and the tech involved." },
      { t: "Pin Down Requirements", d: "We work with your team to determine what the project needs to succeed." },
      { t: "Time & Cost Plan", d: "We set realistic deadlines and a budget that fits your goals." },
    ],
  },
  {
    title: "Design & Develop",
    items: [
      { t: "Design System Architecture", d: "Secure, flexible system plans shaped by how your business runs and handles data." },
      { t: "Craft AI & ML Models", d: "Modern tooling to build models that are fast, accurate, and scale with you." },
      { t: "User-Friendly Design", d: "Products that are simple to use, easy on the eyes, and fit how people actually work." },
      { t: "Make Tech Work Together", d: "We integrate new systems with your existing tools without friction." },
    ],
  },
  {
    title: "Launch & Improve",
    items: [
      { t: "Roll Out with Confidence", d: "Robust deployment pipelines with fast rollback if needed." },
      { t: "Detailed Testing", d: "Unit, integration, and real-user acceptance testing for reliability." },
      { t: "Track Live Metrics", d: "Dashboards and alerts monitoring accuracy, performance, and post-deploy issues." },
      { t: "Improve & Adjust", d: "MLOps-driven automated retraining and tuning as your data evolves." },
    ],
  },
];

export const testimonials = [
  { quote: "“They rebuilt our order pipeline in twelve weeks and it has not gone down since.”", name: "J. Alvarez", role: "VP Engineering — Logistics client" },
  { quote: "“The AI extraction tool saved our legal team something like 30 hours a week.”", name: "M. Feld", role: "COO — Legal Tech client" },
  { quote: "“Straightforward and fast, and they explained the tradeoffs instead of just billing hours.”", name: "A. Torres", role: "Head of Platform — SaaS client" },
];

export const homeFaq: QA[] = [
  { q: "How long does a typical project take?", a: "Most engagements run 8–16 weeks depending on scope, from discovery through launch. We scope a realistic timeline together before any work begins." },
  { q: "Do you work with existing in-house teams?", a: "Yes — we regularly embed alongside in-house engineering, product, and design teams rather than working in isolation." },
  { q: "What's your pricing model?", a: "Fixed-scope for defined projects, time-and-materials for ongoing work or staff augmentation. We recommend whichever fits your situation." },
  { q: "Which industries do you specialize in?", a: "Fintech, logistics, SaaS, and legal tech make up most of our recent work, though our approach applies broadly." },
  { q: "Do you provide support after launch?", a: "Yes — every engagement includes a post-launch support window, with ongoing retainers available after that." },
];
