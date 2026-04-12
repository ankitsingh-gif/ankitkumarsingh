"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig, navLinks } from "@/data/portfolio-data";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }));
    };
    tick();
    const t = setInterval(tick, 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-16 py-5 flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <a href="#home" className="text-fg text-sm font-display font-bold tracking-wider" data-cursor="pointer">
          {siteConfig.initials}
          <span className="text-accent">.</span>
        </a>

        <div className="flex items-center gap-6">
          {/* Local time */}
          <span className="hidden md:block text-fg-muted text-[11px] tracking-wider">
            {time} IST
          </span>

          <ThemeToggle />

          {/* Menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="text-fg text-xs tracking-[0.2em] uppercase hover:text-accent transition-colors"
            data-cursor="pointer"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </motion.nav>

      {/* Full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-bg flex flex-col justify-center px-6 md:px-12 lg:px-16"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(100% 0 0 0)" }}
            transition={{ duration: 0.7, ease: [0.87, 0, 0.13, 1] }}
          >
            <div className="space-y-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block text-massive font-display font-bold text-fg hover:text-accent transition-colors duration-300 leading-none py-2"
                    data-cursor="pointer"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
