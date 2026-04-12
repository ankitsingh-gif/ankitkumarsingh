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
    <div className="overflow-hidden h-[1.2em]">
      <motion.div
        key={index}
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        exit={{ y: "-110%" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-gold"
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

      {/* Strong gradient overlays for text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-void/60 via-void/20 to-void pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-void/80 via-void/30 to-transparent pointer-events-none" />

      {/* Content — centered vertically, left-aligned */}
      <div className="relative z-[2] h-full flex flex-col justify-center px-6 md:px-12 lg:px-20">
        {/* Top label */}
        <motion.div
          className="absolute top-28 left-6 md:left-12 lg:left-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="section-number">PORTFOLIO / 2026</span>
        </motion.div>

        {/* Main content block */}
        <div className="max-w-3xl">
          {/* Small intro line */}
          <motion.p
            className="text-text-secondary text-sm md:text-base tracking-[0.2em] uppercase mb-6 font-display"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Hello, I&apos;m
          </motion.p>

          {/* Name — large, clear white */}
          <motion.h1
            className="font-display text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.95] mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-white">{siteConfig.name.split(" ")[0]}</span>
            <br />
            <span className="text-white">{siteConfig.name.split(" ").slice(1).join(" ")}</span>
          </motion.h1>

          {/* Rotating role — gold color for contrast */}
          <motion.div
            className="font-display text-xl md:text-3xl lg:text-4xl font-semibold mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <RotatingText texts={heroRoles} />
          </motion.div>

          {/* Thin separator */}
          <motion.div
            className="w-16 h-px bg-text-secondary mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            style={{ transformOrigin: "left" }}
          />

          {/* Subtitle */}
          <motion.p
            className="text-text-secondary text-sm md:text-base max-w-lg leading-relaxed mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            {heroSubtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-6 items-center"
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
              className="text-text-secondary text-sm tracking-[0.15em] hover:text-gold transition-colors duration-500"
              data-cursor="pointer"
            >
              DOWNLOAD CV &rarr;
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator — bottom right */}
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
            className="w-px h-12 bg-gradient-to-b from-text-secondary to-transparent"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
