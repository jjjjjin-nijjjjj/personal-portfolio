"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Bot, Check, Clock3, FileScan, ScanFace, ShieldCheck, UserRound } from "lucide-react";
import type { Project } from "@/constants/portfolio";

const approvalSteps = [
  { label: "User", icon: UserRound },
  { label: "Identity Verification", icon: ShieldCheck },
  { label: "OCR / ID Upload", icon: FileScan },
  { label: "Face Recognition", icon: ScanFace },
  { label: "Approval Review", icon: Clock3 },
  { label: "Credit Activation", icon: Check },
];

const statusSteps = [
  ["Identity Verification", "complete"],
  ["Face Recognition", "complete"],
  ["Approval Review", "current"],
  ["Credit Activation", "upcoming"],
] as const;

export default function FlagshipShowcase({ projects }: { projects: Project[] }) {
  const project = projects[0];
  const reduceMotion = useReducedMotion();
  if (!project) return null;

  return (
    <motion.div className="flagship-showcase" initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: reduceMotion ? 0 : .4, ease: [0.22, 1, 0.36, 1] }}>
      <article className="flagship-stage">
        <div className="flagship-stage-inner">
          <section className="flagship-identity" aria-labelledby="flagship-title">
            <span className="flagship-number">{project.number}</span>
            <span className="flagship-kicker">{project.category}</span>
            <h3 id="flagship-title">{project.title}</h3>
            <p>{project.description}</p>
            <Link className="flagship-link flagship-link-light" href={`/projects/${project.slug}`}>View case study <ArrowRight /></Link>
          </section>

          <section className="flagship-system" aria-label="Credit approval workflow">
            <span className="project-category">AI PRODUCT / RISK WORKFLOW</span>
            <h4>AI agent + workflow orchestration<br />for credit approval at scale.</h4>
            <div className="approval-workflow">
              {approvalSteps.map(({ label, icon: Icon }, index) => <div className="approval-step" key={label}><span><Icon /></span><strong>{label}</strong>{index < approvalSteps.length - 1 && <ArrowRight aria-hidden="true" />}</div>)}
            </div>
            <div className="state-rail"><span>State Tracking &amp; Exception Handling</span></div>
            <div className="flagship-metrics" aria-label="Verified project outcomes">
              <div><strong>1M+</strong><span>Daily applications<br />at full rollout</span></div>
              <div><strong>20%</strong><span>Approval conversion<br />increase</span></div>
              <div><strong>4</strong><span>User-state<br />categories</span></div>
            </div>
          </section>

          <section className="assistant-preview" aria-label="Conceptual Credit Approval Assistant interface">
            <header><span><Bot /> Credit Approval Assistant</span><small><i /> Live state</small></header>
            <div className="assistant-status">
              <span>Current status</span>
              {statusSteps.map(([label, state]) => <div className={`status-row status-${state}`} key={label}><i>{state === "complete" ? <Check /> : ""}</i><strong>{label}</strong><small>{state === "complete" ? "Complete" : state === "current" ? "In review" : "Next"}</small></div>)}
            </div>
            <div className="assistant-next"><span>Next step</span><p>Approval review is in progress. The assistant will explain the result and guide the next action.</p></div>
            <div className="assistant-input"><span>Ask the assistant</span><strong>How can I check my approval progress?</strong><button type="button" aria-label="Example assistant action" disabled><ArrowRight /></button></div>
            <div className="assistant-tools"><span>Approved tools</span><div>{["State Query", "Progress Check", "Reasons", "Retry Guide"].map(tool => <small key={tool}>{tool}</small>)}</div></div>
          </section>
        </div>
      </article>
    </motion.div>
  );
}
