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
        <div className="space-y-24">
          {projects.map((project, i) => (
            <motion.a
              key={i}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              data-cursor="pointer"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Project card */}
              <div className="border border-border rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-accent">

                {/* Preview area with solid dark bg */}
                <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden" style={{ background: "var(--bg-secondary)" }}>

                  {/* Large number watermark */}
                  <div className="absolute top-6 left-8 font-display text-8xl md:text-[10rem] font-bold text-text-primary opacity-[0.04] leading-none select-none">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Center project name watermark */}
                  <div className="absolute inset-0 flex items-center justify-center px-8">
                    <span
                      className="font-display text-2xl md:text-5xl lg:text-6xl font-bold text-text-primary opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-700 select-none text-center"
                    >
                      {project.name.split("—")[0].trim()}
                    </span>
                  </div>

                  {/* Colored accent gradient on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: `radial-gradient(ellipse at 70% 50%, ${project.accentColor}18, transparent 70%)`,
                    }}
                  />

                  {/* Arrow */}
                  <div className="absolute bottom-5 right-6 flex items-center gap-2 text-text-muted group-hover:text-accent transition-all duration-500 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                    <span className="text-xs tracking-wider uppercase">View Project</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>

                  {/* Tech stack pills inside preview */}
                  <div className="absolute bottom-5 left-6 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-[10px] tracking-wider uppercase rounded-full border border-border text-text-muted bg-void/50 backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Info area below preview */}
                <div className="px-6 md:px-8 py-6 md:py-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary group-hover:text-accent transition-colors duration-300 mb-2">
                        {project.name}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed max-w-xl">
                        {project.description}
                      </p>
                    </div>

                    {/* Accent color indicator */}
                    <div
                      className="w-3 h-3 rounded-full shrink-0 mt-2"
                      style={{ backgroundColor: project.accentColor }}
                    />
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
