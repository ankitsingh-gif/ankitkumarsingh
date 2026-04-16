"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/portfolio-data";

export default function Contact() {
  return (
    <section id="contact" className="section relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent2/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div className="flex items-center justify-center gap-3 mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="w-2 h-2 rounded-full" style={{ background: "var(--gradient)" }} />
          <span className="gradient-text text-sm font-semibold tracking-wider uppercase">Contact</span>
        </motion.div>
        <motion.h2 className="font-display text-4xl md:text-6xl font-bold text-fg mb-6" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
          Let&apos;s work <span className="gradient-text">together</span>
        </motion.h2>
        <motion.p className="text-fg-secondary text-lg max-w-xl mx-auto mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          Open to new projects, collaborations, or conversations about marketing, AI and technology.
        </motion.p>
        <motion.div className="flex flex-col sm:flex-row gap-4 justify-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <a href={`mailto:${siteConfig.email}`} className="btn-gradient" data-cursor="pointer">{siteConfig.email}</a>
          <a href={`tel:${siteConfig.phone}`} className="btn-outline" data-cursor="pointer">{siteConfig.phone}</a>
        </motion.div>
        <motion.div className="flex justify-center gap-4 flex-wrap" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
          {[{name:"LinkedIn",href:siteConfig.social.linkedin},{name:"GitHub",href:siteConfig.social.github},{name:"WhatsApp",href:siteConfig.social.whatsapp}].map((l) => (
            <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer" data-cursor="pointer" className="px-5 py-2.5 rounded-xl border border-[rgba(108,99,255,0.12)] text-fg-secondary text-sm hover:text-accent hover:border-accent/30 transition-all duration-300">{l.name}</a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
