"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 600);
          return 100;
        }
        // Accelerating count
        const increment = prev < 60 ? 2 : prev < 90 ? 4 : 8;
        return Math.min(prev + increment, 100);
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-void flex flex-col items-center justify-center"
          exit={{
            clipPath: "inset(0 0 100% 0)",
          }}
          transition={{ duration: 1, ease: [0.87, 0, 0.13, 1] }}
        >
          {/* Counter */}
          <motion.div
            className="font-display text-[8rem] md:text-[12rem] font-bold leading-none text-text-primary"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {count}
          </motion.div>

          {/* Bottom progress line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-text-muted">
            <motion.div
              className="h-full bg-accent-bright"
              style={{ width: `${count}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Name at bottom */}
          <div className="absolute bottom-8 left-8 text-text-secondary text-xs tracking-[0.3em] uppercase font-display">
            Ankit Kumar Singh
          </div>
          <div className="absolute bottom-8 right-8 text-text-secondary text-xs tracking-[0.3em] uppercase font-display">
            Portfolio 2026
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
