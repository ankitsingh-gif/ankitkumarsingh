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
        return Math.min(prev + 3, 100);
      });
    }, 25);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-bg-dark flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">
            <motion.div
              className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-fg-muted border-t-accent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <div className="font-display text-5xl font-bold text-accent glow-text">{count}%</div>
            <p className="text-fg-muted text-xs tracking-[0.3em] mt-3 uppercase">Loading</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
