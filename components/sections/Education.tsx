"use client";

import { motion } from "framer-motion";
import { education } from "@/data/portfolio-data";

export default function Education() {
  return (
    <section className="section-dark bg-bg !py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-4">
        {education.map((edu, i) => (
          <motion.div key={i} className="card-dark p-6 flex gap-4"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}>
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 text-lg">🎓</div>
            <div>
              <h4 className="text-fg font-display font-bold">{edu.degree}</h4>
              <p className="text-fg-secondary text-sm mt-1">{edu.institution}</p>
              <p className="text-fg-muted text-xs mt-1">{edu.period}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
