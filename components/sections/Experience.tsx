"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/portfolio-data";

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 px-6 md:px-10 bg-bg-card">
      <div className="max-w-7xl mx-auto">
        <motion.div className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="w-2 h-2 bg-accent rounded-full" />
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">Experience</span>
        </motion.div>

        <motion.h2
          className="font-display text-3xl md:text-4xl font-bold text-fg mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Where I&apos;ve worked
        </motion.h2>

        {/* Timeline layout */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="hidden md:block absolute left-[23px] top-2 bottom-2 w-px bg-gradient-to-b from-accent via-mint to-transparent" />

          <div className="space-y-6">
            {experience.map((entry, i) => (
              <motion.div
                key={i}
                className="relative flex gap-6 md:gap-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex flex-col items-center shrink-0">
                  <div className={`w-[12px] h-[12px] rounded-full border-2 z-10 mt-7 ${
                    entry.active
                      ? "bg-accent border-accent shadow-[0_0_0_4px_rgba(108,99,255,0.15)]"
                      : "bg-bg-card border-border"
                  }`} />
                </div>

                {/* Card */}
                <div className="flex-1 bg-bg rounded-2xl p-6 md:p-8 border border-border card-hover group">
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6 mb-4">
                    {/* Company icon */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      entry.active ? "bg-accent text-white" : "bg-accent-bg"
                    }`}>
                      <span className={`text-lg font-display font-bold ${
                        entry.active ? "text-white" : "text-accent"
                      }`}>
                        {entry.company.charAt(0)}
                      </span>
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h3 className="font-display text-lg font-bold text-fg group-hover:text-accent transition-colors">
                          {entry.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          {entry.active && (
                            <span className="px-2.5 py-0.5 bg-mint-bg text-mint text-[10px] font-semibold rounded-full tracking-wider flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 bg-mint rounded-full animate-pulse" />
                              CURRENT
                            </span>
                          )}
                          <span className="text-fg-muted text-sm">{entry.period}</span>
                        </div>
                      </div>

                      <p className="text-accent text-sm font-medium mb-1">{entry.company}</p>
                      {entry.companyNote && (
                        <p className="text-fg-muted text-xs mb-4">{entry.companyNote}</p>
                      )}

                      <ul className="space-y-2.5 mt-4">
                        {entry.highlights.slice(0, 4).map((h, j) => (
                          <li key={j} className="flex gap-3 text-fg-secondary text-sm leading-relaxed">
                            <svg className="w-4 h-4 text-mint shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
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
