export type ProcessStep = { n: number; title: string; desc: string };
export type QA = { q: string; a: string };
export type CaseStudy = { tag: string; title: string; desc: string };

export type Service = {
  slug: string;
  code: string;
  title: string;
  /** Short description used on cards and listings. */
  desc: string;
  /** Feature bullets shown on the Services listing page. */
  bullets: string[];
  /** Tech chips. */
  stack: string[];
  /** ---- Detail-page fields ---- */
  heroSubtitle: string;
  overview: string;
  included: string[];
  processTitle: string;
  processSteps: ProcessStep[];
  benefits: string[];
  techStack: string[];
  caseStudy: CaseStudy;
  faq: QA[];
  relatedSlugs: string[];
};

export const services: Service[] = [
  {
    slug: "ai-ml-solutions",
    code: "AI",
    title: "AI / ML Solutions",
    desc: "We create AI-enabled applications that automate workflows, uncover trends, and unlock fresh sources of business value.",
    bullets: ["Predictive analytics", "NLP and computer vision", "Custom ML models"],
    stack: ["TensorFlow", "PyTorch", "LangChain", "Hugging Face"],
    heroSubtitle:
      "Turn your data into automation, insight, and new sources of business value with production-grade AI.",
    overview:
      "We build and deploy AI and machine-learning solutions that unlock new levels of efficiency and insight. From predictive analytics and natural-language processing to computer vision and custom model development, we take AI from proof-of-concept to production — with the MLOps to keep it accurate as your data evolves.",
    included: [
      "Predictive Analytics",
      "NLP & LLM Applications",
      "Computer Vision",
      "Custom ML Models",
    ],
    processTitle: "From Data To Deployed Intelligence",
    processSteps: [
      { n: 1, title: "Frame the Problem", desc: "We identify where AI moves the needle and define success metrics." },
      { n: 2, title: "Prepare the Data", desc: "We assemble, clean, and label the data your models will learn from." },
      { n: 3, title: "Build & Evaluate", desc: "We train, tune, and validate models against real-world benchmarks." },
      { n: 4, title: "Deploy & Monitor", desc: "We ship to production with automated retraining and live monitoring." },
    ],
    benefits: [
      "Automate repetitive, high-volume workflows.",
      "Surface trends and predictions hidden in your data.",
      "Models built to scale with your traffic and data growth.",
      "MLOps-driven monitoring keeps accuracy high over time.",
    ],
    techStack: ["TensorFlow", "PyTorch", "Keras", "LangChain", "Hugging Face", "Plotly", "Grafana", "MLflow"],
    caseStudy: {
      tag: "Legal Tech",
      title: "AI Document Intelligence",
      desc: "Automated review of 40,000+ contracts with a fine-tuned extraction pipeline.",
    },
    faq: [
      { q: "Do we need a large dataset to start?", a: "Not always — we can start with pre-trained models and fine-tune, or design a data-collection strategy alongside the build." },
      { q: "Can you integrate AI into our existing product?", a: "Yes — most engagements embed models and inference APIs into an existing application rather than starting from scratch." },
      { q: "How do you keep models accurate over time?", a: "We set up monitoring and automated retraining pipelines so performance holds as your data shifts." },
      { q: "Do you work with LLMs?", a: "Yes — we build retrieval-augmented and agentic LLM applications with the latest Claude models and open-source options." },
    ],
    relatedSlugs: ["web-development", "enterprise-solutions", "managed-infrastructure"],
  },
  {
    slug: "web-development",
    code: "WEB",
    title: "Web Development",
    desc: "We build fast, responsive, and scalable websites tailored to your business using modern frameworks and clean code standards.",
    bullets: ["Responsive marketing sites", "Web app development", "Backend systems & APIs"],
    stack: ["React", "Next.js", "Node.js", "TypeScript"],
    heroSubtitle:
      "Fast, responsive, scalable web products built on modern frameworks and clean code standards.",
    overview:
      "We build custom websites and web applications tailored to your business — from marketing sites to complex product platforms. Using modern frameworks and clean, maintainable code, we deliver experiences that are fast, accessible, and built to scale as your traffic and feature set grow.",
    included: [
      "Marketing & Content Sites",
      "Web Application Development",
      "Backend Systems & APIs",
      "E-commerce Platforms",
    ],
    processTitle: "From Concept To Live Product",
    processSteps: [
      { n: 1, title: "Plan & Architect", desc: "We map requirements, information architecture, and the tech stack." },
      { n: 2, title: "Design the UI", desc: "Accessible, on-brand interfaces that fit how your users actually work." },
      { n: 3, title: "Build & Integrate", desc: "Clean, tested code wired into your data, auth, and third-party tools." },
      { n: 4, title: "Launch & Iterate", desc: "Robust deployment pipelines with monitoring and fast iteration." },
    ],
    benefits: [
      "Fast load times and strong Core Web Vitals.",
      "Responsive across every device and screen size.",
      "SEO-ready, accessible, and standards-compliant.",
      "Maintainable codebases your team can own.",
    ],
    techStack: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "GraphQL", "Vercel"],
    caseStudy: {
      tag: "Fintech / Logistics",
      title: "Logistics Platform Rebuild",
      desc: "Cut order processing time by 62% with an event-driven rearchitecture.",
    },
    faq: [
      { q: "Can you work with our existing codebase?", a: "Yes — most engagements extend or modernize an existing system rather than starting from scratch." },
      { q: "Do you handle both frontend and backend?", a: "Yes — we deliver full-stack, from UI to APIs, databases, and infrastructure." },
      { q: "Will the site be SEO-friendly?", a: "We build with server rendering, semantic markup, and performance best practices so search engines index you well." },
      { q: "Do you provide ongoing maintenance?", a: "Every project includes a post-launch support window, with retainers available after that." },
    ],
    relatedSlugs: ["app-development", "ai-ml-solutions", "managed-infrastructure"],
  },
  {
    slug: "app-development",
    code: "APP",
    title: "App Development",
    desc: "We design and build mobile apps for iOS, Android, and cross-platform, optimized for performance, usability, and scale.",
    bullets: ["Native iOS & Android", "Cross-platform apps", "App Store deployment"],
    stack: ["Swift", "Kotlin", "React Native", "Flutter"],
    heroSubtitle:
      "Mobile apps for iOS, Android, and cross-platform — optimized for performance, usability, and scale.",
    overview:
      "We design and build mobile applications that people love to use. Whether native for iOS and Android or cross-platform for speed to market, our apps are optimized for performance, usability, and scale — and shipped through a reliable release process all the way to the App Store and Play Store.",
    included: [
      "Native iOS Development",
      "Native Android Development",
      "Cross-Platform Apps",
      "App Store Deployment",
    ],
    processTitle: "From Idea To The App Store",
    processSteps: [
      { n: 1, title: "Define & Prototype", desc: "We shape the concept, flows, and a clickable prototype." },
      { n: 2, title: "Design the Experience", desc: "Intuitive, platform-native interfaces that feel effortless." },
      { n: 3, title: "Build & Test", desc: "Performant code with device testing across the matrix." },
      { n: 4, title: "Ship & Support", desc: "Store submission, release management, and post-launch care." },
    ],
    benefits: [
      "Smooth, native-feeling performance.",
      "One codebase options to reach both platforms faster.",
      "Thorough device and OS testing before release.",
      "Managed store submission and release process.",
    ],
    techStack: ["Swift", "Kotlin", "React Native", "Flutter", "Firebase", "Fastlane", "Expo", "GraphQL"],
    caseStudy: {
      tag: "SaaS",
      title: "Companion Mobile App",
      desc: "Shipped a cross-platform app in 10 weeks that lifted daily active users by 35%.",
    },
    faq: [
      { q: "Native or cross-platform — which is right for us?", a: "It depends on your performance needs and budget; we help you weigh the tradeoffs and pick the best fit." },
      { q: "Can you publish to the App Store and Play Store for us?", a: "Yes — we manage store submission, review, and release on your behalf." },
      { q: "Do you build the backend too?", a: "Yes — we deliver the APIs, auth, and infrastructure your app relies on." },
      { q: "What about updates after launch?", a: "We offer ongoing maintenance and feature retainers to keep your app current." },
    ],
    relatedSlugs: ["web-development", "ai-ml-solutions", "staff-augmentation"],
  },
  {
    slug: "enterprise-solutions",
    code: "ENT",
    title: "Enterprise Solutions",
    desc: "From ERP to CRM, we implement and optimize enterprise-grade systems to improve operations at scale.",
    bullets: ["System implementation & integration", "Module customization", "Support & maintenance"],
    stack: ["SAP", "NetSuite", "Salesforce", "Oracle"],
    heroSubtitle:
      "Implement, integrate, and optimize enterprise-grade systems to improve operations at scale.",
    overview:
      "From ERP to CRM, we implement and optimize the enterprise systems your business runs on. We integrate platforms with your existing tools, customize modules to fit your processes, and provide ongoing support so mission-critical systems stay reliable and improve operations at scale.",
    included: [
      "System Implementation",
      "Platform Integration",
      "Module Customization",
      "Support & Maintenance",
    ],
    processTitle: "From Legacy To Optimized Operations",
    processSteps: [
      { n: 1, title: "Assess & Plan", desc: "We audit your systems, processes, and integration needs." },
      { n: 2, title: "Configure & Customize", desc: "We tailor modules and workflows to how your business runs." },
      { n: 3, title: "Integrate & Migrate", desc: "We connect systems and migrate data with minimal disruption." },
      { n: 4, title: "Support & Optimize", desc: "We monitor, maintain, and continuously improve the platform." },
    ],
    benefits: [
      "Systems configured around your real processes.",
      "Seamless integration with your existing toolset.",
      "Lower operational friction and manual work.",
      "Ongoing support for mission-critical platforms.",
    ],
    techStack: ["SAP", "NetSuite", "Salesforce", "Oracle", "Microsoft Dynamics", "MuleSoft", "Zapier", "Power BI"],
    caseStudy: {
      tag: "Enterprise",
      title: "ERP Modernization",
      desc: "Consolidated three legacy systems into one platform, cutting reporting time in half.",
    },
    faq: [
      { q: "Which platforms do you work with?", a: "SAP, NetSuite, Salesforce, Oracle, Microsoft Dynamics, and others — we recommend the right fit for your needs." },
      { q: "Can you integrate with our existing tools?", a: "Yes — integration and data migration between systems is a core part of what we do." },
      { q: "How do you minimize downtime during migration?", a: "We use phased, tested migrations with rollback plans to keep operations running." },
      { q: "Do you provide training?", a: "Yes — we onboard your team and document the system so adoption sticks." },
    ],
    relatedSlugs: ["managed-infrastructure", "staff-augmentation", "ai-ml-solutions"],
  },
  {
    slug: "staff-augmentation",
    code: "STA",
    title: "Staff Augmentation & Support",
    desc: "Reliable, experienced developers, designers, and engineers who feel like part of your team — ready to jump in, collaborate, and deliver fast.",
    bullets: ["On-demand technical talent", "Long-term or short-term engagements", "Seamless team integration"],
    stack: ["Jira", "Slack", "Postman", "GitHub"],
    heroSubtitle:
      "Access skilled talent fast — from frontend specialists to full-stack developers and DevOps engineers.",
    overview:
      "Code & Algo's Staff Augmentation and Support Services give you access to skilled talent on demand. Hire the best developers quickly — frontend specialists, full-stack developers, and DevOps professionals. Maintain IT availability, deploy quick fixes, and ensure system performance with multi-level support designed around your stack.",
    included: [
      "On-Demand Talent Pool",
      "Frontend Specialists",
      "Full-Stack Engineers",
      "DevOps Professionals",
    ],
    processTitle: "From Gap To Delivered Talent",
    processSteps: [
      { n: 1, title: "Understand the Gap", desc: "We map the gaps in your team, your workloads, and your timelines." },
      { n: 2, title: "Source and Screen", desc: "We filter hundreds of developers and support engineers to find the right fit." },
      { n: 3, title: "Integrate Seamlessly", desc: "Our people work as an extension of your team, inside your toolset and processes." },
      { n: 4, title: "Evaluate Continuously", desc: "Ongoing review of performance and delivery." },
    ],
    benefits: [
      "Meet your deadlines without hiring lag.",
      "Engineers with relevant experience in your industry.",
      "24×7 techno-functional support to keep systems running.",
      "Strict NDAs, compliance, and cybersecurity protocols in place.",
    ],
    techStack: ["Jira", "Slack", "Postman", "GitHub", "Figma", "Confluence", "Notion", "Linear"],
    caseStudy: {
      tag: "SaaS",
      title: "Scaling a Product Team Fast",
      desc: "Embedded four engineers within three weeks to help a SaaS client hit a critical launch deadline.",
    },
    faq: [
      { q: "How fast can you place a developer?", a: "Typically within one to two weeks, depending on the specific skill set required." },
      { q: "Can we interview candidates first?", a: "Yes — we shortlist candidates and you interview and approve before they join." },
      { q: "Is this a full-time or part-time engagement?", a: "Both — engagements can be full-time or scaled to part-time based on your needs." },
      { q: "What happens if it's not a good fit?", a: "We swap the resource at no extra cost during the trial period." },
    ],
    relatedSlugs: ["web-development", "managed-infrastructure", "enterprise-solutions"],
  },
  {
    slug: "managed-infrastructure",
    code: "INF",
    title: "Managed Infrastructure Services",
    desc: "We handle your cloud and on-prem infrastructure with less downtime, better security, and lower IT costs.",
    bullets: ["Cloud setup & migration (AWS, Azure, GCP)", "DevOps automation", "24/7 monitoring & incident response"],
    stack: ["AWS", "Docker", "Kubernetes", "Terraform"],
    heroSubtitle:
      "Cloud and on-prem infrastructure managed for less downtime, better security, and lower IT costs.",
    overview:
      "We manage your cloud and on-prem infrastructure so you can focus on innovation. From cloud setup and migration across AWS, Azure, and GCP to DevOps automation and round-the-clock monitoring, we keep your systems secure, reliable, and cost-efficient — with fast incident response when it matters.",
    included: [
      "Cloud Setup & Migration",
      "DevOps Automation",
      "24/7 Monitoring",
      "Incident Response",
    ],
    processTitle: "From Setup To Always-On Reliability",
    processSteps: [
      { n: 1, title: "Assess & Design", desc: "We review your architecture, security posture, and cost profile." },
      { n: 2, title: "Provision & Migrate", desc: "Infrastructure-as-code setup and zero-downtime migration." },
      { n: 3, title: "Automate & Secure", desc: "CI/CD pipelines, hardening, and policy-as-code guardrails." },
      { n: 4, title: "Monitor & Respond", desc: "24/7 monitoring, alerting, and rapid incident response." },
    ],
    benefits: [
      "Less downtime with proactive monitoring.",
      "Stronger security and compliance posture.",
      "Lower cloud spend through right-sizing.",
      "Faster, more reliable deployments.",
    ],
    techStack: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform", "Ansible", "Prometheus"],
    caseStudy: {
      tag: "SaaS",
      title: "Cloud Cost Overhaul",
      desc: "Reduced monthly infrastructure spend by 41% with a zero-downtime migration.",
    },
    faq: [
      { q: "Which clouds do you support?", a: "AWS, Azure, and GCP — plus hybrid and on-prem setups." },
      { q: "Can you migrate us with zero downtime?", a: "Yes — we use phased, tested migrations designed to avoid service interruption." },
      { q: "Do you offer 24/7 monitoring?", a: "Yes — round-the-clock monitoring with alerting and incident response is standard." },
      { q: "How do you help reduce cloud costs?", a: "We right-size resources, automate scaling, and eliminate waste to lower spend." },
    ],
    relatedSlugs: ["enterprise-solutions", "web-development", "staff-augmentation"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function relatedServices(slug: string): Service[] {
  const svc = getService(slug);
  if (!svc) return [];
  return svc.relatedSlugs
    .map((s) => getService(s))
    .filter((s): s is Service => Boolean(s));
}

/** Engagement models — from the Services page. */
export const engagementModels = [
  {
    title: "Fixed Scope",
    desc: "Defined deliverables, fixed timeline, fixed price. Best for well-scoped projects with clear requirements.",
    duration: "Typical: 8–16 weeks",
  },
  {
    title: "Dedicated Team",
    desc: "A full squad embedded with you, billed monthly. Best for ongoing product development.",
    duration: "Typical: 3+ months",
  },
  {
    title: "Staff Augmentation",
    desc: "Individual specialists join your existing team. Best for filling specific skill gaps fast.",
    duration: "Typical: 1+ month",
  },
];

/** Why-choose blurbs — from the Services page. */
export const servicesWhyChoose = [
  {
    title: "Real Results, Real Impact",
    desc: "Whether automating workflows, redesigning legacy systems, or integrating smarter tools, we help teams achieve more with less friction.",
  },
  {
    title: "Support That Doesn't End at Launch",
    desc: "From day one to long after go-live, we're planning, building, scaling, and evolving alongside you.",
  },
  {
    title: "A Team You Can Count On",
    desc: "Experienced engineers, detail-oriented project managers, and strategic architects — dedicated to getting it right the first time.",
  },
];

/** FAQ — from the Services page. */
export const servicesFaq: QA[] = [
  { q: "How do you scope and price a project?", a: "We start with a discovery call to understand goals and constraints, then return a fixed-scope proposal or a time-and-materials estimate depending on how well-defined the requirements are." },
  { q: "What's a typical engagement length?", a: "Most projects run 8–16 weeks end to end. Dedicated-team and staff-augmentation engagements are ongoing and billed monthly." },
  { q: "Can you work with our existing codebase?", a: "Yes — most of our engagements involve extending or modernizing an existing system rather than starting from scratch." },
  { q: "How do you handle IP and confidentiality?", a: "All engagements start with an NDA, and all IP created during the engagement belongs to you." },
  { q: "What happens after launch?", a: "Every project includes a post-launch support window, with ongoing maintenance retainers available after that." },
];
