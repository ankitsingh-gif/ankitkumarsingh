"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import HeroScene from "@/components/canvas/HeroScene";
import PostProcessing from "@/components/canvas/effects/PostProcessing";
import { siteConfig, heroRoles, heroSubtitle } from "@/data/portfolio-data";

/* Animated word-by-word text reveal */
function AnimatedWords({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-flex flex-wrap">
      {text.split(" ").map((word, i) => (
        <span key={i} className="overflow-hidden inline-block mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* Rotating role text with slide animation */
function RotatingRole({ texts }: { texts: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [texts.length]);

  return (
    <div className="overflow-hidden h-[1.3em]">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-gold"
        >
          {texts[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* Floating animated badge */
function FloatingBadge({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.span
      className="inline-block px-3 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-display border border-border text-text-secondary"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ borderColor: "var(--accent)", color: "var(--accent)" }}
    >
      {text}
    </motion.span>
  );
}

export default function Hero() {
  const firstName = siteConfig.name.split(" ")[0];
  const lastName = siteConfig.name.split(" ").slice(1).join(" ");

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* 3D Canvas — only in dark mode */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 55 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <Suspense fallback={null}>
            <HeroScene />
            <PostProcessing />
            <AdaptiveDpr pixelated />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient overlays for text protection */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-void via-void/70 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-void/50 via-transparent to-void/90 pointer-events-none" />

      {/* ===== CONTENT — properly spaced below navbar ===== */}
      <div className="relative z-[2] h-full flex flex-col justify-center pt-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl">
          {/* Current role & skills */}
          <motion.div
            className="flex flex-wrap items-center gap-2 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <span className="text-accent text-xs tracking-[0.2em] uppercase font-display font-semibold">Currently:</span>
            <span className="text-text-secondary text-xs tracking-wider">
              Asst. Manager @ Resurgent India
            </span>
            <span className="text-text-muted mx-1">/</span>
            <FloatingBadge text="Next.js" delay={0.9} />
            <FloatingBadge text="AI & Prompt Eng." delay={1.0} />
            <FloatingBadge text="Email Campaigns" delay={1.1} />
            <FloatingBadge text="SEO" delay={1.15} />
          </motion.div>

          {/* Name — large, word-by-word reveal */}
          <h1 className="font-display text-hero font-bold leading-[1] mb-2">
            <AnimatedWords text={firstName} delay={1.2} />
            <br />
            <AnimatedWords text={lastName} delay={1.5} />
          </h1>

          {/* Rotating role */}
          <div className="font-display text-xl md:text-3xl lg:text-4xl font-semibold mt-4 mb-8">
            <RotatingRole texts={heroRoles} />
          </div>

          {/* Animated separator line */}
          <motion.div
            className="h-px bg-text-muted mb-6"
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ delay: 2.0, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Subtitle — fade in */}
          <motion.p
            className="text-text-secondary text-sm md:text-base max-w-md leading-relaxed mb-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            {heroSubtitle}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap gap-5 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            <a href="#projects" className="magnetic-btn" data-cursor="pointer">
              EXPLORE WORK
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a
              href={siteConfig.resumeUrl}
              className="text-text-secondary text-sm tracking-[0.12em] hover:text-gold transition-colors duration-500"
              data-cursor="pointer"
            >
              DOWNLOAD CV &rarr;
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 right-6 md:right-12 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <span className="text-text-muted text-[9px] tracking-[0.3em] uppercase rotate-90 origin-center translate-x-3 mb-8">
            SCROLL
          </span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-text-secondary to-transparent"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
