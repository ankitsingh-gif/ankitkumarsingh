"use client";

import { motion } from "framer-motion";
import { certifications } from "@/data/portfolio-data";

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.p
          className="text-fg-muted text-xs tracking-[0.3em] uppercase mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Certifications
        </motion.p>

        {certifications.map((cert, i) => (
          <motion.div
            key={i}
            className="border-t border-border py-5 grid grid-cols-12 gap-4 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
          >
            <span className="col-span-1 text-fg-muted text-xs font-display">{String(i + 1).padStart(2, "0")}</span>
            <span className="col-span-7 md:col-span-8 text-fg text-sm font-medium">{cert.name}</span>
            <span className="col-span-4 md:col-span-3 text-fg-secondary text-xs text-right">{cert.issuer} — {cert.date}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
