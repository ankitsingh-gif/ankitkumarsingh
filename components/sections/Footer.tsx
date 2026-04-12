"use client";

import { siteConfig } from "@/data/portfolio-data";

export default function Footer() {
  return (
    <footer className="py-8 px-6 md:px-12 lg:px-16 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="text-fg-muted text-xs">&copy; {new Date().getFullYear()} {siteConfig.name}</span>
        <span className="text-fg-muted text-xs">Built with precision</span>
      </div>
    </footer>
  );
}
