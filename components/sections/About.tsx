"use client";

import { motion } from "framer-motion";
import { stats } from "@/data/portfolio-data";

export default function About() {
  return (
    <section id="about" className="section-dark">
      <div className="max-w-7xl mx-auto">
        <motion.div className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">About Me</span>
        </motion.div>
        <motion.h2 className="font-display text-3xl md:text-5xl font-bold text-fg leading-tight mb-16 max-w-4xl"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          I craft <span className="text-accent glow-text">digital experiences</span> that bridge marketing strategy with technical execution.
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          <motion.p className="text-fg-secondary text-base leading-[1.8]"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Currently driving marketing operations and digital product innovation at Resurgent India Limited — a SEBI-registered Category I Merchant Bank. Google-certified in Generative AI &amp; Prompt Engineering.
          </motion.p>
          <motion.p className="text-fg-secondary text-base leading-[1.8]"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            My domain expertise spans Merchant Banking, Stressed Asset Resolution, Insolvency &amp; Bankruptcy, Fintech, and M&amp;A Advisory — giving me a unique edge in both business and technology.
          </motion.p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div key={i} className="card-dark p-6 text-center"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}>
              <div className="font-display text-4xl md:text-5xl font-bold text-accent glow-text mb-2">{stat.value}{stat.suffix}</div>
              <div className="text-fg-muted text-xs tracking-wider uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
