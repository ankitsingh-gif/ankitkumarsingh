"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/portfolio-data";

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-10 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div className="flex items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="w-2 h-2 bg-accent rounded-full" />
          <span className="text-accent text-sm font-semibold tracking-wider uppercase">Contact</span>
        </motion.div>

        <motion.h2
          className="font-display text-4xl md:text-6xl font-bold text-fg mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Let&apos;s work <span className="gradient-text">together</span>
        </motion.h2>

        <motion.p
          className="text-fg-secondary text-lg max-w-xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          I&apos;m always open to new projects, collaborations, or just a conversation about marketing, AI and technology.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <a href={`mailto:${siteConfig.email}`}
            className="px-8 py-4 bg-accent text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5 transition-all duration-300">
            {siteConfig.email}
          </a>
          <a href={`tel:${siteConfig.phone}`}
            className="px-8 py-4 bg-white text-fg font-semibold rounded-2xl border border-border hover:border-accent hover:text-accent hover:-translate-y-0.5 transition-all duration-300 shadow-sm">
            {siteConfig.phone}
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {[
            { name: "LinkedIn", href: siteConfig.social.linkedin },
            { name: "GitHub", href: siteConfig.social.github },
            { name: "WhatsApp", href: siteConfig.social.whatsapp },
          ].map((l) => (
            <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 bg-bg-card rounded-xl border border-border text-fg-secondary text-sm hover:text-accent hover:border-accent transition-all duration-300">
              {l.name}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
