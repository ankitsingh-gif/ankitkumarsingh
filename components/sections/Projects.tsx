"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowButton from "@/components/ui/GlowButton";
import { projects } from "@/data/portfolio-data";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Things I've Built"
          subtitle="Projects that make an impact — from event platforms to fintech apps"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <motion.div
                className="glass rounded-2xl overflow-hidden h-full flex flex-col"
                whileHover={{
                  scale: 1.03,
                  boxShadow: `0 0 40px ${project.accentColor}33, 0 20px 60px rgba(0,0,0,0.4)`,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  borderColor: `${project.accentColor}20`,
                  borderWidth: 1,
                }}
              >
                {/* Project preview area */}
                <div
                  className="h-48 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${project.accentColor}10, ${project.accentColor}05)`,
                  }}
                >
                  {/* Browser frame mockup */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <div className="absolute top-2.5 left-20 right-20 h-5 rounded bg-white/5 flex items-center justify-center">
                    <span className="text-[10px] text-text-secondary truncate px-2">
                      {project.url.replace("https://", "")}
                    </span>
                  </div>

                  {/* Project name large */}
                  <div className="absolute inset-0 flex items-center justify-center pt-8">
                    <span
                      className="font-heading text-3xl font-bold opacity-10 group-hover:opacity-20 transition-opacity"
                      style={{ color: project.accentColor }}
                    >
                      {project.name.split("—")[0].trim()}
                    </span>
                  </div>

                  {/* Glow orb */}
                  <motion.div
                    className="absolute w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                    style={{ background: project.accentColor }}
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-heading text-xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs rounded-full font-heading tracking-wider"
                        style={{
                          background: `${project.accentColor}15`,
                          color: project.accentColor,
                          border: `1px solid ${project.accentColor}30`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <GlowButton href={project.url} variant="outline" className="w-full justify-center text-xs">
                    View Live
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </GlowButton>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
