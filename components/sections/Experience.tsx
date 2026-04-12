"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/portfolio-data";

export default function Experience() {
  return (
    <section id="experience" className="section-full">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="section-number">02 / EXPERIENCE</span>
        </motion.div>

        <motion.h2
          className="font-display text-section-title font-bold text-text-primary mb-20"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Where I&apos;ve
          <br />
          <span className="text-accent">worked</span>
        </motion.h2>

        {/* Experience entries */}
        <div className="space-y-0">
          {experience.map((entry, i) => (
            <motion.div
              key={i}
              className="group border-t border-text-muted py-10 md:py-14"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
                {/* Period */}
                <div className="md:col-span-3">
                  <span className="text-text-secondary text-sm">{entry.period}</span>
                  {entry.active && (
                    <span className="inline-block ml-3 w-2 h-2 rounded-full bg-accent-bright animate-pulse" />
                  )}
                  {entry.location && (
                    <p className="text-text-muted text-xs mt-1">{entry.location}</p>
                  )}
                </div>

                {/* Role */}
                <div className="md:col-span-4">
                  <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary group-hover:text-accent-bright transition-colors duration-500">
                    {entry.title}
                  </h3>
                  <p className="text-accent text-sm mt-1 opacity-70">
                    {entry.company}
                  </p>
                </div>

                {/* Highlights */}
                <div className="md:col-span-5">
                  <ul className="space-y-3">
                    {entry.highlights.slice(0, 3).map((h, j) => (
                      <li key={j} className="text-text-secondary text-sm leading-relaxed flex gap-3">
                        <span className="text-text-muted mt-1.5 shrink-0">&mdash;</span>
                        {h}
                      </li>
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
