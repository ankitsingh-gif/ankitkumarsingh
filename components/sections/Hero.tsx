"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { motion } from "framer-motion";
import HeroScene from "@/components/canvas/HeroScene";
import PostProcessing from "@/components/canvas/effects/PostProcessing";
import { siteConfig, heroRoles, heroSubtitle } from "@/data/portfolio-data";

function RotatingText({ texts }: { texts: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [texts.length]);

  return (
    <div className="overflow-hidden h-[1.1em]">
      <motion.div
        key={index}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-accent-bright"
      >
        {texts[index]}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* 3D Canvas */}
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

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-void/20 via-transparent to-void pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-void/40 via-transparent to-void/40 pointer-events-none" />

      {/* Content */}
      <div className="relative z-[2] h-full flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 lg:px-20">
        {/* Top left label */}
        <motion.div
          className="absolute top-28 left-6 md:left-12 lg:left-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="section-number">PORTFOLIO / 2026</span>
        </motion.div>

        {/* Main title */}
        <div className="max-w-6xl">
          <motion.h1
            className="font-display text-hero font-bold text-text-primary mb-4"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {siteConfig.name.split(" ")[0]}
            <br />
            <span className="text-accent">
              {siteConfig.name.split(" ").slice(1).join(" ")}
            </span>
          </motion.h1>

          <motion.div
            className="font-display text-2xl md:text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <RotatingText texts={heroRoles} />
          </motion.div>

          <motion.p
            className="text-text-secondary text-sm md:text-base max-w-xl leading-relaxed mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            {heroSubtitle}
          </motion.p>

          <motion.div
            className="flex gap-6 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <a href="#projects" className="magnetic-btn" data-cursor="pointer">
              EXPLORE WORK
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a
              href={siteConfig.resumeUrl}
              className="text-text-secondary text-sm tracking-wider hover:text-accent-bright transition-colors duration-500"
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
          transition={{ delay: 2.5 }}
        >
          <span className="text-text-muted text-[10px] tracking-[0.3em] uppercase rotate-90 origin-center translate-x-3 mb-8">
            SCROLL
          </span>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-accent-bright to-transparent"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
