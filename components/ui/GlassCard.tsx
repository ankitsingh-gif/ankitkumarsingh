"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover3D?: boolean;
  glowColor?: string;
}

export default function GlassCard({
  children,
  className = "",
  hover3D = true,
  glowColor = "rgba(0, 229, 255, 0.15)",
}: GlassCardProps) {
  return (
    <motion.div
      className={`glass rounded-2xl p-6 ${className}`}
      whileHover={
        hover3D
          ? {
              scale: 1.02,
              boxShadow: `0 0 30px ${glowColor}, 0 20px 60px rgba(0, 0, 0, 0.3)`,
            }
          : undefined
      }
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
