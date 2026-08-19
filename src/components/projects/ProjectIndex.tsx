"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BarChart3, Box, CalendarCheck2, ExternalLink, Rocket } from "lucide-react";
import type { Project } from "@/constants/portfolio";

function MiniPreview({ project }: { project: Project }) {
  if (project.slug === "24-pricing-credit-strategy") return <div className="mini-preview strategy-preview"><div>{["Traffic", "Pre-screen", "Risk layer", "Pricing", "Approval", "Monitor"].map((step, index) => <span key={step}>{step}{index < 5 && <ArrowRight />}</span>)}</div><footer><b>10%</b> experiment traffic <b>3–5 days</b> observation <b>~0.9%</b> FPD7$</footer></div>;
  if (project.slug === "bond-risk-early-warning") return <div className="mini-preview risk-preview"><strong>89 <small>HIGH RISK</small></strong><div className="sparkline"><i /><i /><i /><i /><i /><i /></div><span>ALERTS · issuer risk trend</span></div>;
  if (project.slug === "country-risk-stress-testing") return <div className="mini-preview map-preview"><div className="world-map">● ●● ● ●●● ● ●</div><aside><span><i /> Low</span><span><i /> Medium</span><span><i /> High</span></aside></div>;
  if (project.slug === "feng-shui-home-recommendation") return <div className="mini-preview home-preview"><div className="map-tile">AI MATCH <strong>89%</strong></div><div className="home-cards"><span>South · Sunlight</span><span>East · Wood</span></div></div>;
  if (project.slug === "uk-inflation-sentiment") return <div className="mini-preview analytics-preview"><div className="chart-line chart-line-one" /><div className="chart-line chart-line-two" /><span>Sentiment Index</span><span>ARIMAX Forecast</span><strong>RMSE 0.62</strong></div>;
  return <div className="mini-preview vision-preview"><div className="forest-texture"><i /><i /><i /></div><span>YOLO + Faster R-CNN</span><strong>98% accuracy</strong></div>;
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const reduceMotion = useReducedMotion();
  const body = <><span className="project-index-number">{project.number}</span><div className="project-index-copy"><small>{project.category}</small><strong>{project.title}</strong><p>{project.description}</p><em>{project.role ?? project.tags.slice(0, 2).join(" · ")}</em></div><MiniPreview project={project} /><span className="project-row-arrow" aria-hidden="true">{project.href ? <ExternalLink /> : <ArrowRight />}</span></>;
  const className = "project-index-row";
  const motionProps = { initial: reduceMotion ? false : { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .2 }, transition: { duration: reduceMotion ? 0 : .32, delay: Math.min(index * .035, .15) } } as const;
  if (project.href) return <motion.a {...motionProps} className={className} href={project.href} target="_blank" rel="noreferrer">{body}</motion.a>;
  if (project.detailTitle) return <motion.div {...motionProps}><Link className={className} href={`/projects/${project.slug}`}>{body}</Link></motion.div>;
  return <motion.article {...motionProps} className={`${className} is-static`}>{body}</motion.article>;
}

export default function ProjectIndex({ projects }: { projects: Project[] }) {
  return (
    <section className="project-index" aria-labelledby="project-index-title">
      <div className="project-index-heading"><div><span>02—07</span><h3 id="project-index-title">More selected work<i /></h3></div><p>Product systems, quantitative risk and search research.</p></div>
      <div className="project-index-layout">
        <div className="project-index-list">{projects.map((project, index) => <ProjectRow project={project} index={index} key={project.slug} />)}</div>
        <aside className="project-philosophy">
          <span className="quote-mark">“</span><blockquote>Technology should make complex decisions <em>clearer, faster,</em> and <em>easier</em> to use.</blockquote>
          <div className="philosophy-points">
            <span><CalendarCheck2 /><strong>3+ Years</strong><small>Experience</small></span>
            <span><Box /><strong>AI + Product + Strategy</strong><small>Cross-disciplinary strength</small></span>
            <span><BarChart3 /><strong>Data Driven</strong><small>Decision oriented</small></span>
            <span><Rocket /><strong>From 0 to 1</strong><small>Product builder</small></span>
          </div>
        </aside>
      </div>
    </section>
  );
}
