"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/portfolio-data";

function BrowserMockup({ project, featured = false }: { project: typeof projects[0]; featured?: boolean }) {
  return (
    <div className="rounded-xl overflow-hidden border border-[rgba(108,99,255,0.08)]" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
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
        className={`relative ${featured ? "h-56 md:h-72" : "h-40"}`}
        style={{
          background: `linear-gradient(135deg, ${project.accentColor}15, ${project.accentColor}05, #fafaf8)`,
        }}
      >
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          {/* Top bar mockup */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg" style={{ background: `${project.accentColor}25` }} />
            <div className="flex-1 space-y-1">
              <div className="h-1.5 rounded-full w-20" style={{ background: `${project.accentColor}20` }} />
              <div className="h-1 rounded-full w-14" style={{ background: `${project.accentColor}12` }} />
            </div>
          </div>

          {/* Center content */}
          <div className="text-center space-y-2.5">
            <div className="mx-auto w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${project.accentColor}15` }}>
              <div className="w-5 h-5 rounded-lg" style={{ background: `${project.accentColor}30` }} />
            </div>
            <div className="space-y-1">
              <div className="h-2 rounded-full w-28 mx-auto" style={{ background: `${project.accentColor}20` }} />
              <div className="h-1.5 rounded-full w-20 mx-auto" style={{ background: `${project.accentColor}12` }} />
            </div>
          </div>

          {/* Bottom cards */}
          <div className={`grid ${featured ? "grid-cols-3" : "grid-cols-2"} gap-1.5`}>
            {Array.from({ length: featured ? 3 : 2 }).map((_, i) => (
              <div key={i} className="bg-white/50 backdrop-blur-sm rounded-md p-2 space-y-1">
                <div className="h-1 rounded-full w-full" style={{ background: `${project.accentColor}18` }} />
                <div className="h-0.5 rounded-full w-2/3" style={{ background: `${project.accentColor}10` }} />
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
    <section id="projects" className="section">
      <div className="max-w-7xl mx-auto">
        <motion.div className="flex items-center gap-3 mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--gradient)" }} />
          <span className="gradient-text text-sm font-semibold tracking-wider uppercase">Projects</span>
        </motion.div>
        <motion.h2 className="font-display text-3xl md:text-4xl font-bold text-fg mb-16" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          Things I&apos;ve built
        </motion.h2>

        {/* Featured project — full width */}
        <motion.a
          href={featured.url}
          target="_blank"
          rel="noopener noreferrer"
          className="card overflow-hidden group block mb-6"
          data-cursor="pointer"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-5 md:p-7">
              <BrowserMockup project={featured} featured />
            </div>
            <div className="p-5 md:p-7 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full"
                  style={{ background: `${featured.accentColor}12`, color: featured.accentColor }}>
                  Featured
                </span>
                <span className="px-2.5 py-0.5 bg-accent2/10 text-accent2 text-[10px] font-semibold rounded-full tracking-wider uppercase border border-accent2/20">
                  Live
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-fg group-hover:text-accent transition-colors mb-3">
                {featured.name}
              </h3>
              <p className="text-fg-secondary text-sm leading-relaxed mb-5">
                {featured.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {featured.techStack.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 bg-accent/5 text-accent/80 text-[10px] font-medium rounded-lg border border-accent/10">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all">
                <span>Visit project</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </div>
          </div>
        </motion.a>

        {/* Remaining projects */}
        <div className="grid md:grid-cols-2 gap-6">
          {rest.map((project, i) => (
            <motion.a
              key={i}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card overflow-hidden group block"
              data-cursor="pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
            >
              <div className="p-4 pb-0">
                <BrowserMockup project={project} />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-display text-lg font-bold text-fg group-hover:text-accent transition-colors">
                    {project.name}
                  </h3>
                  <span className="px-2 py-0.5 bg-accent2/10 text-accent2 text-[9px] font-semibold rounded-full tracking-wider uppercase border border-accent2/20">
                    Live
                  </span>
                </div>
                <p className="text-fg-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className="px-2.5 py-1 bg-accent/5 text-accent/80 text-[10px] font-medium rounded-lg border border-accent/10">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-2.5 py-1 bg-accent/5 text-accent/80 text-[10px] font-medium rounded-lg border border-accent/10">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>
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
