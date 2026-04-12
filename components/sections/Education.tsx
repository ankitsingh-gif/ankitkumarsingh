"use client";

import { motion } from "framer-motion";
import { education } from "@/data/portfolio-data";

export default function Education() {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        {education.map((edu, i) => (
          <motion.div
            key={i}
            className="border-t border-border pt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <p className="text-fg-muted text-xs tracking-wider mb-2">{edu.period}</p>
            <h4 className="text-fg font-display text-lg font-bold">{edu.degree}</h4>
            <p className="text-fg-secondary text-sm mt-1">{edu.institution}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
