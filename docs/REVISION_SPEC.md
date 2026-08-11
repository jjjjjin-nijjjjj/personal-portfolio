# CODEX WEBSITE REVISION SPECIFICATION

## 0. TASK OVERVIEW

The existing personal portfolio website has already been implemented based on an older PRD.

Do NOT rebuild the entire website.
Do NOT replace the current design system.
Do NOT remove existing animations, responsive layouts, reusable components,
3D female character assets, or visual identity unless they are broken.

Modify the existing website in place.

The primary task is to update the website content, information hierarchy,
professional positioning, project ordering, and case-study structure so that
the website accurately reflects the latest resume.

The latest professional positioning is:

AI PRODUCT
RISK STRATEGY
INTELLIGENT DECISION SYSTEMS

The website should no longer present Jiaying primarily as a data scientist
or general data professional.

The new positioning should emphasize:

- AI product design
- AI agents
- Credit approval workflows
- Risk strategy
- Decision systems
- Product ownership
- Strategy implementation
- Cross-functional delivery
- Quantitative modeling as a supporting capability

Python, SQL, machine learning, and data analysis remain important skills,
but they should support the product and strategy narrative rather than define
the main personal brand.

################################################################################
# 1. SOURCE OF TRUTH
################################################################################

Use the latest resume as the only source of truth for:

- Company names
- Job titles
- Employment dates
- Project names
- Responsibilities
- Business results
- Model metrics
- Education
- Contact information
- Portfolio links

Do not reuse outdated information from the previous PRD when it conflicts with
the latest resume.

Do not invent:

- Additional companies
- New awards
- New qualifications
- Fake GitHub links
- Fake LinkedIn links
- Unsupported project metrics
- Unsupported technologies
- Unsupported job responsibilities

If LinkedIn or GitHub URLs are not currently available in the codebase,
hide those links or mark them as optional configuration values.

################################################################################
# 2. PRESERVE THE EXISTING DESIGN
################################################################################

Preserve the current:

- Orange and warm neutral color palette
- Large editorial typography
- Rounded card system
- Female 3D character
- Navigation behavior
- Framer Motion animations
- Scroll transitions
- Responsive system
- Component structure
- Typography system
- Footer style
- Decorative doodles
- Existing visual identity

Only adjust layout when required to support the new content hierarchy.

Do not redesign the site into:

- A corporate dashboard
- A traditional resume page
- A finance terminal
- A generic SaaS landing page
- A dense text-heavy CV

################################################################################
# 3. GLOBAL POSITIONING UPDATE
################################################################################

Replace the previous global positioning:

DATA × AI × PRODUCT

with:

AI × PRODUCT × STRATEGY

Use the following supporting line:

I design AI-powered products, risk strategies, and intelligent decision
systems that turn complex business rules into scalable product experiences.

Alternative short line for compact screens:

Building AI products and intelligent risk decision systems.

Use these professional keywords consistently across the website:

- AI Product
- Risk Strategy
- Intelligent Decision Systems
- AI Agent
- Credit Approval
- Product Strategy
- Decision Engine
- Risk Modeling
- Workflow Design
- Cross-functional Delivery

Reduce the visual emphasis on:

- Generic data science
- Generic visualization
- Statistics as a standalone identity
- Machine learning engineer positioning
- Pure quantitative researcher positioning

################################################################################
# 4. NAVIGATION UPDATE
################################################################################

Keep the current navigation layout and interaction.

Use the following navigation items:

- Home
- About
- Experience
- Projects
- Capabilities
- Contact

Optional navigation item:

- Playground

Only keep Playground if it already exists and is visually complete.

If Playground is incomplete, rename it to:

AI Lab

The Resume button should remain visible.

Use:

Download Resume

Do not add excessive navigation items.

################################################################################
# 5. HERO SECTION UPDATE
################################################################################

Update the hero copy.

Eyebrow:

HEY, I'M

Primary title:

JIAYING JIN

Professional label:

AI × PRODUCT × STRATEGY

Main description:

I design AI-powered products, risk strategies, and intelligent decision
systems that transform complex business rules into scalable user experiences.

Primary CTA:

View My Work

Secondary CTA:

Download Resume

Quick facts:

Location
Shanghai

Current Role
Risk Strategy Manager

Experience
3+ Years

Education
King's College London

Focus
AI Product & Risk Strategy

Remove outdated hero descriptions that present Jiaying mainly as:

- Data scientist
- Machine learning engineer
- Quant researcher
- Data visualization specialist

Keep the existing female character and hero composition.

################################################################################
# 6. ABOUT SECTION UPDATE
################################################################################

Section label:

ABOUT

Section title:

I connect business rules, data, AI, and product design.

Use the following body copy:

I am an AI product and risk strategy professional with more than three years
of experience building data-driven products and decision systems.

My work sits at the intersection of product strategy, quantitative modeling,
risk management, and AI workflow design.

I enjoy translating complex business requirements into structured products:
from defining user scenarios and decision rules, to designing data and model
frameworks, coordinating development, validating outcomes, and continuously
optimizing performance after launch.

My recent work focuses on credit approval strategy, AI-powered approval
assistants, customer acquisition screening, risk decision systems, and
intelligent workflow orchestration.

Add four capability highlights:

01 Product Ownership
Turning business problems into product requirements, workflows, and measurable delivery plans.

02 AI Workflow Design
Designing agent workflows, knowledge bases, state machines, tool calls, and exception handling.

03 Risk Strategy
Building acquisition, approval, pricing, monitoring, and optimization strategies.

04 Quantitative Modeling
Using data, machine learning, simulation, and model evaluation to support better decisions.

Quote:

Technology should make complex decisions clearer, faster, and easier to use.

################################################################################
# 7. EXPERIENCE SECTION RESTRUCTURE
################################################################################

The Experience section must prioritize the latest role.

Order:

1. Shenzhen Fenqile Technology
2. Deloitte Fengyu Intelligent Technology
3. King's College London
4. Undergraduate education, only if currently shown

Use an expandable timeline or structured cards.

-------------------------------------------------------------------------------
## EXPERIENCE 1
-------------------------------------------------------------------------------

Company:
Shenzhen Fenqile Technology (Shanghai)

Role:
Risk Strategy Manager

Date:
Sep 2025 – Present

Summary:
Leading full-funnel risk strategy design across customer acquisition screening,
credit approval, and ongoing risk monitoring.

Key responsibilities:

- Build standardized strategy frameworks for different channels and asset types.
- Move risk identification earlier into the customer acquisition stage.
- Design channel segmentation, user profiling, and risk exclusion strategies.
- Coordinate with technology and business teams to launch strategies through controlled traffic experiments.
- Establish pre-launch risk assessment and post-launch monitoring mechanisms.

Featured project A:
24% Pricing Framework Credit Approval Strategy Redesign

Use the following points:

- Redesigned approval and risk pricing logic under a 24% pricing framework.
- Shifted risk identification from the approval stage to the pre-screening stage.
- Built risk-return measurement frameworks based on asset type, loan duration, funding cost, and customer rating.
- Segmented users by AA, A0, A1, and A2 ratings.
- Differentiated self-operated and traffic-distribution assets.
- Integrated credit bureau data, multi-loan behavior, credit-limit cohorts, user behavior, historical delinquency, and application activity.
- Launched with an initial 10% traffic experiment.
- Used a 3–5 day observation cycle.
- Monitored approval rate, FPD1$, FPD7$, and profitability.
- FPD7$ declined to approximately 0.9% for three consecutive months.
- Channel approval rates recovered to the pre-policy-change peak.

Featured project B:
AI Credit Approval Assistant

Use the following points:

- Structured the end-to-end approval flow, including identity verification, ID upload, facial recognition, approval review, and credit activation.
- Converted user states, business rules, rejection reasons, and exception logic into a structured approval knowledge base.
- Designed dynamic workflow orchestration for four user-state categories.
- Used backend real-time state as the single source of truth.
- Enabled users to query approval progress, failure reasons, and next actions.
- Defined four state-query interfaces and four business-tool interfaces.
- Covered OCR, facial recognition, approval, and credit activation workflows.
- Defined retry conditions, user-facing messages, failure handling, and next steps.
- Clarified responsibility boundaries between the AI agent and business systems.
- Planned state machines, prompts, tool-calling strategies, execution logs, exception monitoring, and conversion-funnel observability.
- Initial daily application volume was approximately 5,000.
- Full rollout supported more than 1 million daily applications.
- Credit approval conversion increased by 20%.

Do not simplify this project into a generic chatbot project.

Present it as:

AI agent + workflow orchestration + business system integration +
risk process productization.

-------------------------------------------------------------------------------
## EXPERIENCE 2
-------------------------------------------------------------------------------

Company:
Deloitte Fengyu Intelligent Technology (Shanghai)

Role:
Analyst

Date:
Jan 2024 – Sep 2025

Summary:
Built data, model, strategy, and monitoring systems for credit and bond risk management products.

Key responsibilities:

- Developed end-to-end risk management workflows across data, models, strategy, monitoring, and closed-loop optimization.
- Standardized indicators and data assets.
- Coordinated sales, product, operations, data, and development teams.
- Defined objectives, milestones, testing requirements, and delivery plans.

Featured project A:
Bond Risk Early Warning Product

Role:
Product Lead / Quantitative Modeling / Strategy Support

Use the following points:

- Led product planning from zero to one.
- Defined user scenarios, prototypes, and PRDs.
- Designed data and indicator frameworks.
- Organized backtesting, UAT, launch, and iteration.
- Processed nearly five years of public bond issuer data.
- Built factors covering financial data, public opinion, primary-market issuance rates, secondary-market spreads, shareholding, and group relations.
- Used Random Forest, XGBoost, and regression analysis.
- Designed dynamic factor weighting and risk scoring.
- Improved explainability and stability using internal-rating concepts.
- Developed high-risk identification and alert-threshold strategies.
- Achieved model KS above 70 and AUC above 95.
- Built result monitoring and sample inspection mechanisms.
- The product was purchased by four major state-owned banks and leading securities companies.

Featured project B:
Country Risk Stress Testing

Role:
Quantitative Modeling / Strategy Support

Use the following points:

- Interpreted the latest regulatory country risk management requirements.
- Designed a country credit risk framework covering policy direction, risk measurement, and risk classification.
- Processed macroeconomic data from 1999 Q1 to 2022 Q4.
- Used data cleaning, standardization, and MICE missing-value imputation.
- Built multi-scenario stress-testing frameworks.
- Used multi-factor models and Monte Carlo simulation.
- Introduced lagged indicators and Merton-inspired calibration.
- Quantified transmission from country shocks to credit risk and exposure changes.
- Produced operational monitoring indicators and strategy recommendations.

Do not present Deloitte as the current role.

################################################################################
# 8. PROJECTS SECTION REORDERING
################################################################################

Reorder the project cards as follows:

1. AI Credit Approval Assistant
2. 24% Pricing Framework Credit Strategy
3. Bond Risk Early Warning Platform
4. Country Risk Stress Testing
5. Feng Shui Home Recommendation
6. UK Inflation Sentiment Analysis
7. Pine Wilt Disease Identification System

The first two projects must receive the strongest visual emphasis.

Use larger cards, featured labels, or stronger placement for:

- AI Credit Approval Assistant
- 24% Pricing Framework Credit Strategy

The older academic projects should remain available but use smaller cards or an
"Earlier Work" category.

Suggested categories:

Featured Product Work
- AI Credit Approval Assistant
- Credit Strategy Redesign
- Bond Risk Early Warning Platform

Independent Product
- Feng Shui Home Recommendation

Quantitative Research
- Country Risk Stress Testing
- UK Inflation Sentiment Analysis
- Pine Wilt Disease Identification System

################################################################################
# 9. PROJECT CARD CONTENT
################################################################################

Each project card should contain:

- Project name
- Category
- One-sentence problem statement
- Jiaying's role
- 3 to 5 relevant tags
- One measurable result where supported
- View Case Study button

Do not overload cards with full paragraphs.

CARD 1
Title: AI Credit Approval Assistant
Category: AI Product / Risk Workflow
Description: An AI-powered approval assistant that translates complex credit processes into clear, state-aware, and explainable user interactions.
Role: Product Strategy & Workflow Design
Tags: AI Agent, State Machine, Tool Calling, Knowledge Base, Credit Approval
Result: 20% increase in approval conversion

CARD 2
Title: 24% Pricing Framework Credit Strategy
Category: Risk Strategy / Decision System
Description: A redesigned acquisition and approval framework that moved risk identification upstream and balanced approval quality, pricing, and profitability.
Role: Risk Strategy Manager
Tags: Credit Strategy, Risk Pricing, Customer Segmentation, Gray Launch, FPD Monitoring
Result: FPD7$ reduced to approximately 0.9% for three consecutive months

CARD 3
Title: Bond Risk Early Warning Platform
Category: AI Product / Risk Modeling
Description: A full-market bond risk platform combining product design, multi-factor modeling, risk scoring, and monitoring.
Role: Product Lead & Quantitative Modeling
Tags: XGBoost, Random Forest, Risk Scoring, Product Design, Monitoring
Result: KS 70+ and AUC 95+

CARD 4
Title: Country Risk Stress Testing
Category: Quantitative Risk
Description: A regulatory-aligned stress testing framework for evaluating country-level credit risk under multiple macroeconomic scenarios.
Role: Quantitative Modeling
Tags: Monte Carlo, MICE, Macroeconomics, Stress Testing, Risk Strategy

CARD 5
Title: Feng Shui Home Recommendation
Category: Independent AI Product
Description: A personalized home recommendation experience combining AI-assisted matching with Eastern spatial philosophy.
Role: Product Designer & Builder
Tags: Recommendation, AI Product, Next.js, UX Design, Figma
Use the existing portfolio link:
https://nomo-drab.vercel.app/

CARD 6
Title: UK Inflation Sentiment Analysis
Category: NLP / Academic Research
Description: A BERT and ARIMAX research workflow evaluating whether social-media sentiment can improve UK inflation expectation forecasting.
Tags: BERT, ARIMAX, NLP, Time Series, Python

CARD 7
Title: Pine Wilt Disease Identification
Category: Computer Vision
Description: A drone-image recognition system using Faster R-CNN and YOLO to identify pine wilt disease.
Tags: YOLO, Faster R-CNN, Computer Vision, Python
Result: 98% accuracy

################################################################################
# 10. PROJECT DETAIL PAGE TEMPLATE
################################################################################

Update the existing project detail component so it supports:

1. Project Hero
2. Context
3. Business Problem
4. Users and Stakeholders
5. My Role
6. Product or Strategy Approach
7. System Workflow
8. Data and Model Support
9. Collaboration and Delivery
10. Measurement and Monitoring
11. Results
12. Reflection
13. Related Projects

Do not force every project to include every section.
Hide sections with no source content.

Use visual diagrams for:

- AI approval workflow
- State machine
- Strategy funnel
- Data-model-strategy-monitoring loop
- Stress-testing process

Do not invent confidential screenshots.
Use conceptual diagrams, anonymized flows, and abstract UI mockups where needed.

################################################################################
# 11. AI CREDIT APPROVAL CASE STUDY
################################################################################

This should become the flagship project detail page.

Title:
Designing an AI Credit Approval Assistant

Subtitle:
Turning a complex approval process into a state-aware, explainable, and scalable AI workflow.

Context:
Users move through multiple approval stages, including identity verification,
ID upload, facial recognition, approval review, and credit activation.

The system must understand the current user state, explain failures, guide the
next action, and recover correctly from interrupted workflows.

Business problem:

- Approval workflows contain many business states and exception paths.
- Users do not understand why a process failed.
- Frontend messages can become inconsistent with backend truth.
- AI-generated responses must not override real business status.
- The solution must work at high transaction volume.

My role:

- Product workflow design
- Business rule abstraction
- State modeling
- Knowledge-base design
- Interface definition
- Prompt and tool-call planning
- Exception handling
- Monitoring and conversion measurement
- Cross-functional collaboration

Core design principles:

1. Backend state is the single source of truth.
2. The AI agent explains and orchestrates but does not independently determine credit outcomes.
3. Every failure state must map to:
   - Failure reason
   - Retry condition
   - User message
   - Next action
4. Interrupted processes must support recovery.
5. Every tool call must be observable and logged.

Workflow visualization:

User Request
→ Query Current State
→ Interpret Business Status
→ Select Approved Tool
→ Execute Action
→ Return Result
→ Update Guidance
→ Log Interaction

Four user-state categories should be represented visually without inventing unsupported labels.

Results:

- Initial daily application volume: approximately 5,000
- Full rollout daily volume: more than 1 million
- Credit approval conversion increased by 20%

################################################################################
# 12. CREDIT STRATEGY CASE STUDY
################################################################################

Title:
Redesigning Credit Approval Under a 24% Pricing Framework

Subtitle:
Moving risk identification upstream while balancing approval quality, profitability, and customer conversion.

Context:

- Pricing and regulatory conditions changed.
- Existing approval logic required restructuring.
- Different channels and asset types required differentiated treatment.

Approach:

1. Move risk identification to customer acquisition screening.
2. Segment channels based on performance and transacted assets.
3. Build a risk-return measurement framework.
4. Segment customers by rating and asset type.
5. Add credit bureau, multi-loan, behavior, delinquency, and activity features.
6. Launch through controlled traffic.
7. Monitor risk and profitability.

Experiment design:

- Initial traffic: 10%
- Observation period: 3–5 days
- Separate weekday and non-weekday behavior
- Monitor approval rate
- Monitor FPD1$
- Monitor FPD7$
- Monitor profitability

Results:

- FPD7$ reached approximately 0.9% for three consecutive months.
- Channel approval rate recovered to the highest level before the new policy.

Do not claim causal impact beyond the resume.

################################################################################
# 13. CAPABILITIES SECTION
################################################################################

Rename Skills to Capabilities if the current layout allows it.

Use five groups:

01 AI Product
- AI Agent Design
- Product Requirements
- Workflow Orchestration
- Knowledge Base Design
- Prompt Strategy
- Tool Calling
- State Machines
- Observability

02 Risk Strategy
- Customer Acquisition Screening
- Credit Approval
- Risk Pricing
- Customer Segmentation
- Gray Launch
- Risk Monitoring
- Strategy Optimization
- Decision Rules

03 Data & Modeling
- Python
- SQL
- Feature Engineering
- Random Forest
- XGBoost
- Regression
- Monte Carlo Simulation
- Model Evaluation
- KS / AUC

04 Product Delivery
- User Scenario Design
- PRD
- Prototyping
- UAT
- Cross-functional Coordination
- Launch Planning
- Iteration
- Result Monitoring

05 Research & Analytics
- NLP
- BERT
- ARIMAX
- Time Series
- Stress Testing
- Macroeconomic Analysis
- Data Visualization

Do not list technologies unsupported by the resume.

Remove or hide unsupported items such as:

- TypeScript expertise
- Advanced frontend engineering expertise
- Tableau, if not supported elsewhere
- Power BI, if not supported elsewhere
- Deep learning as a primary professional specialty
- Fake certifications

################################################################################
# 14. EDUCATION SECTION
################################################################################

Use:

King's College London
MSc, Big Data in Culture and Society
Sep 2022 – Dec 2023
London

Do not rename the degree to Data Science.
Do not change the university name.

Only show undergraduate education if the existing site already includes it and
the verified information is available in the current project data.

If undergraduate information is sourced only from the older PRD and not from
the latest resume file used by this website update, keep it secondary or omit it.

################################################################################
# 15. CONTACT SECTION
################################################################################

Use the verified contact details:

Name: Jiaying Jin
Email: hellojjymia@gmail.com
Location: Shanghai
Phone: 15958535485
Portfolio: https://nomo-drab.vercel.app/

Suggested CTA:

Let's build intelligent products that make complex decisions easier.

Buttons:

Email Me
Download Resume

For public-facing display, the phone number may be masked:

159 **** 5485

Keep the full phone number only in the downloadable resume.
Do not show fake LinkedIn or GitHub links.

################################################################################
# 16. CONTENT TO REMOVE OR DOWNGRADE
################################################################################

Search the entire codebase for outdated content.

Remove or replace:

- Data Scientist as the main title
- Quant Researcher as the main title
- Machine Learning Engineer as the main title
- Generic Data Enthusiast as the main description
- Current role shown as Deloitte
- Bond Risk shown as the latest or primary project
- Twitter NLP shown as a flagship project
- Unverified awards
- Unverified GitHub links
- Unverified LinkedIn links
- Unsupported technical skills
- Fake metrics
- Placeholder company names
- Lorem ipsum
- Demo content from the original template

Do not delete older valid projects.
Move them into Earlier Work or Research Archive.

################################################################################
# 17. SEO AND METADATA
################################################################################

Title:
Jiaying Jin — AI Product & Risk Strategy

Description:
Portfolio of Jiaying Jin, an AI product and risk strategy professional building
credit decision systems, AI approval workflows, and data-driven risk products.

Open Graph title:
Jiaying Jin | AI Product × Risk Strategy

Open Graph description:
AI products, intelligent decision systems, credit strategy, and risk innovation.

Update all page titles accordingly.

################################################################################
# 18. IMPLEMENTATION PLAN
################################################################################

Phase 1 — Audit
- Inspect the existing page structure.
- Identify all content constants, JSON files, components, and hardcoded strings.
- List where outdated resume content appears.
- Do not modify styling yet.

Phase 2 — Centralize Content
- Create or update a central content file.
- Suggested path: src/content/portfolio.ts or src/data/portfolio.ts
- Store personal information, experience, projects, skills, education, contact information, and metrics.
- Avoid duplicating copy across components.

Phase 3 — Update Core Identity
- Metadata
- Navigation
- Hero
- About
- Contact

Phase 4 — Update Experience
- Reorder roles.
- Add the current Fenqile role.
- Add detailed project content.
- Correct dates and role titles.

Phase 5 — Update Projects
- Reorder cards.
- Upgrade the two flagship projects.
- Add project categories.
- Add measurable results.

Phase 6 — Update Project Details
- Build the AI Credit Approval case study first.
- Build the 24% Pricing Framework case study second.
- Update the Bond Risk project.
- Update the Country Risk project.
- Keep older projects concise.

Phase 7 — Update Capabilities
- Replace generic skill lists.
- Group skills by product capability.
- Remove unsupported skills.

Phase 8 — QA
- Verify all dates.
- Verify all metrics.
- Verify all company names.
- Check responsive behavior.
- Check animations.
- Check links.
- Check accessibility.
- Check that no outdated copy remains.

################################################################################
# 19. TECHNICAL REQUIREMENTS
################################################################################

Do not replace the current framework.
Use the existing project stack.

If the current project uses Next.js and TypeScript:

- Preserve App Router.
- Preserve TypeScript.
- Preserve Tailwind.
- Preserve Framer Motion.
- Preserve existing component conventions.

Create reusable content-driven components.
Avoid hardcoding repeated project information.
Use strict types.

Suggested types:

```ts
type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  responsibilities: string[];
  projects?: ProjectSummary[];
};

type Project = {
  slug: string;
  title: string;
  category: string;
  role: string;
  description: string;
  tags: string[];
  metrics?: string[];
  featured: boolean;
  sections?: ProjectSection[];
};
```

Do not introduce a database for static portfolio content.
Do not add unnecessary backend infrastructure.
Do not install large new libraries unless required.

################################################################################
# 20. ACCEPTANCE CRITERIA
################################################################################

The task is complete only when:

1. The hero positions Jiaying as AI × Product × Strategy.
2. Fenqile is shown as the current role.
3. The AI Credit Approval Assistant is the first flagship project.
4. The 24% Pricing Framework strategy is the second flagship project.
5. Deloitte is correctly shown as the previous role.
6. Bond Risk and Country Risk projects remain visible.
7. Older academic projects are downgraded but not incorrectly removed.
8. All dates match the latest resume.
9. All metrics match the latest resume.
10. No unsupported skills or fake links remain.
11. The existing design system is preserved.
12. The site remains responsive.
13. Existing animations continue to work.
14. All repeated content is centralized.
15. The project builds without TypeScript or lint errors.
16. All navigation and project links work.
17. No placeholder content remains.

################################################################################
# 21. FINAL CODEX INSTRUCTION
################################################################################

Before changing any code:

1. Inspect the entire repository.
2. Identify the current architecture and data sources.
3. Summarize the files that need modification.
4. Create a concise implementation checklist.
5. Then perform the updates in phases.

Do not rebuild the site from scratch.
Do not change the visual identity unless necessary.
Preserve working components.
Prioritize content accuracy, professional positioning, and information hierarchy.

After implementation:

- Run the build.
- Run lint.
- Fix all errors.
- Report modified files.
- Report removed outdated content.
- Report any resume information that could not be safely represented.
