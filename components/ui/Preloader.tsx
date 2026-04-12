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
        return Math.min(prev + (prev < 70 ? 3 : 6), 100);
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-bg flex items-end p-6 md:p-12"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
        >
          <span className="font-display text-[20vw] font-bold text-fg leading-none" style={{ fontVariantNumeric: "tabular-nums" }}>
            {count}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
