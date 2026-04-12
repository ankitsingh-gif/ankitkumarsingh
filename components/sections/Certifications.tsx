"use client";

import { motion } from "framer-motion";
import { certifications } from "@/data/portfolio-data";

export default function Certifications() {
  return (
    <section id="certifications" className="py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="section-number">05 / CERTIFICATIONS</span>
        </motion.div>

        <motion.h2
          className="font-display text-section-title font-bold text-text-primary mb-20"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Credentials
          <span className="text-accent">.</span>
        </motion.h2>

        <div className="space-y-0">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              className="group border-t border-text-muted py-6 md:py-8 grid md:grid-cols-12 gap-4 items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="md:col-span-1">
                <span className="text-text-muted text-xs font-display">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="md:col-span-7">
                <h4 className="font-display text-lg md:text-xl font-bold text-text-primary group-hover:text-accent-bright transition-colors duration-500">
                  {cert.name}
                </h4>
              </div>
              <div className="md:col-span-2">
                <span className="text-gold text-sm">{cert.issuer}</span>
              </div>
              <div className="md:col-span-2 md:text-right">
                <span className="text-text-muted text-sm">{cert.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
