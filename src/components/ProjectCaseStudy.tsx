"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Download } from "lucide-react";
import Link from "next/link";
import { projects, type Project } from "@/constants/portfolio";

export default function ProjectCaseStudy({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const related = projects.filter((item) => item.slug !== project.slug).slice(0, 3);
  const reveal = reduce ? {} : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <main className="case-page">
      <header className="case-nav">
        <Link href="/#projects"><ArrowLeft /> Back to projects</Link>
        <a href="/Jiaying-Jin-Resume.pdf" download>Resume <Download /></a>
      </header>

      <section className="case-hero" style={{ "--case-color": project.color } as React.CSSProperties}>
        <motion.div {...reveal}>
          <span className="eyebrow">{project.category}</span>
          <p className="case-number">PROJECT {project.number}</p>
          <h1>{project.detailTitle ?? project.title}</h1>
          {project.subtitle && <p className="case-subtitle">{project.subtitle}</p>}
          <div className="case-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </motion.div>
        <motion.aside {...reveal} className="case-summary">
          <span>My role</span><strong>{project.role}</strong>
          {project.result && <><span>Measured result</span><strong>{project.result}</strong></>}
        </motion.aside>
      </section>

      {project.workflow && (
        <motion.section {...reveal} className="case-block case-workflow">
          <div className="case-heading"><span>01</span><div><p>Conceptual diagram</p><h2>{project.slug === "ai-credit-approval-assistant" ? "System workflow" : "Strategy funnel"}</h2></div></div>
          <ol>{project.workflow.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong>{index < project.workflow!.length - 1 && <ArrowRight aria-hidden="true" />}</li>)}</ol>
          {project.stateCategoryCount && <div className="state-categories" aria-label="Four user-state categories">{Array.from({ length: project.stateCategoryCount }, (_, index) => <span key={index}>State category {String(index + 1).padStart(2, "0")}</span>)}</div>}
        </motion.section>
      )}

      <div className="case-content">
        {project.sections?.map((section, index) => (
          <motion.section {...reveal} className="case-block" key={section.title}>
            <div className="case-heading"><span>{String(index + 2).padStart(2, "0")}</span><h2>{section.title}</h2></div>
            {section.body && <p className="case-body">{section.body}</p>}
            {section.items && <ul className="case-list">{section.items.map((item) => <li key={item}><Check aria-hidden="true" /><span>{item}</span></li>)}</ul>}
          </motion.section>
        ))}
      </div>

      <section className="case-related">
        <p className="eyebrow">Continue exploring</p><h2>Related projects</h2>
        <div>{related.map((item) => <Link href={item.detailTitle ? `/projects/${item.slug}` : "/#projects"} key={item.slug}><span>{item.number} · {item.category}</span><strong>{item.title}</strong><ArrowRight /></Link>)}</div>
      </section>
    </main>
  );
}
