"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/portfolio-data";

export default function Experience() {
  return (
    <section id="experience" className="py-32 md:py-48 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.p
          className="text-fg-muted text-xs tracking-[0.3em] uppercase mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Experience
        </motion.p>

        {experience.map((entry, i) => (
          <motion.div
            key={i}
            className="border-t border-border py-10 md:py-14 group"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
          >
            <div className="grid md:grid-cols-12 gap-4 md:gap-8">
              {/* Period */}
              <div className="md:col-span-3">
                <span className="text-fg-secondary text-sm">{entry.period}</span>
                {entry.active && (
                  <span className="inline-block ml-2 w-1.5 h-1.5 rounded-full bg-accent" />
                )}
              </div>

              {/* Title & company */}
              <div className="md:col-span-4">
                <h3 className="font-display text-xl md:text-2xl font-bold text-fg group-hover:text-accent transition-colors duration-300">
                  {entry.title}
                </h3>
                <p className="text-fg-secondary text-sm mt-1">{entry.company}</p>
              </div>

              {/* Highlights */}
              <div className="md:col-span-5">
                {entry.highlights.slice(0, 3).map((h, j) => (
                  <p key={j} className="text-fg-secondary text-sm leading-relaxed mb-2">
                    {h}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
