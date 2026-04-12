"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/portfolio-data";

export default function Projects() {
  return (
    <section id="projects" className="py-32 md:py-48 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.p
          className="text-fg-muted text-xs tracking-[0.3em] uppercase mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Selected Work
        </motion.p>

        {projects.map((project, i) => (
          <motion.a
            key={i}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border-t border-border group"
            data-cursor="pointer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="py-10 md:py-16 flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Project name — massive */}
              <h3 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-fg group-hover:text-accent transition-colors duration-500 leading-tight">
                {project.name}
              </h3>

              {/* Right side info */}
              <div className="flex items-center gap-6 shrink-0">
                <div className="hidden md:flex flex-wrap gap-2 max-w-xs justify-end">
                  {project.techStack.slice(0, 3).map((t) => (
                    <span key={t} className="text-fg-muted text-xs tracking-wider">{t}</span>
                  ))}
                </div>

                {/* Arrow */}
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent transition-all duration-300">
                  <svg
                    className="w-4 h-4 text-fg-secondary group-hover:text-bg transition-colors duration-300"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Description — visible on hover/always on mobile */}
            <div className="pb-10 md:pb-16 md:opacity-0 md:group-hover:opacity-100 md:-translate-y-4 md:group-hover:translate-y-0 transition-all duration-500">
              <p className="text-fg-secondary text-sm leading-relaxed max-w-2xl">
                {project.description}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
