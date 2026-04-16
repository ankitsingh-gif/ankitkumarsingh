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
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        return Math.min(prev + 4, 100);
      });
    }, 25);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Branded logo */}
          <motion.div
            className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-white text-xl font-display font-bold">AKS</span>
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-1 bg-border/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full scroll-progress rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${count}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <motion.p
            className="mt-4 text-fg-muted text-xs font-display tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {count}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
