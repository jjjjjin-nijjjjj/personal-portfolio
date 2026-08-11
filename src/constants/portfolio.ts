export type NavItem = { label: string; href: string };
export type CapabilityGroup = { number: string; title: string; items: string[] };
export type ProjectSection = { title: string; body?: string; items?: string[] };
export type Project = {
  number: string;
  slug: string;
  title: string;
  category: string;
  role?: string;
  description: string;
  tags: string[];
  result?: string;
  featured: boolean;
  color: string;
  href?: string;
  detailTitle?: string;
  subtitle?: string;
  workflow?: string[];
  stateCategoryCount?: number;
  sections?: ProjectSection[];
};
export type Experience = {
  period: string;
  role: string;
  company: string;
  summary: string;
  responsibilities: string[];
  highlights?: string[];
};

export const personal = {
  name: "Jiaying Jin",
  eyebrow: "HEY, I’M",
  positioning: "AI × PRODUCT × STRATEGY",
  description: "I design AI-powered products, risk strategies, and intelligent decision systems that transform complex business rules into scalable user experiences.",
  compactDescription: "Building AI products and intelligent risk decision systems.",
  location: "Shanghai",
  currentRole: "Risk Strategy Manager",
  experience: "3+ Years",
  education: "King’s College London",
  focus: "AI Product & Risk Strategy",
  email: "hellojjymia@gmail.com",
  phoneDisplay: "159 **** 5485",
  portfolio: "https://nomo-drab.vercel.app/",
} as const;

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Contact", href: "#contact" },
];

export const about = {
  title: "I make complex decisions clear.",
  paragraphs: [
    "I am an AI product and risk strategy professional with more than three years of experience building data-driven products and decision systems.",
    "My work sits at the intersection of product strategy, quantitative modeling, risk management, and AI workflow design.",
    "I translate complex business requirements into structured products—from defining user scenarios and decision rules to designing data and model frameworks, coordinating development, validating outcomes, and continuously optimizing performance after launch.",
    "My recent work focuses on credit approval strategy, AI-powered approval assistants, customer acquisition screening, risk decision systems, and intelligent workflow orchestration.",
  ],
  quote: "Technology should make complex decisions clearer, faster, and easier to use.",
} as const;

export const capabilityHighlights = [
  { number: "01", title: "Product Ownership", description: "Turning business problems into product requirements, workflows, and measurable delivery plans." },
  { number: "02", title: "AI Workflow Design", description: "Designing agent workflows, knowledge bases, state machines, tool calls, and exception handling." },
  { number: "03", title: "Risk Strategy", description: "Building acquisition, approval, pricing, monitoring, and optimization strategies." },
  { number: "04", title: "Quantitative Modeling", description: "Using data, machine learning, simulation, and model evaluation to support better decisions." },
];

export const capabilities: CapabilityGroup[] = [
  { number: "01", title: "AI Product", items: ["AI Agent Design", "Product Requirements", "Workflow Orchestration", "Knowledge Base Design", "Prompt Strategy", "Tool Calling", "State Machines", "Observability"] },
  { number: "02", title: "Risk Strategy", items: ["Customer Acquisition Screening", "Credit Approval", "Risk Pricing", "Customer Segmentation", "Gray Launch", "Risk Monitoring", "Strategy Optimization", "Decision Rules"] },
  { number: "03", title: "Data & Modeling", items: ["Python", "SQL", "Feature Engineering", "Random Forest", "XGBoost", "Regression", "Monte Carlo Simulation", "Model Evaluation", "KS / AUC"] },
  { number: "04", title: "Product Delivery", items: ["User Scenario Design", "PRD", "Prototyping", "UAT", "Cross-functional Coordination", "Launch Planning", "Iteration", "Result Monitoring"] },
  { number: "05", title: "Research & Analytics", items: ["NLP", "BERT", "ARIMAX", "Time Series", "Stress Testing", "Macroeconomic Analysis", "Data Visualization"] },
];

export const experience: Experience[] = [
  {
    period: "SEP 2025 — PRESENT",
    role: "Risk Strategy Manager",
    company: "Shenzhen Fenqile Technology (Shanghai)",
    summary: "Leading full-funnel risk strategy design across customer acquisition screening, credit approval, and ongoing risk monitoring.",
    responsibilities: [
      "Build standardized strategy frameworks for different channels and asset types.",
      "Move risk identification earlier into customer acquisition and design segmentation, profiling, and exclusion strategies.",
      "Coordinate technology and business teams to launch strategies through controlled traffic experiments.",
      "Establish pre-launch assessment and post-launch monitoring mechanisms.",
    ],
    highlights: ["AI Credit Approval Assistant — 20% increase in approval conversion", "24% Pricing Framework — FPD7$ approximately 0.9% for three consecutive months"],
  },
  {
    period: "JAN 2024 — SEP 2025",
    role: "Analyst",
    company: "Deloitte Fengyu Intelligent Technology (Shanghai)",
    summary: "Built data, model, strategy, and monitoring systems for credit and bond risk management products.",
    responsibilities: [
      "Developed end-to-end risk workflows across data, models, strategy, monitoring, and closed-loop optimization.",
      "Standardized indicators and data assets.",
      "Coordinated sales, product, operations, data, and development teams.",
      "Defined objectives, milestones, testing requirements, and delivery plans.",
    ],
    highlights: ["Bond Risk Early Warning Platform — KS 70+ and AUC 95+", "Country Risk Stress Testing — regulatory-aligned multi-scenario framework"],
  },
  {
    period: "SEP 2022 — DEC 2023",
    role: "MSc, Big Data in Culture and Society",
    company: "King’s College London",
    summary: "Graduate study in London spanning data, culture, research, NLP, time series, and applied analytics.",
    responsibilities: ["Completed UK Inflation Sentiment Analysis using BERT and ARIMAX.", "Applied quantitative research methods to real-world social and economic questions."],
  },
];

const aiAssistantSections: ProjectSection[] = [
  { title: "Context", body: "Users move through identity verification, ID upload, facial recognition, approval review, and credit activation. The system must understand current state, explain failures, guide the next action, and recover interrupted workflows." },
  { title: "Business Problem", items: ["Many business states and exception paths", "Users cannot clearly understand failures", "Frontend messages can diverge from backend truth", "AI responses must never override real business status", "The solution must work at high transaction volume"] },
  { title: "My Role", items: ["Product workflow design", "Business rule abstraction", "State modeling", "Knowledge-base and interface design", "Prompt and tool-call planning", "Exception handling and observability", "Cross-functional collaboration"] },
  { title: "System Workflow", body: "User Request → Query Current State → Interpret Business Status → Select Approved Tool → Execute Action → Return Result → Update Guidance → Log Interaction" },
  { title: "Design Principles", items: ["Backend state is the single source of truth", "The AI agent explains and orchestrates but does not determine credit outcomes", "Every failure maps to a reason, retry condition, user message, and next action", "Interrupted processes support recovery", "Every tool call is observable and logged"] },
  { title: "Results", items: ["Initial daily application volume: approximately 5,000", "Full rollout: more than 1 million daily applications", "Credit approval conversion increased by 20%"] },
];

const pricingSections: ProjectSection[] = [
  { title: "Context", body: "Pricing and regulatory conditions changed, existing approval logic required restructuring, and different channels and asset types required differentiated treatment." },
  { title: "Strategy Approach", items: ["Move risk identification to acquisition screening", "Segment channels by performance and transacted assets", "Build a risk-return measurement framework", "Segment customers by rating and asset type", "Add credit bureau, multi-loan, behavior, delinquency, and activity features", "Launch through controlled traffic"] },
  { title: "Experiment & Monitoring", items: ["Initial traffic: 10%", "Observation period: 3–5 days", "Separate weekday and non-weekday behavior", "Monitor approval rate, FPD1$, FPD7$, and profitability"] },
  { title: "Results", items: ["FPD7$ reached approximately 0.9% for three consecutive months", "Channel approval rate recovered to the highest level before the new policy"] },
];

export const projects: Project[] = [
  { number: "01", slug: "ai-credit-approval-assistant", title: "AI Credit Approval Assistant", detailTitle: "Designing an AI Credit Approval Assistant", subtitle: "Turning a complex approval process into a state-aware, explainable, and scalable AI workflow.", category: "AI Product / Risk Workflow", description: "An AI-powered approval assistant that translates complex credit processes into clear, state-aware, and explainable user interactions.", role: "Product Strategy & Workflow Design", tags: ["AI Agent", "State Machine", "Tool Calling", "Knowledge Base", "Credit Approval"], result: "20% increase in approval conversion", featured: true, color: "#171717", workflow: ["User Request", "Query Current State", "Interpret Business Status", "Select Approved Tool", "Execute Action", "Return Result", "Update Guidance", "Log Interaction"], stateCategoryCount: 4, sections: aiAssistantSections },
  { number: "02", slug: "24-pricing-credit-strategy", title: "24% Pricing Framework Credit Strategy", detailTitle: "Redesigning Credit Approval Under a 24% Pricing Framework", subtitle: "Moving risk identification upstream while balancing approval quality, profitability, and customer conversion.", category: "Risk Strategy / Decision System", description: "A redesigned acquisition and approval framework that moved risk identification upstream and balanced approval quality, pricing, and profitability.", role: "Risk Strategy Manager", tags: ["Credit Strategy", "Risk Pricing", "Customer Segmentation", "Gray Launch", "FPD Monitoring"], result: "FPD7$ reduced to approximately 0.9% for three consecutive months", featured: true, color: "#F47C4D", workflow: ["Acquisition Screening", "Channel Segmentation", "Risk-return Measurement", "Customer Segmentation", "Controlled Traffic", "Risk & Profitability Monitoring"], sections: pricingSections },
  { number: "03", slug: "bond-risk-early-warning", title: "Bond Risk Early Warning Platform", category: "AI Product / Risk Modeling", description: "A full-market bond risk platform combining product design, multi-factor modeling, risk scoring, and monitoring.", role: "Product Lead & Quantitative Modeling", tags: ["XGBoost", "Random Forest", "Risk Scoring", "Product Design", "Monitoring"], result: "KS 70+ and AUC 95+", featured: true, color: "#52735B", sections: [{ title: "Approach", items: ["Led zero-to-one product planning, user scenarios, prototypes, and PRDs", "Designed data and indicator frameworks using nearly five years of issuer data", "Built dynamic weighting, risk scoring, alert thresholds, and monitoring"] }, { title: "Results", items: ["KS above 70 and AUC above 95", "Purchased by four major state-owned banks and leading securities companies"] }] },
  { number: "04", slug: "country-risk-stress-testing", title: "Country Risk Stress Testing", category: "Quantitative Risk", description: "A regulatory-aligned framework for evaluating country-level credit risk under multiple macroeconomic scenarios.", role: "Quantitative Modeling", tags: ["Monte Carlo", "MICE", "Macroeconomics", "Stress Testing", "Risk Strategy"], featured: false, color: "#6EB5FF", sections: [{ title: "Approach", items: ["Processed macroeconomic data from 1999 Q1 to 2022 Q4", "Used MICE imputation, multi-factor models, Monte Carlo simulation, lagged indicators, and Merton-inspired calibration", "Translated stress results into monitoring indicators and strategy recommendations"] }] },
  { number: "05", slug: "feng-shui-home-recommendation", title: "Feng Shui Home Recommendation", category: "Independent AI Product", description: "A personalized home recommendation experience combining AI-assisted matching with Eastern spatial philosophy.", role: "Product Designer & Builder", tags: ["Recommendation", "AI Product", "Next.js", "UX Design", "Figma"], featured: false, color: "#E882B4", href: "https://nomo-drab.vercel.app/" },
  { number: "06", slug: "uk-inflation-sentiment", title: "UK Inflation Sentiment Analysis", category: "NLP / Academic Research", description: "A BERT and ARIMAX workflow evaluating whether social-media sentiment can improve UK inflation expectation forecasting.", tags: ["BERT", "ARIMAX", "NLP", "Time Series", "Python"], featured: false, color: "#B7794A" },
  { number: "07", slug: "pine-wilt-identification", title: "Pine Wilt Disease Identification", category: "Computer Vision", description: "A drone-image recognition system using Faster R-CNN and YOLO to identify pine wilt disease.", tags: ["YOLO", "Faster R-CNN", "Computer Vision", "Python"], result: "98% accuracy", featured: false, color: "#6B8A63" },
];

export const education = {
  school: "King’s College London",
  degree: "MSc, Big Data in Culture and Society",
  period: "Sep 2022 – Dec 2023",
  location: "London",
} as const;
