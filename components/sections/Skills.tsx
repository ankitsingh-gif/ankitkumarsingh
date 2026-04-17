"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/portfolio-data";

const marqueeSkills = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Three.js", "AI & Prompts", "Marketing Strategy", "Email Marketing", "SEO", "Generative AI", "Vercel", "Git", "Fintech", "Merchant Banking"];

const categoryIcons: Record<string, string> = {
  "Marketing & Strategy": "📈",
  "AI & Automation": "🤖",
  "Web Development": "⚡",
  "Development Tools": "🛠️",
  "MarTech Platforms": "📧",
  "SEO & Content": "🔍",
  "Domain Expertise": "🏦",
};

export default function Skills() {
  return (
    <section id="skills" className="section relative">
      <div className="max-w-7xl mx-auto">
        <motion.div className="flex items-center gap-3 mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--gradient)" }} />
          <span className="gradient-text text-sm font-semibold tracking-wider uppercase">Skills</span>
        </motion.div>

        <motion.h2
          className="font-display text-3xl md:text-5xl font-bold text-fg mb-4 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          The <span className="gradient-text">stack</span> behind the work
        </motion.h2>

        <motion.p
          className="text-fg-secondary text-base md:text-lg max-w-2xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          A toolkit built over 6+ years across marketing, development & AI — with receipts.
        </motion.p>
      </div>

      {/* Marquee */}
      <div className="mb-16 overflow-hidden py-5 border-y border-[rgba(108,99,255,0.08)]">
        <div className="animate-marquee whitespace-nowrap">
          {[...marqueeSkills, ...marqueeSkills].map((s, i) => (
            <span key={i} className="inline-block mx-5 text-fg-muted text-xl md:text-2xl font-display font-semibold">
              {s} <span className="gradient-text mx-3">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Category cards with 3D hover */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={i}
              className="card p-5 group relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              {/* Hover gradient backdrop */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, ${cat.color}, transparent 70%)` }}
              />

              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30` }}
              >
                <span>{categoryIcons[cat.name] || "⚡"}</span>
              </div>

              <h3 className="text-fg text-sm font-display font-bold mb-3 group-hover:text-accent transition-colors">
                {cat.name}
              </h3>

              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 text-[10px] font-medium rounded-md border transition-all"
                    style={{
                      background: `${cat.color}08`,
                      color: cat.color,
                      borderColor: `${cat.color}20`,
                    }}
                  >
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
