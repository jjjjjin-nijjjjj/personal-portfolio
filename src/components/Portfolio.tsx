"use client";
/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Download,
  ExternalLink,
  LineChart,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { about, capabilities, capabilityHighlights, education, experience, navItems, personal, projects } from "@/constants/portfolio";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const CAROUSEL_IMAGES = [
  { src: "/characters/character-1.webp", bg: "#F47C4D" },
  { src: "/characters/character-2.webp", bg: "#6BBF7A" },
  { src: "/characters/character-3.webp", bg: "#E882B4" },
  { src: "/characters/character-4.webp", bg: "#6EB5FF" },
] as const;

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reveal}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ eyebrow, children, light = false }: { eyebrow: string; children: React.ReactNode; light?: boolean }) {
  return (
    <div className={light ? "text-white" : "text-ink"}>
      <span className={`eyebrow ${light ? "border-white/25 bg-white/10" : ""}`}>{eyebrow}</span>
      <h2 className="section-title">{children}</h2>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [isSideNav, setIsSideNav] = useState(false);
  const [isSideExpanded, setIsSideExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const collapseTimer = useRef<number | null>(null);

  const clearCollapseTimer = useCallback(() => {
    if (collapseTimer.current) window.clearTimeout(collapseTimer.current);
  }, []);
  const expandSideNav = useCallback(() => {
    if (!isSideNav) return;
    clearCollapseTimer();
    setIsSideExpanded(true);
  }, [clearCollapseTimer, isSideNav]);
  const scheduleSideNavCollapse = useCallback((delay = 800) => {
    if (!isSideNav) return;
    clearCollapseTimer();
    collapseTimer.current = window.setTimeout(() => setIsSideExpanded(false), delay);
  }, [clearCollapseTimer, isSideNav]);

  useEffect(() => {
    const updateNavigationPosition = () => {
      const nextIsSideNav = window.scrollY > window.innerHeight * 0.72;
      setIsSideNav((previous) => {
        if (!previous && nextIsSideNav) setIsSideExpanded(false);
        return nextIsSideNav;
      });
      let current = "home";
      navItems.forEach(({ href }) => {
        const id = href.slice(1);
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.42) current = id;
      });
      setActiveSection(current);
    };
    updateNavigationPosition();
    window.addEventListener("scroll", updateNavigationPosition, { passive: true });
    window.addEventListener("resize", updateNavigationPosition);
    return () => {
      window.removeEventListener("scroll", updateNavigationPosition);
      window.removeEventListener("resize", updateNavigationPosition);
    };
  }, []);
  useEffect(() => () => clearCollapseTimer(), [clearCollapseTimer]);

  const handleNavigationClick = () => scheduleSideNavCollapse(600);

  return (
    <header
      className={`site-header ${isSideNav ? "site-header-side" : ""} ${isSideExpanded ? "site-header-expanded" : ""}`}
      onMouseEnter={expandSideNav}
      onMouseLeave={() => scheduleSideNavCollapse()}
      onFocusCapture={expandSideNav}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) scheduleSideNavCollapse(); }}
    >
      <div className="site-nav mx-auto flex max-w-[1480px] items-center justify-between rounded-full px-5 py-3 backdrop-blur-md">
        <a href="#home" className="brand-mark display text-2xl" aria-label="Jiaying Jin home">JY.</a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => <a key={item.label} className={`nav-link ${activeSection === item.href.slice(1) ? "is-active" : ""}`} href={item.href} onClick={handleNavigationClick} aria-current={activeSection === item.href.slice(1) ? "location" : undefined}><span className="nav-dot" aria-hidden="true" /><span className="nav-label">{item.label}</span><span className="nav-tooltip" aria-hidden="true">{item.label}</span></a>)}
          <a className="nav-resume" href="/Jiaying-Jin-Resume.pdf" download onClick={handleNavigationClick}><Download className="nav-download-icon" /><span className="nav-label">Download Resume</span></a>
        </nav>
        <button className="icon-button lg:hidden" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="mobile-nav mx-auto mt-2 grid max-w-[1480px] gap-1 rounded-3xl p-3 shadow-xl lg:hidden" aria-label="Mobile navigation">
          {navItems.map((item) => <a key={item.label} className="rounded-2xl px-4 py-3" href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
          <a className="rounded-2xl bg-orange px-4 py-3 text-sm font-semibold" href="/Jiaying-Jin-Resume.pdf" download>Download Resume</a>
        </nav>
      )}
    </header>
  );
}

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    CAROUSEL_IMAGES.forEach(({ src }) => { const image = new window.Image(); image.src = src; });
    const update = () => setIsMobile(window.innerWidth < 640);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const navigate = useCallback((direction: "next" | "prev") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((previous) => direction === "next" ? (previous + 1) % 4 : (previous + 3) % 4);
    window.setTimeout(() => setIsAnimating(false), 650);
  }, [isAnimating]);

  const roles = { center: activeIndex, left: (activeIndex + 3) % 4, right: (activeIndex + 1) % 4, back: (activeIndex + 2) % 4 };
  type Role = keyof typeof roles;
  const getRole = (index: number) => (Object.entries(roles).find(([, value]) => value === index)?.[0] ?? "back") as Role;
  const itemStyle = (role: Role): React.CSSProperties => ({
    position: "absolute",
    aspectRatio: "0.6 / 1",
    transform: role === "center" ? `translateX(-50%) scale(${isMobile ? 1.18 : 1.55})` : "translateX(-50%) scale(1)",
    filter: role === "center" ? "blur(0)" : role === "back" ? "blur(4px)" : "blur(2px)",
    opacity: role === "left" || role === "right" ? .78 : 1,
    zIndex: role === "center" ? 20 : role === "back" ? 5 : 10,
    left: role === "left" ? (isMobile ? "18%" : "29%") : role === "right" ? (isMobile ? "82%" : "71%") : "50%",
    height: role === "center" ? (isMobile ? "55%" : "86%") : role === "back" ? (isMobile ? "13%" : "20%") : (isMobile ? "16%" : "26%"),
    bottom: role === "center" ? (isMobile ? "20%" : "1%") : (isMobile ? "31%" : "11%"),
    transition: "transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1)",
    willChange: "transform, filter, opacity, left",
  });

  return (
    <section id="home" className="carousel-hero" style={{ backgroundColor: CAROUSEL_IMAGES[activeIndex].bg }}>
      <div className="hero-grid" />
      <h1 className="carousel-ghost" aria-label={personal.name}>{personal.name}</h1>
      <div className="carousel-facts" aria-label="Profile highlights">
        <span><small>Location</small>{personal.location}</span><span><small>Current Role</small>{personal.currentRole}</span><span><small>Experience</small>{personal.experience}</span><span><small>Education</small>{personal.education}</span><span><small>Focus</small>{personal.focus}</span>
      </div>
      <div className="absolute inset-0 z-[3]" aria-live="polite" aria-label={`Character ${activeIndex + 1} of 4`}>
        {CAROUSEL_IMAGES.map((image, index) => {
          const role = getRole(index);
          return <div key={image.src} style={itemStyle(role)} aria-hidden={role !== "center"}><img src={image.src} alt={role === "center" ? `Jiaying 3D character ${index + 1}` : ""} draggable={false} width={1350} height={1800} className="mascot-image h-full w-full object-contain object-bottom" loading="eager" /></div>;
        })}
      </div>
      <div className="carousel-copy">
        <span className="carousel-eyebrow">{personal.eyebrow}</span>
        <div className="carousel-kicker">{personal.positioning}</div>
        <p><span className="hidden sm:inline">{personal.description}</span><span className="sm:hidden">{personal.compactDescription}</span></p>
        <div className="flex gap-3">
          <button className="carousel-arrow" onClick={() => navigate("prev")} disabled={isAnimating} aria-label="Previous character"><ArrowLeft /></button>
          <button className="carousel-arrow" onClick={() => navigate("next")} disabled={isAnimating} aria-label="Next character"><ArrowRight /></button>
        </div>
      </div>
      <div className="carousel-actions"><a className="carousel-cta" href="#projects">View My Work <ArrowRight /></a><a className="carousel-resume" href="/Jiaying-Jin-Resume.pdf" download>Download Resume <Download /></a></div>
      <a className="carousel-scroll" href="#about"><ArrowDown /> Scroll to discover</a>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="chapter-section section-shell soft-grid overflow-hidden">
      <div className="chapter-grid">
        <Reveal><SectionTitle eyebrow="About">{about.title}</SectionTitle><div className="mt-6 space-y-3">{about.paragraphs.map((paragraph) => <p className="body-copy" key={paragraph}>{paragraph}</p>)}</div><blockquote className="about-quote">“{about.quote}”</blockquote></Reveal>
        <Reveal className="chapter-mascot" delay={.12}><div className="orange-scribble" /><Image src="/characters/character-3.webp" alt="Jiaying's cheerful 3D mascot" fill unoptimized sizes="(max-width: 1024px) 90vw, 42vw" style={{ objectFit: "contain", objectPosition: "bottom" }} /></Reveal>
      </div>
      <div className="about-highlights">{capabilityHighlights.map((item, index) => <Reveal key={item.number} delay={index * .06}><article className="highlight-card"><span>{item.number}</span><h3>{item.title}</h3><p>{item.description}</p></article></Reveal>)}</div>
    </section>
  );
}

export function SkillsGrid() {
  const [activeCapabilityGroup, setActiveCapabilityGroup] = useState<string | null>(null);
  const colors = ["#F47C4D", "#5F9B6B", "#5E91C7", "#D978A8", "#8B72B8"];
  const primaryCapabilities = new Set(["AI Agent Design", "Product Requirements", "Workflow Orchestration", "Credit Approval", "Risk Pricing", "Python", "SQL", "Product Delivery", "PRD"]);
  const abilityNodes = capabilities.flatMap((group, groupIndex) => group.items.map((item, itemIndex) => ({ item, group: group.title, groupIndex, itemIndex })));
  const abilityRows = Array.from({ length: 6 }, (_, rowIndex) => abilityNodes.filter((_, index) => index % 6 === rowIndex));
  return (
    <section id="capabilities" className="chapter-section section-shell bg-white">
      <Reveal><div className="capability-heading-row"><SectionTitle eyebrow="How I work">Capabilities</SectionTitle><div className="capability-legend" aria-label="Filter capabilities by category"><button type="button" className={activeCapabilityGroup === null ? "is-active" : ""} onClick={() => setActiveCapabilityGroup(null)}>All</button>{capabilities.map((group, index) => <button type="button" className={activeCapabilityGroup === group.title ? "is-active" : ""} style={{ "--ability-color": colors[index] } as React.CSSProperties} onClick={() => setActiveCapabilityGroup(activeCapabilityGroup === group.title ? null : group.title)} key={group.number}><i aria-hidden="true" />{group.title}</button>)}</div></div></Reveal>
      <div className="capability-map" aria-label="All portfolio capabilities">
        <div className="capability-map-orbit" aria-hidden="true" />
        {abilityRows.map((row, rowIndex) => <div className="ability-row" style={{ "--row-shift": `${[2, 7, 0, 5, 9, 3][rowIndex]}%` } as React.CSSProperties} key={rowIndex}>{row.map((node) => {
          const index = abilityNodes.indexOf(node);
          const isDimmed = activeCapabilityGroup !== null && activeCapabilityGroup !== node.group;
          const importance = primaryCapabilities.has(node.item) ? "ability-node-core" : node.item.length < 13 ? "ability-node-medium" : "ability-node-small";
          return <motion.div className={`ability-node ${importance} ${isDimmed ? "is-dimmed" : ""}`} style={{ "--ability-color": colors[node.groupIndex], "--ability-x": `${((index * 17) % 11) - 5}px`, "--ability-y": `${((index * 11) % 9) - 4}px`, "--ability-delay": `${(index % 9) * -.45}s` } as React.CSSProperties} initial={{ opacity: 0, scale: .65, y: 24 }} whileInView={{ opacity: isDimmed ? .16 : 1, scale: 1, y: 0 }} viewport={{ once: true, amount: .15 }} animate={{ opacity: isDimmed ? .16 : 1 }} transition={{ duration: .5, delay: Math.min(index * .018, .45), ease: [0.22, 1, 0.36, 1] }} key={`${node.group}-${node.item}`}><span className="ability-node-inner"><i aria-hidden="true" />{node.item}</span><small>{node.group}</small></motion.div>;
        })}</div>)}
      </div>
    </section>
  );
}

export function Projects() {
  const renderProject = (project: (typeof projects)[number], duplicate = false) => {
    const index = projects.indexOf(project);
    return <article className={`project-card marquee-card ${index < 2 ? "project-card-featured" : ""}`} key={`${duplicate ? "copy-" : ""}${project.slug}`} aria-hidden={duplicate || undefined}><div className="project-visual" style={{ background: project.color }}><span>{project.number}</span><small>{index < 2 ? "FLAGSHIP" : "EARLIER WORK"}</small><LineChart aria-hidden="true" /></div><div className="p-5"><span className="project-category">{project.category}</span><h3>{project.title}</h3><p>{project.description}</p>{project.result && <strong className="project-result">{project.result}</strong>}<div className="project-tags">{project.tags.slice(0, 3).map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>{!duplicate && (index < 2 ? <Link className="project-link" href={`/projects/${project.slug}`}>View Case Study <ArrowRight /></Link> : project.href ? <a className="project-link" href={project.href} target="_blank" rel="noreferrer">View Project <ExternalLink /></a> : <span className="project-link project-link-muted">Earlier Work</span>)}</div></article>;
  };
  return (
    <section id="projects" className="chapter-section section-shell bg-cream">
      <Reveal><SectionTitle eyebrow="AI product, strategy & research">Selected work</SectionTitle></Reveal>
      <div className="project-marquee" role="region" aria-label="Selected projects marquee"><div className="project-marquee-track"><div className="project-marquee-set">{projects.map(project => renderProject(project))}</div><div className="project-marquee-set" aria-hidden="true">{projects.map(project => renderProject(project, true))}</div></div></div>
    </section>
  );
}

export function Timeline() {
  return (
    <section id="experience" className="chapter-section section-shell soft-grid overflow-hidden">
      <div className="chapter-grid">
        <Reveal><SectionTitle eyebrow="My professional journey">Experience</SectionTitle><div className="timeline timeline-compact">{experience.map((item, index) => <motion.article className="timeline-item" initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }} key={item.period}><span>{item.period}</span><div><h3>{item.company}</h3><strong>{item.role}</strong><p>{item.summary}</p><ul>{item.responsibilities.map(point => <li key={point}>{point}</li>)}</ul>{item.highlights && <div className="timeline-highlights">{item.highlights.map(highlight => <span key={highlight}>{highlight}</span>)}</div>}</div></motion.article>)}</div></Reveal>
        <Reveal className="chapter-mascot" delay={.1}><Image src="/characters/character-4.webp" alt="Jiaying's focused blue 3D mascot" fill unoptimized sizes="(max-width: 1024px) 80vw, 38vw" style={{ objectFit: "contain", objectPosition: "bottom" }} /></Reveal>
      </div>
    </section>
  );
}

export function Playground() {
  return <section id="ai-lab" className="chapter-section playground section-shell"><Reveal><div className="grid items-center gap-8 md:grid-cols-[1fr_auto]"><div><span className="eyebrow border-white/20 bg-white/10 text-white">Independent product</span><h2 className="section-title text-white">AI Lab</h2><p className="mt-4 max-w-xl text-lg text-white/75">Exploring AI-assisted recommendation experiences, workflow design, and product concepts that make complex decisions easier to use.</p><a className="button button-ghost mt-7" href={personal.portfolio} target="_blank" rel="noreferrer">Explore Feng Shui Home <ExternalLink /></a></div><Sparkles className="hidden h-28 w-28 text-orange md:block" strokeWidth={1} /></div></Reveal></section>;
}

export function Education() {
  return <section id="education" className="chapter-section section-shell bg-cream"><Reveal><SectionTitle eyebrow="Education">Academic foundation</SectionTitle><article className="education-card"><span>{education.period}</span><div><h3>{education.school}</h3><strong>{education.degree}</strong><p>{education.location}</p></div></article></Reveal></section>;
}

export function ContactForm() {
  return (
    <section id="contact" className="chapter-section section-shell contact-section overflow-hidden">
      <div className="grid items-center gap-10 lg:grid-cols-[.85fr_1.15fr]">
        <Reveal><SectionTitle eyebrow="Let’s work together" light>Let’s connect</SectionTitle><p className="mt-5 max-w-md text-lg text-white/80">Let’s build intelligent products that make complex decisions easier.</p><div className="mt-8 space-y-3 text-white"><a className="contact-link" href={`mailto:${personal.email}`}><Mail /> {personal.email}</a><span className="contact-link"><MapPin /> {personal.location}</span><span className="contact-link"><Phone /> {personal.phoneDisplay}</span><a className="button button-light mt-3" href={`mailto:${personal.email}`}>Email Me <ArrowRight /></a><a className="button button-ghost mt-3 ml-3" href="/Jiaying-Jin-Resume.pdf" download>Download Resume <Download /></a></div></Reveal>
        <Reveal className="relative min-h-[480px]" delay={.1}><div className="speech-bubble">Let’s build<br />something<br />meaningful.</div><Image src="/characters/character-2.webp" alt="Jiaying's welcoming green 3D mascot" fill unoptimized sizes="(max-width: 1024px) 90vw, 50vw" style={{ objectFit: "contain", objectPosition: "bottom" }} /></Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return <footer className="flex flex-col gap-3 bg-ink px-6 py-8 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between lg:px-16"><strong className="display text-xl text-white">JY.</strong><span>© 2026 Jiaying Jin. Designed with curiosity.</span><a href="#home">Back to top ↑</a></footer>;
}

export default function Portfolio() {
  return <><Header /><main className="portfolio-main"><Hero /><About /><Timeline /><Projects /><SkillsGrid /><Playground /><Education /><ContactForm /></main><Footer /></>;
}
