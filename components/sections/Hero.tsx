"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig, heroRoles } from "@/data/portfolio-data";

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
      {/* Background decorations */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 left-1/2 w-[300px] h-[300px] bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left — Text content */}
        <div>
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent-bg rounded-full mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-accent text-xs font-semibold tracking-wider">Available for projects</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-fg leading-[1.1] mb-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Hi, I&apos;m {siteConfig.name.split(" ")[0]} —
            <br />
            <span className="h-[1.2em] inline-flex items-baseline">
              <RotatingRole texts={heroRoles} />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-fg-secondary text-lg md:text-xl leading-relaxed max-w-lg mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Building at the intersection of <strong className="text-fg">Marketing</strong>,{" "}
            <strong className="text-fg">AI</strong> &amp;{" "}
            <strong className="text-fg">Technology</strong> at Resurgent India Limited.
          </motion.p>

          {/* CTAs */}
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

          {/* Stats mini row */}
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

        {/* Right — Visual/Image area */}
        <motion.div
          className="relative hidden lg:block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Main card */}
          <div className="relative bg-gradient-to-br from-accent/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-8 aspect-square flex items-center justify-center">
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 px-4 py-2 bg-white rounded-xl shadow-lg animate-float flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              <div>
                <p className="text-fg text-xs font-semibold">Next.js</p>
                <p className="text-fg-muted text-[10px]">Full-Stack</p>
              </div>
            </div>

            <div className="absolute -bottom-3 -left-3 px-4 py-2 bg-white rounded-xl shadow-lg animate-float-delay flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              <div>
                <p className="text-fg text-xs font-semibold">AI & Prompt Eng.</p>
                <p className="text-fg-muted text-[10px]">Generative AI</p>
              </div>
            </div>

            <div className="absolute top-1/2 -right-6 px-4 py-2 bg-white rounded-xl shadow-lg animate-float flex items-center gap-2">
              <span className="text-2xl">📊</span>
              <div>
                <p className="text-fg text-xs font-semibold">Marketing</p>
                <p className="text-fg-muted text-[10px]">C-Suite Campaigns</p>
              </div>
            </div>

            {/* Center content */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center mb-6 shadow-xl shadow-accent/20">
                <span className="text-white font-display text-4xl font-bold">{siteConfig.initials}</span>
              </div>
              <p className="text-fg font-display font-bold text-lg">Asst. Manager</p>
              <p className="text-fg-secondary text-sm">Resurgent India Limited</p>
              <p className="text-accent text-xs font-medium mt-1">SEBI Cat-I Merchant Bank</p>
            </div>
          </div>

          {/* Decorative dots */}
          <div className="absolute -z-10 top-8 -left-8 w-48 h-48 opacity-20" style={{
            backgroundImage: "radial-gradient(circle, var(--accent) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }} />
        </motion.div>
      </div>
    </section>
  );
}
