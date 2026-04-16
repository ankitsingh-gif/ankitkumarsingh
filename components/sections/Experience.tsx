"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/portfolio-data";

export default function Experience() {
  return (
    <section id="experience" className="section-dark bg-bg">
      <div className="max-w-7xl mx-auto">
        <motion.div className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">Experience</span>
        </motion.div>
        <motion.h2 className="font-display text-3xl md:text-4xl font-bold text-fg mb-16"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Where I&apos;ve worked
        </motion.h2>
        <div className="space-y-6">
          {experience.map((entry, i) => (
            <motion.div key={i} className="card-dark p-6 md:p-8 group"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}>
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                  <span className="text-accent text-lg font-display font-bold">{entry.company.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="font-display text-lg font-bold text-fg group-hover:text-accent transition-colors">{entry.title}</h3>
                    <div className="flex items-center gap-2">
                      {entry.active && <span className="px-2 py-0.5 bg-accent/10 text-accent text-[10px] font-semibold rounded-full border border-accent/20">CURRENT</span>}
                      <span className="text-fg-muted text-sm">{entry.period}</span>
                    </div>
                  </div>
                  <p className="text-accent/70 text-sm font-medium mb-4">{entry.company}</p>
                  <ul className="space-y-2">
                    {entry.highlights.slice(0, 3).map((h, j) => (
                      <li key={j} className="flex gap-3 text-fg-secondary text-sm leading-relaxed"><span className="text-accent mt-0.5 shrink-0">▸</span>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
