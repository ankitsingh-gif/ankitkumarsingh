"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig, heroRoles } from "@/data/portfolio-data";

function RotatingRole({ texts }: { texts: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % texts.length), 3000);
    return () => clearInterval(t);
  }, [texts.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={i}
        className="inline-block font-serif"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {texts[i]}
      </motion.span>
    </AnimatePresence>
  );
}

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-16 pt-28 pb-10">
      {/* Top — small intro */}
      <motion.div
        className="mb-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <p className="text-fg-secondary text-sm md:text-base max-w-md leading-relaxed">
          Strategic Marketing Professional &amp; Full-Stack Developer with 6+ years building at the intersection of marketing, AI &amp; technology.
        </p>
      </motion.div>

      {/* Center — massive name */}
      <div className="my-auto -mx-2 md:-mx-4">
        <motion.h1
          className="text-massive font-display font-bold text-fg select-none"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {siteConfig.name.split(" ").slice(0, 2).join(" ")}
          <br />
          <span className="flex items-baseline gap-4 md:gap-8 flex-wrap">
            {siteConfig.name.split(" ").slice(2).join(" ")}
            <span className="text-[clamp(1.2rem,3vw,2.5rem)] text-accent font-serif font-normal">
              <RotatingRole texts={heroRoles} />
            </span>
          </span>
        </motion.h1>
      </div>

      {/* Bottom row */}
      <motion.div
        className="flex items-end justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <a
          href="#projects"
          className="text-fg-secondary text-xs tracking-[0.2em] uppercase hover:text-accent transition-colors duration-300"
          data-cursor="pointer"
        >
          Scroll to explore &darr;
        </a>

        <div className="text-right">
          <p className="text-fg-muted text-[10px] tracking-[0.3em] uppercase">Based in</p>
          <p className="text-fg-secondary text-sm">Delhi NCR, India</p>
        </div>
      </motion.div>
    </section>
  );
}
