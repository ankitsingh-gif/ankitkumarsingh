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
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return Math.min(prev + 2, 100);
      });
    }, 25);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-bg flex flex-col items-center justify-center"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
        >
          <motion.div className="mb-8" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: "var(--gradient)" }}>
              <span className="text-white text-2xl font-display font-bold tracking-wider">AKS</span>
            </div>
          </motion.div>
          <div className="font-display text-6xl font-bold gradient-text mb-4" style={{ fontVariantNumeric: "tabular-nums" }}>{count}%</div>
          <div className="w-48 h-1 bg-bg-card rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ width: `${count}%`, background: "var(--gradient)" }} />
          </div>
          <p className="text-fg-muted text-xs tracking-[0.3em] mt-6 uppercase">Loading experience</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
