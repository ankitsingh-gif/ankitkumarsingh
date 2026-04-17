"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { siteConfig, heroRoles } from "@/data/portfolio-data";

const HeroModel = dynamic(() => import("@/components/canvas/HeroModel"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
    </div>
  ),
});

function RotatingRole({ texts }: { texts: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % texts.length), 2500);
    return () => clearInterval(t);
  }, [texts.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={i}
        className="inline-block gradient-text"
        initial={{ y: 30, opacity: 0, filter: "blur(8px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        exit={{ y: -30, opacity: 0, filter: "blur(8px)" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {texts[i]}
      </motion.span>
    </AnimatePresence>
  );
}

function FloatingBadge({
  emoji, title, subtitle, position, delay = 0,
}: {
  emoji: string; title: string; subtitle: string;
  position: string; delay?: number;
}) {
  return (
    <motion.div
      className={`absolute ${position} px-3.5 py-2.5 bg-white rounded-2xl flex items-center gap-2.5 z-10 border border-[rgba(108,99,255,0.12)]`}
      style={{ boxShadow: "0 10px 40px rgba(108,99,255,0.12), 0 2px 8px rgba(0,0,0,0.04)" }}
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.06, transition: { duration: 0.3 } }}
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{ background: "var(--gradient)" }}>
        <span>{emoji}</span>
      </div>
      <div>
        <p className="text-fg text-[11px] font-display font-bold leading-tight">{title}</p>
        <p className="text-fg-muted text-[9px] leading-tight mt-0.5">{subtitle}</p>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -80]);
  const y2 = useTransform(scrollY, [0, 500], [0, -40]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  return (
    <section id="home" className="min-h-screen flex items-center pt-24 pb-16 px-6 md:px-10 relative overflow-hidden">
      {/* Animated gradient background blobs */}
      <motion.div
        className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(108,99,255,0.08), transparent 70%)", y: y1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,212,170,0.08), transparent 70%)", y: y2 }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-8 items-center relative z-10"
        style={{ opacity }}
      >
        {/* ===== LEFT — Eye-catchy text ===== */}
        <div className="relative z-10">
          {/* Availability badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border border-[rgba(0,212,170,0.2)] bg-accent2/5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent2 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent2" />
            </span>
            <span className="text-accent2 text-xs font-bold tracking-wider">AVAILABLE FOR NEW PROJECTS</span>
          </motion.div>

          {/* Eye-catchy headline */}
          <motion.h1
            className="font-display font-bold leading-[1.05] mb-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.2rem] text-fg">
              I turn ideas
            </span>
            <span className="block text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.2rem] text-fg">
              into <span className="gradient-text">products</span>
            </span>
            <span className="block text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.2rem] text-fg">
              people <span className="italic text-accent">actually</span> use.
            </span>
          </motion.h1>

          {/* Rotating role */}
          <motion.div
            className="h-10 md:h-12 overflow-hidden mb-5 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="font-display text-xl md:text-2xl lg:text-3xl font-bold">
              <RotatingRole texts={heroRoles} />
            </div>
          </motion.div>

          {/* Punchy subtitle */}
          <motion.p
            className="text-fg-secondary text-base md:text-lg leading-relaxed max-w-xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            I&apos;m {siteConfig.name.split(" ")[0]} — a <strong className="text-accent">marketer who codes</strong> and a
            {" "}<strong className="text-accent2">developer who ships</strong>. Currently building event platforms, fintech apps & AI-powered experiences at Resurgent India Limited.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <motion.a
              href="#projects"
              className="btn-gradient inline-flex items-center gap-2"
              data-cursor="pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              See my work
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.a>
            <motion.a
              href={siteConfig.resumeUrl}
              className="btn-outline inline-flex items-center gap-2"
              data-cursor="pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download CV
            </motion.a>
          </motion.div>

          {/* Trusted by */}
          <motion.div
            className="flex items-center gap-5 mt-12 pt-8 border-t border-[rgba(108,99,255,0.08)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {[
              { n: "6+", l: "Years building" },
              { n: "3", l: "Live products" },
              { n: "1K+", l: "Campaigns shipped" },
              { n: "6", l: "Google certs" },
            ].map((s, i) => (
              <div key={s.l} className="flex items-center gap-4">
                {i > 0 && <div className="w-px h-8 bg-[rgba(108,99,255,0.15)]" />}
                <div>
                  <div className="font-display text-xl lg:text-2xl font-bold gradient-text">{s.n}</div>
                  <div className="text-fg-muted text-[10px] md:text-xs mt-0.5">{s.l}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ===== RIGHT — Cute AI Robot ===== */}
        <motion.div
          className="relative block h-[380px] sm:h-[440px] lg:h-[540px] xl:h-[580px] order-first lg:order-last"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Dotted pattern decoration */}
          <motion.div
            className="absolute -z-10 top-8 -left-6 w-44 h-44 opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle, var(--accent) 1px, transparent 1px)",
              backgroundSize: "14px 14px",
            }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          />

          {/* Gradient glow behind robot */}
          <div
            className="absolute inset-0 -z-10 opacity-60 blur-3xl"
            style={{ background: "radial-gradient(circle at 50% 50%, rgba(108,99,255,0.15), rgba(0,212,170,0.08) 40%, transparent 70%)" }}
          />

          {/* 3D Robot */}
          <HeroModel />

          {/* Floating badges */}
          <FloatingBadge
            emoji="⚡"
            title="Next.js"
            subtitle="Full-Stack"
            position="top-6 right-2 md:right-4"
            delay={1.2}
          />
          <FloatingBadge
            emoji="🤖"
            title="AI & Prompts"
            subtitle="Gen AI Expert"
            position="bottom-16 left-0 md:left-2"
            delay={1.4}
          />
          <FloatingBadge
            emoji="📈"
            title="Growth"
            subtitle="C-Suite Campaigns"
            position="top-1/2 -right-2 md:right-0 -translate-y-1/2"
            delay={1.6}
          />
          <FloatingBadge
            emoji="💡"
            title="Shipping"
            subtitle="Products that work"
            position="bottom-4 right-10"
            delay={1.8}
          />
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-fg-muted text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-accent to-transparent"
          animate={{ scaleY: [1, 0.3, 1], opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}
