"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/portfolio-data";

const categoryIcons: Record<string, string> = {
  "Marketing & Strategy": "📈",
  "AI & Automation": "🤖",
  "Web Development": "💻",
  "Development Tools": "🛠️",
  "MarTech Platforms": "📧",
  "SEO & Content": "🔍",
  "Domain Expertise": "🏦",
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 px-6 md:px-10 bg-bg-card">
      <div className="max-w-7xl mx-auto">
        <motion.div className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="w-2 h-2 bg-accent rounded-full" />
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">Skills</span>
        </motion.div>

        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-fg mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Tools &amp; expertise
        </motion.h2>

        {/* Marquee of all skills */}
        <div className="mb-16 -mx-6 md:-mx-10 overflow-hidden py-4 border-y border-border">
          <div className="animate-marquee whitespace-nowrap">
            {skillCategories.flatMap(c => c.skills).concat(skillCategories.flatMap(c => c.skills)).map((s, i) => (
              <span key={i} className="inline-block mx-4 text-fg-muted text-lg md:text-xl font-display font-medium">
                {s} <span className="text-accent mx-2">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* Category cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={i}
              className="bg-bg rounded-2xl p-6 border border-border card-hover group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
            >
              <span className="text-3xl mb-3 block">{categoryIcons[cat.name] || "⚡"}</span>
              <h3 className="font-display text-sm font-bold text-fg mb-3 group-hover:text-accent transition-colors">
                {cat.name}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span key={skill} className="px-2 py-0.5 bg-accent-bg text-accent text-[10px] font-medium rounded-md">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
