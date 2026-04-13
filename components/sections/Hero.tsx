"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
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
        className="inline-block text-accent"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {texts[i]}
      </motion.span>
    </AnimatePresence>
  );
}

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-16 px-6 md:px-10 relative overflow-hidden">
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <div className="relative z-10">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent-bg rounded-full mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-accent text-xs font-semibold tracking-wider">Available for projects</span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-fg leading-[1.1] mb-3"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Hi, I&apos;m {siteConfig.name.split(" ")[0]}
          </motion.h1>

          <motion.div
            className="h-10 md:h-12 overflow-hidden mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="font-display text-2xl md:text-3xl font-bold">
              <RotatingRole texts={heroRoles} />
            </div>
          </motion.div>

          <motion.p
            className="text-fg-secondary text-base md:text-lg leading-relaxed max-w-lg mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Building at the intersection of <strong className="text-fg">Marketing</strong>,{" "}
            <strong className="text-fg">AI</strong> &amp;{" "}
            <strong className="text-fg">Technology</strong> at Resurgent India Limited.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <a href="#projects"
              className="px-8 py-4 bg-accent text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5 transition-all duration-300 text-sm">
              View My Work
            </a>
            <a href={siteConfig.resumeUrl}
              className="px-8 py-4 bg-white text-fg font-semibold rounded-2xl border border-border hover:border-accent hover:text-accent hover:-translate-y-0.5 transition-all duration-300 text-sm shadow-sm">
              Download CV
            </a>
          </motion.div>

          <motion.div
            className="flex gap-8 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {[
              { n: "6+", l: "Years Exp." },
              { n: "3", l: "Products" },
              { n: "1K+", l: "Campaigns" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl font-bold text-fg">{s.n}</div>
                <div className="text-fg-muted text-xs">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="relative block h-[350px] sm:h-[400px] lg:h-[500px] xl:h-[550px] order-first lg:order-last"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute -z-10 top-4 -left-8 w-40 h-40 opacity-15" style={{
            backgroundImage: "radial-gradient(circle, var(--accent) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }} />

          <HeroModel />

          <div className="absolute top-6 right-4 px-3 py-2 bg-white rounded-xl shadow-lg animate-float flex items-center gap-2 z-10">
            <span className="text-xl">🚀</span>
            <div>
              <p className="text-fg text-[11px] font-semibold">Next.js</p>
              <p className="text-fg-muted text-[9px]">Full-Stack</p>
            </div>
          </div>

          <div className="absolute bottom-12 left-0 px-3 py-2 bg-white rounded-xl shadow-lg animate-float-delay flex items-center gap-2 z-10">
            <span className="text-xl">🤖</span>
            <div>
              <p className="text-fg text-[11px] font-semibold">AI & Prompt Eng.</p>
              <p className="text-fg-muted text-[9px]">Generative AI</p>
            </div>
          </div>

          <div className="absolute top-1/2 -right-2 px-3 py-2 bg-white rounded-xl shadow-lg animate-float flex items-center gap-2 z-10">
            <span className="text-xl">📊</span>
            <div>
              <p className="text-fg text-[11px] font-semibold">Marketing</p>
              <p className="text-fg-muted text-[9px]">C-Suite Campaigns</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
