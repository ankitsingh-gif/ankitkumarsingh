"use client";

import { siteConfig } from "@/data/portfolio-data";

export default function Footer() {
  return (
    <footer className="py-8 px-6 md:px-12 lg:px-20 border-t border-text-muted">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-text-muted text-xs tracking-wider">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </span>
        <span className="text-text-muted text-xs tracking-wider">
          Designed & Built with precision
        </span>
      </div>
    </footer>
  );
}
