"use client";

import { motion } from "framer-motion";
import { certifications, education } from "@/data/portfolio-data";

export default function Certifications() {
  return (
    <section id="certifications" className="section">
      <div className="max-w-7xl mx-auto">
        <motion.div className="flex items-center gap-3 mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--gradient)" }} />
          <span className="gradient-text text-sm font-semibold tracking-wider uppercase">Certifications &amp; Education</span>
        </motion.div>
        <motion.h2 className="font-display text-3xl md:text-4xl font-bold text-fg mb-12" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Credentials</motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {certifications.map((cert, i) => (
            <motion.div key={i} className="card p-5 flex gap-4 group" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-accent/10 border border-accent/20">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <div>
                <h4 className="text-fg text-sm font-semibold group-hover:text-accent transition-colors">{cert.name}</h4>
                <p className="text-fg-muted text-xs mt-1">{cert.issuer} \u00b7 {cert.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {education.map((edu, i) => (
            <motion.div key={i} className="card p-6 flex gap-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--gradient)" }}><span className="text-white text-lg">\ud83c\udf93</span></div>
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
