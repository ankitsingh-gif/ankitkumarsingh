"use client";

import { motion } from "framer-motion";
import { certifications } from "@/data/portfolio-data";

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="w-2 h-2 bg-accent rounded-full" />
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">Certifications</span>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              className="bg-bg-card rounded-2xl p-5 border border-border card-hover group flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              <div className="w-10 h-10 rounded-xl bg-accent-bg flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138c.157.733.578 1.399 1.167 1.831a3.42 3.42 0 010 4.656c-.59.432-1.01 1.098-1.167 1.831a3.42 3.42 0 01-3.138 3.138c-.733.157-1.399.578-1.831 1.167a3.42 3.42 0 01-4.656 0 3.42 3.42 0 00-1.831-1.167 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-1.167-1.831 3.42 3.42 0 010-4.656c.59-.432 1.01-1.098 1.167-1.831a3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <h4 className="text-fg text-sm font-semibold group-hover:text-accent transition-colors">{cert.name}</h4>
                <p className="text-fg-muted text-xs mt-1">{cert.issuer} · {cert.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
