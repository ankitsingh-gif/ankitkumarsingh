"use client";

import { siteConfig, navLinks } from "@/data/portfolio-data";

export default function Footer() {
  return (
    <footer className="py-10 px-6 md:px-10 border-t border-[rgba(108,99,255,0.08)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient)" }}>
            <span className="text-white text-[10px] font-display font-bold">{siteConfig.initials}</span>
          </div>
          <span className="text-fg-muted text-sm">&copy; {new Date().getFullYear()} {siteConfig.name}</span>
        </div>
        <div className="flex flex-wrap gap-6">
          {navLinks.slice(0, 5).map((l) => (
            <a key={l.href} href={l.href} className="text-fg-muted text-sm hover:text-accent transition-colors">{l.label}</a>
          ))}
        </div>
        <a href="#home" className="text-fg-muted text-sm hover:text-accent transition-colors">\u2191 Back to top</a>
      </div>
    </footer>
  );
}
