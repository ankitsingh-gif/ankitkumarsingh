"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig, navLinks } from "@/data/portfolio-data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 transition-all duration-500 ${scrolled ? "py-3 bg-bg-dark/90 backdrop-blur-xl border-b border-border" : "py-5"}`}
        initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center animate-pulse-glow">
              <span className="text-accent text-sm font-display font-bold">{siteConfig.initials}</span>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-fg-secondary text-sm hover:text-accent transition-colors duration-300">{link.label}</a>
            ))}
            <a href="#contact" className="px-5 py-2 bg-accent/10 text-accent text-sm font-medium rounded-full border border-accent/30 hover:bg-accent hover:text-bg-dark transition-all duration-300">Let&apos;s Talk</a>
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Menu">
            <div className="flex flex-col gap-1.5">
              <motion.span className="w-6 h-0.5 bg-fg block rounded" animate={open ? { rotate: 45, y: 6 } : {}} />
              <motion.span className="w-6 h-0.5 bg-fg block rounded" animate={open ? { opacity: 0 } : {}} />
              <motion.span className="w-6 h-0.5 bg-fg block rounded" animate={open ? { rotate: -45, y: -6 } : {}} />
            </div>
          </button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-40 bg-bg-dark pt-24 px-6 flex flex-col gap-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}
                className="text-fg text-2xl font-display font-bold py-2 border-b border-border hover:text-accent transition-colors">{link.label}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
