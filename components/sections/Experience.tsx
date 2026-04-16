"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/portfolio-data";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="max-w-7xl mx-auto">
        <motion.div className="flex items-center gap-3 mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--gradient)" }} />
          <span className="gradient-text text-sm font-semibold tracking-wider uppercase">Experience</span>
        </motion.div>
        <motion.h2 className="font-display text-3xl md:text-4xl font-bold text-fg mb-16" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          Where I&apos;ve worked
        </motion.h2>

        {/* Timeline layout */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="hidden md:block absolute left-[23px] top-3 bottom-3 w-px" style={{ background: "linear-gradient(to bottom, var(--accent), var(--accent2), transparent)" }} />

          <div className="space-y-6">
            {experience.map((entry, i) => (
              <motion.div
                key={i}
                className="relative flex gap-6 md:gap-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex flex-col items-center shrink-0">
                  <div className={`w-[12px] h-[12px] rounded-full border-2 z-10 mt-8 ${
                    entry.active
                      ? "border-accent bg-accent"
                      : "border-[rgba(108,99,255,0.3)] bg-bg"
                  }`}
                    style={entry.active ? { boxShadow: "0 0 0 4px rgba(108,99,255,0.15)" } : {}}
                  />
                </div>

                {/* Card */}
                <div className="flex-1 card p-6 md:p-8 group">
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--gradient)" }}>
                      <span className="text-white text-lg font-display font-bold">{entry.company.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h3 className="font-display text-lg font-bold text-fg group-hover:text-accent transition-colors">{entry.title}</h3>
                        <div className="flex items-center gap-2">
                          {entry.active && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-accent2 bg-accent2/10 border border-accent2/20 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 bg-accent2 rounded-full animate-pulse" />
                              CURRENT
                            </span>
                          )}
                          <span className="text-fg-muted text-sm">{entry.period}</span>
                        </div>
                      </div>
                      <p className="text-accent/70 text-sm font-medium mb-1">{entry.company}</p>
                      {entry.companyNote && (
                        <p className="text-fg-muted text-xs mb-3">{entry.companyNote}</p>
                      )}
                      <ul className="space-y-2 mt-3">
                        {entry.highlights.slice(0, 4).map((h, j) => (
                          <li key={j} className="flex gap-3 text-fg-secondary text-sm leading-relaxed">
                            <span className="text-accent2 mt-0.5 shrink-0">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                              </svg>
                            </span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
