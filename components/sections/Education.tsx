"use client";

import { motion } from "framer-motion";
import { education } from "@/data/portfolio-data";

export default function Education() {
  return (
    <section className="py-16 px-6 md:px-10 bg-bg-card">
      <div className="max-w-7xl mx-auto">
        <motion.div className="flex items-center gap-3 mb-10"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="w-2 h-2 bg-accent rounded-full" />
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">Education</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              className="bg-bg rounded-2xl p-6 border border-border card-hover flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-10 h-10 rounded-xl bg-accent-bg flex items-center justify-center shrink-0 text-lg">
                🎓
              </div>
              <div>
                <h4 className="text-fg font-display font-bold">{edu.degree}</h4>
                <p className="text-fg-secondary text-sm mt-1">{edu.institution}</p>
                <p className="text-fg-muted text-xs mt-1">{edu.period}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
