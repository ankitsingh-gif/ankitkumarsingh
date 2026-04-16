"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/portfolio-data";

function BrowserMockup({ project, featured = false }: { project: typeof projects[0]; featured?: boolean }) {
  return (
    <div className={`rounded-xl overflow-hidden shadow-lg border border-border/50 ${featured ? "h-full" : ""}`}>
      {/* Browser chrome */}
      <div className="bg-[#f6f6f6] px-4 py-2.5 flex items-center gap-2 border-b border-border/50">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 mx-3">
          <div className="bg-white rounded-md px-3 py-1 text-[10px] text-fg-muted font-mono truncate border border-border/30">
            {project.url.replace("https://", "")}
          </div>
        </div>
      </div>
      {/* Screen content */}
      <div
        className={`relative ${featured ? "h-64 md:h-80" : "h-44"}`}
        style={{
          background: `linear-gradient(135deg, ${project.accentColor}18, ${project.accentColor}08, #fafaf8)`,
        }}
      >
        {/* Abstract UI mockup */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          {/* Top bar mockup */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg" style={{ background: `${project.accentColor}30` }} />
            <div className="flex-1 space-y-1.5">
              <div className="h-2 rounded-full w-24" style={{ background: `${project.accentColor}25` }} />
              <div className="h-1.5 rounded-full w-16" style={{ background: `${project.accentColor}15` }} />
            </div>
            <div className="flex gap-1.5">
              <div className="w-6 h-6 rounded-md" style={{ background: `${project.accentColor}20` }} />
              <div className="w-6 h-6 rounded-md" style={{ background: `${project.accentColor}15` }} />
            </div>
          </div>

          {/* Content blocks mockup */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${project.accentColor}20` }}>
                <div className="w-6 h-6 rounded-lg" style={{ background: `${project.accentColor}40` }} />
              </div>
              <div className="space-y-1.5">
                <div className="h-2.5 rounded-full w-32 mx-auto" style={{ background: `${project.accentColor}25` }} />
                <div className="h-2 rounded-full w-24 mx-auto" style={{ background: `${project.accentColor}15` }} />
              </div>
            </div>
          </div>

          {/* Bottom cards mockup */}
          <div className={`grid ${featured ? "grid-cols-3" : "grid-cols-2"} gap-2`}>
            {Array.from({ length: featured ? 3 : 2 }).map((_, i) => (
              <div key={i} className="bg-white/60 backdrop-blur-sm rounded-lg p-2.5 space-y-1.5">
                <div className="h-1.5 rounded-full w-full" style={{ background: `${project.accentColor}20` }} />
                <div className="h-1 rounded-full w-2/3" style={{ background: `${project.accentColor}12` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="w-2 h-2 bg-accent rounded-full" />
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">
            Projects
          </span>
        </motion.div>

        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-fg mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Things I&apos;ve built
        </motion.h2>

        {/* Featured project — full width */}
        <motion.a
          href={featured.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block mb-8 bg-bg-card rounded-2xl border border-border overflow-hidden card-hover"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left — browser mockup */}
            <div className="p-6 md:p-8">
              <BrowserMockup project={featured} featured />
            </div>

            {/* Right — content */}
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full"
                  style={{ background: `${featured.accentColor}15`, color: featured.accentColor }}>
                  Featured
                </span>
                <span className="px-2.5 py-0.5 bg-mint-bg text-mint text-[10px] font-semibold rounded-full tracking-wider uppercase">
                  Live
                </span>
              </div>

              <h3 className="font-display text-xl md:text-2xl font-bold text-fg group-hover:text-accent transition-colors mb-3">
                {featured.name}
              </h3>

              <p className="text-fg-secondary text-sm leading-relaxed mb-6">
                {featured.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {featured.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-accent-bg text-accent text-xs font-medium rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Visit link */}
              <div className="flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all">
                <span>Visit project</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </div>
          </div>
        </motion.a>

        {/* Remaining projects — 2-column grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {rest.map((project, i) => (
            <motion.a
              key={i}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-bg-card rounded-2xl border border-border overflow-hidden card-hover block"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              {/* Browser mockup preview */}
              <div className="p-4 pb-0">
                <BrowserMockup project={project} />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-display text-lg font-bold text-fg group-hover:text-accent transition-colors">
                    {project.name}
                  </h3>
                  <span className="px-2 py-0.5 bg-mint-bg text-mint text-[9px] font-semibold rounded-full tracking-wider uppercase">
                    Live
                  </span>
                </div>

                <p className="text-fg-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-accent-bg text-accent text-[11px] font-medium rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-2.5 py-1 bg-accent-bg text-accent text-[11px] font-medium rounded-lg">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                {/* Visit link */}
                <div className="flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all">
                  <span>Visit project</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
