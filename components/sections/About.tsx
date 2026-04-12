"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import GlassCard from "@/components/ui/GlassCard";
import { aboutText, stats } from "@/data/portfolio-data";

export default function About() {
  const paragraphs = aboutText.split("\n\n");

  return (
    <section id="about" className="section">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="About Me"
          subtitle="Building at the intersection of Marketing, AI & Technology"
        />

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* About text */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard hover3D={false} className="space-y-4">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-text-secondary leading-relaxed text-base"
                >
                  {p}
                </p>
              ))}
            </GlassCard>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <GlassCard
                  key={i}
                  className="!p-6"
                  glowColor={
                    i % 2 === 0
                      ? "rgba(0, 229, 255, 0.15)"
                      : "rgba(255, 215, 0, 0.15)"
                  }
                >
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                  />
                </GlassCard>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
