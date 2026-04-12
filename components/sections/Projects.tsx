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

        {/* Projects - large immersive cards */}
        <div className="space-y-32">
          {projects.map((project, i) => (
            <motion.a
              key={i}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              data-cursor="pointer"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Project preview area */}
              <div
                className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden mb-8"
                style={{
                  background: `linear-gradient(135deg, ${project.accentColor}08, ${project.accentColor}03, #0a0a0a)`,
                }}
              >
                {/* Large project number */}
                <div className="absolute top-6 left-8 font-display text-8xl md:text-[12rem] font-bold opacity-[0.03] text-white leading-none">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Center project name */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="font-display text-3xl md:text-6xl lg:text-7xl font-bold opacity-10 group-hover:opacity-20 transition-all duration-700"
                    style={{ color: project.accentColor }}
                  >
                    {project.name.split("—")[0].trim()}
                  </span>
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(ellipse at center, ${project.accentColor}08, transparent 70%)`,
                  }}
                />

                {/* Border that appears on hover */}
                <div
                  className="absolute inset-0 rounded-xl border border-transparent group-hover:border-opacity-100 transition-all duration-700"
                  style={{ borderColor: `${project.accentColor}20` }}
                />

                {/* Arrow indicator */}
                <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke={project.accentColor}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </div>

              {/* Project info */}
              <div className="grid md:grid-cols-12 gap-6">
                <div className="md:col-span-6">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-text-primary group-hover:text-accent-bright transition-colors duration-500">
                    {project.name}
                  </h3>
                </div>
                <div className="md:col-span-4">
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {project.description.slice(0, 150)}...
                  </p>
                </div>
                <div className="md:col-span-2 flex flex-wrap gap-2 md:justify-end">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-text-muted text-xs tracking-wider"
                    >
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
