"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { projects, type Project } from "@/data/portfolio-data";

/* ========================================================================= */
/*  BROWSER MOCKUP — abstract UI using project accent colors                 */
/* ========================================================================= */
function BrowserMockup({ project, size = "default" }: { project: Project; size?: "default" | "large" }) {
  const large = size === "large";
  return (
    <div className="rounded-xl overflow-hidden border border-[rgba(108,99,255,0.1)] shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
      {/* Browser chrome */}
      <div className="bg-[#f6f6f6] px-3.5 py-2 flex items-center gap-2 border-b border-[rgba(0,0,0,0.06)]">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
          <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
          <div className="w-2 h-2 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 mx-2">
          <div className="bg-white rounded-md px-3 py-0.5 text-[9px] text-fg-muted font-mono truncate border border-[rgba(0,0,0,0.05)]">
            {project.url.replace("https://", "")}
          </div>
        </div>
      </div>

      {/* Screen content */}
      <div
        className={`relative ${large ? "h-64 md:h-80" : "h-44 md:h-48"}`}
        style={{
          background: `linear-gradient(135deg, ${project.accentColor}18, ${project.accentColor2}12, #fafaf8)`,
        }}
      >
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          {/* Top nav */}
          <div className="flex items-center gap-3">
            <div
              className="rounded-lg px-2 py-1 text-[9px] font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${project.accentColor}, ${project.accentColor2})` }}
            >
              {project.icon}
            </div>
            <div className="flex-1 flex gap-3">
              {["Home", "Features", "About"].map((t) => (
                <div key={t} className="h-1.5 rounded-full w-10" style={{ background: `${project.accentColor}25` }} />
              ))}
            </div>
            <div className="h-5 w-12 rounded-md" style={{ background: `${project.accentColor}30` }} />
          </div>

          {/* Center headline */}
          <div className={`${large ? "flex items-center gap-6" : "text-center space-y-2"}`}>
            {large ? (
              <>
                <div className="flex-1 space-y-2">
                  <div className="h-2.5 rounded-full w-48" style={{ background: `${project.accentColor}40` }} />
                  <div className="h-2 rounded-full w-36" style={{ background: `${project.accentColor}25` }} />
                  <div className="h-2 rounded-full w-40" style={{ background: `${project.accentColor}15` }} />
                  <div
                    className="inline-block h-6 w-20 rounded-md mt-2"
                    style={{ background: `linear-gradient(135deg, ${project.accentColor}, ${project.accentColor2})` }}
                  />
                </div>
                <div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center"
                  style={{ background: `${project.accentColor}20` }}
                >
                  <div className="w-10 h-10 rounded-xl" style={{ background: `${project.accentColor}50` }} />
                </div>
              </>
            ) : (
              <>
                <div className="mx-auto w-10 h-10 rounded-xl" style={{ background: `${project.accentColor}25` }} />
                <div className="h-2 rounded-full w-28 mx-auto" style={{ background: `${project.accentColor}25` }} />
                <div className="h-1.5 rounded-full w-20 mx-auto" style={{ background: `${project.accentColor}15` }} />
              </>
            )}
          </div>

          {/* Bottom cards */}
          <div className={`grid ${large ? "grid-cols-4" : "grid-cols-3"} gap-2`}>
            {Array.from({ length: large ? 4 : 3 }).map((_, i) => (
              <div key={i} className="bg-white/60 backdrop-blur-sm rounded-md p-2 space-y-1 border border-white">
                <div className="h-1 rounded-full w-3/4" style={{ background: `${project.accentColor}20` }} />
                <div className="h-1 rounded-full w-full" style={{ background: `${project.accentColor}10` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/*  3D TILT CARD WRAPPER                                                     */
/* ========================================================================= */
function TiltCard({ children, className = "", intensity = 10 }: {
  children: React.ReactNode; className?: string; intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ========================================================================= */
/*  FEATURED PROJECT (DebtGoFlow) — full showcase                            */
/* ========================================================================= */
function FeaturedProject({ project }: { project: Project }) {
  return (
    <motion.div
      className="relative mb-20"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Animated gradient glow backdrop */}
      <motion.div
        className="absolute -inset-4 rounded-3xl blur-2xl opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${project.accentColor}35, transparent 60%), radial-gradient(circle at 70% 70%, ${project.accentColor2}25, transparent 60%)`,
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* "Flagship" label */}
      <motion.div
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <div className="h-px w-12" style={{ background: "var(--gradient)" }} />
        <span className="gradient-text text-xs font-bold tracking-[0.2em] uppercase">✦ Flagship Project</span>
      </motion.div>

      <TiltCard className="relative card overflow-hidden p-0" intensity={4}>
        <a href={project.url} target="_blank" rel="noopener noreferrer" data-cursor="pointer" className="block">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-0">
            {/* LEFT — Content */}
            <div className="p-7 md:p-10 lg:p-12 flex flex-col justify-center">
              {/* Category badge */}
              <div className="flex items-center gap-2 mb-5 flex-wrap">
                <span
                  className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase"
                  style={{ background: `${project.accentColor}15`, color: project.accentColor }}
                >
                  {project.category}
                </span>
                <span className="px-3 py-1 bg-accent2/10 text-accent2 text-[10px] font-bold rounded-full tracking-wider uppercase border border-accent2/20 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-accent2 rounded-full animate-pulse" />
                  LIVE
                </span>
              </div>

              {/* Name */}
              <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
                <span
                  className="gradient-text"
                  style={{ backgroundImage: `linear-gradient(135deg, ${project.accentColor}, ${project.accentColor2})` }}
                >
                  {project.name}
                </span>
              </h3>

              {/* Tagline */}
              <p className="font-display text-lg md:text-xl text-fg italic mb-6 leading-snug">
                &ldquo;{project.tagline}&rdquo;
              </p>

              {/* Problem + Solution */}
              <div className="space-y-4 mb-6">
                <div>
                  <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-fg-muted mb-1.5">The problem</span>
                  <p className="text-fg-secondary text-sm md:text-base leading-relaxed">{project.problem}</p>
                </div>
                <div>
                  <span className="inline-block text-[10px] font-bold tracking-widest uppercase gradient-text mb-1.5">The solution</span>
                  <p className="text-fg-secondary text-sm md:text-base leading-relaxed">{project.solution}</p>
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-6">
                <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-accent mb-3">Key benefits</span>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {project.benefits.map((b, i) => (
                    <motion.li
                      key={i}
                      className="flex gap-2 text-sm text-fg-secondary leading-snug"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <svg className="w-4 h-4 text-accent2 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {b}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 bg-accent/5 text-accent/80 text-[11px] font-medium rounded-lg border border-accent/10">
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-wrap items-center gap-4">
                <span className="btn-gradient inline-flex items-center gap-2">
                  Open live site
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
                <span className="text-fg-muted text-xs">{project.url.replace("https://", "")}</span>
              </div>
            </div>

            {/* RIGHT — Browser mockup + stats */}
            <div className="p-7 md:p-10 lg:p-12 flex flex-col justify-center gap-6"
              style={{ background: `linear-gradient(135deg, ${project.accentColor}08, ${project.accentColor2}04)` }}>
              <motion.div
                initial={{ rotateY: 10, opacity: 0 }}
                whileInView={{ rotateY: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3 }}
                style={{ transformStyle: "preserve-3d", transformPerspective: 1000 }}
              >
                <BrowserMockup project={project} size="large" />
              </motion.div>

              {/* Stats */}
              {project.stats && (
                <div className="grid grid-cols-3 gap-3">
                  {project.stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      className="bg-white rounded-xl p-3 border border-[rgba(108,99,255,0.08)] text-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.08 }}
                    >
                      <div
                        className="font-display text-lg md:text-xl font-bold gradient-text"
                        style={{ backgroundImage: `linear-gradient(135deg, ${project.accentColor}, ${project.accentColor2})` }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-fg-muted text-[9px] tracking-wider uppercase mt-0.5">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </a>
      </TiltCard>
    </motion.div>
  );
}

/* ========================================================================= */
/*  PROJECT CARD — regular card with hover tilt                              */
/* ========================================================================= */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TiltCard intensity={6} className="card overflow-hidden h-full">
        <a href={project.url} target="_blank" rel="noopener noreferrer" data-cursor="pointer" className="block h-full">
          {/* Mockup */}
          <div className="p-5 pb-0">
            <BrowserMockup project={project} />
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Category + Live */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span
                className="px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase"
                style={{ background: `${project.accentColor}15`, color: project.accentColor }}
              >
                {project.category}
              </span>
              <span className="px-2 py-0.5 bg-accent2/10 text-accent2 text-[9px] font-bold rounded-full tracking-wider uppercase border border-accent2/20">
                Live
              </span>
            </div>

            {/* Name + Tagline */}
            <h3
              className="font-display text-xl font-bold text-fg mb-1 transition-colors duration-300"
              style={{ color: isHovered ? project.accentColor : undefined }}
            >
              {project.name}
            </h3>
            <p className="text-fg-secondary text-sm italic mb-4">&ldquo;{project.tagline}&rdquo;</p>

            {/* What it solves — brief */}
            <p className="text-fg-secondary text-sm leading-relaxed mb-4 line-clamp-3">
              <strong className="text-fg">What it does — </strong>{project.solution}
            </p>

            {/* Top 2 benefits */}
            <ul className="space-y-1.5 mb-4">
              {project.benefits.slice(0, 2).map((b, i) => (
                <li key={i} className="flex gap-2 text-xs text-fg-secondary leading-snug">
                  <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: project.accentColor }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>

            {/* Tech */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.techStack.slice(0, 4).map((tech) => (
                <span key={tech} className="px-2 py-0.5 bg-accent/5 text-accent/80 text-[10px] font-medium rounded-md border border-accent/10">
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="px-2 py-0.5 bg-accent/5 text-accent/80 text-[10px] font-medium rounded-md border border-accent/10">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>

            {/* Visit */}
            <div
              className="flex items-center gap-2 text-sm font-medium transition-all"
              style={{ color: isHovered ? project.accentColor : "var(--accent)", gap: isHovered ? "0.75rem" : "0.5rem" }}
            >
              <span>Visit project</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </div>
          </div>
        </a>
      </TiltCard>
    </motion.div>
  );
}

/* ========================================================================= */
/*  MAIN — Projects section                                                  */
/* ========================================================================= */
export default function Projects() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--gradient)" }} />
          <span className="gradient-text text-sm font-semibold tracking-wider uppercase">Projects</span>
        </motion.div>

        <motion.h2
          className="font-display text-3xl md:text-5xl font-bold text-fg mb-4 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Things I&apos;ve <span className="gradient-text">shipped</span>
        </motion.h2>

        <motion.p
          className="text-fg-secondary text-base md:text-lg max-w-2xl mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Real products. Real users. Built end-to-end — from strategy and design to deployment.
        </motion.p>

        {/* Featured (DebtGoFlow) */}
        {featured && <FeaturedProject project={featured} />}

        {/* Other projects header */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="h-px flex-1 max-w-[60px]" style={{ background: "linear-gradient(to right, transparent, rgba(108,99,255,0.3))" }} />
          <span className="text-fg-muted text-xs tracking-[0.2em] uppercase">Also built</span>
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right, rgba(108,99,255,0.3), transparent)" }} />
        </motion.div>

        {/* Other projects grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {rest.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
