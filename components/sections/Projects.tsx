"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/portfolio-data";

export default function Projects() {
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.a key={i} href={project.url} target="_blank" rel="noopener noreferrer" className="card overflow-hidden group block" data-cursor="pointer" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12 }}>
              <div className="h-44 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${project.accentColor}15, #f0f0f0)` }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-7xl font-bold text-[#1a1a1a]/[0.06] group-hover:text-[#1a1a1a]/[0.12] transition-all duration-500">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-y-1" style={{ background: "var(--gradient)" }}>
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-fg group-hover:text-accent transition-colors mb-2">{project.name}</h3>
                <p className="text-fg-secondary text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 bg-accent/5 text-accent/80 text-[10px] font-medium rounded-lg border border-accent/10">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
