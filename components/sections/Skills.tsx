"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/portfolio-data";

const marqueeSkills = ["Next.js","React","AI","Marketing","SEO","TypeScript","Tailwind","Three.js","Prompt Eng.","Email Marketing","Vercel","Git","Fintech"];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="max-w-7xl mx-auto">
        <motion.div className="flex items-center gap-3 mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--gradient)" }} />
          <span className="gradient-text text-sm font-semibold tracking-wider uppercase">Skills</span>
        </motion.div>
        <motion.h2 className="font-display text-3xl md:text-4xl font-bold text-fg mb-12" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Tools &amp; expertise
        </motion.h2>
      </div>
      <div className="mb-16 overflow-hidden py-5 border-y border-[rgba(108,99,255,0.08)]">
        <div className="animate-marquee whitespace-nowrap">
          {[...marqueeSkills, ...marqueeSkills].map((s, i) => (
            <span key={i} className="inline-block mx-5 text-fg-muted text-xl md:text-2xl font-display font-semibold">{s} <span className="gradient-text mx-3">·</span></span>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skillCategories.map((cat, i) => (
            <motion.div key={i} className="card p-5 group" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <div className="w-3 h-3 rounded-full mb-3" style={{ backgroundColor: cat.color }} />
              <h3 className="text-fg text-sm font-display font-bold mb-3 group-hover:text-accent transition-colors">{cat.name}</h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span key={skill} className="px-2 py-0.5 bg-accent/5 text-accent/70 text-[10px] font-medium rounded-md border border-accent/10">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
