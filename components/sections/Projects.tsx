"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/portfolio-data";

const projectImages: Record<string, string> = {
  "Resurgent Events Platform": "🎯",
  "Resurgent India — Corporate Website Redesign": "🏦",
  "DebtGoFlow — Financial Debt Tracker": "💰",
};

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="w-2 h-2 bg-accent rounded-full" />
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">Projects</span>
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
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
              {/* Preview */}
              <div className="h-48 relative overflow-hidden" style={{
                background: `linear-gradient(135deg, ${project.accentColor}15, ${project.accentColor}05)`,
              }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform duration-500">
                    {projectImages[project.name] || "🌐"}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/0 group-hover:bg-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-fg group-hover:text-accent transition-colors mb-2">
                  {project.name}
                </h3>
                <p className="text-fg-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 bg-accent-bg text-accent text-[11px] font-medium rounded-lg">
                      {tech}
                    </span>
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
