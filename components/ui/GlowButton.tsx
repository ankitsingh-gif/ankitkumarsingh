"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "accent" | "gold" | "outline";
  className?: string;
}

export default function GlowButton({
  children,
  href,
  onClick,
  variant = "accent",
  className = "",
}: GlowButtonProps) {
  const baseStyles =
    "relative inline-flex items-center gap-2 px-8 py-3 rounded-full font-heading font-semibold text-sm tracking-wider transition-all duration-300 cursor-pointer";

  const variants = {
    accent:
      "bg-accent/10 text-accent border border-accent/30 hover:bg-accent/20 hover:border-accent/60 hover:shadow-[0_0_30px_rgba(0,229,255,0.3)]",
    gold: "bg-gold/10 text-gold border border-gold/30 hover:bg-gold/20 hover:border-gold/60 hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]",
    outline:
      "bg-transparent text-text-primary border border-white/20 hover:border-accent/40 hover:text-accent hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]",
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </Component>
  );
}
