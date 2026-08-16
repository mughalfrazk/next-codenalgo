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
      "Unlock the Power of AI for Your Business — harness advanced AI and ML technologies to drive innovation, optimize operations, and gain a competitive edge.",
    overview:
      "Our machine learning and AI solutions help you unlock the true potential of these technologies and deliver meaningful business results. From forecasting and predictive analytics to anomaly detection, computer vision, NLP, optimization, and custom MLOps pipelines — we take AI from proof-of-concept to production and keep it accurate as your data evolves.",
    included: [
      "Forecasting & Predictive Analytics",
      "Anomaly Detection & Quality Monitoring",
      "Computer Vision Solutions",
      "Natural Language Processing (NLP)",
      "Optimization & Scheduling",
      "Custom AI Models & MLOps",
    ],
    processTitle: "From Vision to Value: Fast",
    processSteps: [
      { n: 1, title: "Discovery & Use Case Identification", desc: "We analyze your business goals, pain points, and current data infrastructure to identify high-impact AI/ML opportunities." },
      { n: 2, title: "Feasibility & Data Assessment", desc: "We assess data readiness, clean datasets, and establish the requirements needed to train accurate, reliable models." },
      { n: 3, title: "Training & Validation", desc: "Models go through several layers of checks to ensure performance and accuracy before release, enabling immediate feedback." },
      { n: 4, title: "Deployment & Integration", desc: "We seamlessly integrate models into your workflows, dashboards, or products — cloud-based or on-premises." },
      { n: 5, title: "Monitoring & Optimization", desc: "We keep monitoring and refining so your models adapt to your business and keep performing." },
    ],
    benefits: [
      "Not Off the Shelf: Our AI is personalized to work with your use case and your industry.",
      "Enterprise-Grade Scalability: Designed to scale as data and needs grow.",
      "Expert Team: Certified ML engineers and data scientists with real-world impact.",
      "Secure & Compliant: Data privacy, regulatory compliance, and system security are top priorities.",
      "All-Inclusive Support: From ideation to post-deployment, we've got you covered.",
    ],
    techStack: ["TensorFlow", "PyTorch", "Keras", "LangChain", "Hugging Face", "Plotly", "Grafana", "MLflow", "scikit-learn", "OpenCV"],
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
    stack: ["Odoo", "Salesforce", "Dynamics 365", "SAP"],
    heroSubtitle:
      "The Future of Your Enterprise, Simplified: Tailored Solutions, Expert Execution. Unlock agility, scalability, and growth with enterprise platforms built around your goals.",
    overview:
      "We empower your teams, simplify complex processes, and drive data-backed decisions with enterprise-grade platforms built around your goals — not generic templates. From Odoo ERP and Salesforce CRM to Dynamics 365, we implement, integrate, customize, and support your mission-critical systems.",
    included: [
      "Odoo ERP Customization",
      "Salesforce Customization & Optimization",
      "Dynamics 365 Integration",
      "Scalable Data Solutions & Governance",
    ],
    processTitle: "Working Together to Achieve Your Enterprise Goals",
    processSteps: [
      { n: 1, title: "Collaborative Planning", desc: "We collaborate to learn about your workflows, challenges, and goals, then create a success-oriented roadmap." },
      { n: 2, title: "Tailored Implementation", desc: "Our certified specialists tailor your selected platform to your specific requirements — we don't do generic." },
      { n: 3, title: "Smart Integrations", desc: "We synchronize your digital ecosystem, ensuring data flows easily, faster processes, and scalable growth." },
      { n: 4, title: "Performance Optimization", desc: "After launch, we focus on optimizing performance, addressing issues, and ensuring seamless user adoption." },
      { n: 5, title: "Long-term Framework & Innovation", desc: "As your enterprise scales, we scale your systems — deploying new modules, automation, and insights." },
    ],
    benefits: [
      "Faster ROI: Get started faster and realize value from day one.",
      "Smooth Operations: Break down data silos through tightly integrated systems.",
      "Get More out of Your Investment: Unlock the full potential of your platforms with bespoke customization.",
      "Secure & Audit-Ready: Risk significantly reduced and compliance ready.",
      "Break the Barricade: Our support helps you avoid any potential downtime.",
    ],
    techStack: ["Odoo", "Salesforce", "Microsoft Dynamics 365", "SAP", "Power BI", "MuleSoft", "Microsoft 365", "Azure"],
    caseStudy: {
      tag: "Enterprise",
      title: "ERP Modernization",
      desc: "Consolidated three legacy systems into one platform, cutting reporting time in half.",
    },
    faq: [
      { q: "Which platforms do you work with?", a: "Odoo, Salesforce, Microsoft Dynamics 365, SAP, and others — we recommend the right fit for your needs." },
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
      "Instant Access to Top Tech Talent & Unwavering Support — skilled talent, technical expertise, and scalable teams so you can focus on what matters: growth.",
    overview:
      "Looking for reliable developers or dedicated support engineers without long hiring cycles? Code & Algo's Staff Augmentation and Support Services provide instant access to skilled talent. Whether you're launching a new product, extending your tech stack, or need 24/7 operational support — we have the right people, right when you need them. Our multi-level support model includes L1 Help Desk & Incident Resolution, L2 Technical Troubleshooting & Escalation, L3 System Optimization & Configuration, and L4 Vendor Liaison & Root Cause Resolution.",
    included: [
      "On-Demand Developers & Teams",
      "L1–L2 Help Desk & Troubleshooting",
      "L3–L4 System Optimization & Vendor Liaison",
      "Vetted Engineers, Seamless Integration",
    ],
    processTitle: "From Gap To Delivered Talent",
    processSteps: [
      { n: 1, title: "Complete Needs Assessment", desc: "We understand the gaps in your team, workloads, and timelines." },
      { n: 2, title: "Talent Match", desc: "We filter through hundreds of developers or support personnel to find the right fit for your requirements." },
      { n: 3, title: "Seamless Integration", desc: "All of our resources function as an extension of your team in your toolsets and processes." },
      { n: 4, title: "Active Oversight", desc: "Continuous evaluation of performance and delivery." },
    ],
    benefits: [
      "Narrow Your Ramp-Ups: Meet your deadlines without the hiring lags.",
      "Scale Smart, Not Add Overhead: Flexible models to avoid the costs of full-time hires.",
      "Uninterrupted Operations: 24×7 techno-functional support to keep systems running.",
      "Experts Who Know Your Industry: Developers and support engineers with relevant experience.",
      "Your Data is Safe With Us: Strict NDAs, compliance, and cybersecurity protocols in place.",
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
      "Future-Proof Your Infrastructure: Secure, Scalable & Ready for Anything. From agile cloud deployments to robust cybersecurity and rigorous QA, we power the digital backbone of high-growth businesses.",
    overview:
      "Focus on innovation — we'll handle the infrastructure. Code & Algo delivers a resilient, secure, and high-performance environment tailored to your needs. Our core capabilities span three pillars: Cloud Solutions & DevOps (AWS, Azure, GCP with CI/CD automation and IaC), Cybersecurity & Compliance (24/7 NOC/SOC, penetration testing, DDoS mitigation, GDPR/HIPAA alignment), and QA & Testing Services (end-to-end manual and automated testing embedded in your development lifecycle).",
    included: [
      "Cloud Solutions & DevOps",
      "Cybersecurity & Compliance",
      "QA & Testing Services",
      "24/7 Monitoring & Incident Response",
    ],
    processTitle: "Your Journey to a Seamless Infrastructure",
    processSteps: [
      { n: 1, title: "Discovery & Planning", desc: "We assess your present setup, business objectives, and risk appetite to create a customized strategy." },
      { n: 2, title: "Cloud Architecture & DevOps", desc: "We architect and automate your cloud ecosystem for peak performance and scalability using IaC." },
      { n: 3, title: "Cybersecurity Fortification", desc: "Multiple layers of protection to secure your data, networks, and apps — with proactive penetration testing." },
      { n: 4, title: "Quality Assurance Integration", desc: "End-to-end QA embedded in your development lifecycle — quality baked into every phase." },
      { n: 5, title: "Continuous Optimization", desc: "Continuous monitoring, automated improvement, and real-time insight to keep systems at peak performance." },
    ],
    benefits: [
      "Speed up your launch with DevOps automation & Infrastructure as Code.",
      "Work with confidence — proactive threat detection, penetration testing, and DDoS mitigation.",
      "Ensure quality through rigorous testing that prevents issues before they reach production.",
      "Compliance-ready: consistent alignment with GDPR, HIPAA, and other industry standards.",
      "Evolve with confidence on infrastructure that grows with you.",
    ],
    techStack: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform", "Ansible", "Prometheus", "Grafana", "Selenium"],
    caseStudy: {
      tag: "SaaS",
      title: "Cloud Cost Overhaul",
      desc: "Reduced monthly infrastructure spend by 41% with a zero-downtime migration.",
    },
    faq: [
      { q: "Which clouds do you support?", a: "AWS, Azure, and GCP — plus hybrid and on-prem setups." },
      { q: "Can you migrate us with zero downtime?", a: "Yes — we use phased, tested migrations designed to avoid service interruption." },
      { q: "Do you offer 24/7 monitoring?", a: "Yes — round-the-clock NOC and SOC monitoring with alerting and incident response is standard." },
      { q: "What cybersecurity services are included?", a: "Penetration testing, DDoS mitigation, threat response, and compliance alignment with GDPR, HIPAA, and other standards." },
    ],
    relatedSlugs: ["enterprise-solutions", "web-development", "staff-augmentation"],
  },
  {
    slug: "ecommerce-development",
    code: "ECO",
    title: "Ecommerce Development",
    desc: "We design and develop powerful ecommerce platforms that help businesses sell more, operate smarter, and scale globally.",
    bullets: ["Custom ecommerce websites", "AI-powered shopping experiences", "CRM & ERP integrations"],
    stack: ["Shopify", "Magento", "WooCommerce", "Next.js"],
    heroSubtitle:
      "Build High-Performance Ecommerce Platforms That Convert, Scale & Grow — from custom online stores and multi-vendor marketplaces to AI-powered automation and omnichannel commerce.",
    overview:
      "At Code & Algo, we design and develop powerful ecommerce platforms that help businesses sell more, operate smarter, and scale globally. Modern ecommerce success requires more than an attractive storefront — businesses need fast websites, intelligent automation, secure payments, integrated systems, personalized experiences, and scalable technology. We create ecommerce platforms designed for performance, reliability, and long-term growth.",
    included: [
      "Custom Ecommerce Website Development",
      "Ecommerce UI/UX & Conversion Optimization",
      "Platform Development & Customization",
      "Multi-Channel Ecommerce Solutions",
      "CRM, ERP & Business System Integrations",
      "Payment Gateway Integration",
      "AI-Powered Ecommerce Solutions",
      "Ecommerce Automation & Workflow Solutions",
    ],
    processTitle: "From Concept to Converting Store",
    processSteps: [
      { n: 1, title: "Discovery & Strategy", desc: "We understand your products, customers, and business model to design the right commerce solution." },
      { n: 2, title: "Design & UX", desc: "Mobile-first, conversion-focused designs with customer journey mapping and A/B testing strategies." },
      { n: 3, title: "Build & Integrate", desc: "Custom development with CRM, ERP, payment gateways, and multi-channel integrations." },
      { n: 4, title: "Launch & Optimize", desc: "SEO-optimized launch, performance tuning, and ongoing support for long-term growth." },
    ],
    benefits: [
      "Seamless shopping experiences that increase conversions.",
      "Automated operations with intelligent workflows.",
      "Multi-channel selling — website, Amazon, social commerce, and mobile.",
      "AI-powered product recommendations and personalized experiences.",
      "Secure payments with 15+ gateway integrations including Klarna, Stripe, and Apple Pay.",
    ],
    techStack: ["Shopify", "Magento", "WooCommerce", "Next.js", "React", "Node.js", "Salesforce", "HubSpot", "Stripe", "Klarna", "AWS", "Odoo"],
    caseStudy: {
      tag: "Retail & E-commerce",
      title: "Ecommerce Platform Rebuild",
      desc: "Rebuilt a multi-vendor marketplace with AI recommendations, lifting average order value by 28%.",
    },
    faq: [
      { q: "Which ecommerce platforms do you work with?", a: "Shopify, Magento, WooCommerce, BigCommerce, and fully custom platforms — we recommend the best fit for your scale and requirements." },
      { q: "Can you integrate our existing CRM or ERP?", a: "Yes — we integrate with Salesforce, HubSpot, Odoo, Dynamics 365, SAP, and custom systems." },
      { q: "Do you handle payment gateway setup?", a: "Yes — including Stripe, PayPal, Apple Pay, Google Pay, and Buy Now Pay Later solutions like Klarna and Clearpay." },
      { q: "Can you migrate from our current platform?", a: "Yes — we handle full platform migrations including product data, customer records, and order history with minimal disruption." },
    ],
    relatedSlugs: ["web-development", "ai-ml-solutions", "managed-infrastructure"],
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
