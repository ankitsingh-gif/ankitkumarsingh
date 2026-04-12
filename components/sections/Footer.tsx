"use client";

import { siteConfig, navLinks } from "@/data/portfolio-data";

export default function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="text-center md:text-left">
            <span className="font-heading text-xl font-bold text-accent text-glow-accent">
              {siteConfig.initials}
            </span>
            <p className="text-text-secondary text-sm mt-1">
              Designed & Built by {siteConfig.name}
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-6">
            {navLinks.slice(0, 5).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-text-secondary text-sm hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-text-secondary/50 text-xs">
            &copy; {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
