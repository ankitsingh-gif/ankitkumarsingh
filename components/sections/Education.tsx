"use client";

import { motion } from "framer-motion";
import { education } from "@/data/portfolio-data";

export default function Education() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="section-number">06 / EDUCATION</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              className="border-t border-text-muted pt-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-text-muted text-xs tracking-wider">{edu.period}</span>
              <h4 className="font-display text-xl font-bold text-text-primary mt-3 mb-2">
                {edu.degree}
              </h4>
              <p className="text-text-secondary text-sm">{edu.institution}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
