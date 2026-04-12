"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/portfolio-data";

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="section-number">03 / PROJECTS</span>
        </motion.div>

        <motion.h2
          className="font-display text-section-title font-bold text-text-primary mb-24"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Selected
          <br />
          <span className="text-accent">work</span>
        </motion.h2>

        {/* Projects */}
        <div className="space-y-20">
          {projects.map((project, i) => (
            <motion.a
              key={i}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border-t border-border pt-10"
              data-cursor="pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Project number + arrow row */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-display text-sm text-text-muted tracking-wider">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-2 text-text-muted group-hover:text-accent transition-all duration-500 opacity-60 group-hover:opacity-100 translate-x-0 group-hover:-translate-x-1">
                  <span className="text-xs tracking-wider uppercase">View Live</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </div>

              {/* Project name — large, clear, always visible */}
              <h3 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-text-primary group-hover:text-accent transition-colors duration-500 mb-6">
                {project.name}
              </h3>

              {/* Description + tech stack */}
              <div className="grid md:grid-cols-12 gap-6 md:gap-8">
                <div className="md:col-span-7">
                  <p className="text-text-secondary text-base leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="md:col-span-5">
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-1.5 text-[11px] tracking-wider uppercase rounded-full border border-border text-text-secondary group-hover:border-accent group-hover:text-accent transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Accent dot */}
                  <div className="flex items-center gap-2 mt-4 md:justify-end">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: project.accentColor }}
                    />
                    <span className="text-text-muted text-xs">
                      {project.url.replace("https://", "")}
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
