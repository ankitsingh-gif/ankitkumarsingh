"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/portfolio-data";

export default function Skills() {
  return (
    <section id="skills" className="section-dark bg-bg">
      <div className="max-w-7xl mx-auto">
        <motion.div className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">Skills</span>
        </motion.div>
        <motion.h2 className="font-display text-3xl md:text-4xl font-bold text-fg mb-16"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Tools &amp; expertise
        </motion.h2>
        <div className="mb-16 -mx-6 md:-mx-10 overflow-hidden py-4 border-y border-border">
          <div className="animate-marquee whitespace-nowrap">
            {["Next.js","React","AI","Marketing","SEO","TypeScript","Tailwind","Three.js","Prompt Eng.","Email Marketing","Vercel","Git","Fintech","Next.js","React","AI","Marketing","SEO","TypeScript","Tailwind","Three.js","Prompt Eng.","Email Marketing","Vercel","Git","Fintech"].map((s, i) => (
              <span key={i} className="inline-block mx-4 text-fg-muted text-lg md:text-xl font-display font-medium">{s} <span className="text-accent mx-2">·</span></span>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skillCategories.map((cat, i) => (
            <motion.div key={i} className="card-dark p-5 group"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}>
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
