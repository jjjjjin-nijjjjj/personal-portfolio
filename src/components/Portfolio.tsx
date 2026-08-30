"use client";
/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Download,
  ExternalLink,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { about, capabilities, capabilityHighlights, education, experience, navItems, personal, projects } from "@/constants/portfolio";
import FlagshipShowcase from "@/components/projects/FlagshipShowcase";
import ProjectIndex from "@/components/projects/ProjectIndex";
import MagneticParticleBackground from "@/components/MagneticParticleBackground";

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

function PinkPoseMascot() {
  const [isCelebrating, setIsCelebrating] = useState(false);

  useEffect(() => {
    const sprite = new window.Image();
    sprite.src = "/characters/pink_sprite.webp";
  }, []);

  const setCelebrating = (active: boolean) => setIsCelebrating(active);
  const toggleCelebrating = () => setIsCelebrating((current) => !current);

  const setPointerPose = (active: boolean, pointerType: string) => {
    if (pointerType === "mouse") setCelebrating(active);
  };

  return (
    <button
      type="button"
      className={`pose-mascot pose-mascot-pink ${isCelebrating ? "is-celebrating" : ""}`}
      aria-label={isCelebrating ? "Pink mascot celebrating with raised arms" : "Animate the pink mascot"}
      aria-pressed={isCelebrating}
      onPointerEnter={(event) => setPointerPose(true, event.pointerType)}
      onPointerLeave={(event) => setPointerPose(false, event.pointerType)}
      onPointerUp={(event) => { if (event.pointerType !== "mouse") toggleCelebrating(); }}
      onBlur={() => setCelebrating(false)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleCelebrating();
        }
      }}
    >
      <span className="pink-sprite" aria-hidden="true" />
    </button>
  );
}

function BlueSpinMascot() {
  const reduceMotion = useReducedMotion();
  const [animationKey, setAnimationKey] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const trigger = () => {
    if (reduceMotion || isAnimating) return;
    setIsAnimating(true);
    setAnimationKey((current) => current + 1);
    window.setTimeout(() => setIsAnimating(false), 850);
  };

  return (
    <button
      type="button"
      className="pose-mascot pose-mascot-blue"
      aria-label="Spin the blue mascot"
      onPointerEnter={(event) => { if (event.pointerType === "mouse") trigger(); }}
      onClick={trigger}
    >
      <motion.span
        key={animationKey}
        className="pose-mascot-layer"
        initial={{ rotateY: 0, scale: 1, y: 0 }}
        animate={animationKey === 0 || reduceMotion ? { rotateY: 0, scale: 1, y: 0 } : { rotateY: [0, -12, 360], scale: [1, .97, 1.035, 1], y: [0, 5, -5, 0] }}
        transition={{ duration: .82, times: [0, .16, .78, 1], ease: [0.22, 1, 0.36, 1] }}
      >
        <Image src="/characters/character-4.webp" alt="" fill unoptimized sizes="(max-width: 1024px) 90vw, 38vw" style={{ objectFit: "contain", objectPosition: "bottom" }} />
      </motion.span>
    </button>
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
    <section id="about" className="chapter-section about-scene section-shell soft-grid overflow-hidden">
      <div className="about-scene-intro">
        <Reveal><span className="eyebrow">About</span><h2 className="about-statement"><span>I make</span><em>complex decisions</em><span>clear.</span></h2></Reveal>
        <Reveal className="about-scene-mascot" delay={.1}><div className="orange-scribble" /><PinkPoseMascot /></Reveal>
      </div>
      <div className="about-editorial">
        <Reveal><p className="about-lead">{about.paragraphs[0]}</p></Reveal>
        <Reveal className="about-columns" delay={.06}>{about.paragraphs.slice(1).map((paragraph) => <p className="body-copy" key={paragraph}>{paragraph}</p>)}</Reveal>
      </div>
      <Reveal><blockquote className="about-quote">“{about.quote}”</blockquote></Reveal>
      <div className="about-highlights">{capabilityHighlights.map((item, index) => <Reveal key={item.number} delay={index * .06}><article className="highlight-card"><span>{item.number}</span><h3>{item.title}</h3><p>{item.description}</p></article></Reveal>)}</div>
    </section>
  );
}

export function SkillsGrid() {
  const [activeCapabilityGroup, setActiveCapabilityGroup] = useState<string | null>(null);
  const colors = ["#F47C4D", "#5F9B6B", "#5E91C7", "#D978A8", "#8B72B8"];
  const primaryCapabilities = new Set(["AI Agent Design", "Product Requirements", "Workflow Orchestration", "Credit Approval", "Risk Pricing", "Python", "SQL", "Product Delivery", "PRD"]);
  const abilityNodes = capabilities.flatMap((group, groupIndex) => group.items.map((item, itemIndex) => ({ item, group: group.title, groupIndex, itemIndex })));
  const offsets = [[-8, 7], [5, -5], [-2, 10], [9, 2], [-6, -8], [7, 8], [-10, -1], [3, -10]];
  return (
    <section id="capabilities" className="chapter-section section-shell bg-white">
      <Reveal><div className="capability-heading-row"><SectionTitle eyebrow="How I work">Capabilities</SectionTitle><div className="capability-legend" aria-label="Filter capabilities by category"><button type="button" className={activeCapabilityGroup === null ? "is-active" : ""} onClick={() => setActiveCapabilityGroup(null)}>All</button>{capabilities.map((group, index) => <button type="button" className={activeCapabilityGroup === group.title ? "is-active" : ""} style={{ "--ability-color": colors[index] } as React.CSSProperties} onClick={() => setActiveCapabilityGroup(activeCapabilityGroup === group.title ? null : group.title)} key={group.number}><i aria-hidden="true" />{group.title}</button>)}</div></div></Reveal>
      <div className="capability-map" aria-label="All portfolio capabilities">
        <div className="capability-map-orbit" aria-hidden="true" />
        {abilityNodes.map((node, index) => {
          const isDimmed = activeCapabilityGroup !== null && activeCapabilityGroup !== node.group;
          const importance = primaryCapabilities.has(node.item) ? "ability-node-core" : node.item.length < 13 ? "ability-node-medium" : "ability-node-small";
          const [x, y] = offsets[index % offsets.length];
          return <motion.div className={`ability-node ${importance} ${isDimmed ? "is-dimmed" : ""}`} style={{ "--ability-color": colors[node.groupIndex], "--ability-x": `${x}px`, "--ability-y": `${y}px`, "--ability-delay": `${(index % 9) * -.45}s` } as React.CSSProperties} initial={{ opacity: 0, scale: .65, y: 24 }} whileInView={{ opacity: isDimmed ? .16 : 1, scale: 1, y: 0 }} viewport={{ once: true, amount: .15 }} animate={{ opacity: isDimmed ? .16 : 1 }} transition={{ duration: .5, delay: Math.min(index * .018, .45), ease: [0.22, 1, 0.36, 1] }} key={`${node.group}-${node.item}`}><span className="ability-node-inner"><i aria-hidden="true" />{node.item}</span><small>{node.group}</small></motion.div>;
        })}
      </div>
    </section>
  );
}

export function Projects() {
  const flagshipProjects = projects.slice(0, 1);
  const additionalProjects = projects.slice(1);
  return (
    <section id="projects" className="projects-section section-shell bg-cream">
      <Reveal><div className="projects-intro"><SectionTitle eyebrow="AI products & risk solutions">Projects</SectionTitle><p>Intelligent systems shaped through product thinking, risk strategy and measurable delivery.</p></div></Reveal>
      <FlagshipShowcase projects={flagshipProjects} />
      <ProjectIndex projects={additionalProjects} />
    </section>
  );
}

export function Timeline() {
  return (
    <section id="experience" className="experience-section section-shell soft-grid overflow-hidden">
      <Reveal><div className="experience-heading"><SectionTitle eyebrow="My professional journey">Experience</SectionTitle><p>Building intelligent decision products from strategy and workflow design through launch, measurement and iteration.</p></div></Reveal>
      <div className="experience-editorial">
        <div className="experience-timeline">
          <motion.div className="experience-line" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, amount: .15 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} aria-hidden="true" />
          {experience.map((item, index) => <motion.article className="experience-entry" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .55, delay: index * .08, ease: [0.22, 1, 0.36, 1] }} key={item.period}><span className="experience-dot" aria-hidden="true" /><div className="experience-period">{item.period}</div><div className="experience-card"><span>{index === 0 ? "CURRENT ROLE" : index === 1 ? "PREVIOUS ROLE" : "EDUCATION"}</span><h3>{item.company}</h3><strong>{item.role}</strong><p>{item.summary}</p><ul>{item.responsibilities.map(point => <li key={point}>{point}</li>)}</ul>{item.highlights && <div className="experience-results">{item.highlights.map(highlight => <span key={highlight}>{highlight}</span>)}</div>}</div></motion.article>)}
        </div>
        <Reveal className="experience-mascot" delay={.08}><span>PRODUCT<br />× STRATEGY</span><BlueSpinMascot /></Reveal>
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
    <section id="contact" className="contact-section overflow-hidden">
      <div className="contact-grid" aria-hidden="true" />
      <div className="contact-scene section-shell">
        <Reveal className="contact-copy"><span className="eyebrow border-white/25 bg-white/10">Let’s work together</span><h2>Let’s build<br /><em>intelligent</em><br />products.</h2><p>Let’s build intelligent products that make complex decisions easier.</p><div className="contact-details"><a className="contact-link" href={`mailto:${personal.email}`}><Mail /> {personal.email}</a><span className="contact-link"><MapPin /> {personal.location}</span><span className="contact-link"><Phone /> {personal.phoneDisplay}</span></div><div className="contact-actions"><a className="button button-light" href={`mailto:${personal.email}`}>Email Me <ArrowRight /></a><a className="button button-ghost" href="/Jiaying-Jin-Resume.pdf" download>Download Resume <Download /></a></div></Reveal>
        <Reveal className="contact-mascot" delay={.1}><div className="speech-bubble">Let’s work<br />together!</div><Image src="/characters/character-2.webp" alt="Jiaying's welcoming green 3D mascot" fill unoptimized sizes="(max-width: 1024px) 100vw, 52vw" style={{ objectFit: "contain", objectPosition: "bottom" }} /></Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return <footer className="flex flex-col gap-3 bg-ink px-6 py-8 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between lg:px-16"><strong className="display text-xl text-white">JY.</strong><span>© 2026 Jiaying Jin. Designed with curiosity.</span><a href="#home">Back to top ↑</a></footer>;
}

export default function Portfolio() {
  return <><Header /><main className="portfolio-main"><Hero /><div className="particle-zone"><MagneticParticleBackground /><div className="particle-zone-content"><About /><Timeline /><Projects /><SkillsGrid /><Playground /><Education /></div></div><ContactForm /></main><Footer /></>;
}
