"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/portfolio-data";

export default function Contact() {
  return (
    <section id="contact" className="py-32 md:py-48 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.p
          className="text-fg-muted text-xs tracking-[0.3em] uppercase mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Get in touch
        </motion.p>

        {/* Massive CTA */}
        <motion.a
          href={`mailto:${siteConfig.email}`}
          className="block font-display text-massive font-bold text-fg hover:text-accent transition-colors duration-500 mb-16"
          data-cursor="pointer"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Let&apos;s <span className="font-serif font-normal">talk</span>.
        </motion.a>

        {/* Contact details */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 border-t border-border pt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <p className="text-fg-muted text-xs tracking-wider uppercase mb-2">Email</p>
            <a href={`mailto:${siteConfig.email}`} className="text-fg text-sm hover:text-accent transition-colors" data-cursor="pointer">
              {siteConfig.email}
            </a>
          </div>
          <div>
            <p className="text-fg-muted text-xs tracking-wider uppercase mb-2">Phone</p>
            <a href={`tel:${siteConfig.phone}`} className="text-fg text-sm hover:text-accent transition-colors" data-cursor="pointer">
              {siteConfig.phone}
            </a>
          </div>
          <div>
            <p className="text-fg-muted text-xs tracking-wider uppercase mb-2">Socials</p>
            <div className="flex gap-4">
              {[
                { name: "LinkedIn", href: siteConfig.social.linkedin },
                { name: "GitHub", href: siteConfig.social.github },
                { name: "WhatsApp", href: siteConfig.social.whatsapp },
              ].map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg-secondary text-sm hover:text-accent transition-colors"
                  data-cursor="pointer"
                >
                  {l.name}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
