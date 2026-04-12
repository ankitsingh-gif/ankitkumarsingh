"use client";

import { motion } from "framer-motion";
import { stats } from "@/data/portfolio-data";

export default function About() {
  return (
    <section id="about" className="py-32 md:py-48 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Large statement */}
        <motion.h2
          className="text-large font-display font-bold text-fg mb-20 max-w-5xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          I craft <span className="font-serif font-normal text-accent">digital experiences</span> that bridge marketing strategy with hands-on technical execution — from fintech apps to executive event platforms.
        </motion.h2>

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-16 mb-24">
          <motion.p
            className="text-fg-secondary text-base leading-[1.8]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Currently driving marketing operations and digital product innovation at Resurgent India Limited — a SEBI-registered Category I Merchant Bank. Google-certified in Generative AI &amp; Prompt Engineering.
          </motion.p>
          <motion.p
            className="text-fg-secondary text-base leading-[1.8]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            My domain expertise spans Merchant Banking, Stressed Asset Resolution, Insolvency &amp; Bankruptcy, Fintech, and M&amp;A Advisory — giving me a unique edge in understanding both the business and the technology.
          </motion.p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="border-t border-border pt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <div className="font-display text-5xl md:text-6xl font-bold text-fg">{stat.value}{stat.suffix}</div>
              <div className="text-fg-muted text-xs tracking-[0.15em] uppercase mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
