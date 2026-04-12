"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/portfolio-data";

const socialLinks = [
  { name: "LinkedIn", href: siteConfig.social.linkedin },
  { name: "GitHub", href: siteConfig.social.github },
  { name: "WhatsApp", href: siteConfig.social.whatsapp },
  { name: "Email", href: `mailto:${siteConfig.email}` },
];

export default function Contact() {
  return (
    <section id="contact" className="py-32 md:py-48 px-6 md:px-12 lg:px-20 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="section-number">07 / CONTACT</span>
        </motion.div>

        {/* Large CTA text */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-hero font-bold text-text-primary mb-8">
            Let&apos;s
            <br />
            <span className="text-accent">connect</span>
            <span className="text-accent-bright">.</span>
          </h2>
        </motion.div>

        <motion.p
          className="text-text-secondary text-lg md:text-xl max-w-xl mb-16 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          I&apos;m always open to discussing new projects, collaborations, or
          just having a conversation about marketing, AI, and technology.
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row gap-8 md:gap-16 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <a
            href={`mailto:${siteConfig.email}`}
            className="magnetic-btn"
            data-cursor="pointer"
          >
            {siteConfig.email}
          </a>
          <a
            href={`tel:${siteConfig.phone}`}
            className="text-text-secondary hover:text-accent-bright transition-colors duration-500 text-sm tracking-wider self-center"
            data-cursor="pointer"
          >
            {siteConfig.phone}
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary text-xs tracking-[0.15em] uppercase hover:text-accent-bright transition-colors duration-500"
              data-cursor="pointer"
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
